document.addEventListener('DOMContentLoaded', () => {
  // ปุ่มเป็ด
  const btnSongs = document.getElementById('btnSongs');
  btnSongs.addEventListener('click', () => {
    window.location.href = 'songs.html';
  });

  // ปุ่ม fullscreen
  const btnFullscreen = document.getElementById('btnFullscreen');
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});
