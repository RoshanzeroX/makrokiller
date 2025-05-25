document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const resultDisplay = document.getElementById('resultDisplay');
  const goAverageBtn = document.getElementById('goAverage');

  let lastResult = null;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const sku = Number(form.sku.value);
    const mu = Number(form.mu.value);
    const days = Number(form.days.value);

    if (days <= 0) {
      resultDisplay.textContent = "กรุณาใส่จำนวนวันที่ถูกต้อง (มากกว่า 0)";
      return;
    }

    const average = ((sku / 12) + (mu / 34)) / (2 * days);
    lastResult = average;

    resultDisplay.textContent = `ค่าเฉลี่ยออเดอร์ต่อวัน: ${average.toFixed(8)}`;
    goAverageBtn.disabled = false;
  });

  goAverageBtn.addEventListener('click', () => {
    if (lastResult !== null) {
      window.location.href = `average.html?result=${lastResult}`;
    }
  });
});
