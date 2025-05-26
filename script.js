document.getElementById("averageForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const sku = parseFloat(document.getElementById("sku").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const days = parseFloat(document.getElementById("days").value);

  if (days <= 0) {
    alert("จำนวนวันต้องมากกว่า 0");
    return;
  }

  const average = ((sku / 12 + mu / 34) / (2 * days));
  window.location.href = `average.html?avg=${average.toFixed(2)}`;
});

document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert("ไม่สามารถเข้าสู่โหมดเต็มหน้าจอได้");
    });
  } else {
    document.exitFullscreen();
  }
});
