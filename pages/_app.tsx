
import React from 'react';
import App, { AppContext } from 'next/app';
import {wrapper} from "@/store/store";


class MyApp extends App {
  static async getServer({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    // @ts-ignore
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
