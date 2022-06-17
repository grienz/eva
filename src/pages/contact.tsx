import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { getPageContent } from "@/utils/api";

export default function About({ pageData }: Props) {
  return (
    <Container title={pageData.pageTitle}>
      <div className="mx-auto mb-40 flex max-w-2xl flex-col justify-start border-gray-200 pb-16 dark:border-gray-700">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            text={pageData.pageText}
          />
        )}
      </div>
      {/*       <div className="mx-auto flex max-w-2xl flex-col justify-center border-gray-200 pb-16 dark:border-gray-700">
        <iframe
          title="google maps"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3xeqYHERyhQR4sKCcIAgoRg&key={process.env.GOOGLE_API_KEY}"
          width="100%"
          height="200"
          loading="lazy"
          frameBorder="0"
          style={{ border: "0" }}
          allowFullScreen
        />
      </div> */}
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
