// script.js

// ฟังก์ชันคำนวณค่าเฉลี่ยออเดอร์
function calculateAverage(sku, mu, days) {
  if (days === 0) return 0;
  return (sku * mu) / days;
}

document.getElementById('calcBtn').addEventListener('click', () => {
  const sku = Number(document.getElementById('sku').value);
  const mu = Number(document.getElementById('mu').value);
  const days = Number(document.getElementById('days').value);

  const resultEl = document.getElementById('result');

  if (!sku || !mu || !days || days <= 0) {
    resultEl.innerText = "กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน";
    return;
  }

  const avg = calculateAverage(sku, mu, days);

  // แสดงผล และส่งต่อไปหน้า average.html ด้วย query string
  resultEl.innerText = `ค่าเฉลี่ยออเดอร์ต่อวันคือ: ${avg.toFixed(8)}`;

  // เปลี่ยนลิงก์ไปหน้าแสดงผล
  setTimeout(() => {
    window.location.href = `average.html?result=${encodeURIComponent(avg)}`;
  }, 1500);
});

// ฟังก์ชันเปิด/ปิด fullscreen
document.getElementById('fullscreenToggleBtn').addEventListener('click', () => {
  const docElm = document.documentElement;
  if (!document.fullscreenElement) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// ฟังก์ชันกดเป็ดไปหน้า average.html (เปลี่ยนเป็นหน้าที่ต้องการ)
function goToAverage() {
  window.location.href = 'average.html';
}
