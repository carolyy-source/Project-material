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

  fetch("http://localhost:3000/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      amount: 19999, //要從訂單導入
      pay_method,
      card_number,
      exp,
      cvc,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log("付款失敗", data);
        location.href = "payment_fail.html";
      } else {
        console.log("付款成功", data);
        localStorage.setItem("order_number", data.order_number);
        location.href = "payment_success.html";
      }
    })
    .catch(() => {
      location.href = "payment_fail.html";
    });
});
