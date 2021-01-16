import CreateUserError from '../errors/CreateUserError';
import GetUserByEmailError from '../errors/GetUserByEmailError';
import GetUserError from '../errors/GetUserError';
import NextAuthLogger from '../utilities/NextAuthLogger';
import Database from './Database';

const Adapter = (config, options = {}) => {
    async function getAdapter(appOptions) {
        async function createUser(profile) {
            try {
                return Database.getConnection().user.create({
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

        async function getUser(id) {
            try {
                return Database.getConnection().user.findUnique({ where: { id } });
            } catch (error) {
                NextAuthLogger.error('GET_USER_BY_ID_ERROR', error);
                return Promise.reject(new GetUserError(error));
            }
        }

        async function getUserByEmail(email) {
            try {
                if (!email) return Promise.resolve(null);
                return Database.getConnection().user.findUnique({ where: { email } });
            } catch (error) {
                NextAuthLogger.error('GET_USER_BY_EMAIL_ERROR', error);
                return Promise.reject(new GetUserByEmailError(error));
            }
        }

        async function getUserByProviderAccountId(providerId, providerAccountId) {
            return null;
        }

        async function getUserByCredentials(credentials) {
            return null;
        }

        async function updateUser(user) {
            return null;
        }

        async function deleteUser(userId) {
            return null;
        }

        async function linkAccount(userId, providerId, providerType, providerAccountId, refreshToken, accessToken, accessTokenExpires) {
            return null;
        }

        async function unlinkAccount(userId, providerId, providerAccountId) {
            return null;
        }

        async function createSession(user) {
            return null;
        }

        async function getSession(sessionToken) {
            return null;
        }

        async function updateSession(session, force) {
            return null;
        }

        async function deleteSession(sessionToken) {
            return null;
        }

        async function createVerificationRequest(identifier, url, token, secret, provider) {
            return null;
        }

        async function getVerificationRequest(identifier, token, secret, provider) {
            return null;
        }

        async function deleteVerificationRequest(identifier, token, secret, provider) {
            return null;
        }

        return Promise.resolve({
            createUser,
            getUser,
            getUserByEmail,
            getUserByProviderAccountId,
            getUserByCredentials,
            updateUser,
            deleteUser,
            linkAccount,
            unlinkAccount,
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
