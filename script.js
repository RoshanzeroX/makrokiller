document.addEventListener("DOMContentLoaded", () => {
    // ฟังก์ชันคำนวณและแสดงผลลัพธ์
    // ตั้งชื่อเป็น window.calculateTargets เพื่อให้สามารถเรียกใช้จาก onclick ใน HTML ได้
    const calculateTargets = () => { // เปลี่ยนเป็น const แทน window.calculateTargets เพื่อผูกกับ Event Listener โดยตรง
        const skuInput = document.getElementById("sku");
        const muInput = document.getElementById("mu");
        const daysInput = document.getElementById("days");
        const resultsDiv = document.getElementById("results"); // คุณอาจจะต้องเพิ่ม <div id="results"></div> ใน HTML ของคุณเพื่อแสดงผลลัพธ์

        // ตรวจสอบว่า Elements ที่จำเป็นมีอยู่หรือไม่
        if (!skuInput || !muInput || !daysInput) {
            console.error("ไม่พบ input elements ที่จำเป็น (SKU, MU, Days)");
            // ไม่ต้องแสดงผลลัพธ์ใน resultsDiv ถ้าไม่มี element นี้
            return;
        }

        // ดึงค่าจาก Input และแปลงเป็นตัวเลขทศนิยม (parseFloat)
        // ถ้าผู้ใช้ไม่ได้กรอก (ช่องว่าง) หรือกรอกค่าที่ไม่ใช่ตัวเลข จะถือว่าเป็น 0
        const sku = parseFloat(skuInput.value) || 0;
        const mu = parseFloat(muInput.value) || 0;
        const days = parseFloat(daysInput.value) || 0;

        // ตรวจสอบความถูกต้องของข้อมูล
        if (days === 0) {
            if (resultsDiv) { // ตรวจสอบว่า resultsDiv มีอยู่ก่อนที่จะใช้งาน
                resultsDiv.innerHTML = `
                    <h2>เกิดข้อผิดพลาด!</h2>
                    <p style="color: orange;">กรุณากรอก<strong>จำนวนวันทำงาน</strong> (จำนวนวันทำงานต้องไม่เป็นศูนย์)</p>
                `;
                resultsDiv.style.opacity = 1;
            } else {
                alert("กรุณากรอกจำนวนวันทำงาน (จำนวนวันทำงานต้องไม่เป็นศูนย์)");
            }
            return;
        }
        // ตรวจสอบอีกครั้งว่าค่าที่ได้เป็นตัวเลขที่ถูกต้องหรือไม่
        if (isNaN(sku) || isNaN(mu) || isNaN(days)) {
            if (resultsDiv) { // ตรวจสอบว่า resultsDiv มีอยู่ก่อนที่จะใช้งาน
                resultsDiv.innerHTML = `
                    <h2>เกิดข้อผิดพลาด!</h2>
                    <p style="color: orange;">กรุณากรอกข้อมูล <strong>SKU, MU และจำนวนวันทำงาน</strong> ให้ถูกต้อง</p>
                `;
                resultsDiv.style.opacity = 1;
            } else {
                alert("กรุณากรอกข้อมูล SKU, MU และจำนวนวันทำงาน ให้ถูกต้อง");
            }
            return;
        }

        // ***** นี่คือสูตรคำนวณค่าเฉลี่ยที่คุณระบุ (สำคัญมาก) *****
        // สูตร: ( (sku / 12) + (mu / 34) ) / (2 * days)
        const average = ((sku / 12) + (mu / 34)) / (2 * days);
        // *********************************************************

        // แสดงผลลัพธ์ภายใน div "results"
        if (resultsDiv) { // ตรวจสอบว่า resultsDiv มีอยู่ก่อนที่จะใช้งาน
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
        } else {
            alert(`ค่าเฉลี่ยต่อวัน: ${average.toFixed(2)}`); // ถ้าไม่มี resultsDiv ก็แสดงเป็น alert แทน
        }
    };

    // ผูก Event Listener สำหรับปุ่ม "คำนวณค่าเฉลี่ย"
    const calculateAverageButton = document.querySelector('button[type="submit"]');
    if (calculateAverageButton) {
        calculateAverageButton.addEventListener("click", (event) => {
            event.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อกด Submit
            calculateTargets();
        });
    } else {
        console.warn("ไม่พบปุ่ม 'คำนวณค่าเฉลี่ย' ในหน้า HTML นี้");
    }

    // --- การทำงานของปุ่มลอยตัว (Floating Buttons) ---

    // ฟังก์ชันช่วยผูก Event Listener กับปุ่มลอยตัว
    function setupFloatingButton(buttonId, targetPage) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                // ถ้าเป็นปุ่ม Home ในหน้า index.html (หน้าปัจจุบัน) ไม่ต้องเปลี่ยนหน้า
                if (buttonId === "homeButton" && targetPage === "index.html") {
                    window.location.reload(); // รีเฟรชหน้าปัจจุบัน
                    return;
                }
                window.location.href = targetPage; // เปลี่ยนหน้าไปยัง URL ที่ระบุ
            });
        } else {
            console.warn(`ไม่พบปุ่มลอยตัว: '${buttonId}' ในหน้า HTML นี้`);
        }
    }

    // ผูก Event Listener ให้กับปุ่มลอยตัวแต่ละปุ่ม
    setupFloatingButton("homeButton", "index.html");            // ปุ่มบ้าน (ถ้ามีใน HTML)
    setupFloatingButton("calculateDailySalesBtn", "daily_average.html"); // ปุ่มถุงเงิน (แก้ไข ID ให้ตรงกับ HTML)
    setupFloatingButton("duckButton", "songs.html");             // ปุ่มเป็ด

    // ปุ่มเปิด/ปิดโหมดเต็มจอ (Fullscreen Button)
    const fullscreenButton = document.getElementById("fullscreenBtn"); // ใช้ ID ที่ถูกต้องจาก HTML
    if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
            if (!document.fullscreenElement) { // ตรวจสอบว่าตอนนี้ไม่ได้อยู่ในโหมดเต็มจอ
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
                });
            } else { // ถ้าอยู่ในโหมดเต็มจอ ให้ปิดโหมดเต็มจอ
                document.exitFullscreen();
            }
        });
    } else {
        console.warn("ไม่พบปุ่ม 'fullscreenBtn' ในหน้า HTML นี้");
    }
});
