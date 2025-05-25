function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
    alert('กรุณากรอกข้อมูลให้ถูกต้องและไม่ใช่ 0 ในจำนวนวันทำงาน');
    return;
  }

  // สูตรที่ให้ ((sku / 12 + mu / 34) / (2 * days))
  const result = ((sku / 12 + mu / 34) / (2 * days)).toFixed(8);

  document.getElementById('result').textContent = result;
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
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
  document.getElementById('fullscreenBtn').textContent = 'ออกจากเต็มจอ';
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  document.getElementById('fullscreenBtn').textContent = 'เปิดเต็มจอ';
}
