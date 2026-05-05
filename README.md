# F32Lab

Official website of **F32Lab** — custom data automation services for individuals and businesses in Switzerland.

## Services

- **DataFilo** - Automatic download of data and files from websites (public or login-protected), delivered by email in CSV, Excel, JSON or PDF.
- **AlertFilo** - Monitor any change on a website: new files published, data updates, price changes, etc.

## Project structure

```
f32lab.github.io/
├── index.html          # Auto-redirect based on browser language
├── it/                 # Italian version
│   ├── index.html
│   ├── datafilo.html
│   ├── alertfilo.html
│   └── contatto.html
├── en/                 # English version
│   ├── index.html
│   ├── datafilo.html
│   ├── alertfilo.html
│   └── contact.html
├── css/
│   ├── base.css        # Reset, variables, typography, shared components
│   ├── nav.css         # Navigation, footer, language switcher
│   └── pages.css       # Page-specific styles + responsive
└── js/
    ├── main.js         # Active nav, hamburger menu, language detection
    └── contact.js      # Contact form handler
```

## How language switching works

- `index.html` at the root detects the browser language and redirects to `/it/` or `/en/` automatically.
- Each page has an **IT / EN** switcher in the nav that links to the equivalent page in the other language.
- On mobile, the language switcher appears inside the hamburger menu drawer.

## Deploy on GitHub Pages

1. Create a repo named `yourusername.github.io`
2. Upload all files keeping the folder structure
3. Go to **Settings → Pages → Branch: main → Save**
4. Site is live at `https://yourusername.github.io`

## Connect the contact form (Formspree)

The form is ready to connect to [Formspree](https://formspree.io) (free up to 50 requests/month):

1. Sign up at formspree.io
2. Create a form and copy your endpoint ID (e.g. `xpwzabcd`)
3. Open `js/contact.js`
4. Uncomment **Option A** and replace `YOUR_FORMSPREE_ID` with your ID
5. Remove the **Option B** demo line

## Tech

- Semantic HTML5
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (no external dependencies)
- Fonts: Syne, DM Mono, Lora via Google Fonts
