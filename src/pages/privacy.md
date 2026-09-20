---
layout: ../layouts/LegalLayout.astro
title: Privacy Policy
description: What personal data API Circle collects for accounts, licences and billing, why, who we share it with, how long we keep it, and your rights. Your source code stays on your machine.
document: privacy
---

This Privacy Policy explains how **{{LEGAL_NAME}}**, trading as {{TRADING_NAME}} (**"API Circle"**, **"we"**, **"us"**), collects and uses personal data. It also explains the choices and rights you have.

## 1. The short version

- **Your source code stays on your machine.** API Circle Lens analyses your repositories locally. We never receive your code, file paths, symbol names or analysis results.
- **We collect what an account, a licence and a subscription need:** your email address, your plan, your devices and keys, and security records.
- **We never see your card.** Payments are handled by our reseller, Paddle, as merchant of record.
- **We do not sell your personal data.** We do not use it for advertising, and we do not collect telemetry from the Lens apps.
- **You can see, correct, export and delete your data,** mostly from your own account. See section 11.

## 2. Who we are and how to reach us

The controller of your personal data (the "data fiduciary" under India's Digital Personal Data Protection Act, 2023) is:

**{{LEGAL_NAME}}**, {{ENTITY_DESCRIPTION}}, of {{ADDRESS}}.

- **Email:** [{{SUPPORT_EMAIL}}](mailto:{{SUPPORT_EMAIL}})
- **Grievance Officer:** {{GRIEVANCE_OFFICER_NAME}}, [{{GRIEVANCE_OFFICER_EMAIL}}](mailto:{{GRIEVANCE_OFFICER_EMAIL}})
- **EU representative (GDPR Art. 27):** {{EU_REPRESENTATIVE}}
- **UK representative (UK GDPR Art. 27):** {{UK_REPRESENTATIVE}}

## 3. What this policy covers

This policy covers:

- our website, `apicircle.dev`;
- your API Circle account and the account site, `account.apicircle.dev`;
- our account and licensing service, `api.apicircle.dev`; and
- the account and licensing features of the API Circle Lens desktop app, the Visual Studio Code extension, the `apicircle-lens` command-line interface and the Lens MCP server.

**It does not cover** the open-source API Circle Studio web app at `studio.apicircle.dev` or the open-source Studio packages. Those run entirely on your device and have their own [privacy policy](https://github.com/apicircle/studio/blob/main/PRIVACY.md).

It also does not cover third-party services you choose to connect, such as your AI provider or your code host. Their own policies apply.

## 4. What we collect, why, and on what legal basis

We collect personal data from you when you create and use an account. We also receive some from the services that sign you in and take your payment.

| Data | Examples | Why we use it | Legal basis (EU/UK) |
| --- | --- | --- | --- |
| **Account** | Email address, account ID, how you sign in (email link, single sign-on), whether your email is verified, whether you have set up an authenticator, sign-in times | To create and secure your account and sign you in | Contract |
| **Subscription and billing** | Plan, subscription status, billing period, renewal date, number of seats, Paddle customer and subscription IDs. **Not** card details. | To provide the plan you pay for and apply its limits, and to keep accounting records | Contract; legal obligation |
| **Agreements** | Which version of the Terms and Privacy Policy you accepted, and when. Your agreement to a subscription's renewal terms: plan, price, time and your IP address truncated to its network | Evidence of our contract with you, and compliance with consumer and automatic-renewal law | Contract; legal obligation; legitimate interests (establishing and defending legal claims) |
| **Licences, devices and keys** | Seat assignments; device activations and the device's name (your computer's hostname); command-line (CLI) key names, a one-way hash of each key, and when keys were created, last used and revoked; counts of how often paid features are used | To issue and check licences, enforce plan limits and prevent misuse | Contract; legitimate interests (preventing licence abuse) |
| **Teams and single sign-on** | Organisation membership and roles; the email addresses of people invited to a Team; your organisation's SSO settings (issuer, client ID, endpoints, encrypted client secret); verified domains | To run Team plans and single sign-on | Contract; legitimate interests of the organisation |
| **Security records** | Sign-ins, session activity, and account, billing and administrative actions, each with your IP address truncated to its network (/24 for IPv4, /48 for IPv6) | To keep the service secure, investigate incidents and prevent fraud | Legitimate interests (security) |
| **Support** | What you tell us when you email us | To answer you | Contract; legitimate interests |

**India.** Under the Digital Personal Data Protection Act, 2023 we process your personal data:

- on the basis of your consent, which you give by using the Services after being shown this policy; or
- for purposes the Act treats as legitimate uses, such as where you have voluntarily provided the data for a specified purpose.

You may withdraw your consent at any time (section 11). If you do, we will not be able to provide the parts of the Services that need that data.

**No automated decisions.** We do not make decisions about you based solely on automated processing that have legal or similarly significant effects. We do not profile you for advertising.

## 5. Your source code and the tools you connect

This part of the product is different in kind, so it gets its own section.

**Where your code is processed.** API Circle Lens runs on your own machine. That covers the desktop app, the command-line interface, the Visual Studio Code extension and the MCP server. Indexing, endpoint discovery, drift analysis against an OpenAPI specification and scaffolding all read and write files **locally**.

Our servers receive **no repository content, file paths, symbol names, endpoint definitions or analysis results**. The only calls the Lens apps make to us are licensing calls: checking a licence or CLI/MCP key, and counting how often a paid feature was used. Neither contains anything taken from your code. The Lens apps collect no analytics or telemetry.

**Transfers you start.** Each of the flows below is off until you start it. Each sends data **directly from your machine to a third party you chose**, under your own account and your own agreement with them. We are not in the path and keep no copy.

- **AI providers you connect with your own key** (such as Anthropic, OpenAI or Google Gemini). The AI Assistant and the optional AI indexing pass send prompts to the provider whose key you supplied. Prompts can include file contents the model asks for, file listings, symbol names and the endpoints already found. The indexing pass sends whole files, truncated at 20,000 characters each. What the provider then does with it is governed by that provider's terms. Please review them before connecting a key.
- **Your editor's language model** (for example, GitHub Copilot in Visual Studio Code). "Analyze with AI" sends an endpoint's method and path, candidate symbol names and their file paths. It does not send file contents. That extension's terms apply.
- **Your code host** (GitHub, GitLab, Bitbucket or Azure DevOps). Using a token you provide, and only for repositories that token can already reach, the product can:
  - clone a repository and read files;
  - post review comments, which contain endpoint paths, field and parameter names, and drift findings; and
  - create branches and commit files, when you ask it to.
- **AI assistants you connect to the Lens MCP server.** The server runs locally and returns what the connected assistant asks for, which can include source code. That assistant's provider's terms apply.

The tokens and keys you connect for these services are stored on your machine and are **never sent to us**.

**What is written into your repository.** The Code graph is saved in your repository, in the `.apicircle` folder, so that it is versioned with your code. The absolute path of the machine that built it is replaced before anything is written.

Schemas you verify by hand keep an audit trail of who changed what and when. "Who" is recorded as a pseudonym (a one-way hash of your account ID), not your name or email. It is still personal data, and it becomes part of your repository's history, which we cannot reach or delete.

**Who is responsible.** Because your code never reaches us, you remain its sole controller. Where you choose to send it, the recipient's terms govern what happens next.

## 6. Payments and Paddle

Our reseller, Paddle.com, is the merchant of record for all our orders. When you subscribe, Paddle collects your payment details, billing name and address, calculates tax, takes payment and issues invoices. Paddle does this as an **independent controller** under its own [privacy notice](https://www.paddle.com/legal/privacy).

We give Paddle your email address and your account ID, and your agreement to the subscription's renewal terms, so it can link the subscription to your account. Paddle tells us the status of your subscription. **We never receive your full card number.**

## 7. Who we share personal data with

We share personal data only as described here. **We do not sell personal data**, and we do not share it for cross-context behavioural advertising.

**Service providers** that process data for us, under contracts that require them to protect it:

| Provider | What they do for us | Data involved |
| --- | --- | --- |
| Google (Firebase Authentication / Identity Platform) | Signs you in, sends sign-in emails, stores authenticator setup, connects Team single sign-on | Email address, sign-in method, verification and authenticator status, sign-in times |
| Cloudflare | Hosts our services and database; protects them from attack | Account, subscription, licence and security data |
| Resend | Sends some transactional emails, such as trial licences | Email address, email content |

**Also:**

- **Paddle,** as an independent controller for payments (section 6).
- **Your organisation.** If you hold a seat in a Team, its administrators can see your email address, your role, and whether and on which devices your seat is activated.
- **Your identity provider,** if your organisation uses single sign-on.
- **Professional advisers and authorities,** where the law requires it or where it is needed to establish, exercise or defend legal claims.
- **A buyer or successor,** if our business is reorganised or sold. They will be bound by this policy.

## 8. International transfers

We are based in India. Our database is hosted by Cloudflare in the Asia-Pacific region. Our sign-in provider stores data in {{FIREBASE_LOCATION}}. Paddle, Resend and Google may process data in other countries, including the United States and the United Kingdom.

Where EU or UK law applies to a transfer, we rely on appropriate safeguards, such as the European Commission's Standard Contractual Clauses and the UK's International Data Transfer Addendum, included in our providers' data processing terms. Under India's DPDP Act, we transfer data only to countries that the Government of India has not restricted.

## 9. How long we keep personal data

| Data | How long |
| --- | --- |
| Account data | While your account exists. Removed when you delete your account, except as below. |
| Subscription and billing records | For the life of your account, and afterwards for as long as tax and accounting law requires. Paddle keeps its own records as merchant of record. |
| Agreements (acceptance of Terms, and subscription renewal agreements) | For the life of our contract with you, plus the period in which legal claims can be brought. |
| Security records | 400 days |
| Device, seat and CLI key records | Until revoked, or until you delete your account |
| Support emails | For as long as needed to deal with your request, then deleted |

**Deleting your account does not cancel a paid subscription.** Please cancel your subscription first. Deleting your account also cannot reach data you control elsewhere: your repositories (including the `.apicircle` folder and its history), or anything you sent to an AI provider.

## 10. How we protect personal data

We use technical and organisational measures appropriate to the risk. These include:

- encryption in transit;
- field-level encryption of email addresses and SSO secrets;
- storing only one-way hashes of keys and tokens where possible;
- truncating IP addresses;
- optional two-step verification, and step-up sign-in for sensitive actions;
- rate limiting, access controls and audit logging.

No system is perfectly secure. If a breach affects your personal data, we will notify you and the relevant authorities as the law requires.

## 11. Your rights

Depending on where you live, you may have the right to:

- **access** your personal data and receive a copy (portability);
- **correct** or complete it;
- **delete** it;
- **restrict** or **object** to our use of it, including where we rely on legitimate interests;
- **withdraw consent**, where we rely on consent, at any time and without affecting earlier processing; and
- **complain** to a supervisory authority.

**In your account.** You can export your account data and delete your account from the **Security** section of your account. You can update your email address, revoke devices and CLI keys, and see which version of the terms you accepted.

**By email.** For anything else, email [{{SUPPORT_EMAIL}}](mailto:{{SUPPORT_EMAIL}}). We may need to confirm your identity before acting. We respond within the time the law allows, which is one month under the GDPR.

**India.** Under the DPDP Act you also have the right to:

- obtain a summary of your personal data and how it is processed;
- have it corrected, completed, updated or erased;
- nominate someone to exercise your rights if you die or become incapacitated; and
- have your grievances addressed by our Grievance Officer (section 2).

If you are not satisfied with our response, you may complain to the Data Protection Board of India.

**EU and UK.** You may complain to your local data protection authority. In the UK, this is the Information Commissioner's Office.

**United States.** Depending on your state, you may have the right to know, access, correct and delete your personal information, and not to be discriminated against for exercising these rights. We do not sell personal information, do not share it for targeted advertising, and do not use sensitive personal information to infer characteristics about you.

## 12. Cookies and similar technologies

**Our website (`apicircle.dev`)** uses:

- Your browser's local storage, to remember your light or dark theme.

We use no advertising or analytics cookies on our website. You can block or delete cookies in your browser settings.

**The account site** uses only what it needs to work:

- a secure session cookie (`__Host-apicircle_account_refresh`) and an anti-forgery cookie (`__Host-apicircle_account_csrf`);
- browser storage for your signed-in session (including by Google's sign-in service), your theme, an email change in progress, and a plan you picked on our pricing page (kept for up to 24 hours).

These are strictly necessary and are not used for tracking.

**Checkout.** Paddle's checkout sets its own cookies, under Paddle's cookie policy.

## 13. Children

The Services are for adults and are not directed at children. You must be at least 18 to create an account. We do not knowingly collect personal data from children. If you believe a child has given us personal data, contact us and we will delete it.

## 14. Changes to this policy

We may update this policy from time to time. Each version is dated and numbered at the top of this page.

If we make a material change, we will tell you by email or in your account before it takes effect. Where required, we will ask you to review the new version.

## 15. Contact us

- **Email:** [{{SUPPORT_EMAIL}}](mailto:{{SUPPORT_EMAIL}})
- **Post:** {{LEGAL_NAME}}, {{ADDRESS}}
- **Grievance Officer:** {{GRIEVANCE_OFFICER_NAME}}, [{{GRIEVANCE_OFFICER_EMAIL}}](mailto:{{GRIEVANCE_OFFICER_EMAIL}})
