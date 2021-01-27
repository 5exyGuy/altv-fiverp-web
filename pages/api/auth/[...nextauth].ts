import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import Database from '../../../lib/server/database/Database';
import bcrypt from 'bcryptjs';
import DatabaseAdapter from '../../../lib/server/database/DatabaseAdapter';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options: InitOptions = {
    // https://next-auth.js.org/configuration/providers
    providers: [
        // Providers.Email({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        //     sendVerificationRequest: async (options) => {
        //         MailSender.instance.sendEmailLoginRequest(options);
        //     },
        // }),
        // Providers.Apple({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: {
        //         appleId: process.env.APPLE_ID,
        //         teamId: process.env.APPLE_TEAM_ID,
        //         privateKey: process.env.APPLE_PRIVATE_KEY,
        //         keyId: process.env.APPLE_KEY_ID,
        //     },
        // }),
        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        // Providers.GitHub({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        // Providers.Google({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // Providers.Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const username: string = credentials.username;
                const password: string = credentials.password;

                if (!username || !password) return Promise.resolve(null);

                // const user = await Database.getRepository<Prisma.UserDelegate>('user').findFirst({ where: { username: username } });

                // if (!user) return Promise.reject(new Error('error message'));
                // if (!user.verified) return Promise.resolve(null);
                // if (!(await bcrypt.compare(password, user.password))) return Promise.resolve(null);

                // return Promise.resolve({ id: user.id, name: user.username, email: user.email });

                // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return Promise.resolve(user);
                // } else {
                //     // If you return null or false then the credentials will be rejected
                //     return Promise.resolve(null);
                //     // You can also Reject this callback with an Error or with a URL:
                //     // return Promise.reject(new Error('error message')) // Redirect to error page
                //     // return Promise.reject('/path/to/redirect')        // Redirect to a URL
                // }
            },
        }),
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/database
    //
    // Notes:
    // * You must to install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    adapter: DatabaseAdapter.Adapter(),

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a seperate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in pages.
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/auth/login', // Displays signin buttons
        signOut: '/auth/logout', // Displays form with sign out button
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/login/verify', // Used for check email page
        newUser: '/', // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // signIn: async (user, account, profile) => {
        //     return Promise.resolve(true);
        // },
        // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
        // session: async (session, user) => { return Promise.resolve(session) },
        // jwt: async (token, user, account, profile, isNewUser) => { return Promise.resolve(token) }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {
        // createUser: async (message) => NextAuthEventManager.instance.notify('createUser', message),
        // error: async (message) => NextAuthEventManager.instance.notify('error', message),
        // linkAccount: async (message) => NextAuthEventManager.instance.notify('linkAccount', message),
        // session: async (message) => NextAuthEventManager.instance.notify('session', message),
        // signIn: async (message) => NextAuthEventManager.instance.notify('signIn', message),
        // signOut: async (message) => NextAuthEventManager.instance.notify('signOut', message),
        // updateUser: async (message) => NextAuthEventManager.instance.notify('updateUser', message),
    },

    // Enable debug messages in the console if you are having problems
    debug: true,
};

export default (request: NextApiRequest, response: NextApiResponse) => NextAuth(request, response, options);
