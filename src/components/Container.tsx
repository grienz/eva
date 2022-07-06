import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { ModelBase, PortableText, TagBase } from "@/typings/schema-types";
import { getDescription } from "@/utils/contentUtils";

import ScrollTopButton from "./ScrollTopButton";

type ContainerProps = {
  title: string;
  description?: PortableText;
  ogImage?: string;
  type?: string;
  date?: string;
  children: React.ReactNode;
  model?: ModelBase;
  tags?: TagBase[];
};
export function Container(props: ContainerProps) {
  const router = useRouter();
  const { locale } = router;
  const description = getDescription(props.description ?? []);
  const articleData =
    props.type === "article"
      ? {
          publishedTime: props.date,
          tags: props.tags.map((tag) => tag.tagName),
          models: props.model
            ? [
                `https://${
                  locale === "tr" ? "" : "en."
                }evasmartshower.vercel.app/model/${props.model.modelSlug}`
              ]
            : [""],
          description
        }
      : {};
  const seoData = {
    title: props.title,
    description,
    openGraph: {
      title: props.title,
      locale,
      article: articleData,
      url:
        `https://evasmartshower.vercel.app${router.asPath}` ??
        "https://evasmartshower.vercel.app",
      type: props.type ?? "page",
      image: props.ogImage ?? "/og.png",
      description,
      images: [
        {
          url: props.ogImage ?? "/og.png",
          alt: props.title ?? ""
        }
      ]
    },
    twitter: {
      cardType: props.ogImage ?? "/og.png"
    }
  };
  return (
    <div className="flex flex-col justify-center bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400 ">
      <NextSeo {...seoData} />
      <main
        id="skip"
        className="mx-auto flex min-w-full max-w-3xl flex-col justify-center bg-slate-100 px-6  text-lg text-slate-500 dark:bg-slate-900 dark:text-slate-400 md:px-8"
      >
        <Header />
        {props.children}
        <ScrollTopButton />
        <Footer />
      </main>
    </div>
  );
}
