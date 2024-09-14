// クッキー管理用のJavaScriptファイル

// 訪問回数と前回の訪問日を管理する関数
function manageVisitInfo() {
  // クッキーから訪問回数を取得
  let times = getCookie("Times");
  if (times == "") {
      times = 1; // 初回訪問時は1回目
  }
  
  // クッキーから前回訪問日を取得
  let date = getCookie("Date");
  if (date == "") {
      date = "????"; // 初回訪問時は不明として表示
  }

  // 訪問回数と前回の訪問日を右下に表示
  document.getElementById('cookieInfo').innerHTML = `これまでの訪問回数：${times}<br>前回の訪問日：${date}`;

  // 訪問回数を増加
  times++;

  // 現在の日付を取得してフォーマット
  const dd = new Date();
  const ye = dd.getFullYear();
  const mo = String(dd.getMonth() + 1).padStart(2, '0');
  const da = String(dd.getDate()).padStart(2, '0');
  const ho = String(dd.getHours()).padStart(2, '0');
  const mi = String(dd.getMinutes()).padStart(2, '0');
  const se = String(dd.getSeconds()).padStart(2, '0');
  const currentDate = `${ye}/${mo}/${da} ${ho}:${mi}:${se}`;

  // 新しい訪問回数と訪問日時をクッキーに保存
  setCookie("Times", times);
  setCookie("Date", currentDate);
}

// クッキーを取得する関数
function getCookie(key) {
  const cookies = " " + document.cookie + ";";
  let start = cookies.indexOf(" " + key + "=");
  if (start == -1) return "";
  start = cookies.indexOf("=", start) + 1;
  let end = cookies.indexOf(";", start);
  return unescape(cookies.substring(start, end));
}

// クッキーを設定する関数
function setCookie(key, value) {
  const expires = "expires=Fri, 31-Dec-2030 23:59:59 GMT;";
  document.cookie = `${key}=${escape(value)}; path=/; ${expires}`;
}

// クッキーを削除する関数
function clearCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ページが読み込まれたら、クッキーを使って訪問回数や前回の訪問日を管理
window.onload = function() {
  manageVisitInfo();
};
