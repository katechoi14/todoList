import React from "react";
import { AppProps } from 'next/app';
import styles from '../styles/style.module.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
