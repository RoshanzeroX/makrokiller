document.addEventListener("DOMContentLoaded", () => {
    // --- 1. การทำงานของปุ่มคำนวณหลัก ---
    const calculateButton = document.getElementById("calculateButton");
    if (calculateButton) { // ตรวจสอบให้แน่ใจว่าปุ่มคำนวณมีอยู่
        calculateButton.addEventListener("click", () => {
            const skuInput = document.getElementById("sku");
            const muInput = document.getElementById("mu");
            const daysInput = document.getElementById("days");

            // ตรวจสอบว่า input elements มีอยู่จริง
            if (!skuInput || !muInput || !daysInput) {
                console.error("ไม่พบ input elements (SKU, MU, Days)");
                alert("เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
                return;
            }

            const sku = parseFloat(skuInput.value);
            const mu = parseFloat(muInput.value);
            const days = parseFloat(daysInput.value);

            // ตรวจสอบค่าที่รับมา
            if (isNaN(sku) || isNaN(mu) || isNaN(days) || days === 0) {
                alert("กรุณากรอกข้อมูล SKU, MU และจำนวนวันทำงานให้ถูกต้อง (จำนวนวันทำงานต้องไม่เป็นศูนย์)");
                return;
            }

            const totalOrders = sku + mu;
            const average = totalOrders / days;

            // นำทางไปยังหน้า average.html พร้อมส่งค่าผ่าน URL parameters
            window.location.href = `average.html?sku=${sku}&mu=${mu}&days=${days}&average=${average.toFixed(2)}`;
        });
    } else {
        console.warn("ไม่พบปุ่ม 'calculateButton' ในหน้า index.html");
    }

    // --- 2. การทำงานของปุ่มลอยตัว (Floating Buttons) ---

    // ฟังก์ชันสำหรับผูก Event Listener กับปุ่ม
    function setupFloatingButton(buttonId, targetPage) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                window.location.href = targetPage;
            });
        } else {
            console.warn(`ไม่พบปุ่ม '${buttonId}' ในหน้า index.html`);
        }
    }

    // ผูก Event Listener ให้กับปุ่มต่างๆ
    setupFloatingButton("homeButton", "index.html"); // ปุ่มบ้าน
    setupFloatingButton("dailyAverageButton", "daily_average.html"); // ปุ่มถุงเงิน
    setupFloatingButton("duckButton", "songs.html"); // ปุ่มเป็ด

    // ปุ่มเปิด/ปิดเต็มจอ (Fullscreen Button)
    const fullscreenButton = document.getElementById("fullscreenButton");
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
    } else {
        console.warn("ไม่พบปุ่ม 'fullscreenButton' ในหน้า index.html");
    }
});
