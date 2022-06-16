import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";

import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { Analytics } from "@/components/Analytics";
import ProgressBar from "@/components/ProgressBar";
import SEO from "@/utils/next-seo.config";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextIntlProvider
        messages={pageProps.messages}
        formats={{
          dateTime: {
            Base: {
              day: "numeric",
              month: "short",
              year: "numeric"
            }
          }
        }}
      >
        {" "}
        <ThemeProvider attribute="class">
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
          <Analytics />
        </ThemeProvider>
        <ProgressBar />
      </NextIntlProvider>
    </>
  );
}

export default App;
