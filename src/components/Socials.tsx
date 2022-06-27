import { ExternalLink } from "@/components/ExternalLink";
import {
  facebook,
  instagram,
  mail,
  telegram,
  youtube
} from "@/components/Icons";

function getSocialIconByLink(url: string) {
  if (url.search(/youtube/i) !== -1) {
    return youtube;
  }
  if (url.search(/facebook/i) !== -1) {
    return facebook;
  }
  if (url.search(/t.me/i) !== -1) {
    return telegram;
  }
  if (url.search(/instagram/i) !== -1) {
    return instagram;
  }
  if (url.search(/mailto:/i) !== -1) {
    return mail;
  }
  return null;
}

export function Socials({ socials }: { socials: string[] }) {
  const icons = socials.map((social, index) => (
    <ExternalLink key={index} href={social}>
      {getSocialIconByLink(social)!}
    </ExternalLink>
  ));
  return <>{icons}</>;
}
