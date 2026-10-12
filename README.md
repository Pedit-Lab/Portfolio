# PEDIT Lab Portfolio

PEDIT Lab's responsive portfolio and service-ordering website, built with React,
TypeScript, and Vite. It presents the studio's software, AI, cloud, IoT, design,
and university project-support services.

## Features

- Full-screen video introduction followed by the hero reveal animation
- Responsive portfolio sections with desktop section-transition effects
- Service detail modals linked to the standard pricing catalogue
- University Project Support with a separate student pricing catalogue
- Context-aware pricing wizard with plans, add-ons, totals, and delivery estimates
- Checkout fields for a project brief, supporting document, and Figma/design URL
- Contact and checkout enquiries delivered through EmailJS
- WhatsApp enquiry and order links
- Animated FAQ accordion
- Dark and light themes
- Responsive desktop, tablet, and mobile layouts

## Requirements

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm (included with Node.js)

## Local development

```bash
git clone https://github.com/Pedit-Lab/Portfolio.git
cd Portfolio
npm ci
cp .env.example .env.local
npm run dev
```

On Windows Command Prompt, use `copy .env.example .env.local` instead.
Open the local URL printed by Vite, usually <http://localhost:5173/>.

## Environment configuration

All browser-visible configuration uses variables prefixed with `VITE_`. Never
put Gmail passwords, private API keys, or database credentials in these values.

```env
VITE_APP_NAME="PEDIT Lab - Software, Design, Cloud, IoT & AI"
VITE_COMPANY_EMAIL="youraddress@gmail.com"
VITE_COMPANY_PHONE="+94 77 032 6202"
VITE_WHATSAPP_NUMBER="94770326202"
VITE_COMPANY_LOCATION="Colombo, Sri Lanka"

VITE_EMAILJS_SERVICE_ID="service_xxxxxxx"
VITE_EMAILJS_TEMPLATE_ID="template_xxxxxxx"
VITE_EMAILJS_PUBLIC_KEY="your_emailjs_public_key"
```

The WhatsApp number must include the country code without `+`, spaces, or
punctuation. Restart the development server after changing environment values.

## EmailJS and Gmail setup

The Contact Us and pricing checkout forms use EmailJS. Direct Gmail SMTP
credentials must not be placed in frontend code.

1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Open **Email Services**, add Gmail, and connect the receiving account.
3. Copy its Service ID into `VITE_EMAILJS_SERVICE_ID`.
4. Open **Email Templates** and create a template for website enquiries.
5. Copy its Template ID into `VITE_EMAILJS_TEMPLATE_ID`.
6. Open the EmailJS account settings and copy the Public Key into
   `VITE_EMAILJS_PUBLIC_KEY`.
7. Configure the template fields as follows:

```text
To Email: {{to_email}}
Reply-To: {{reply_to}}
```

Useful template variables include:

```text
{{inquiry_type}}
{{user_name}}
{{user_email}}
{{user_phone}}
{{user_whatsapp}}
{{service_name}}
{{budget}}
{{package_name}}
{{addons}}
{{total_price}}
{{duration}}
{{message}}
{{figma_link}}
{{document_name}}
```

The checkout currently includes the selected document's filename in the email
and WhatsApp message. Browsers cannot automatically attach a local file to a
WhatsApp URL, so the customer is asked to attach it after the chat opens.

## Pricing routes

- `/pricing` — standard business-service catalogue
- `/pricing?service=software` — opens a selected standard service
- `/pricing?audience=student` — university/student-support catalogue

Returning from standard pricing leads back to the Services section. Returning
from student pricing leads back to University Project Support without replaying
the opening video.

## Project structure

```text
src/components/    Portfolio sections, modals, navigation, and visual effects
src/pages/         Pricing wizard page and styles
src/data/          Standard and student pricing catalogues
src/config/        Public environment configuration
src/hooks/         Scroll, visual-motion, and section-transition logic
public/visuals/    Static website artwork
```

## Commands

```bash
npm run dev      # Start the Vite development server
npm run lint     # Run Oxlint
npm run build    # Type-check and build production files into dist/
npm run preview  # Preview the production build locally
```

## Production deployment

Run `npm run build` and deploy the generated `dist/` directory. Configure the
same `VITE_` environment variables in the hosting provider before building.
The included Netlify redirect configuration supports client-side routes such as
`/pricing`.
