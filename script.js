const resultEl = document.getElementById('result');
const fullscreenBtn = document.getElementById('fullscreenBtn');

function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบและถูกต้อง');
    resultEl.textContent = '';
    return;
  }

  // สูตรคำนวณที่แก้ไขให้ถูกต้อง (ตามที่เข้าใจ)
  const result = ((sku + mu) / days).toFixed(8);
  resultEl.textContent = `เฉลี่ยออเดอร์ต่อวัน: ${result}`;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  fullscreenBtn.textContent = '🖥️ ออกจากเต็มจอ';
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  fullscreenBtn.textContent = '🖥️ เปิดเต็มจอ';
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = '🖥️ เปิดเต็มจอ';
  }
});
