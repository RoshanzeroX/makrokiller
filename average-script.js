document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const avg = Number(urlParams.get("average"));

  const resultContainer = document.getElementById("result-container");
  const homeButton = document.getElementById("homeButton");
  const fullscreenButton = document.getElementById("fullscreenButton");

  function randomHighImages() {
    const images = [
      "1 (3).png", "1 (4).png", "1 (5).png", "1 (6).png",
      "1 (7).png", "1 (8).png", "1 (9).png"
    ];
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }

  function showResult() {
    let imgSrc = "";
    let text = "";

    if (avg > 12) {
      imgSrc = randomHighImages();
      text = "สุดยอดดด!! อย่างเท่";
    } else {
      imgSrc = "1 (1).png";
      text = "ดีขึ้นให้ได้นะ";
    }

    resultContainer.innerHTML = `
      <img src="${imgSrc}" alt="ผลลัพธ์" />
      <div class="result-text-and-average fade-slide-in">
        <div class="result-text">${text}</div>
        <div class="average-value">ค่าเฉลี่ย: ${avg.toFixed(2)}</div>
      </div>
    `;
  }

  showResult();

  homeButton.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });

  // ✅ Toggle Fullscreen และล็อกแนวนอนเมื่อเข้า Fullscreen
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');

          window.addEventListener('resize', () => {
            if (window.innerHeight > window.innerWidth) {
              screen.orientation.lock('landscape').catch(() => {});
            }
          });
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("ไม่สามารถเข้าสู่/ออก fullscreen หรือเปลี่ยนแนวได้:", err);
    }
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", toggleFullscreen);
  }

  // ✅ Fade-slide-in effect
  const fadeElements = document.querySelectorAll('.fade-slide-in');
  fadeElements.forEach(el => {
    el.classList.add('visible');
  });

  // ✅ Background soft particles (ซ้อนกับ style.css/HTML class)
  const particleContainer = document.querySelector('.background-particles');
  if (particleContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${4 + Math.random() * 6}s`;
      particleContainer.appendChild(particle);
    }
  }
});
