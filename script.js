// ฟังก์ชันคำนวณค่าเฉลี่ยตามสูตร (sku/12 + mu/34) / (2*days)
function calculateAverage(sku, mu, days) {
  return ( (sku/12 + mu/34) / (2*days) );
}

document.addEventListener('DOMContentLoaded', () => {
  const skuInput = document.getElementById('sku');
  const muInput = document.getElementById('mu');
  const daysInput = document.getElementById('days');
  const calcBtn = document.getElementById('calcBtn');
  const resultDiv = document.getElementById('result');
  const toAverageBtn = document.getElementById('toAverageBtn');

  calcBtn.addEventListener('click', () => {
    const sku = parseFloat(skuInput.value);
    const mu = parseFloat(muInput.value);
    const days = parseFloat(daysInput.value);

    if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
      alert('กรุณากรอกตัวเลขที่ถูกต้องและจำนวนวันต้องมากกว่า 0');
      return;
    }

    const avg = calculateAverage(sku, mu, days);
    const avgFixed = avg.toFixed(2);

    resultDiv.textContent = `ค่าเฉลี่ยที่คำนวณได้คือ: ${avgFixed}`;

    // เก็บค่าไว้ใน localStorage เพื่อส่งต่อไป average.html
    localStorage.setItem('averageValue', avgFixed);

    // เปิดใช้งานปุ่มไปหน้า average
    toAverageBtn.disabled = false;
  });

  toAverageBtn.addEventListener('click', () => {
    window.location.href = 'average.html';
  });

  // ฟีเจอร์ fullscreen หน้า index
  const goFullScreenBtn = document.getElementById('goFullScreenBtn');
  const exitFullScreenBtn = document.getElementById('exitFullScreenBtn');

  goFullScreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        goFullScreenBtn.style.display = 'none';
        exitFullScreenBtn.style.display = 'inline-block';
      });
    }
  });

  exitFullScreenBtn.addEventListener('click', () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        goFullScreenBtn.style.display = 'inline-block';
        exitFullScreenBtn.style.display = 'none';
      });
    }
  });

  // ปุ่มลอยเป็ดไปหน้า songs.html
  const duckBtn = document.querySelector('.floating-duck-btn');
  duckBtn.addEventListener('click', () => {
    window.location.href = 'songs.html';
  });
});
