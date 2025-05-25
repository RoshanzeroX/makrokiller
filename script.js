const resultEl = document.getElementById('result');

function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบและถูกต้อง');
    return;
  }

  const result = ((sku / 12 + mu / 34) / (2 * days)).toFixed(8);
  resultEl.innerText = `เฉลี่ยออเดอร์ต่อวัน: ${result}`;
  
  // คลิกผลลัพธ์ไป average.html พร้อมส่งพารามิเตอร์
  resultEl.onclick = () => {
    window.location.href = `average.html?result=${encodeURIComponent(result)}`;
  };
}

function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  document.getElementById('fullscreenBtn').style.display = 'none';
  document.getElementById('exitFullscreenBtn').style.display = 'block';
}

function closeFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  document.getElementById('fullscreenBtn').style.display = 'block';
  document.getElementById('exitFullscreenBtn').style.display = 'none';
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.getElementById('fullscreenBtn').style.display = 'block';
    document.getElementById('exitFullscreenBtn').style.display = 'none';
  }
});
