/**
 * Structured-data (JSON-LD) builders.
 *
 * Every page emits a single schema.org `@graph` so search engines and AI
 * answer engines can resolve the API Circle entity, the website, the product,
 * and the current page — plus optional breadcrumbs and FAQ for rich results.
 */
import { SITE } from './site';

export interface Breadcrumb {
  name: string;
  url: string;
}
export interface FaqItem {
  q: string;
  a: string;
}

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const SOFTWARE_ID = `${SITE.url}/#software`;

const abs = (path: string) => new URL(path, SITE.url).href;

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: abs('/logo.svg') },
    image: abs('/og.png'),
    description: SITE.description,
    email: SITE.email,
    slogan: SITE.tagline,
    foundingLocation: { '@type': 'Place', name: 'India' },
    sameAs: [...SITE.sameAs],
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  };
}

function softwareNode() {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE.productName,
    alternateName: [...SITE.alternateNames],
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'API Client',
    operatingSystem: 'Windows, macOS, Linux, Web',
    url: SITE.url,
    downloadUrl: abs('/download'),
    softwareHelp: { '@type': 'CreativeWork', url: abs('/docs') },
    description: SITE.description,
    featureList: [
      'Git-backed API collections — branch, diff, pull request, and merge',
      'Built-in MCP server with 94 tools that any AI client can drive',
      'Local mock servers from OpenAPI, Swagger, Postman, or Insomnia specs',
      '17 authentication schemes including OAuth2, AWS SigV4, Digest, NTLM, and JWT',
      'CLI with JUnit reporting for CI pipelines',
      'VS Code extension with YAML request editing',
      'Code generation to cURL, fetch, Node, Python, Go, and Rust',
    ],
    screenshot: abs('/og.png'),
    image: abs('/og.png'),
    keywords: SITE.keywords.join(', '),
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    sameAs: [...SITE.sameAs],
  };
}

interface PageOpts {
  canonical: string;
  title: string;
  description: string;
  image: string;
}

function webpageNode(opts: PageOpts) {
  return {
    '@type': 'WebPage',
    '@id': `${opts.canonical}#webpage`,
    url: opts.canonical,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': SOFTWARE_ID },
    inLanguage: 'en-US',
    primaryImageOfPage: { '@type': 'ImageObject', url: opts.image },
  };
}

function breadcrumbNode(items: Breadcrumb[], id: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

function faqNode(faqs: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface JsonLdOptions extends PageOpts {
  breadcrumbs?: Breadcrumb[];
  faqs?: FaqItem[];
}

/** Build the per-page `@graph` document injected into <head>. */
export function buildJsonLd(opts: JsonLdOptions) {
  const page: Record<string, unknown> = webpageNode(opts);
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    softwareNode(),
    page,
  ];

  if (opts.breadcrumbs?.length) {
    const id = `${opts.canonical}#breadcrumb`;
    page.breadcrumb = { '@id': id };
    graph.push(breadcrumbNode(opts.breadcrumbs, id));
  }
  if (opts.faqs?.length) graph.push(faqNode(opts.faqs));

  return { '@context': 'https://schema.org', '@graph': graph };
}
