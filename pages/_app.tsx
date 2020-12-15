import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import './style.module.less';
import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <React.Fragment>
            <Head>
                <title>FiveRP.LT</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
            </Head>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </React.Fragment>
    );
}
