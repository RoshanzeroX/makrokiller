let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

// ตัวแปรสำหรับเก็บค่าเฉลี่ยรายวันที่คำนวณได้ เพื่อส่งไปยัง daily_average.html
let calculatedDailySKU = 0;
let calculatedDailyMU = 0;

function updateDateTime() {
    let now = new Date();
    document.getElementById("currentDateTime").innerHTML = `<strong>📅 ${now.toLocaleString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })} ⏳ ${now.toLocaleTimeString('th-TH')}</strong>`;
    document.getElementById("yearCE").innerText = now.getFullYear();
    document.getElementById("yearBE").innerText = now.getFullYear() + 543;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.getElementById("currentMonth").innerText = new Date().toLocaleString('th-TH', { month: 'long' });
document.getElementById("totalDays").innerText = daysInMonth;

function calculateTargets() {
    let totalSKUs = parseInt(document.getElementById("totalSKUs").value) || 0;
    let totalMUs = parseInt(document.getElementById("totalMUs").value) || 0;
    let holidays = parseInt(document.getElementById("holidays").value) || 0;

    let today = new Date().getDate();
    let workingDaysInMonth = daysInMonth - holidays; // จำนวนวันทำงานทั้งหมดในเดือน
    let remainingDays = Math.max(0, workingDaysInMonth - today); // จำนวนวันทำงานที่เหลือในเดือน (นับจากวันนี้)

    // สมมติฐาน: เป้าหมาย SKU/MU ที่ต้องจัดต่อวัน (ถ้าไม่มีการระบุจากโจทย์ของคุณ)
    // หรือค่าเฉลี่ยที่ใช้ในการคำนวณ TotalMonthly
    let targetSKUPerDayFixed = 120; // อาจเป็นค่าคงที่ที่คุณใช้สำหรับเป้าหมาย
    let targetMUPerDayFixed = 340;   // อาจเป็นค่าคงที่ที่คุณใช้สำหรับเป้าหมาย

    // คำนวณเป้าหมายรวมของเดือนตามจำนวนวันทำงาน
    let totalMonthlySKUsTarget = targetSKUPerDayFixed * workingDaysInMonth;
    let totalMonthlyMUsTarget = targetMUPerDayFixed * workingDaysInMonth;

    // คำนวณจำนวนที่เหลือที่ต้องจัดในเดือนนี้
    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUsTarget - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUsTarget - totalMUs);

    // คำนวณ "วันนี้ต้องจัด (เฉลี่ย)"
    let calculatedSKUsDaily_temp = 0;
    let calculatedMUsDaily_temp = 0;

    if (remainingDays > 0) {
        calculatedSKUsDaily_temp = remainingSKUsMonthly / remainingDays;
        calculatedMUsDaily_temp = remainingMUsMonthly / remainingDays;
    } else {
        // หากไม่มีวันทำงานเหลือ แต่ยังไม่ครบเป้าหมาย ให้แสดงยอดที่เหลือทั้งหมด
        calculatedSKUsDaily_temp = remainingSKUsMonthly;
        calculatedMUsDaily_temp = remainingMUsMonthly;
    }

    // เก็บค่าที่คำนวณได้ลงในตัวแปร global เพื่อให้ปุ่มถุงเงินนำไปใช้
    calculatedDailySKU = calculatedSKUsDaily_temp;
    calculatedDailyMU = calculatedMUsDaily_temp;

    // คำนวณความคืบหน้าโดยรวม
    let totalProgressPoints = (totalMonthlySKUsTarget + totalMonthlyMUsTarget);
    let currentProgressPoints = (totalSKUs + totalMUs);
    let progress = (currentProgressPoints / totalProgressPoints) * 100;
    progress = Math.min(progress, 100); // ไม่ให้เกิน 100%

    let message = "";
    if (totalSKUs >= totalMonthlySKUsTarget && totalMUs >= totalMonthlyMUsTarget) {
        message = "🌟 เก่งค่ะลูกกกก";
    } else if (progress >= 80) {
        message = "👍 ใกล้ถึงเป้าหมายแล้ว! สู้ๆ";
    } else {
        message = "💪 ดีขึ้นให้ได้นะ";
    }

    document.getElementById("results").innerHTML = `
        <p><strong>📅 จำนวนวันทำงานที่เหลือ:</strong> ${remainingDays} วัน</p>
        <p><strong>📦 วันนี้ต้องจัด (เฉลี่ย):</strong> ${calculatedDailySKU.toFixed(0)} SKU / ${calculatedDailyMU.toFixed(0)} MU</p>
        <p><strong>📦 เดือนนี้ต้องจัด (รวม):</strong> ${remainingSKUsMonthly} SKU / ${remainingMUsMonthly} MU</p>
        <h3>${message}</h3>
        <p>📊 ความคืบหน้า: <strong>${progress.toFixed(2)}%</strong></p>
    `;

    let progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${progress.toFixed(2)}%`;
    progressBar.innerText = `${progress.toFixed(2)}%`;

    if (progress >= 100) {
        progressBar.style.backgroundColor = '#28a745'; // เขียวเข้ม
    } else if (progress >= 80) {
        progressBar.style.backgroundColor = '#ffc107'; // ส้ม
    } else {
        progressBar.style.backgroundColor = '#00c6ff'; // ฟ้าเริ่มต้น
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // กำหนดฟังก์ชันให้กับปุ่มต่างๆ
    document.getElementById("homeButton").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("fullscreenButton").addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`ไม่สามารถเปิดโหมดเต็มจอได้: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.getElementById("dailyAverageButton").addEventListener("click", () => {
        // **สำคัญ:** เรียก calculateTargets() อีกครั้ง เพื่อให้แน่ใจว่าค่า calculatedDailySKU และ calculatedDailyMU เป็นค่าล่าสุด
        calculateTargets();

        // ส่งค่าเฉลี่ยรายวันที่คำนวณได้แล้วไปยัง daily_average.html
        const params = new URLSearchParams({
            skuDaily: calculatedDailySKU.toFixed(0), // ส่งเป็น string ที่ปัดเศษแล้ว
            muDaily: calculatedDailyMU.toFixed(0)    // ส่งเป็น string ที่ปัดเศษแล้ว
        });
        window.location.href = `daily_average.html?${params.toString()}`;
    });

    // เรียก calculateTargets() ครั้งแรกเมื่อโหลดหน้า เพื่อแสดงผลเบื้องต้น
    calculateTargets();
});
