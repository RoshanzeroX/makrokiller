// script.js

// Store average globally for passing between pages via localStorage
const calcForm = document.getElementById('calcForm');
const resultContainer = document.getElementById('resultContainer');
const averageDisplay = document.getElementById('averageDisplay');
const goToAverageBtn = document.getElementById('goToAverage');

// Calculation on index.html
if (calcForm) {
  calcForm.addEventListener('submit', e => {
    e.preventDefault();
    const orders = Number(document.getElementById('orders').value);
    const days = Number(document.getElementById('days').value);

    if (days === 0) {
      alert('จำนวนวันต้องมากกว่า 0');
      return;
    }

    const average = (orders / days).toFixed(2);
    averageDisplay.textContent = average;
    resultContainer.classList.remove('hidden');

    // Save average to localStorage
    localStorage.setItem('averageOrder', average);
  });
}

if (goToAverageBtn) {
  goToAverageBtn.addEventListener('click', () => {
    window.location.href = 'average.html';
  });
}

// average.html script
const avgResult = document.getElementById('avgResult');
const messageText = document.getElementById('messageText');
const resultImage = document.getElementById('resultImage');

const fullscreenBtn = document.getElementById('fullscreenBtn');
const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');

// Particle canvas setup (optional confetti effect)
const canvas = document.getElementById('particles');
const ctx = canvas?.getContext('2d');

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Load average and update UI in average.html
if (avgResult) {
  const average = localStorage.getItem('averageOrder');

  if (average === null) {
    avgResult.textContent = "ยังไม่มีข้อมูลค่าเฉลี่ย";
    messageText.textContent = "กรุณากลับไปคำนวณในหน้าแรก";
    resultImage.src = "images/no-data.png"; // ใส่รูปภาพ no-data ถ้ามี
  } else {
    avgResult.textContent = average;

    const avgNum = parseFloat(average);

    if (avgNum > 10) {
      messageText.textContent = "ยอดเยี่ยม! ปริมาณออเดอร์สูงมาก";
      resultImage.src = "images/high.png";
    } else if (avgNum >= 5) {
      messageText.textContent = "ดีมาก! คุณมีออเดอร์ที่ดี";
      resultImage.src = "images/medium.png";
    } else {
      messageText.textContent = "ยังต้องปรับปรุง ออเดอร์ยังน้อย";
      resultImage.src = "images/low.png";
    }
  }
}

// ฟังก์ชันเปิดเต็มหน้าจอแนวนอนสำหรับมือถือและ desktop
function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  fullscreenBtn.classList.add('hidden');
  exitFullscreenBtn.classList.remove('hidden');
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullscreenBtn.classList.remove('hidden');
  exitFullscreenBtn.classList.add('hidden');
}

// ปุ่มกลับหน้าแรกก็ทำงานตามปกติ
const homeBtn = document.getElementById('homeBtn');
if (homeBtn) {
  homeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
