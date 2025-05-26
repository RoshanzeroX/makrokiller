document.addEventListener("DOMContentLoaded", () => {
  const resultSection = document.getElementById("resultSection");
  const homeButton = document.getElementById("homeButton");

  // ฟังก์ชันอ่านค่า query param
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      average: parseFloat(params.get("average")) || 0
    };
  }

  // สุ่มเลือกภาพและข้อความสำหรับ >12.00
  function getRandomPositive() {
    const images = [
      { src: "1 (10).png", text: "ก็ทำได้หนิหว่า มา!! ชนแก้ว !!" },
      { src: "1 (2).png", text: "เป็นคนดีนี้น่า" }
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  function renderResult(average) {
    let imgSrc = "";
    let message = "";

    if (average > 12.0) {
      const choice = getRandomPositive();
      imgSrc = choice.src;
      message = choice.text;
    } else {
      imgSrc = "1 (1).png";
      message = "ดีขึ้นให้ได้นะ";
    }

    resultSection.innerHTML = `
      <img src="${imgSrc}" alt="ผลลัพธ์ค่าเฉลี่ย" />
      <div class="result-text">${message}</div>
    `;
  }

  // ปุ่มกลับหน้าแรก
  homeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // เปิด fullscreen + ล็อกแนวนอนเฉพาะบนมือถือ
  function lockOrientationAndFullscreen() {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          // ไม่ล็อกได้ก็ไม่เป็นไร
        });
      }
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  }

  // ดึงค่าแล้วแสดงผล
  const { average } = getQueryParams();
  renderResult(average);
  lockOrientationAndFullscreen();
});
