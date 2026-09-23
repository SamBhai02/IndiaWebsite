# TechBait — IT Company Website

A multi-page marketing website (Home, About, Services, Process, Work, FAQ,
Contact, Careers) built with HTML5, SCSS and vanilla JavaScript.

## Structure

```
techbait/
├── index.html, about.html, services.html, process.html,
│   work.html, faq.html, contact.html, careers.html
├── css/main.css        ← compiled CSS (generated from scss/)
├── scss/                ← SCSS source (edit these, not css/main.css)
│   ├── _variables.scss  (colors, type scale, spacing)
│   ├── _mixins.scss
│   ├── _base.scss
│   ├── _buttons.scss
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _hero.scss
│   ├── _components.scss (cards, process steps, FAQ, forms, modal…)
│   ├── _animations.scss
│   └── main.scss        (entry point that imports the rest)
├── js/
│   ├── main.js          (nav toggle, scroll-reveal, FAQ accordion, marquee)
│   └── contact.js        (form validation + EmailJS send + success popup)
├── parts/                (HTML fragments used to assemble the pages — safe to ignore)
└── build_pages.py        (assembles the 8 HTML pages from parts/ — re-run after editing header/footer)
```

## Editing styles (SCSS)

The compiled `css/main.css` is generated from the files in `scss/`. Don't
edit `css/main.css` directly — edit the SCSS and recompile.

```bash
npm install        # installs the sass compiler (first time only)
npx sass scss/main.scss css/main.css --style=expanded --watch
```

Brand colors live in `scss/_variables.scss`:

```scss
$violet-deep: #3a185b;  // primary
$orange:      #e66608;  // accent
```

## Making the contact form actually send email

This is a static site (no backend server), so the form sends mail using
**EmailJS**, a service that delivers email straight from the browser.
Setup takes about 5 minutes and is free for low volume:

1. Create a free account at **https://www.emailjs.com**
2. Under **Email Services**, connect an email account (Gmail, Outlook, or
   your own SMTP) and note the **Service ID**.
3. Under **Email Templates**, create a template. Set the template's
   **"To email"** field to `support@techbait.co.in`, and use these variables
   in the template body: `{{from_name}}`, `{{from_email}}`, `{{phone}}`,
   `{{subject}}`, `{{message}}`. Note the **Template ID**.
4. Under **Account → General**, copy your **Public Key**.
5. Open `js/contact.js` and replace the three placeholders near the top:

   ```js
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

6. Open `contact.html` in a browser (or deploy the site) and submit the
   form — the message will arrive at `support@techbait.co.in`, and the
   visitor sees a "Message sent" popup automatically.

Until you add real keys, submitting the form will show a friendly error
telling you EmailJS still needs to be configured — the front end (layout,
validation, popup) all works immediately either way.

### Alternative: Formspree

If you'd rather not use EmailJS, you can swap in **Formspree**
(https://formspree.io) instead — create a form endpoint there, then change
the `<form>` tag in `contact.html` to `action="https://formspree.io/f/xxxxxx"
method="POST"` and remove/ignore `js/contact.js`'s EmailJS call. Either
service works without a custom backend.

## Regenerating the HTML pages

The 8 HTML pages are assembled from shared fragments in `parts/` (so the
header/footer only need to change in one place). After editing
`parts/header.html`, `parts/footer.html`, or any `parts/content-*.html`
file, rebuild with:

```bash
python3 build_pages.py
```

## Browser support & accessibility

- Responsive down to small mobile screens.
- Keyboard-focus styles on every interactive element.
- Respects `prefers-reduced-motion` (animations are disabled for users who
  request it).
- Semantic HTML with a skip-to-content link and ARIA attributes on the
  nav toggle, FAQ accordion and success modal.

## Deploying

This is a fully static site — drag the whole `techbait/` folder onto
Netlify, Vercel, GitHub Pages, or any static host, or upload it via FTP to
a regular web host. No server or database required.
# IndiaWebsite
