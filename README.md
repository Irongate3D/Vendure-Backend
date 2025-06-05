# 📺 Vendure Backend

A modern headless ecommerce backend built with [Vendure](https://www.vendure.io/), using PostgreSQL, Stripe payments, and email notifications.

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/Irongate3D/Vendure-Backend.git
cd Vendure-Backend
```

### 2. Create your environment config

Copy the `.env.example` file and add your secrets (e.g., DB password, Stripe keys).

```bash
cp .env.example .env
```

### 3. Start PostgreSQL via Docker

```bash
docker-compose up -d
```

### 4. Install dependencies and run the development server

```bash
npm install
npm run dev
```

This will start the Vendure server and worker processes.

* Admin UI: [http://localhost:3000/admin](http://localhost:3000/admin)
* Shop API: [http://localhost:3000/shop-api](http://localhost:3000/shop-api)
* Admin API: [http://localhost:3000/admin-api](http://localhost:3000/admin-api)
* Dev Mailbox: [http://localhost:3000/mailbox](http://localhost:3000/mailbox)

---

## 🧪 Test Payments (Dummy)

By default, the system is configured to use the `dummyPaymentHandler` for safe local testing.

You can later switch to Stripe by updating your payment config and environment variables.

---

## 🧵 Seeding Sample Data (coming soon)

We’ll add a script for:

* Creating sample products
* Populating collections
* Testing Stripe flows

---

## 🧠 Notes

* **Do not commit your real `.env` file.** It is excluded by `.gitignore`.
* Be sure to replace all placeholder values (e.g. `noreply@example.com`) with real values when going to production.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/thing`)
3. Commit your changes
4. Push and open a PR

---

## 📄 License

MIT
