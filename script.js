document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("averageForm");
    const homeButton = document.getElementById("homeButton"); // เพิ่มการอ้างอิงถึงปุ่ม Home
    const duckButton = document.getElementById("duckButton");
    const dailyAverageButton = document.getElementById("dailyAverageButton"); // เพิ่มการอ้างอิงถึงปุ่ม Daily Average
    const fullscreenButton = document.getElementById("fullscreenButton");

    // ฟังก์ชันคำนวณค่าเฉลี่ยตามสูตรใหม่
    function calculateAverage(sku, mu, days) {
        return ((sku / 12) + (mu / 34)) / (2 * days);
    }

    // Submit form เพื่อไป average.html พร้อมส่งค่าเฉลี่ย
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const sku = Number(document.getElementById("sku").value);
        const mu = Number(document.getElementById("mu").value);
        const days = Number(document.getElementById("days").value);

        if (sku <= 0 || mu <= 0 || days <= 0) {
            alert("กรุณากรอกข้อมูลเป็นตัวเลขบวกมากกว่า 0 ทุกช่อง");
            return;
        }

        // ✅ บังคับ fullscreen และล็อกแนวนอนก่อนส่งข้อมูล (ถ้าเป็นมือถือ)
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
                if (screen.orientation && screen.orientation.lock) {
                    await screen.orientation.lock('landscape');
                }
            }
        } catch (error) {
            console.warn("Fullscreen หรือ ล็อกแนวนอน ไม่สำเร็จ:", error);
        }

        const avg = calculateAverage(sku, mu, days);

        // ส่งค่าเฉลี่ยเป็น query param ไป average.html
        const params = new URLSearchParams({
            sku,
            mu,
            days,
            average: avg.toFixed(2)
        });

        window.location.href = `average.html?${params.toString()}`;
    });

    // --- การทำงานของปุ่มลอยตัว (Floating Buttons) ---
    // ปุ่ม Home ไปหน้า index.html (แม้จะอยู่หน้า index.html อยู่แล้ว)
    if (homeButton) { // ตรวจสอบว่าปุ่มมีอยู่จริงก่อนเพิ่ม event listener
        homeButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // ปุ่มเป็ด ไปหน้า songs.html
    if (duckButton) { // ตรวจสอบว่าปุ่มมีอยู่จริงก่อนเพิ่ม event listener
        duckButton.addEventListener("click", () => {
            window.location.href = "songs.html";
        });
    }

    // ปุ่ม Daily Average ไปหน้า daily_average.html
    if (dailyAverageButton) { // ตรวจสอบว่าปุ่มมีอยู่จริงก่อนเพิ่ม event listener
        dailyAverageButton.addEventListener("click", () => {
            window.location.href = "daily_average.html";
        });
    }

    // ปุ่ม fullscreen toggle
    if (fullscreenButton) { // ตรวจสอบว่าปุ่มมีอยู่จริงก่อนเพิ่ม event listener
        fullscreenButton.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch((err) => {
                    alert(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // เพิ่มฟังก์ชันเคลียร์ค่า input เมื่อกดปุ่มกากบาท
    document.querySelectorAll('.clear-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input) {
                input.value = "";
                input.focus();
            }
        });
    });
});
