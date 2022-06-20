import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import ScrollTopButton from "./ScrollTopButton";

type ContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  type?: string;
  date?: string;
  children: React.ReactNode;
};
// eslint-disable-next-line import/prefer-default-export
export function Container(props: ContainerProps) {
  const router = useRouter();
  const openGraph = {
    title: props.title ?? "",
    url:
      `https://evasmartshower.vercel.app${router.asPath}` ??
      "https://evasmartshower.vercel.app",
    type: props.type ?? "page",
    image: props.ogImage ?? "/og.png",
    description: props.description ?? "",
    images: [
      {
        url: props.ogImage ?? "/og.png",
        alt: props.title ?? ""
      }
    ]
  };
  return (
    <div className="flex flex-col justify-center bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400 ">
      <NextSeo openGraph={openGraph} />
      <main
        id="skip"
        className="mx-auto flex min-w-fit max-w-2xl flex-col justify-center bg-slate-100 px-6 text-lg text-slate-500 dark:bg-slate-900 dark:text-slate-400 md:px-8"
      >
        <Header />
        {props.children}
        <ScrollTopButton />
        <Footer />
      </main>
    </div>
  );
}
