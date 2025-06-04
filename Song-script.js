function updateDateTime() {
    let now = new Date();
    document.getElementById("currentDateTime").innerHTML = `<strong>📅 ${now.toLocaleString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })} ⏳ ${now.toLocaleTimeString('th-TH')}</strong>`;
    document.getElementById("yearCE").innerText = now.getFullYear();
    document.getElementById("yearBE").innerText = now.getFullYear() + 543;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.getElementById("currentMonth").innerText = new Date().toLocaleString('th-TH', { month: 'long' });
let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
document.getElementById("totalDays").innerText = daysInMonth;

function calculateTargets() {
    let totalSKUs = parseInt(document.getElementById("totalSKUs").value) || 0;
    let totalMUs = parseInt(document.getElementById("totalMUs").value) || 0;
    let holidays = parseInt(document.getElementById("holidays").value) || 0;

    let today = new Date().getDate();
    let workingDays = daysInMonth - holidays;
    let remainingDays = Math.max(0, workingDays - today);

    // สมมติฐาน: เป้าหมายรายวันคือ 120 SKU และ 340 MU
    let targetSKUPerDay = 120;
    let targetMUPerDay = 340;

    let totalMonthlySKUs = targetSKUPerDay * workingDays; // ใช้ workingDays แทน daysInMonth
    let totalMonthlyMUs = targetMUPerDay * workingDays;   // ใช้ workingDays แทน daysInMonth

    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUs - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUs - totalMUs);

    let remainingSKUsDaily = remainingDays > 0 ? (remainingSKUsMonthly / remainingDays).toFixed(2) : 0;
    let remainingMUsDaily = remainingDays > 0 ? (remainingMUsMonthly / remainingDays).toFixed(2) : 0;
    // หากเหลือวันทำงานเป็น 0 และยังไม่ครบเป้าหมาย ให้แสดงยอดที่เหลือทั้งหมด
    if (remainingDays === 0 && (remainingSKUsMonthly > 0 || remainingMUsMonthly > 0)) {
        remainingSKUsDaily = remainingSKUsMonthly;
        remainingMUsDaily = remainingMUsMonthly;
    }


    let totalProgressPoints = (totalMonthlySKUs + totalMonthlyMUs);
    let currentProgressPoints = (totalSKUs + totalMUs);
    let progress = (currentProgressPoints / totalProgressPoints) * 100;
    progress = Math.min(progress, 100); // ไม่ให้เกิน 100%

    let message = "";
    if (totalSKUs >= totalMonthlySKUs && totalMUs >= totalMonthlyMUs) {
        message = "🌟 เก่งค่ะลูกกกก";
    } else if (progress >= 80) { // เพิ่มเงื่อนไขสำหรับความคืบหน้าสูง
        message = "👍 ใกล้ถึงเป้าหมายแล้ว! สู้ๆ";
    }
    else {
        message = "💪 ดีขึ้นให้ได้นะ";
    }

    document.getElementById("results").innerHTML = `
        <p><strong>📅 จำนวนวันทำงานที่เหลือ:</strong> ${remainingDays} วัน</p>
        <p><strong>📦 วันนี้ต้องจัด (เฉลี่ย):</strong> ${remainingSKUsDaily} SKU / ${remainingMUsDaily} MU</p>
        <p><strong>📦 เดือนนี้ต้องจัด (รวม):</strong> ${remainingSKUsMonthly} SKU / ${remainingMUsMonthly} MU</p>
        <h3>${message}</h3>
        <p>📊 ความคืบหน้า: <strong>${progress.toFixed(2)}%</strong></p>
    `;

    // เปลี่ยนสีของ Progress Bar ตามความคืบหน้า
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

// Event Listeners สำหรับปุ่มลอย
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
        // เมื่อกดปุ่มถุงเงิน เราจะส่งค่า SKU, MU, Days ไปยัง daily_average.html
        let totalSKUs = parseInt(document.getElementById("totalSKUs").value) || 0;
        let totalMUs = parseInt(document.getElementById("totalMUs").value) || 0;
        let holidays = parseInt(document.getElementById("holidays").value) || 0;
        let workingDays = daysInMonth - holidays; // ใช้ workingDays ในการคำนวณวันทำงาน

        const params = new URLSearchParams({
            sku: totalSKUs,
            mu: totalMUs,
            days: workingDays // ส่งจำนวนวันทำงานที่เหลือไป
        });
        window.location.href = `daily_average.html?${params.toString()}`;
    });

    // เรียก calculateTargets() ครั้งแรกเมื่อโหลดหน้า เพื่อแสดงผลเบื้องต้น
    calculateTargets();
});
