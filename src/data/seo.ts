/**
 * Structured-data (JSON-LD) builders.
 *
 * Every page emits a single schema.org `@graph` so search engines and AI
 * answer engines can resolve the API Circle entity, the website, the product,
 * and the current page — plus optional breadcrumbs and FAQ for rich results.
 */
import { SITE } from './site';
import { PLANS } from './pricing';

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
const LENS_ID = `${SITE.url}/#lens`;

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
    // The FREE workspace only. The Code graph, the MCP server and the CLI are
    // paid, and listing them under an `offers.price` of 0 would advertise a
    // price the gate refuses to honour.
    featureList: [
      'Git-backed API collections — branch, diff, pull request, and merge',
      'Local mock servers from OpenAPI, Swagger, Postman, or Insomnia specs',
      '17 authentication schemes including OAuth2, AWS SigV4, Digest, NTLM, and JWT',
      'Execution plans, run history and environment management',
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

/**
 * The currency every price in `PLANS` is quoted in, read off the catalogue.
 *
 * Schema.org wants an ISO code where the catalogue carries a symbol. Mapping it
 * rather than typing 'USD' means a catalogue that starts emitting another
 * currency fails the build instead of mislabelling every offer — and a wrong
 * `priceCurrency` is the kind of error that reaches a rich result before it
 * reaches a person.
 */
const CURRENCY_OF_SYMBOL: Record<string, string> = { $: 'USD', '£': 'GBP', '€': 'EUR' };

function priceCurrency(): string {
  const priced = PLANS.find((p) => p.monthly !== null);
  const symbol = priced?.monthly?.[0] ?? '$';
  const code = CURRENCY_OF_SYMBOL[symbol];
  if (!code) {
    throw new Error(
      `seo.ts cannot map the catalogue's currency symbol ${symbol} to an ISO code. ` +
        'Add it to CURRENCY_OF_SYMBOL.',
    );
  }
  return code;
}

/** `$18.99` -> `18.99`; a plan with nothing to charge is `0`. (claims: history) */
function priceValue(monthly: string | null): string {
  if (monthly === null) return '0';
  const digits = monthly.replace(/[^0-9.]/g, '');
  if (!digits) throw new Error(`seo.ts cannot read a price out of ${monthly}`);
  return digits;
}

/**
 * The paid product, with every plan as an `Offer`.
 *
 * Separate from `softwareNode`, which describes the FREE workspace and carries
 * `offers.price: 0`. Folding the two together would advertise a price of zero
 * against capabilities the gate charges for.
 *
 * Emitted only on `/pricing` and `/lens` — the two pages that actually sell it.
 * Every number here is read from the generated catalogue; none is written down.
 */
function lensNode() {
  const currency = priceCurrency();

  const offers = PLANS.map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    description: plan.blurb,
    price: priceValue(plan.monthly),
    priceCurrency: currency,
    url: abs('/pricing'),
    availability: 'https://schema.org/InStock',
    ...(plan.monthly === null
      ? {}
      : {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: priceValue(plan.monthly),
            priceCurrency: currency,
            // Monthly, per UN/CEFACT. The annual prices are a discount on these
            // and are shown on the page; quoting both here would double-count.
            billingDuration: 1,
            unitCode: 'MON',
            ...(plan.perSeat
              ? {
                  referenceQuantity: {
                    '@type': 'QuantitativeValue',
                    value: 1,
                    unitText: 'seat',
                  },
                }
              : {}),
          },
        }),
  }));

  const amounts = offers.map((o) => Number(o.price));

  return {
    '@type': 'SoftwareApplication',
    '@id': LENS_ID,
    name: SITE.lensName,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'API Development',
    operatingSystem: 'Windows',
    url: abs('/lens'),
    downloadUrl: abs('/download'),
    description:
      'API Circle Lens reads your repository and maps every endpoint to the code that implements it, then reports what a pull request changes against that map and your OpenAPI spec.',
    // Straight from the catalogue: what each paid plan adds, minus the chaining
    // lines and the workspace counts, which say nothing about capability.
    featureList: PLANS.filter((p) => p.monthly !== null)
      .flatMap((p) => p.capabilities)
      .filter((c) => !c.startsWith('Everything in') && !c.toLowerCase().includes('workspace')),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice: String(Math.min(...amounts)),
      highPrice: String(Math.max(...amounts)),
      offerCount: offers.length,
      offers,
    },
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
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
  /** Emit the paid-product node with its per-plan offers. `/pricing` and `/lens`. */
  lens?: boolean;
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

  if (opts.lens) {
    graph.push(lensNode());
    // The page is about the paid product, so point `about` at it rather than at
    // the free workspace the other pages describe.
    page.about = { '@id': LENS_ID };
  }

  if (opts.breadcrumbs?.length) {
    const id = `${opts.canonical}#breadcrumb`;
    page.breadcrumb = { '@id': id };
    graph.push(breadcrumbNode(opts.breadcrumbs, id));
  }
  if (opts.faqs?.length) graph.push(faqNode(opts.faqs));

  return { '@context': 'https://schema.org', '@graph': graph };
}
