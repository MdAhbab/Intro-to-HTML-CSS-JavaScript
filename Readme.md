# Intro to HTML, CSS, and JavaScript — Teaching Blog

Welcome! This repo is a hands-on learning site for beginners to build solid foundations in modern web development using HTML, CSS, and JavaScript. It documents my learning journey and curates clear, bite-sized pages with examples, explanations, and small practice ideas.

## What you'll learn

- HTML: semantic structure, forms, tables, media, links
- CSS: selectors, the box model, layout (Flexbox/Grid), responsive design, transitions
- JavaScript (new): language basics, variables & types, control flow, functions, DOM & events
- Practical best practices: accessibility basics, mobile-first responsiveness, clean code

## How to use this repository

1. Clone or download the project.
2. Open `index.html` in your browser and use the navigation to explore topics.
3. Try the examples, tweak the code snippets, and build the small practice projects listed on each page.

Tip: For a better local experience (live reload and correct relative paths), use a simple local server.

On Windows (PowerShell):

```powershell
# Option 1: Using Python 3
python -m http.server 5500
# then open http://localhost:5500/index.html

# Option 2: Using Node.js (if installed)
npx serve . -l 5500
```

## Site structure

- Root folder contains all HTML lessons and `styles.css` used site-wide.
- CSS topics live across pages like `css-intro.html`, `css-layout.html`, etc.
- New JavaScript section uses separate pages: `js-intro.html`, `js-variables.html`, `js-control-flow.html`, `js-functions.html`, `js-dom-events.html`.

## Contributing or extending

- Keep pages small and focused; prefer multiple short examples over one long block.
- Use semantic HTML and keep accessibility in mind (headings order, alt text, labels, contrast).
- Reuse the shared `header`, `nav`, and `footer` patterns and link `styles.css`.
- Test pages at mobile widths (≤ 400–600px) to ensure good readability and navigation.

## Acknowledgements

- Coursera: HTML, CSS, and JavaScript for Web Developers — Johns Hopkins University
- MDN Web Docs for language and browser APIs

## Helpful resources

- MDN HTML: https://developer.mozilla.org/docs/Web/HTML
- MDN CSS: https://developer.mozilla.org/docs/Web/CSS
- MDN JavaScript: https://developer.mozilla.org/docs/Web/JavaScript

Happy learning and building!

###### _Maintained by Ahbab with help from GPT-5 Thinking Model