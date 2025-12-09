const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 建立 SQLite 資料庫
const db = new sqlite3.Database("./database.db");

// --- 建立資料表（如果不存在） ---
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT,
    name TEXT,
    email TEXT,
    amount INTEGER,
    pay_method TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS credit_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_number TEXT,
    exp TEXT,
    cvc TEXT
  )
`);

// --- 付款 API ---
app.post("/pay", (req, res) => {
  let { name, email, amount, pay_method, card_number, exp, cvc } = req.body;

  // --- 1️⃣ 必填欄位檢查 ---
  if (
    !name ||
    !email ||
    !amount ||
    !pay_method ||
    !card_number ||
    !exp ||
    !cvc
  ) {
    return res.status(400).json({ error: "欄位不可為空" });
  }

  // --- 2️⃣ 去除空格與破折號 ---
  const cleanCardNumber = card_number.replace(/[\s-]/g, "");

  // --- 3️⃣ 信用卡比對資料庫 ---
  const sql = `
    SELECT * FROM credit_cards
    WHERE card_number = ? AND exp = ? AND cvc = ?
  `;

  db.get(sql, [cleanCardNumber, exp, cvc], (err, row) => {
    if (err) return res.status(500).json({ error: "資料庫錯誤" });

    if (!row) {
      // 卡片不正確 → 付款失敗
      return res.status(400).json({ error: "信用卡資料錯誤" });
    }

    // --- 4️⃣ 信用卡正確 → 建立訂單 ---
    const orderNumber = "ORD" + Date.now();

    db.run(
      `INSERT INTO orders (order_number, name, email, amount, pay_method, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [orderNumber, name, email, amount, pay_method, "success"],
      function (err) {
        if (err) return res.status(500).json({ error: "資料庫寫入失敗" });

        res.json({
          message: "付款成功",
          order_number: orderNumber,
        });
      }
    );
  });
});

// --- 啟動 Server ---
app.listen(port, () => {
  console.log(`伺服器已啟動 http://localhost:${port}`);
});
