document.getElementById("duckButton").onclick = () => {
  window.location.href = "songs.html";
};

document.getElementById("fullscreenButton").onclick = () => {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
};

document
  .getElementById("averageForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const sku = Number(document.getElementById("sku").value);
    const mu = Number(document.getElementById("mu").value);
    const days = Number(document.getElementById("days").value);
    if (days === 0) {
      alert("จำนวนวันทำงานต้องมากกว่า 0");
      return;
    }
    const average = ((sku * mu) / days).toFixed(2);
    alert(`ค่าเฉลี่ย Order Picker ต่อวัน: ${average}`);
  });
