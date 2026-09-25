// ---------------------------------------------------------------------------
// Project details, written from the code in each GitHub repository.
// Used by the Projects section, the project detail view and the chatbot.
//
// `keywords` help the offline chatbot recognise which project a visitor is
// asking about — add words people are likely to type.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: 'ecommerce-chatbot',
    name: 'E-Commerce AI Chatbot',
    github: 'https://github.com/apeksha0463/e-commerce-chatbot',
    keywords: ['e-commerce', 'ecommerce', 'e commerce', 'shopping', 'yotmart', 'store', 'whatsapp shop'],
    summary:
      'A WhatsApp shopping chatbot built with Spring Boot that lets customers browse products, place orders and pay without leaving the chat.',
    overview:
      'A Spring Boot webhook service that powers a WhatsApp store assistant. Messages arrive through the AiSensy WhatsApp platform, and the bot guides each customer through a conversation — from browsing the catalogue to confirming an order — while talking to an e-commerce backend API for products, offers, orders and payments.',
    problem:
      'Customers who shop over WhatsApp usually have to message a person to see products, check prices and place an order, which is slow and hard to scale.',
    solution:
      'A conversation flow modelled as a state machine that tracks where each user is (menu, categories, products, order details, payment, confirmation), validates their input, and creates the order and payment link automatically.',
    technologies: ['Java 17', 'Spring Boot', 'REST APIs', 'Spring Retry', 'Resilience4j', 'Jackson', 'Maven', 'Docker', 'AiSensy (WhatsApp)'],
    features: [
      'Browse categories, sub-categories and products as WhatsApp image carousels, with a text fallback',
      'Product details with discounted prices and active offers',
      'Guided checkout: name, 6-digit pincode and address validation',
      'Payment choice of Cash on Delivery, UPI or online, with payment links generated through the backend',
      'Stock is re-checked before an order is created',
      'Per-user conversation sessions with automatic idle-session cleanup',
      'Retries with exponential backoff and a circuit breaker around backend API calls',
      'Health checks with Spring Actuator; containerised with Docker and Docker Compose',
    ],
  },
  {
    id: 'vazraa-website',
    name: 'Vazraa Website',
    github: 'https://github.com/apeksha0463/vazraa-website',
    keywords: ['vazraa website', 'vazraa web', 'cab booking website', 'mobility website', 'booking platform'],
    summary:
      'A cab booking website for Vazraa Mobility, with a Node.js/Express and MongoDB backend, role-based logins, online payments and a Dockerised deployment.',
    overview:
      'The public website and booking platform for Vazraa Mobility. Customers can sign up, book rides, pay and view their ride history; drivers and admins have their own flows. A central Node.js/Express API serves both the website and a WhatsApp chatbot integration.',
    problem:
      'A cab service needs one platform where customers can book and pay for rides, drivers can manage trips, and admins can oversee bookings, users and drivers.',
    solution:
      'A static HTML/CSS/JavaScript frontend backed by a layered Express API (routes, controllers, services, repositories) on MongoDB, deployed with Docker Compose behind an Nginx reverse proxy.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Swagger', 'Cashfree', 'Docker', 'Nginx'],
    features: [
      'Pages for home, about, contact, sign-up/login, booking, payment, booking confirmation and "My Rides"',
      'Customer and driver onboarding flows',
      'JWT authentication with separate customer, driver and admin roles; passwords hashed with bcrypt',
      'Booking lifecycle: create, track, cancel; drivers accept, start (with OTP) and complete rides',
      'Admin endpoints for dashboard stats, users, drivers and bookings',
      'Online payments through Cashfree and a webhook for the AiSensy WhatsApp chatbot',
      'Request validation, Helmet security headers, rate limiting and compression',
      'Interactive API documentation with Swagger',
      'Docker Compose setup with Nginx serving the frontend and proxying the API',
    ],
  },
  {
    id: 'vazraa-chatbot',
    name: 'Vazraa Chatbot',
    github: 'https://github.com/apeksha0463/vazraa-chatbot',
    keywords: ['vazraa chatbot', 'vazraa bot', 'cab chatbot', 'ride chatbot', 'brightcab', 'fleet', 'whatsapp cab'],
    summary:
      'A WhatsApp ride-booking chatbot and fleet-management platform for Vazraa Mobility, built with a Spring Boot backend and a React + TypeScript frontend.',
    overview:
      'A cab booking and fleet-management application with separate interfaces for admins, super admins, customers and drivers. Its Spring Boot backend includes a WhatsApp chatbot that lets customers book and manage rides — and drivers register — entirely through WhatsApp.',
    problem:
      'Booking a cab usually means installing an app. Many customers would rather book on WhatsApp, and operators need tools to manage the drivers, rides and payments that come from it.',
    solution:
      'A conversational WhatsApp flow (through AiSensy) backed by a Spring Boot API with MongoDB, plus a React dashboard where admins manage drivers, rides, payments and the bot itself.',
    technologies: ['Java 17', 'Spring Boot', 'Spring Security', 'MongoDB', 'JWT', 'WebSocket (STOMP)', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js / Express', 'Docker'],
    features: [
      'WhatsApp ride booking: share pickup and drop (location pin, text or Google Maps link), choose a vehicle, see the fare and confirm',
      'Payment links through Cashfree, ride tracking, cancellation and post-ride ratings in the chat',
      'Standalone fare estimates and a support option from the WhatsApp menu',
      'Driver registration over WhatsApp, including uploads of selfie, Aadhaar, licence, RC and vehicle photos',
      'Admin dashboard for drivers, customers, rides, payments, complaints, reports, notifications and live tracking',
      'Super-admin tools for admins, roles, cities, pricing, promotions and audit logs',
      'Customer and driver apps for booking, active rides, wallet and earnings',
      'Real-time updates over WebSockets and JWT-secured REST APIs',
      'Cloudflare Worker relay for forwarding WhatsApp API calls',
    ],
  },
  {
    id: 'fraud-detection',
    name: 'Fraud Detection',
    github: 'https://github.com/apeksha0463/internship-project-1-fraud-detection',
    keywords: ['fraud', 'anomaly', 'isolation forest', 'credit card', 'local outlier', 'outlier', 'internship project'],
    summary:
      'An internship machine learning project that detects fraudulent credit card transactions with unsupervised anomaly detection.',
    overview:
      'A Jupyter Notebook project that compares two unsupervised anomaly-detection models — Isolation Forest and Local Outlier Factor — on the public Kaggle Credit Card Fraud Detection dataset, then tunes the decision threshold.',
    problem:
      'Fraud is rare, so transaction data is highly imbalanced and labelled fraud examples are scarce, which makes ordinary supervised classifiers unreliable.',
    solution:
      'Learn what normal transactions look like and flag outliers. Features are scaled with RobustScaler, both models are trained on normal transactions, and the known fraud labels are used only to evaluate the results.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    features: [
      'Exploratory data analysis: class balance, transaction amounts and feature correlations',
      'Preprocessing with RobustScaler to reduce the influence of outliers',
      'Isolation Forest and Local Outlier Factor models, compared side by side',
      'Evaluation with precision, recall, F1-score, PR-AUC and ROC-AUC, plus confusion matrices',
      'Precision-recall and ROC curves, and threshold tuning across score percentiles',
      'In this evaluation Isolation Forest performed clearly better (ROC-AUC 0.948 vs 0.674 for LOF)',
      'Saved model and scaler files for reuse',
    ],
  },
]
