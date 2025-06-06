document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("averageForm");
    const homeButton = document.getElementById("homeButton");
    const duckButton = document.getElementById("duckButton");
    const dailyAverageButton = document.getElementById("dailyAverageButton");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const incomeButton = document.getElementById("incomeButton"); // Added: incomeButton

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
                    alert(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Added: Event listener for incomeButton
    if (incomeButton) {
        incomeButton.addEventListener("click", () => {
            window.location.href = "income.html";
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
