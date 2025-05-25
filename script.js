// script.js

function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
    alert('กรุณากรอกตัวเลขที่ถูกต้องและจำนวนวันทำงานต้องไม่เป็น 0');
    return;
  }

  // สูตร: ((sku / 12 + mu / 34) / (2 * days))
  const average = ((sku / 12) + (mu / 34)) / (2 * days);
  const averageFixed = average.toFixed(2);

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `ค่าเฉลี่ยออเดอร์ต่อวัน: ${averageFixed}`;
  resultDiv.style.cursor = 'pointer';

  // ลิงค์ไป average.html เมื่อคลิกผลลัพท์
  resultDiv.onclick = function() {
    localStorage.setItem('averageOrder', averageFixed);
    window.location.href = 'average.html';
  }
}

const fullscreenBtn = document.getElementById('fullscreenBtn');
const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');

fullscreenBtn.onclick = () => {
  openFullscreen();
}

exitFullscreenBtn.onclick = () => {
  closeFullscreen();
}

function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  fullscreenBtn.style.display = 'none';
  exitFullscreenBtn.style.display = 'inline-block';
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  fullscreenBtn.style.display = 'inline-block';
  exitFullscreenBtn.style.display = 'none';
}
