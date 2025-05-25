document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const totalOrdersInput = document.getElementById('totalOrders');
  const workingDaysInput = document.getElementById('workingDays');
  const avgResultSpan = document.getElementById('avgResult');
  const resultMessage = document.getElementById('resultMessage');
  const goToAverageBtn = document.getElementById('goToAverage');

  function calculateAverage(totalOrders, workingDays) {
    if (workingDays === 0) return null;
    return totalOrders / workingDays;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const totalOrders = Number(totalOrdersInput.value);
    const workingDays = Number(workingDaysInput.value);

    if (totalOrders < 0 || workingDays <= 0) {
      avgResultSpan.textContent = '-';
      resultMessage.textContent = 'กรุณากรอกจำนวนที่ถูกต้อง';
      goToAverageBtn.disabled = true;
      return;
    }

    const avg = calculateAverage(totalOrders, workingDays);
    if (avg === null || isNaN(avg)) {
      avgResultSpan.textContent = '-';
      resultMessage.textContent = 'ไม่สามารถคำนวณค่าเฉลี่ยได้';
      goToAverageBtn.disabled = true;
      return;
    }

    avgResultSpan.textContent = avg.toFixed(8);
    resultMessage.textContent = avg >= 12 ? 'ค่าเฉลี่ยสูงมาก!' : 'ค่าเฉลี่ยปกติ';
    goToAverageBtn.disabled = false;

    // Save average to sessionStorage for average.html
    sessionStorage.setItem('averageOrder', avg.toFixed(8));
  });

  goToAverageBtn.addEventListener('click', () => {
    const avg = sessionStorage.getItem('averageOrder');
    if (avg) {
      window.location.href = `average.html?result=${avg}`;
    }
  });
});
