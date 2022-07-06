/* eslint-disable no-console */
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
import { SEO } from "@/utils/global.config";

const isBrowser = typeof window !== "undefined";

// Console Credits
if (isBrowser) {
  console.groupCollapsed(
    "%c⚡ Site Credits",
    "display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:aqua;color:white;"
  );
  console.log(
    "%cDevelopment by Grienz \n– https://github.com/grienz",
    "display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;"
  );
  console.groupEnd();
}

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
          <ProgressBar />
          <Analytics />
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </ThemeProvider>
      </NextIntlProvider>
    </>
  );
}

export default App;
