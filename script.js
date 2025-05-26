function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

document.getElementById("avgForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const sku = parseFloat(document.getElementById("sku").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const days = parseFloat(document.getElementById("days").value);

  if (sku > 0 && mu > 0 && days > 0) {
    const average = (sku * mu) / days;
    const encodedAverage = encodeURIComponent(average.toFixed(2));
    window.location.href = `average.html?average=${encodedAverage}`;
  } else {
    alert("กรุณากรอกข้อมูลให้ครบและถูกต้อง");
  }
});
