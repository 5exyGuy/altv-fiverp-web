import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import MainLayout from '../components/MainLayout';
import '../styles/global.less';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <React.Fragment>
            <Head>
                <title>FiveRP.LT</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </React.Fragment>
    );
}
