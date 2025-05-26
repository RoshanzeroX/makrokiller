document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const avg = Number(urlParams.get("average"));

  const resultContainer = document.getElementById("result-container");
  const homeButton = document.getElementById("homeButton");

  function randomImageAndText() {
    if (Math.random() < 0.5) {
      return {
        img: "1(10).png",
        text: "ก็ทำได้หนิหว่า มา!! ชนแก้ว !!"
      };
    } else {
      return {
        img: "1 (2).png",
        text: "เป็นคนดีนี้น่า"
      };
    }
  }

  function showResult() {
    let imgSrc = "";
    let text = "";

    if (avg > 12) {
      const result = randomImageAndText();
      imgSrc = result.img;
      text = result.text;
    } else {
      imgSrc = "1 (1).png";
      text = "ดีขึ้นให้ได้นะ";
    }

    resultContainer.innerHTML = `
      <img src="${imgSrc}" alt="ผลลัพธ์" />
      <div class="result-text-and-average">
        <div class="result-text">${text}</div>
        <div class="average-value">ค่าเฉลี่ย: ${avg.toFixed(2)}</div>
      </div>
    `;
  }

  showResult();

  homeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  async function openFullscreenAndLockOrientation() {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }

        // บาง browser อาจยังไม่ได้ล็อกแนวนอนทันที ต้องรอ resize event ช่วยด้วย
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
          // รอ resize event ช่วยให้แนวนอนล็อกสมบูรณ์
          window.addEventListener('resize', () => {
            if(window.innerHeight > window.innerWidth) {
              screen.orientation.lock('landscape').catch(() => {});
            }
          });
        }
      }
    } catch (err) {
      console.warn("ไม่สามารถเปิด fullscreen หรือล็อกแนวนอน:", err);
    }
  }

  openFullscreenAndLockOrientation();
});
