document.addEventListener("DOMContentLoaded", () => {
  const resultSection = document.getElementById("resultSection");
  const averageValue = document.getElementById("averageValue");
  const homeButton = document.getElementById("homeButton");

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      average: parseFloat(params.get("average")) || 0
    };
  }

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

    averageValue.textContent = average.toFixed(2);

    resultSection.innerHTML = `
      <img src="${imgSrc}" alt="ผลลัพธ์ค่าเฉลี่ย" />
      <div class="result-text">${message}</div>
    `;
  }

  homeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function lockOrientationAndFullscreen() {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {});
      }
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  }

  const { average } = getQueryParams();
  renderResult(average);
  lockOrientationAndFullscreen();
});
