document.getElementById("calculateBtn").addEventListener("click", () => {
  const sku = parseFloat(document.getElementById("sku").value) || 0;
  const mu = parseFloat(document.getElementById("mu").value) || 0;
  const days = parseFloat(document.getElementById("days").value);

  if (days === 0 || isNaN(days)) {
    alert("กรุณากรอกจำนวนวันให้ถูกต้อง");
    return;
  }

  const avg = ((sku / 12) + (mu / 34)) / (2 * days);
  localStorage.setItem("avgResult", avg);
});

document.getElementById("duck").addEventListener("click", () => {
  const avg = localStorage.getItem("avgResult");
  if (avg !== null) {
    window.location.href = `average.html?result=${encodeURIComponent(avg)}`;
  } else {
    alert("กรุณาคำนวณก่อนดูผลลัพธ์");
  }
});
