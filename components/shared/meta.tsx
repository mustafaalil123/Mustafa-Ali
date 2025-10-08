import Head from 'next/head';
import { SEO_IMAGE } from 'data/constants';
import { JSX } from 'react';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
};

const Meta = ({
  title = 'Muhammad Mustafa Ali - Full Stack Developer',
  keywords = 'web development, programming, web design, react js, chakra ui',
  description = 'Software Engineer. Lover of web and opensource.',
  image = SEO_IMAGE,
}: Props): JSX.Element => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <title>
        {title.includes('Ahmad')
          ? title
          : title.concat(' | Muhammad Mustafa Ali')}
      </title>
    </Head>
  );
};

export default Meta;
