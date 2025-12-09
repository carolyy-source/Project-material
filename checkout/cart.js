document.getElementById("pay-btn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pay_method = document.getElementById("payment-method").value;
  const card_number = document.getElementById("card-number").value;
  const exp = document.getElementById("card-exp").value;
  const cvc = document.getElementById("card-cvc").value;

  // 前端必填檢查
  if (!name || !email || !card_number || !exp || !cvc) {
    alert("請完整填寫所有欄位！");
    return;
  }

  // 存入 localStorage
  localStorage.setItem(
    "payment_info",
    JSON.stringify({
      name,
      email,
      amount: 19999,
      pay_method,
      card_number,
      exp,
      cvc,
    })
  );

  // 跳轉到處理頁
  location.href = "payment_processing.html";
});
