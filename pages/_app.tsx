import React from 'react';
import App, {AppContext} from 'next/app';
import {wrapper} from "@/app/store/store";
import {appWithTranslation} from 'next-i18next'
import Alert from "@/shared/ui/Alert/Alert";


class MyApp extends App {
    static async getServer({Component, ctx}: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        // @ts-ignore
        return <>
            <Alert/>
            <Component {...pageProps} />
        </>
    }
}

export default wrapper.withRedux(appWithTranslation(MyApp));
