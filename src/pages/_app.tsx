import React from "react";
import { AppProps } from 'next/app';
import '../styles/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


