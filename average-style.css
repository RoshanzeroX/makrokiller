@import url('https://fonts.googleapis.com/css2?family=Kanit&family=Sarabun&display=swap');

/* พาร์ติเคิลพื้นหลัง */
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('particles.webp');
  background-size: cover;
  opacity: 0.3;
  z-index: -2;
  animation: floatParticles 60s linear infinite;
}

@keyframes floatParticles {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('bg.webp');
  background-size: cover;
  background-position: center;
  filter: brightness(0.4) blur(5px);
  z-index: -1;
}

.content-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 1em 1.5em;
  font-family: 'Kanit', 'Sarabun', 'Noto Sans Thai', sans-serif;
  text-align: center;
  position: relative;
  z-index: 1;
  color: #222;
}

/* ✅ fade-in slide-in เมื่อโหลด */
.fade-slide-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-slide-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.title-no-wrap {
  white-space: nowrap;
  font-size: 2em;
  margin-bottom: 0.5em;
}

.result-container {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ✅ bounce-in animation */
@keyframes bounceIn {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  80% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.result-container img,
.result-text-and-average {
  animation: bounceIn 0.8s ease-out;
}

.result-container img {
  max-width: 140px;
  height: auto;
  margin-bottom: 1em;
}

.result-text-and-average {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 1em;
  font-weight: 600;
  font-size: 2.2rem;
  max-width: 90vw;
  word-break: break-word;
  color: #222;
}

.average-value {
  font-weight: 900;
  font-size: 3rem;
  user-select: text;
}

@media (max-width: 768px) {
  .content-wrapper {
    color: #b3d4ff;
  }
  .result-text-and-average {
    font-size: 2rem;
    color: #b3d4ff;
  }
  .average-value {
    font-size: 2.5rem;
    color: #b3d4ff;
  }
}

.floating-button {
  position: fixed;
  bottom: 15px;
  background-color: #3A86FF;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
  user-select: none;
  z-index: 1000;
  animation: floatUpDown 3s ease-in-out infinite;
}

.floating-button:hover {
  transform: translateY(-6px);
}

.floating-button.right {
  right: 15px;
}

.floating-button.left {
  left: 15px;
}

@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
