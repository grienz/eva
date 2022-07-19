import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { GoogleMaps } from "@/components/GoogleMaps";
import { PageTop } from "@/components/PageTop";
import { SectionSeparator } from "@/components/SectionSeparator";
import { getPageContent } from "@/utils/api";

export default function Contact({ pageData }: Props) {
  return (
    <Container
      title={pageData.pageTitle}
      ogImage={pageData.pagePicture}
      description={pageData.pageText}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-start">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            text={pageData.pageText}
            pictureUrl={pageData.pagePicture}
          />
        )}
      </div>
      <SectionSeparator />
      <ContactForm />
      <GoogleMaps />
    </Container>
  );
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export async function getStaticProps({ locale }: { locale: string }) {
  const pageData = await getPageContent(locale, "contact");
  return {
    props: {
      pageData,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
