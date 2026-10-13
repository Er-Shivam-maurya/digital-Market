# 🏪 OneShop - Digital Market (Hyper-Local Digital Commerce Platform)

A full-stack, hyper-local commerce platform empowering neighborhood retail stores, supermarkets, farmers, and wholesale depots to establish their own digital storefronts with **zero order commissions** and a transparent monthly subscription model.

---

## 🌟 Key Highlights & Architecture

### 1. 🛍️ Customer Web App (`/customer` or `/`)
- **Hyper-Local Discovery**: Discovers verified neighborhood stores based on GPS location and customizable radius filter (2km - 50km).
- **Interactive Map View**: GPS map view of nearby shops and produce markets.
- **Dedicated Digital Shopfront**: Individual branded digital storefront for every shop with cover poster, logo badge, store announcement ticker, direct phone call hotline, and WhatsApp ordering.
- **Product Compare**: Compare product prices across multiple local shops.
- **Wholesale & B2B Mandi**: Direct farm produce and bulk procurement marketplace.
- **"Become a Seller" Onboarding Hub**: Step-by-step guidance, merchant registration, instant credentials display, and live onboarding status tracker.

### 2. 🏢 Shopkeeper ERP Portal (`/seller`)
- **Zero Commission Model**: Fixed low monthly store rent (e.g. ₹999/mo) instead of hefty percentage cuts.
- **Shop Profile & Media Customization**: Live preview editor for custom cover banner posters and avatar logos.
- **Catalog & Pricing Matrix**: Cost price, selling price, GST tax rates, and automatic net profit margin calculations.
- **Promotions & Flash Sales**: Create festival offers, discount labels, and flash sale banners.
- **Sales Analytics**: Weekly revenue bar charts and profit margin distribution.
- **Subscription Rent Management**: Rent due dates, online rent payments, and downloadable rent invoice receipts.

### 3. 🛡️ Master Admin Console (`/admin`)
- **Platform GMV & MRR Tracker**: Real-time Gross Merchandise Value and Monthly Recurring Rent collection metrics.
- **Merchant Verification Desk**: Audit KYC details, GSTIN, and approve/reject pending onboarding applications.
- **Fraud & Risk Console**: AI-assisted transaction anomaly and dispute risk monitoring.
- **Dispute Resolution**: Ticket management for customer and merchant inquiries.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router v6, Leaflet & React-Leaflet
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, In-Memory Mongo Support, JWT Authentication, Bcrypt.js
- **Design System**: Forest Green (`#0A4D2E`), Terracotta Coral (`#E05638`), and Warm Cream (`#F7F9F6`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Er-Shivam-maurya/digital-Market.git
cd digital-Market
```

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
*Backend runs on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 🔑 Default Demo Accounts

| Role | Email | Password | Portal URL |
|---|---|---|---|
| **Master Admin** | `admin@oneshop.com` | `password123` | `http://localhost:3000/admin` |
| **Merchant / Shopkeeper** | `merchant@oneshop.com` | `password123` | `http://localhost:3000/seller` |
| **Customer** | `customer@oneshop.com` | `password123` | `http://localhost:3000/customer` |

---

## 📄 License
This project is licensed under the MIT License.
