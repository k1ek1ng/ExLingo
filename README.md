# Exlingo

A bilingual (English and Japanese) website for a Japanese-English interpretation
business, built for a real client. Live at [exlingo.com](https://exlingo.com/).

The client got all her work through referrals and had no website. She needed a
page showing her credentials and a way for new clients to contact her, so I kept
it a static site.

## How it's built

Static HTML with Tailwind and one Netlify function. Pushing to `main` deploys it.

- **Two languages, one page.** Both languages live in `index.html` and a toggle
  switches between them, so there's only one site to maintain.
- **Contact form.** Submissions go to a Netlify function that emails the client
  through Resend from her own domain.
- **Domain.** Registered on GoDaddy and pointed at Netlify.

## The contact form

It took five tries to get working: Netlify Forms, a `mailto:` link, an inline
`onclick`, and a debug version full of console logs. The actual bug was simple.
The script ran before the form existed on the page, and wrapping it in
`DOMContentLoaded` fixed it. While the form was broken, the site showed a note
asking visitors to email directly, so no inquiries got lost.

Later I went back and found two security problems in my own code. The message
was inserted into the email as raw HTML, and anyone could call the function in a
loop to flood the client's inbox. The function now escapes all input, only
accepts requests from the live site, limits field lengths, and uses a hidden
honeypot field to drop bot submissions. It still has no real rate limit. That
would need a CAPTCHA.

## Layout

```
index.html               # the site, both languages
netlify/functions/
  send-email.js          # contact form -> Resend
privacy.html terms.html
netlify.toml
```
