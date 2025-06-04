document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("averageForm");
  const duckButton = document.getElementById("duckButton");
  const fullscreenButton = document.getElementById("fullscreenButton");
  const dailyAverageButton = document.getElementById("dailyAverageButton"); // เผื่อมีปุ่มสำหรับ daily average

  // ฟังก์ชันคำนวณค่าเฉลี่ยตามสูตรให้มา
  function calculateAverage(sku, mu, days) {
    return ((sku / 12) + (mu / 34)) / (2 * days);
  }

  // Submit form เพื่อไป average.html พร้อมส่งค่าเฉลี่ย
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sku = Number(document.getElementById("sku").value);
    const mu = Number(document.getElementById("mu").value);
    const days = Number(document.getElementById("days").value);

    if (sku <= 0 || mu <= 0 || days <= 0) {
      alert("กรุณากรอกข้อมูลมูลค่ามากกว่า 0 ทุกช่อง");
      return;
    }

    // สำหรับ mobile พยายามเข้าสู่ fullscreen และ landscape
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      }
    } catch (error) {
      console.warn("Fullscreen หรือ ล็อคแนวนอนไม่สำเร็จ:", error);
    }

    const avg = calculateAverage(sku, mu, days);

    // ส่งค่าเฉลี่ยเป็น query param ไป average.html
    const params = new URLSearchParams({
      sku,
      mu,
      days,
      average: avg.toFixed(2)
    });

    window.location.href = `average.html?${params.toString()}`;
  });

  // ปุ่มเป็ด ไปหน้า songs.html
  duckButton.addEventListener("click", () => {
    window.location.href = "songs.html";
  });

  // ปุ่ม fullscreen toggle
  fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // ปุ่ม daily average (ถ้ามี)
  if (dailyAverageButton) {
    dailyAverageButton.addEventListener("click", () => {
      window.location.href = "daily_average.html";
    });
  }

  // ฟังก์ชัน clear input ทีละช่อง (ถ้ามีปุ่ม .clear-btn ในฟอร์ม)
  document.querySelectorAll('.clear-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.value = "";
        input.focus();
      }
    });
  });
});document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("averageForm");
  const duckButton = document.getElementById("duckButton");
  const fullscreenButton = document.getElementById("fullscreenButton");
  const dailyAverageButton = document.getElementById("dailyAverageButton"); // เผื่อมีปุ่มสำหรับ daily average

  // ฟังก์ชันคำนวณค่าเฉลี่ยตามสูตรให้มา
  function calculateAverage(sku, mu, days) {
    return ((sku / 12) + (mu / 34)) / (2 * days);
  }

  // Submit form เพื่อไป average.html พร้อมส่งค่าเฉลี่ย
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sku = Number(document.getElementById("sku").value);
    const mu = Number(document.getElementById("mu").value);
    const days = Number(document.getElementById("days").value);

    if (sku <= 0 || mu <= 0 || days <= 0) {
      alert("กรุณากรอกข้อมูลมูลค่ามากกว่า 0 ทุกช่อง");
      return;
    }

    // สำหรับ mobile พยายามเข้าสู่ fullscreen และ landscape
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      }
    } catch (error) {
      console.warn("Fullscreen หรือ ล็อคแนวนอนไม่สำเร็จ:", error);
    }

    const avg = calculateAverage(sku, mu, days);

    // ส่งค่าเฉลี่ยเป็น query param ไป average.html
    const params = new URLSearchParams({
      sku,
      mu,
      days,
      average: avg.toFixed(2)
    });

    window.location.href = `average.html?${params.toString()}`;
  });

  // ปุ่มเป็ด ไปหน้า songs.html
  duckButton.addEventListener("click", () => {
    window.location.href = "songs.html";
  });

  // ปุ่ม fullscreen toggle
  fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // ปุ่ม daily average (ถ้ามี)
  if (dailyAverageButton) {
    dailyAverageButton.addEventListener("click", () => {
      window.location.href = "daily_average.html";
    });
  }

  // ฟังก์ชัน clear input ทีละช่อง (ถ้ามีปุ่ม .clear-btn ในฟอร์ม)
  document.querySelectorAll('.clear-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.value = "";
        input.focus();
      }
    });
  });
});
