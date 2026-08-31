# Exlingo

A bilingual site for a Japanese-English interpretation business, built and
deployed for a real client. Live at [exlingo.com](https://exlingo.com/).

The client ran on word-of-mouth referrals and had no web presence. The site is a
credentials page and a contact funnel — that is the whole scope, and the scope is
the reason it is a static site rather than an application.

## Build

Static HTML with Tailwind, one Netlify function, deployed from `main` on push.

- **Bilingual (EN/JA)** — both languages are in the page and toggled client-side,
  so a Japanese visitor lands on Japanese content at the same URL rather than a
  redirect or a second site to maintain. The client updates copy in one file.
- **Contact form** — posts to a Netlify function that sends through Resend from
  the verified domain. Inquiries reach a business inbox instead of a `mailto:`
  the client would have to notice.
- **DNS** — custom domain on GoDaddy pointed at Netlify.

## The contact form took five tries

Worth recording, since it is most of this repo's history. The form went through a
Netlify-forms version, a `mailto:` version, an inline `onclick` version, and a
debug version with element validation and console logging before the working one.
The bug that actually mattered was the least interesting: the script ran before
the form existed in the DOM. Wrapping it in `DOMContentLoaded` fixed it.

While it was broken the site carried a visible notice telling visitors to email
directly, because a contact form that silently drops inquiries is worse for a
referral business than no form at all.

## Layout

```
index.html               # the site, both languages
netlify/functions/
  send-email.js          # contact form -> Resend
privacy.html terms.html
netlify.toml
```
