document.addEventListener('DOMContentLoaded', () => {
  const skuInput = document.getElementById('skuInput');
  const muInput = document.getElementById('muInput');
  const daysInput = document.getElementById('daysInput');
  const calcBtn = document.getElementById('calcBtn');
  const resultContainer = document.getElementById('resultContainer');

  const goFullScreenBtn = document.getElementById('goFullScreenBtn');
  const exitFullScreenBtn = document.getElementById('exitFullScreenBtn');
  const goToAverageBtn = document.getElementById('goToAverageBtn');
  const goToSongsBtn = document.getElementById('goToSongsBtn');

  // ฟังก์ชันคำนวณตามสูตร ((sku/12 + mu/34) / (2*days))
  function calculateAverage(sku, mu, days) {
    return ((sku / 12) + (mu / 34)) / (2 * days);
  }

  calcBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const sku = parseFloat(skuInput.value);
    const mu = parseFloat(muInput.value);
    const days = parseFloat(daysInput.value);

    if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
      resultContainer.innerHTML = "<p>กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน</p>";
      return;
    }

    const avg = calculateAverage(sku, mu, days);
    localStorage.setItem('averageValue', avg.toFixed(2));
    resultContainer.innerHTML = `<p>ค่าเฉลี่ยที่คำนวณได้: <strong>${avg.toFixed(2)}</strong></p>`;
  });

  // ฟูลสกรีน
  goFullScreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
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
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      });
    }
  });

  // ไปหน้า average.html
  goToAverageBtn.addEventListener('click', () => {
    window.location.href = 'average.html';
  });

  // ปุ่มเป็ดไปหน้า songs.html
  goToSongsBtn.addEventListener('click', () => {
    window.location.href = 'songs.html';
  });
});
