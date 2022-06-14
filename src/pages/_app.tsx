import '../styles/globals.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import Router from 'next/router';
import { NextIntlProvider } from 'next-intl';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import nProgress from 'nprogress';

import SEO from '@/config/next-seo.config';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextIntlProvider
        messages={pageProps.messages}
        formats={{
          dateTime: {
            short: {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }
          }
        }}
      >
        {' '}
        <ThemeProvider attribute="class">
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </ThemeProvider>
      </NextIntlProvider>
    </>
  );
}

export default App;
