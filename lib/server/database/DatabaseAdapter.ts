import { Account, Prisma, User, Session, VerificationRequest } from '@prisma/client';
import { createHash, randomBytes } from 'crypto';
import { AppOptions } from 'next-auth';
import { AdapterInstance, EmailSessionProvider } from 'next-auth/adapters';
import { SessionProvider } from 'next-auth/client';
import {
    CreateSessionError,
    CreateUserError,
    CreateVerificationRequestError,
    DeleteSessionError,
    // DeleteUserError,
    DeleteVerificationRequestError,
    GetSessionError,
    GetUserByEmailError,
    GetUserByProviderAccountIdError,
    GetUserError,
    GetVerificationRequestError,
    LinkAccountError,
    // UnlinkAccountError,
    UpdateSessionError,
    UpdateUserError,
} from '../errors/database';
import NextAuthLogger from '../utilities/NextAuthLogger';
import Database from './Database';

interface Profile {
    id: string;
    name: string;
    email: string | null;
    image?: string | null;
}

const Adapter = () => {
    function getCompoundId(providerId: string, providerAccountId: string): string {
        return createHash('sha256').update(`${providerId}:${providerAccountId}`).digest('hex');
    }

    async function getAdapter(appOptions: AppOptions): Promise<AdapterInstance<User, Profile, Session, VerificationRequest>> {
        const defaultSessionMaxAge: number = 30 * 24 * 60 * 60 * 1000;
        const sessionMaxAge: number =
            appOptions && appOptions.session && appOptions.session.maxAge ? appOptions.session.maxAge * 1000 : defaultSessionMaxAge;
        const sessionUpdateAge: number =
            appOptions && appOptions.session && appOptions.session.updateAge ? appOptions.session.updateAge * 1000 : 0;

        async function createUser(profile): Promise<User> {
            try {
                return Database.getRepository<Prisma.UserDelegate>('user').create({
                    data: {
                        name: profile.name,
                        email: profile.email,
                        image: profile.image,
                        emailVerified: profile.emailVerified ? profile.emailVerified.toISOString() : null,
                    },
                });
            } catch (error) {
                NextAuthLogger.error('CREATE_USER_ERROR', error);
                return Promise.reject(new CreateUserError(error));
            }
        }

        async function getUser(id: string): Promise<User | null> {
            try {
                return Database.getRepository<Prisma.UserDelegate>('user').findUnique({ where: { id: parseInt(id) } });
            } catch (error) {
                NextAuthLogger.error('GET_USER_BY_ID_ERROR', error);
                return Promise.reject(new GetUserError(error));
            }
        }

        async function getUserByEmail(email: string): Promise<User | null> {
            try {
                if (!email) return Promise.resolve(null);
                return Database.getRepository<Prisma.UserDelegate>('user').findUnique({ where: { email } });
            } catch (error) {
                NextAuthLogger.error('GET_USER_BY_EMAIL_ERROR', error);
                return Promise.reject(new GetUserByEmailError(error));
            }
        }

        async function getUserByProviderAccountId(providerId: string, providerAccountId: string): Promise<User | null> {
            try {
                const account: Account = await Database.getRepository<Prisma.AccountDelegate>('account').findUnique({
                    where: { compoundId: getCompoundId(providerId, providerAccountId) },
                });
                if (!account) return null;
                return Database.getRepository<Prisma.UserDelegate>('user').findUnique({ where: { id: account.id } });
            } catch (error) {
                NextAuthLogger.error('GET_USER_BY_PROVIDER_ACCOUNT_ID_ERROR', error);
                return Promise.reject(new GetUserByProviderAccountIdError(error));
            }
        }

        // async function getUserByCredentials(credentials): Promise<User | null> {
        //     return null;
        // }

        async function updateUser(user: User): Promise<User> {
            try {
                const { id, name, email, image, emailVerified } = user;
                return Database.getRepository<Prisma.UserDelegate>('user').update({
                    where: { id },
                    data: { name, email, image, emailVerified: emailVerified ? emailVerified.toISOString() : null },
                });
            } catch (error) {
                NextAuthLogger.error('UPDATE_USER_ERROR', error);
                return Promise.reject(new UpdateUserError(error));
            }
        }

        // async function deleteUser(userId): Promise<User> {
        //     try {
        //         return Database.getRepository<Prisma.UserDelegate>('user').delete({ where: { id: userId } });
        //     } catch (error) {
        //         NextAuthLogger.error('DELETE_USER_ERROR', error);
        //         return Promise.reject(new DeleteUserError(error));
        //     }
        // }

        async function linkAccount(
            userId: string,
            providerId: string,
            providerType: string,
            providerAccountId: string,
            refreshToken: string,
            accessToken: string,
            accessTokenExpires: number
        ): Promise<void> {
            try {
                await Database.getRepository<Prisma.AccountDelegate>('account').create({
                    data: {
                        accessToken,
                        refreshToken,
                        compoundId: getCompoundId(providerId, providerAccountId),
                        providerAccountId: `${providerAccountId}`,
                        providerId,
                        providerType,
                        accessTokenExpires: new Date(accessTokenExpires),
                        fkUser: { connect: { id: parseInt(userId) } },
                    },
                });
            } catch (error) {
                NextAuthLogger.error('LINK_ACCOUNT_ERROR', error);
                return Promise.reject(new LinkAccountError(error));
            }
        }

        // async function unlinkAccount(userId, providerId, providerAccountId): Promise<Account> {
        //     try {
        //         return Database.getRepository<Prisma.AccountDelegate>('account').delete({
        //             where: { compoundId: getCompoundId(providerId, providerAccountId) },
        //         });
        //     } catch (error) {
        //         NextAuthLogger.error('UNLINK_ACCOUNT_ERROR', error);
        //         return Promise.reject(new UnlinkAccountError(error));
        //     }
        // }

        async function createSession(user: User): Promise<Session> {
            try {
                let expires = null;
                if (sessionMaxAge) {
                    const dateExpires: Date = new Date();
                    dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
                    expires = dateExpires.toISOString();
                }

                return Database.getRepository<Prisma.SessionDelegate>('session').create({
                    data: {
                        expires,
                        fkUser: { connect: { id: user.id } },
                        sessionToken: randomBytes(32).toString('hex'),
                        accessToken: randomBytes(32).toString('hex'),
                    },
                });
            } catch (error) {
                NextAuthLogger.error('CREATE_SESSION_ERROR', error);
                return Promise.reject(new CreateSessionError(error));
            }
        }

        async function getSession(sessionToken: string): Promise<Session | null> {
            try {
                const session: Session = await Database.getRepository<Prisma.SessionDelegate>('session').findUnique({
                    where: { sessionToken },
                });

                if (session && session.expires && new Date() > session.expires) {
                    await Database.getRepository<Prisma.SessionDelegate>('session').delete({ where: { sessionToken } });
                    return null;
                }

                return session;
            } catch (error) {
                NextAuthLogger.error('GET_SESSION_ERROR', error);
                return Promise.reject(new GetSessionError(error));
            }
        }

        async function updateSession(session: Session, force?: boolean): Promise<Session> {
            try {
                if (sessionMaxAge && (sessionUpdateAge || sessionUpdateAge === 0) && session.expires) {
                    const dateSessionIsDueToBeUpdated: Date = new Date(session.expires);
                    dateSessionIsDueToBeUpdated.setTime(dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge);
                    dateSessionIsDueToBeUpdated.setTime(dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge);

                    if (new Date() > dateSessionIsDueToBeUpdated) {
                        const newExpiryDate: Date = new Date();
                        newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);
                        session.expires = newExpiryDate;
                    } else if (!force) {
                        return null;
                    }
                } else {
                    if (!force) {
                        return null;
                    }
                }

                const { id, expires } = session;
                return Database.getRepository<Prisma.SessionDelegate>('session').update({
                    where: { id },
                    data: { expires },
                });
            } catch (error) {
                NextAuthLogger.error('UPDATE_SESSION_ERROR', error);
                return Promise.reject(new UpdateSessionError(error));
            }
        }

        async function deleteSession(sessionToken: string): Promise<void> {
            try {
                await Database.getRepository<Prisma.SessionDelegate>('session').delete({ where: { sessionToken } });
            } catch (error) {
                NextAuthLogger.error('DELETE_SESSION_ERROR', error);
                return Promise.reject(new DeleteSessionError(error));
            }
        }

        async function createVerificationRequest(
            email: string,
            url: string,
            token: string,
            secret: string,
            provider: EmailSessionProvider,
            options: AppOptions
        ): Promise<VerificationRequest> {
            try {
                const { baseUrl } = options;
                const { sendVerificationRequest, maxAge } = provider;

                const hashedToken: string = createHash('sha256').update(`${token}${secret}`).digest('hex');

                let expires = null;
                if (maxAge) {
                    const dateExpires: Date = new Date();
                    dateExpires.setTime(dateExpires.getTime() + maxAge * 1000);
                    expires = dateExpires.toISOString();
                }

                const verificationRequest: VerificationRequest = await Database.getRepository<Prisma.VerificationRequestDelegate>(
                    'verificationRequest'
                ).create({ data: { identifier: email, token: hashedToken, expires } });

                await sendVerificationRequest({ identifier: email, url, token, baseUrl, provider });

                return verificationRequest;
            } catch (error) {
                NextAuthLogger.error('CREATE_VERIFICATION_REQUEST_ERROR', error);
                return Promise.reject(new CreateVerificationRequestError(error));
            }
        }

        async function getVerificationRequest(
            email: string,
            verificationToken: string,
            secret: string,
            provider: SessionProvider
        ): Promise<VerificationRequest | null> {
            try {
                const hashedToken: string = createHash('sha256').update(`${verificationToken}${secret}`).digest('hex');
                const verificationRequest: VerificationRequest = await Database.getRepository<Prisma.VerificationRequestDelegate>(
                    'verificationRequest'
                ).findUnique({ where: { token: hashedToken } });

                if (verificationRequest && verificationRequest.expires && new Date() > verificationRequest.expires) {
                    await Database.getRepository<Prisma.VerificationRequestDelegate>('verificationRequest').delete({
                        where: { token: hashedToken },
                    });
                    return null;
                }

                return verificationRequest;
            } catch (error) {
                NextAuthLogger.error('GET_VERIFICATION_REQUEST_ERROR', error);
                return Promise.reject(new GetVerificationRequestError(error));
            }
        }

        async function deleteVerificationRequest(
            email: string,
            verificationToken: string,
            secret: string,
            provider: SessionProvider
        ): Promise<void> {
            try {
                const hashedToken: string = createHash('sha256').update(`${verificationToken}${secret}`).digest('hex');
                await Database.getRepository<Prisma.VerificationRequestDelegate>('verificationRequest').delete({
                    where: { token: hashedToken },
                });
            } catch (error) {
                NextAuthLogger.error('DELETE_VERIFICATION_REQUEST_ERROR', error);
                return Promise.reject(new DeleteVerificationRequestError(error));
            }
        }

        return Promise.resolve({
            createUser,
            getUser,
            getUserByEmail,
            getUserByProviderAccountId,
            // getUserByCredentials,
            updateUser,
            // deleteUser,
            linkAccount,
            // unlinkAccount,
            createSession,
            getSession,
            updateSession,
            deleteSession,
            createVerificationRequest,
            getVerificationRequest,
            deleteVerificationRequest,
        });
    }

    return {
        getAdapter,
    };
};

export default {
    Adapter,
};
