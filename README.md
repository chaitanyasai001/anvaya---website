# ANVAYA Website Prototype

A responsive, front-end prototype for ANVAYA — a community-powered agricultural ecosystem connecting farmers, supporters/investors, and customers.

## Features

- Responsive landing page and marketplace showcase
- Farmer portal: submit interest in shared equipment, inputs, infrastructure or produce listings
- Investor/supporter portal: view sample community projects and register interest
- Customer portal: submit individual or bulk produce requests
- Admin demo portal: view submissions saved in the current browser
- Browser `localStorage` persistence for prototype submissions

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

No build tools are required.

## Publish with GitHub Pages

1. Create a GitHub repository named `anvaya-website`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. Your URL will be shown in the Pages settings.

## Important prototype limitations

This is a front-end demonstration, not a production marketplace. Data is stored only in the visitor's browser and is not shared between users or devices. There is no real login, backend database, payment processing, order fulfilment, identity verification, or secure admin authorization.

The supporter/investor area is informational only. It does not accept funds, issue securities, or promise returns. Before enabling any real investment or contribution model, obtain qualified legal, financial, tax and regulatory advice in each operating country.

For production, add a secure backend, database, authentication, role-based access control, input validation, privacy policy, terms, seller verification, logistics, and payment integrations appropriate to each market.

## Customization

- Edit product examples and images in `app.js`.
- Change colours, typography and layout in `style.css`.
- Update homepage content and sections in `index.html`.
