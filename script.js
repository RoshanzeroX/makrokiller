function calculate() {
  const sku = parseFloat(document.getElementById('sku').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const days = parseFloat(document.getElementById('days').value);

  if (!isNaN(sku) && !isNaN(mu) && !isNaN(days) && days > 0) {
    const result = ((sku / 12 + mu / 34) / (2 * days)).toFixed(8);
    window.location.href = `average.html?result=${result}`;
  } else {
    alert('กรุณากรอกข้อมูลให้ครบและถูกต้อง');
  }
}

function goHome() {
  window.location.href = 'index.html';
}

function openFullscreenLandscape() {
  const docElm = document.documentElement;
  if (docElm.requestFullscreen) docElm.requestFullscreen();
  else if (docElm.webkitRequestFullscreen) docElm.webkitRequestFullscreen();

  screen.orientation.lock('landscape').catch(() => {});
}

// สำหรับ average.html
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const result = parseFloat(urlParams.get('result'));
  const avgEl = document.getElementById('avgResult');
  const imgEl = document.getElementById('resultImage');
  const msgEl = document.getElementById('messageText');

  if (avgEl && !isNaN(result)) {
    avgEl.innerText = `ค่าเฉลี่ยออเดอร์ต่อวัน: ${result}`;
    if (result >= 12.00) {
      const options = [
        { img: "1(10).png", text: "ก็ทำได้หนิหว่า มา!! ชนแก้ว !!" },
        { img: "1 (2).png", text: "เป็นคนดีนี้น่า" }
      ];
      const choice = options[Math.floor(Math.random() * options.length)];
      imgEl.src = choice.img;
      msgEl.innerText = choice.text;
    } else {
      imgEl.src = "1 (1).png";
      msgEl.innerText = "ดีขึ้นให้ได้นะ";
    }
  }
});
