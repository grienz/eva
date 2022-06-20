import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";

import { usePanelbear } from "@panelbear/panelbear-nextjs";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { Analytics } from "@/components/Analytics";
import ProgressBar from "@/components/ProgressBar";
import SEO from "@/utils/next-seo.config";

function App({ Component, pageProps }: AppProps) {
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
    debug: false
  });
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
          <Analytics />
          <Component {...pageProps} />
        </ThemeProvider>
        <ProgressBar />
      </NextIntlProvider>
    </>
  );
}

export default App;
