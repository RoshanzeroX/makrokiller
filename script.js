// script.js

function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
    document.getElementById('result').innerText = "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง";
    return;
  }

  const average = ((sku * mu) / days).toFixed(2);
  document.getElementById('result').innerText = `ค่าเฉลี่ยออเดอร์ต่อวัน: ${average}`;
}

// Fullscreen Functions
function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
  document.getElementById('fullscreenBtn').style.display = 'none';
  document.getElementById('exitFullscreenBtn').style.display = 'inline-block';
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  document.getElementById('fullscreenBtn').style.display = 'inline-block';
  document.getElementById('exitFullscreenBtn').style.display = 'none';
}
