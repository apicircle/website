/**
 * The facts every legal page states, in ONE place.
 *
 * The Terms of Service, Privacy Policy and Refund Policy are written in Markdown
 * (src/pages/terms.md, privacy.md, refunds.md) and refer to these values as
 * `{{TOKEN}}`. `LegalLayout.astro` substitutes them at build time, so a change of
 * address or contact is one edit here rather than a hunt through three documents.
 *
 * ── BEFORE PUBLISHING ─────────────────────────────────────────────────────────
 * 1. Have a qualified lawyer review all three documents. They are drafts.
 * 2. Replace every value below that is still in [square brackets].
 * 3. Confirm `supportEmail` is a mailbox somebody reads: refund requests,
 *    privacy requests and grievances all go to it.
 * 4. Set `status` to 'published' and `effectiveDate` to the publication date.
 * 5. Make the Lens Worker's TERMS_VERSION / PRIVACY_VERSION equal the versions
 *    below. The account app asks people to accept exactly those versions, and
 *    checkout records them against every subscription.
 */
export const LEGAL = {
  /** 'draft' shows a "not yet in force" banner and keeps the pages out of search. */
  status: 'published' as 'draft' | 'published',

  /** Must equal TERMS_VERSION on the Lens Worker. The Refund Policy is part of the Terms and shares it. */
  termsVersion: '2026-09-19',
  /** Must equal PRIVACY_VERSION on the Lens Worker. */
  privacyVersion: '2026-09-19',
  effectiveDate: '27 September 2026',

  /** Who the customer contracts with. Paddle's domain review requires the legal name in the Terms. */
  legalName: 'Deva Prakash',
  entityDescription:
    'a sole proprietorship registered in India',
  address: 'No. 66/1, South Street, Vasanakuppam, Cuddalore, Tamil Nadu 607301, India',
  tradingName: 'API Circle',

  supportEmail: 'support@apicircle.dev',

  /** Required for Indian consumers (Consumer Protection (E-Commerce) Rules 2020) and for grievances under the DPDP Act 2023. */
  grievanceOfficerName: 'Deva Prakash',
  grievanceOfficerEmail: 'support@apicircle.dev',

  /** Governing law and courts for business customers. Consumers keep their local-law protections. */
  governingLaw: 'the laws of India',
  courts: 'Cuddalore, Tamil Nadu, India',

  /** GDPR Art. 27 / UK GDPR Art. 27 representatives. Take advice on whether one is required; if not, say so. */
  euRepresentative: 'Not appointed',
  ukRepresentative: 'Not appointed',

  /** Where the Firebase (Google Identity Platform) project stores data. Set when the project was created. */
  firebaseLocation: 'the United States',

} as const;

/** Every `{{TOKEN}}` the legal Markdown may use, and what it becomes. */
export const LEGAL_TOKENS: Record<string, string> = {
  LEGAL_NAME: LEGAL.legalName,
  ENTITY_DESCRIPTION: LEGAL.entityDescription,
  ADDRESS: LEGAL.address,
  TRADING_NAME: LEGAL.tradingName,
  SUPPORT_EMAIL: LEGAL.supportEmail,
  GRIEVANCE_OFFICER_NAME: LEGAL.grievanceOfficerName,
  GRIEVANCE_OFFICER_EMAIL: LEGAL.grievanceOfficerEmail,
  GOVERNING_LAW: LEGAL.governingLaw,
  COURTS: LEGAL.courts,
  EU_REPRESENTATIVE: LEGAL.euRepresentative,
  UK_REPRESENTATIVE: LEGAL.ukRepresentative,
  FIREBASE_LOCATION: LEGAL.firebaseLocation,
  TERMS_VERSION: LEGAL.termsVersion,
  PRIVACY_VERSION: LEGAL.privacyVersion,
  EFFECTIVE_DATE: LEGAL.effectiveDate,
};

/**
 * Replace `{{TOKEN}}` in rendered HTML, including inside a link, where Markdown has
 * already percent-encoded the braces (`mailto:%7B%7BSUPPORT_EMAIL%7D%7D`).
 *
 * An unknown token is left visible rather than blanked: a page that says
 * `{{TYPO}}` is caught in review, one that silently says nothing is not.
 */
export function fillLegalTokens(html: string, tokens: Record<string, string> = LEGAL_TOKENS): string {
  return html.replace(/\{\{([A-Z_]+)\}\}|%7B%7B([A-Z_]+)%7D%7D/g, (match, plain?: string, encoded?: string) => {
    const key = plain ?? encoded ?? '';
    const value = tokens[key];
    if (value === undefined) return match;
    return encoded ? encodeURI(value) : escapeHtml(value);
  });
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
