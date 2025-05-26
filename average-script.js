document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sku = Number(urlParams.get("sku"));
  const mu = Number(urlParams.get("mu"));
  const days = Number(urlParams.get("days"));
  const avg = Number(urlParams.get("average"));

  const resultContainer = document.getElementById("result-container");
  const homeButton = document.getElementById("homeButton");

  // ฟังก์ชันสุ่มเลือกภาพ "1(10).png" หรือ "1(2).png"
  function randomImageAndText() {
    const rnd = Math.random();
    if (rnd < 0.5) {
      return {
        img: "1(10).png",
        text: "ก็ทำได้หนิหว่า มา!! ชนแก้ว !!"
      };
    } else {
      return {
        img: "1(2).png",
        text: "เป็นคนดีนี้น่า"
      };
    }
  }

  // แสดงผลลัพธ์
  function showResult() {
    let imgSrc = "";
    let text = "";

    if (avg > 12) {
      const result = randomImageAndText();
      imgSrc = result.img;
      text = result.text;
    } else {
      imgSrc = "1(1).png";
      text = "ดีขึ้นให้ได้นะ";
    }

    resultContainer.innerHTML = `
      <img src="${imgSrc}" alt="ผลลัพธ์" />
      <div class="result-text">${text}</div>
    `;
  }

  showResult();

  // ปุ่มกลับหน้า index.html
  homeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // เปิด fullscreen และล็อกแนวนอนบนมือถืออัตโนมัติ
  function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {
        // ล็อกไม่สำเร็จไม่ต้องแจ้ง
      });
    }
  }

  function openFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        lockOrientation();
      }).catch(() => {});
    }
  }

  openFullscreen();
});
