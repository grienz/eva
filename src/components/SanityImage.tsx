import cn from 'classnames';
import Img from 'next/image';
import Link from 'next/link';

import { shimmer, toBase64 } from '@/lib/contentUtils';
import { urlFor } from '@/lib/sanity';

export function SanityImage({
  url,
  width,
  height = width,
  alt = 'A placeholder text for image',
  slug = '',
  isRounded = false
}) {
  const urlWithProps = urlFor(url)
    // .format('webp')
    // .fit('max')
    // .width(Number(width))
    // .height(height)
    .auto('format')
    .url();
  // const sanityImageLoader = ({ src, width: w, quality }) => {
  //   return `${src}?w=${w}&q=${quality || 75}`;
  // };

  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      // loader={sanityImageLoader}
      width={width}
      height={height}
      layout="responsive"
      objectFit="cover"
      placeholder="blur"
      unoptimized={true}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
      className={cn(
        {
          'hover:opacity-75 transition-opacity': slug,
          'rounded-full': isRounded
        },
        'rounded-lg'
      )}
    />
  );
  return (
    <div className="sm:mx-0  relative">
      {slug ? (
        <Link href={`/product/${slug}`}>
          <a aria-label={alt}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
