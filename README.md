# Exlingo | Professional Interpretation Services Platform

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Client](https://img.shields.io/badge/Client-Professional_Services-blue)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)
![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Japanese-red)

> **Live Demo:** [(https://exlingo.com/)]

## 📖 Overview
Exlingo is a commercial web platform designed and deployed for a professional Japanese-English interpretation and translation business. 

The goal of this project was to digitize the client's business operations, moving from word-of-mouth referrals to a centralized digital presence. 
The platform serves as a portfolio of qualifications and a primary lead-generation funnel for new corporate clients.

## 🛠 Tech Stack
* **Frontend:** HTML5, JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **Infrastructure:** Netlify (CI/CD), GoDaddy (DNS Management)
* **Backend/API:** Resend API (Transactional Email)
* **Performance:** Semantic HTML for Accessibility (a11y) & SEO

## ☁️ Infrastructure & Deployment
Unlike a standard student project, Exlingo is a production-grade application with fully managed infrastructure:
* **DNS Management:** Configured custom domain records (A/CNAME) via **GoDaddy** to route traffic securely to the application.
* **Email API:** Integrated **Resend** (API-based email infrastructure) to handle transactional emails. This ensures high deliverability rates for client inquiries, bypassing standard SMTP limitations.
* **CI/CD Pipeline:** Deployed via **Netlify**. The site utilizes Continuous Deployment, automatically rebuilding and shipping production updates whenever code is pushed to the GitHub `main` branch.

## ⚡️ Key Features & Engineering Decisions

### 1. High-Performance Architecture
* Designed with a "Mobile-First" approach to accommodate international clients accessing the site on various devices.

### 2. Lead Generation Pipeline
* Integrated a contact form system that routes business inquiries directly to the client's email.
* Implemented client-side validation to reduce spam and ensure high-quality leads.

### 3. SEO Optimization (Search Engine Optimization)
* Structured the DOM with semantic tags (`<header>`, `<article>`, `<main>`) to maximize indexing by Google and Bing.
* Optimized meta tags and keywords for "Japanese Interpretation" to capture niche search traffic.

### 4. Internationalization (i18n) & Localization
* **Bi-Directional Support:** Engineered a fully bilingual experience (English/Japanese) to cater to the client's international customer base.
* **UTF-8 Encoding:** Ensured full support for Japanese Kanji/Kana characters across all browsers and devices without encoding errors.
* **User-Centric UX:** Implemented seamless language toggling that maintains user context and navigation flow.

## 📸 Preview<img width="1470" height="956" alt="Screenshot 2026-01-13 at 3 51 26 PM" src="https://github.com/user-attachments/assets/70197aab-262f-45de-853d-60b26890fda7" />


