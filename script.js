document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("averageForm");
  const duckButton = document.getElementById("duckButton");
  const fullscreenButton = document.getElementById("fullscreenButton");

  // ฟังก์ชันคำนวณค่าเฉลี่ยตามสูตรใหม่
  function calculateAverage(sku, mu, days) {
    return ((sku / 12) + (mu / 34)) / (2 * days);
  }

  // Submit form เพื่อไป average.html พร้อมส่งค่าเฉลี่ย
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const sku = Number(document.getElementById("sku").value);
    const mu = Number(document.getElementById("mu").value);
    const days = Number(document.getElementById("days").value);

    if (sku <= 0 || mu <= 0 || days <= 0) {
      alert("กรุณากรอกข้อมูลเป็นตัวเลขบวกมากกว่า 0 ทุกช่อง");
      return;
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
});
