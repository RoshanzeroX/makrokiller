// ตัวแปรสำหรับเก็บค่าเฉลี่ยรายวันที่คำนวณได้ (หากมีการใช้ในหน้าอื่น)
let calculatedDailySKU = 0;
let calculatedDailyMU = 0;

// ฟังก์ชันอัปเดตวันที่และเวลา (หากมี element ที่รองรับใน average.html)
function updateDateTime() {
    let now = new Date();
    const dateTimeElement = document.getElementById("currentDateTime");
    if (dateTimeElement) {
        dateTimeElement.innerHTML = `<strong>📅 ${now.toLocaleString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })} ⏳ ${now.toLocaleTimeString('th-TH')}</strong>`;
    }
    const yearCEElement = document.getElementById("yearCE");
    if (yearCEElement) {
        yearCEElement.innerText = now.getFullYear();
    }
    const yearBEElement = document.getElementById("yearBE");
    if (yearBEElement) {
        yearBEElement.innerText = now.getFullYear() + 543;
    }
}

// เรียกใช้ฟังก์ชันอัปเดตวันที่และเวลาทุก 1 วินาที (ถ้ามี element)
if (document.getElementById("currentDateTime")) {
    setInterval(updateDateTime, 1000);
    updateDateTime();
}

// ฟังก์ชัน calculateTargets นี้ดูเหมือนจะใช้สำหรับการคำนวณเป้าหมายรายวัน
// ซึ่งอาจจะไม่เกี่ยวข้องโดยตรงกับการแสดงผลค่าเฉลี่ยที่ส่งมาจาก index.html
// แต่ผมยังคงเก็บไว้เผื่อคุณมีการใช้งานอื่น ๆ บนหน้า average.html
function calculateTargets() {
    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const currentMonthElement = document.getElementById("currentMonth");
    if (currentMonthElement) {
        currentMonthElement.innerText = new Date().toLocaleString('th-TH', { month: 'long' });
    }
    const totalDaysElement = document.getElementById("totalDays");
    if (totalDaysElement) {
        totalDaysElement.innerText = daysInMonth;
    }

    let totalSKUs = parseInt(document.getElementById("totalSKUs")?.value) || 0;
    let totalMUs = parseInt(document.getElementById("totalMUs")?.value) || 0;
    let holidays = parseInt(document.getElementById("holidays")?.value) || 0;

    let today = new Date().getDate();
    let totalDaysInMonth = daysInMonth;
    let remainingDaysInMonth = Math.max(0, totalDaysInMonth - today);

    let targetSKUPerDayFixed = 120;
    let targetMUPerDayFixed = 340;

    let totalMonthlySKUsTarget = targetSKUPerDayFixed * totalDaysInMonth;
    let totalMonthlyMUsTarget = targetMUPerDayFixed * totalDaysInMonth;

    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUsTarget - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUsTarget - totalMUs);

    let calculatedSKUsDaily_temp = 0;
    let calculatedMUsDaily_temp = 0;

    if (remainingDaysInMonth > 0) {
        calculatedSKUsDaily_temp = remainingSKUsMonthly / remainingDaysInMonth;
        calculatedMUsDaily_temp = remainingMUsMonthly / remainingDaysInMonth;
    } else {
        calculatedSKUsDaily_temp = remainingSKUsMonthly;
        calculatedMUsDaily_temp = remainingMUsMonthly;
    }

    calculatedDailySKU = calculatedSKUsDaily_temp;
    calculatedDailyMU = calculatedMUsDaily_temp;

    let totalProgressPoints = (totalMonthlySKUsTarget + totalMonthlyMUsTarget);
    let currentProgressPoints = (totalSKUs + totalMUs);
    let progress = (currentProgressPoints / totalProgressPoints) * 100;
    progress = Math.min(progress, 100);

    let message = "";
    if (totalSKUs >= totalMonthlySKUsTarget && totalMUs >= totalMonthlyMUsTarget) {
        message = "🌟 เก่งค่ะลูกกกก";
    } else if (progress >= 80) {
        message = "👍 ใกล้ถึงเป้าหมายแล้ว! สู้ๆ";
    } else {
        message = "💪 ดีขึ้นให้ได้นะ";
    }

    const resultsElement = document.getElementById("results");
    if (resultsElement) {
        resultsElement.innerHTML = `
            <p><strong>📅 จำนวนวันที่เหลือในเดือน:</strong> ${remainingDaysInMonth} วัน</p>
            <p><strong>📦 วันนี้ต้องจัด (เฉลี่ย):</strong> ${calculatedDailySKU.toFixed(0)} SKU / ${calculatedDailyMU.toFixed(0)} MU</p>
            <p><strong>📦 เดือนนี้ต้องจัด (รวม):</strong> ${remainingSKUsMonthly} SKU / ${remainingMUsMonthly} MU</p>
            <h3>${message}</h3>
            <p>📊 ความคืบหน้า: <strong>${progress.toFixed(2)}%</strong></p>
        `;
    }

    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        progressBar.style.width = `${progress.toFixed(2)}%`;
        progressBar.innerText = `${progress.toFixed(2)}%`;

        if (progress >= 100) {
            progressBar.style.backgroundColor = '#28a745';
        } else if (progress >= 80) {
            progressBar.style.backgroundColor = '#ffc107';
        } else {
            progressBar.style.backgroundColor = '#00c6ff';
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // ✅ ส่วนสำคัญ: เพิ่มโค้ดสำหรับดึงค่าจาก URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const skuFromIndex = urlParams.get('sku');
    const muFromIndex = urlParams.get('mu');
    const daysFromIndex = urlParams.get('days');
    const averageFromIndex = urlParams.get('average'); // ค่าเฉลี่ยที่คำนวณจาก index.html

    const resultContainer = document.getElementById("result-container");

    if (resultContainer && averageFromIndex) {
        let imageUrl = '';
        let messageText = '';
        const avg = parseFloat(averageFromIndex);

        // กำหนดรูปภาพและข้อความตามค่าเฉลี่ยที่ได้รับ
        // คุณสามารถปรับค่า threshold และ URL รูปภาพได้ตามต้องการ
        if (avg >= 50) {
            imageUrl = 'https://i.imgur.com/K1Lg0Jk.png'; // ตัวอย่าง URL รูปภาพ "เก่งมาก"
            messageText = '🌟 ยอดเยี่ยมมาก! คุณทำผลงานได้ดีเยี่ยม';
        } else if (avg >= 30) {
            imageUrl = 'https://i.imgur.com/o1Q4n8y.png'; // ตัวอย่าง URL รูปภาพ "ทำได้ดี"
            messageText = '👍 ทำได้ดีแล้ว! รักษามาตรฐานไว้นะ';
        } else {
            imageUrl = 'https://i.imgur.com/FwW3PzG.png'; // ตัวอย่าง URL รูปภาพ "ต้องพัฒนา"
            messageText = '💪 พยายามต่อไปนะ! เราเชื่อว่าคุณทำได้ดีกว่านี้';
        }

        // สร้างเนื้อหาที่จะแสดงใน result-container
        resultContainer.innerHTML = `
            <img src="${imageUrl}" alt="ผลลัพธ์" class="result-image" />
            <div class="result-text-and-average">
                <p>${messageText}</p>
                <p>ค่าเฉลี่ย: <span class="average-value">${averageFromIndex}</span></p>
                <p>จาก SKU: ${skuFromIndex}, MU: ${muFromIndex}, วัน: ${daysFromIndex}</p>
            </div>
        `;

        // เพิ่มคลาส visible เพื่อเรียกใช้ animation fade-slide-in
        resultContainer.classList.add('visible');
    } else if (resultContainer) {
        // กรณีไม่มีข้อมูลส่งมา (อาจจะเข้าหน้าโดยตรง)
        resultContainer.innerHTML = `<p>ไม่พบข้อมูลค่าเฉลี่ย. กรุณากลับไปที่หน้าหลักและคำนวณใหม่</p>`;
    }

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

    // ตรวจสอบว่ามีปุ่ม dailyAverageButton บนหน้า average.html หรือไม่ก่อนเพิ่ม Event Listener
    const dailyAverageButton = document.getElementById("dailyAverageButton");
    if (dailyAverageButton) {
        dailyAverageButton.addEventListener("click", () => {
            // เรียก calculateTargets() อีกครั้ง เพื่อให้แน่ใจว่าค่า calculatedDailySKU และ calculatedDailyMU เป็นค่าล่าสุด
            calculateTargets();
            const params = new URLSearchParams({
                skuDaily: calculatedDailySKU.toFixed(0),
                muDaily: calculatedDailyMU.toFixed(0)
            });
            window.location.href = `daily_average.html?${params.toString()}`;
        });
    }

    // เรียก calculateTargets() ครั้งแรกเมื่อโหลดหน้า (ถ้ามี element ที่เกี่ยวข้องกับ calculateTargets)
    // หาก average.html มีหน้าที่แสดงผลเฉลี่ยจาก index.html เพียงอย่างเดียว คุณอาจลบบรรทัดนี้ได้
    if (document.getElementById("totalSKUs") && document.getElementById("totalMUs")) {
        calculateTargets();
    }
});
