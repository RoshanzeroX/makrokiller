document.addEventListener("DOMContentLoaded", () => {
    // ฟังก์ชันคำนวณและแสดงผลลัพธ์
    // ตั้งชื่อเป็น window.calculateTargets เพื่อให้สามารถเรียกใช้จาก onclick ใน HTML ได้
    window.calculateTargets = () => {
        const skuInput = document.getElementById("sku");
        const muInput = document.getElementById("mu");
        const daysInput = document.getElementById("days");
        const resultsDiv = document.getElementById("results");

        // ตรวจสอบว่า Elements ที่จำเป็นมีอยู่หรือไม่
        if (!skuInput || !muInput || !daysInput || !resultsDiv) {
            console.error("ไม่พบ input/output elements ที่จำเป็น (SKU, MU, Days, Results Div)");
            resultsDiv.innerHTML = `<p style="color: red;">เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง</p>`;
            resultsDiv.style.opacity = 1; // แสดงผลลัพธ์ทันที
            return;
        }

        // ดึงค่าจาก Input และแปลงเป็นตัวเลขทศนิยม (parseFloat)
        // ถ้าผู้ใช้ไม่ได้กรอก (ช่องว่าง) หรือกรอกค่าที่ไม่ใช่ตัวเลข จะถือว่าเป็น 0
        const sku = parseFloat(skuInput.value) || 0;
        const mu = parseFloat(muInput.value) || 0;
        const days = parseFloat(daysInput.value) || 0;

        // ตรวจสอบความถูกต้องของข้อมูล
        if (days === 0) {
            resultsDiv.innerHTML = `
                <h2>เกิดข้อผิดพลาด!</h2>
                <p style="color: orange;">กรุณากรอก<strong>จำนวนวันทำงาน</strong> (จำนวนวันทำงานต้องไม่เป็นศูนย์)</p>
            `;
            resultsDiv.style.opacity = 1;
            return;
        }
        // ตรวจสอบอีกครั้งว่าค่าที่ได้เป็นตัวเลขที่ถูกต้องหรือไม่
        if (isNaN(sku) || isNaN(mu) || isNaN(days)) {
            resultsDiv.innerHTML = `
                <h2>เกิดข้อผิดพลาด!</h2>
                <p style="color: orange;">กรุณากรอกข้อมูล <strong>SKU, MU และจำนวนวันทำงาน</strong> ให้ถูกต้อง</p>
            `;
            resultsDiv.style.opacity = 1;
            return;
        }

        // ***** นี่คือสูตรคำนวณค่าเฉลี่ยที่คุณระบุ (สำคัญมาก) *****
        // สูตร: ( (sku / 12) + (mu / 34) ) / (2 * days)
        const average = ((sku / 12) + (mu / 34)) / (2 * days);
        // *********************************************************

        // แสดงผลลัพธ์ภายใน div "results"
        resultsDiv.innerHTML = `
            <h2>✨ ผลการคำนวณค่าเฉลี่ย ✨</h2>
            <p>จำนวน SKU ทั้งหมด: <span>${sku.toFixed(0)}</span></p>
            <p>จำนวน MU ทั้งหมด: <span>${mu.toFixed(0)}</span></p>
            <p>จำนวนวันทำงาน: <span>${days.toFixed(0)}</span> วัน</p>
            <p>ค่าเฉลี่ยต่อวัน: <span style="font-size: 1.5em; color: #00c6ff;">${average.toFixed(2)}</span></p>
            <p style="font-size: 0.9em; margin-top: 1em;">
                <span style="color: #ffd700;">*ค่าเฉลี่ยนี้คือปริมาณงานที่ต้องจัดในแต่ละวัน<br>เพื่อให้งานทั้งหมดเสร็จภายในจำนวนวันที่กำหนด*</span>
            </p>
        `;
        resultsDiv.style.opacity = 1; // ทำให้ div ผลลัพธ์แสดงขึ้นมา (หากถูกซ่อนไว้)
    };

    // --- การทำงานของปุ่มลอยตัว (Floating Buttons) ---

    // ฟังก์ชันช่วยผูก Event Listener กับปุ่มลอยตัว
    function setupFloatingButton(buttonId, targetPage) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                // ถ้าเป็นปุ่ม Home ในหน้า index.html (หน้าปัจจุบัน) ไม่ต้องเปลี่ยนหน้า
                if (buttonId === "homeButton" && targetPage === "index.html") {
                    // สามารถเพิ่ม window.location.reload() ถ้าต้องการให้รีเฟรชหน้า
                    return; 
                }
                window.location.href = targetPage; // เปลี่ยนหน้าไปยัง URL ที่ระบุ
            });
        } else {
            console.warn(`ไม่พบปุ่มลอยตัว: '${buttonId}' ในหน้า HTML นี้`);
        }
    }

    // ผูก Event Listener ให้กับปุ่มลอยตัวแต่ละปุ่ม
    setupFloatingButton("homeButton", "index.html");         // ปุ่มบ้าน
    setupFloatingButton("dailyAverageButton", "daily_average.html"); // ปุ่มถุงเงิน
    setupFloatingButton("duckButton", "songs.html");          // ปุ่มเป็ด

    // ปุ่มเปิด/ปิดโหมดเต็มจอ (Fullscreen Button)
    const fullscreenButton = document.getElementById("fullscreenButton");
    if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
            if (!document.fullscreenElement) { // ตรวจสอบว่าตอนนี้ไม่ได้อยู่ในโหมดเต็มจอ
                document.documentElement.requestFullscreen().catch((err) => {
                    // หากไม่สามารถเปิดโหมดเต็มจอได้ (เช่น ข้อจำกัดของเบราว์เซอร์/อุปกรณ์)
                    console.error(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
                });
            } else { // ถ้าอยู่ในโหมดเต็มจอ ให้ปิดโหมดเต็มจอ
                document.exitFullscreen();
            }
        });
    } else {
        console.warn("ไม่พบปุ่ม 'fullscreenButton' ในหน้า HTML นี้");
    }
});
