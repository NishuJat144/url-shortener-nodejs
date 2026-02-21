# 🔗 URL Shortener (Node.js)

A simple and fast **URL Shortener Web Application** built using **pure Node.js (without Express)**.
This project allows users to create custom short links and automatically redirect to the original URL — similar to services like Bitly.

---

## 🚀 Features

✅ Create short URLs with custom shortcode
✅ Automatic redirection to original link
✅ Persistent storage using JSON file
✅ Fetch & display all shortened links on UI
✅ Duplicate shortcode protection
✅ Clean frontend UI (HTML + CSS)
✅ Built using core Node.js modules (no frameworks)

---

## 🧠 What I Learned

This project helped me understand:

* HTTP Server creation using Node.js
* Request & Response lifecycle
* REST API basics
* GET vs POST handling
* File system operations (`fs/promises`)
* JSON data persistence
* Redirect responses (302 status code)
* Frontend ↔ Backend communication using `fetch()`

---

## 🛠️ Tech Stack

* **Backend:** Node.js (http module)
* **Frontend:** HTML, CSS, JavaScript
* **Storage:** Local JSON file
* **Modules Used:**

  * `http`
  * `fs/promises`
  * `crypto`
  * `path`

---

## 📂 Project Structure

```
url-shortener/
│
├── data/
│   └── links.json        # Stored URLs
│
├── index.html            # Frontend UI
├── style.css             # Styling
├── server.js             # Main server
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2️⃣ Run the server

```bash
node server.js
```

### 3️⃣ Open in browser

```
http://localhost:3000
```

---

## 🔄 How It Works

1. User enters a URL and custom shortcode.
2. Frontend sends a POST request to `/shorten`.
3. Server stores data inside `links.json`.
4. All links are fetched using `/links` API.
5. Visiting `localhost:3000/<shortcode>` redirects to the original URL.

---

## 📸 Example

```
Original URL:
https://example.com

Short URL:
http://localhost:3000/ex
```

Opening the short URL automatically redirects to the original website.

---

## ⚠️ Notes

* Browser may request `/favicon.ico` automatically — this is normal behavior.
* Data is stored locally, so restarting the server keeps saved links.

---

## 🌱 Future Improvements

* Click analytics
* Link expiration
* Authentication system
* Database integration (MongoDB)
* QR code generation
* Deployment support

---

## 👨‍💻 Author

**Yogesh Singh (Nishu Jaat)**

Learning backend development step-by-step through real projects 🚀

---

## ⭐ Support

If you like this project, consider giving it a **star ⭐** on GitHub!
