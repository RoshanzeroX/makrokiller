// Elements
const skuInput = document.getElementById('sku');
const muInput = document.getElementById('mu');
const daysInput = document.getElementById('days');
const resultEl = document.getElementById('result');
const calculateBtn = document.getElementById('calculateBtn');
const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');

let lastResult = null;

// Calculate function
function calculate() {
  const sku = parseFloat(skuInput.value);
  const mu = parseFloat(muInput.value);
  const days = parseFloat(daysInput.value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบและถูกต้อง');
    return;
  }

  // สูตร ((sku / 12 + mu / 34) / (2 * days))
  const average = ((sku / 12 + mu / 34) / (2 * days)).toFixed(8);
  lastResult = average;

  resultEl.innerText = `เฉลี่ยออเดอร์ต่อวัน: ${average}`;
  resultEl.style.cursor = 'pointer';

  // ลิงก์คลิกไปหน้า average.html พร้อมส่ง param result
  resultEl.onclick = () => {
    window.location.href = `average.html?result=${encodeURIComponent(average)}`;
  };

  // เล่น confetti
  launchConfetti();
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenToggleBtn.innerText = 'ออกจากเต็มจอ';
  } else {
    document.exitFullscreen();
    fullscreenToggleBtn.innerText = 'เปิดเต็มจอ';
  }
}

// Confetti effect

