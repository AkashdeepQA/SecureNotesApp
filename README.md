# 🔩 Secure Notes App (Practice Demo Application)

A practice demo web-based note-taking application built using **Node.js**, **Express**, and **SQLite**, designed to demonstrate **secure coding practices** against common web vulnerabilities like **XSS**, **IDOR**, and **input injection**.

## 🔐 Key Features

* User authentication with session management
* Add, view, edit, and delete personal notes
* Protection against:

  * Cross-Site Scripting (XSS)
  * Insecure Direct Object References (IDOR)
  * SQL Injection
* Toggle secure mode via `.env` to test with and without protections

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templates)
* **Database:** SQLite
* **Security Tools:**

  * `sanitize-html` – for HTML sanitization
  * `he` – for HTML entity encoding (alternative to sanitization)
  * Express middleware – for session & auth

---

## 📁 Folder Structure

```
SecureNotesApp/
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS)
├── db.js              # SQLite DB connection & schema
├── app.js             # Entry point
├── routes/            # Express routes (notes, auth)
├── .env               # Secure mode toggle
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/secure-notes-app.git
   cd secure-notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file:

   ```
   SECURE_MODE=true
   ```

4. **Run the app**

   ```bash
   node app.js
   ```

5. Open browser at: [http://localhost:3000](http://localhost:3000)

---

## 🔄 Secure Mode Toggle

The app reads from `.env`:

```bash
SECURE_MODE=true   # Enable secure coding defenses
SECURE_MODE=false  # Disable protections (for demo/testing)
```

Depending on this, the app will:

* Sanitize or encode HTML content
* Prevent or allow unsafe note access
* Show how improper input handling can lead to security flaws

---

## ✍️ Sample Attack Demo Inputs

| Type | Input                           | Result (Secure Mode: ON)   |
| ---- | ------------------------------- | -------------------------- |
| XSS  | `<script>alert('XSS')</script>` | Encoded or stripped        |
| IDOR | Changing `/note/3` to `/note/4` | Access denied              |
| SQLi | `' OR '1'='1`                   | Query safe & parameterized |

---

## 🧚‍ Ideal For

* Security training sessions
* Hands-on demo for OWASP Top 10 risks
* Classroom teaching on web app vulnerabilities
* Learning secure Express.js practices

---

## 📜 Acknowledgements

This app was created as part of a **Secure Coding Principles** demo session to showcase real-world implications of secure and insecure code paths.

---

## 📌 License

This project is open source and available under the [MIT License](LICENSE).
