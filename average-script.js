document.addEventListener("DOMContentLoaded", async () => {
    // --- 1. เปิดโหมดเต็มจอและล็อกแนวนอนอัตโนมัติสำหรับมือถือ ---
    try {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            // ขอเปิดโหมดเต็มจอ
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
            // ล็อกแนวนอน (อาจไม่ทำงานบน iOS หรือบางเบราว์เซอร์)
            if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape').catch(e => {
                    console.warn("Landscape lock failed:", e);
                });
            }
        }
    } catch (error) {
        console.warn("Fullscreen API or screen.orientation API not supported or failed:", error);
    }

    // --- 2. ดึงค่าผลลัพธ์จาก URL Parameters ---
    const urlParams = new URLSearchParams(window.location.search);
    const sku = urlParams.get('sku');
    const mu = urlParams.get('mu');
    const days = urlParams.get('days');
    const average = parseFloat(urlParams.get('average'));

    const resultDisplay = document.getElementById("result-display");

    if (resultDisplay && !isNaN(average)) {
        let selectedImage = '';
        let messageText = '';

        // --- 3. กำหนดรูปภาพและข้อความตามค่าเฉลี่ย ---
        if (average > 12.00) {
            const randomPositiveImages = [
                "1 (4).png", "1 (3).png", "1 (5).png", "1 (6).png",
                "1 (7).png", "1 (8).png", "1 (9).png"
            ];
            const randomIndex = Math.floor(Math.random() * randomPositiveImages.length);
            selectedImage = randomPositiveImages[randomIndex];

            messageText = "🌟 ยอดเยี่ยมมาก! คุณทำผลงานได้ดีเยี่ยม!";
        } else {
            selectedImage = "1 (1).png";
            messageText = "💪 ดีขึ้นให้ได้นะ";
        }

        // --- 4. แสดงผลลัพธ์แบบไดนามิก ---
        resultDisplay.innerHTML = `
            <img src="${selectedImage}" alt="ผลลัพธ์" class="result-image" />
            <p class="result-message">${messageText}</p>
            <div class="result-details">
                <p>ค่าเฉลี่ย: <span class="result-value">${average.toFixed(2)}</span></p>
            </div>
        `;
    } else if (resultDisplay) {
        resultDisplay.innerHTML = `
            <p class="result-message">ไม่พบข้อมูลค่าเฉลี่ย</p>
            <p class="result-details">กรุณากลับไปที่หน้าหลักและคำนวณใหม่</p>
        `;
    }

    // --- 5. การทำงานของปุ่มต่างๆ ---
    const homeButton = document.getElementById("homeButton");
    const duckButton = document.getElementById("duckButton");
    const dailyAverageButton = document.getElementById("dailyAverageButton");
    const fullscreenButton = document.getElementById("fullscreenButton");

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (duckButton) {
        duckButton.addEventListener("click", () => {
            window.location.href = "songs.html";
        });
    }

    if (dailyAverageButton) {
        dailyAverageButton.addEventListener("click", () => {
            window.location.href = "daily_average.html";
        });
    }

    if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
});
