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
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullscreen) {
      docElm.webkitRequestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  }
};

document.getElementById("averageForm").onsubmit = (e) => {
  e.preventDefault();

  const sku = parseFloat(document.getElementById("sku").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const days = parseFloat(document.getElementById("days").value);

  if (days <= 0) {
    alert("จำนวนวันต้องมากกว่า 0");
    return;
  }

  const average = ((sku / 12) + (mu / 34)) / (2 * days);
  window.location.href = `average.html?average=${average}`;
};
``
