// ฟังก์ชันคำนวณตามสูตร ((sku / 12 + mu / 34) / (2 * days))
function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
    resultDiv.textContent = 'กรุณากรอกตัวเลขให้ถูกต้องและจำนวนวันต้องไม่เป็น 0';
    return;
  }

  const avg = ((sku / 12) + (mu / 34)) / (2 * days);
  const roundedAvg = avg.toFixed(2);

  resultDiv.textContent = `ค่าเฉลี่ยออเดอร์ต่อวัน: ${roundedAvg}`;
  // เก็บค่าไปหน้า average.html
  localStorage.setItem('averageOrder', roundedAvg);
}

// ฟังก์ชันไปหน้า average.html เมื่อคลิกผลลัพธ์ (ถ้ามีค่า)
function goToAverage() {
  const avg = localStorage.getItem('averageOrder');
  if (avg) {
    window.location.href = 'average.html';
  }
}

// ฟังก์ชันเปิด/ปิดเต็มจอแบบสลับปุ่ม
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
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// เอฟเฟค confetti (เรียกตอนโหลดหน้า)
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiElements = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
    this.tilt = Math.random() * 10 - 5;
    this.tiltSpeed = Math.random() * 0.1 + 0.05;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.tilt += this.tiltSpeed;
    if (this.y > confettiCanvas.height) {
      this.y = -this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.size / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt, this.y);
    ctx.lineTo(this.x + this.tilt + this.size / 2, this.y + this.size);
    ctx.stroke();
  }
}

function createConfetti() {
  confettiElements = [];
  for (let i = 0; i < 120; i++) {
    confettiElements.push(new ConfettiParticle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiElements.forEach((c) => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();
