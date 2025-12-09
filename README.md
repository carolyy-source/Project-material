# Project-material

1.  安裝 Node 套件
    npm init -y
    npm install express sqlite3 cors

2.  執行 node js
    node server.js

3.  進入網頁操作

## cart.html 訂單確認頁面

顯示訂單資料與金額，
輸入信用卡資料後確認付款
check: 資料都已填寫後，即可送出

## payment_processing.html 付款處理頁面

送出付款資訊到金流網站驗證
驗證是否通過？

## payment_fail.html 付款失敗頁面

卡號驗證未通過
->重回訂單確認頁面

## payment_processing.html 付款成功頁面

卡號驗證通過
->回傳訂單資料
