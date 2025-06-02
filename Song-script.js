function updateDateTime() {
    let now = new Date();
    document.getElementById("currentDateTime").innerHTML = `<strong>📅 ${now.toLocaleString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })} ⏳ ${now.toLocaleTimeString('th-TH')}</strong>`;
    document.getElementById("yearCE").innerHTML = `<strong>${now.getFullYear()}</strong>`;
    document.getElementById("yearBE").innerHTML = `<strong>${now.getFullYear() + 543}</strong>`;
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
    let remainingDays = workingDays - today;

    let totalMonthlySKUs = 120 * daysInMonth;
    let totalMonthlyMUs = 340 * daysInMonth;

    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUs - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUs - totalMUs);
    let remainingSKUsDaily = remainingDays > 0 ? (remainingSKUsMonthly / remainingDays).toFixed(2) : remainingSKUsMonthly;
    let remainingMUsDaily = remainingDays > 0 ? (remainingMUsMonthly / remainingDays).toFixed(2) : remainingMUsMonthly;

    let progress = ((totalSKUs + totalMUs) / (totalMonthlySKUs + totalMonthlyMUs)) * 100;
    progress = Math.min(progress, 100);

    let message = (totalSKUs >= totalMonthlySKUs && totalMUs >= totalMonthlyMUs) 
        ? "<strong style='color: green;'>🌟 เก่งค่ะลูกกกก</strong>" 
        : "<strong style='color: orange;'>💪 ดีขึ้นให้ได้นะ</strong>";

    document.getElementById("results").innerHTML = `
        <p><strong>📅 จำนวนวันทำงานที่เหลือ:</strong> <span style="color: yellow;">${remainingDays}</span> วัน</p>
        <p><strong>📦 วันนี้ต้องทำ:</strong> <span style="color: cyan;">${remainingSKUsDaily}</span> SKU / <span style="color: cyan;">${remainingMUsDaily}</span> MU</p>
        <p><strong>📦 เดือนนี้ต้องทำ:</strong> <span style="color: lime;">${remainingSKUsMonthly}</span> SKU / <span style="color: lime;">${remainingMUsMonthly}</span> MU</p>
        <h3>${message}</h3>
    `;

    document.getElementById("progressBar").style.width = `${progress.toFixed(2)}%`;
    document.getElementById("progressBar").innerHTML = `<strong>${progress.toFixed(2)}%</strong>`;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
