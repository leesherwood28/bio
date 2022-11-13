import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const author = 'Lee Sherwood';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lee Sherwood</title>
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />
        <meta name='description' content={`Lee Sherwood's CV site`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
