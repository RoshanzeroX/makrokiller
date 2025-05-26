document.getElementById("duckButton").onclick = () => {
  window.location.href = "songs.html";
};

document.getElementById("fullscreenButton").onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.getElementById("averageForm").onsubmit = (event) => {
  event.preventDefault();
  const sku = parseFloat(document.getElementById("sku").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const days = parseFloat(document.getElementById("days").value);

  if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
    alert("กรุณากรอกข้อมูลให้ถูกต้องและไม่เว้นว่าง");
    return;
  }

  const average = (sku * mu) / days;
  alert("ค่าเฉลี่ยออเดอร์ต่อวัน = " + average.toFixed(2));
};
