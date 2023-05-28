import React from 'react';
import '../styles/styles.css'
import App, {AppContext} from 'next/app';
import {wrapper} from "@/app/store/store";
import {appWithTranslation} from 'next-i18next'


class MyApp extends App {
    static async getServer({Component, ctx}: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        // @ts-ignore
        return <>
            <Component {...pageProps} />
        </>
    }
}

export default wrapper.withRedux(appWithTranslation(MyApp));
