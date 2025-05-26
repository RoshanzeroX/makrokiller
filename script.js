document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const duckBtn = document.getElementById('duck-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // ตัวอย่างฟังก์ชันคำนวณ (แก้ได้ตามต้องการ)
    const sku = form.sku.value.trim();
    const mu = parseFloat(form.mu.value);
    const days = parseInt(form.days.value, 10);

    if (!sku || isNaN(mu) || isNaN(days)) {
      alert('กรุณากรอกข้อมูลให้ถูกต้อง');
      return;
    }

    const result = mu * days; // ตัวอย่างคำนวณ
    alert(`ผลลัพธ์สำหรับ SKU: ${sku} คือ ${result}`);
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        alert('ไม่สามารถเข้าสู่โหมดเต็มจอได้');
      });
    } else {
      document.exitFullscreen();
    }
  });

  duckBtn.addEventListener('click', () => {
    window.location.href = 'songs.html';
  });
});
