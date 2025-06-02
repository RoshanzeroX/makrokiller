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

    let totalMonthlySKUs = 120 * daysInMonth;
    let totalMonthlyMUs = 340 * daysInMonth;

    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUs - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUs - totalMUs);

    document.getElementById("results").innerHTML = `
        <p><strong>📅 จำนวนวันทำงานที่เหลือ:</strong> ${remainingDays} วัน</p>
        <p><strong>📦 เดือนนี้ต้องทำ:</strong> ${remainingSKUsMonthly} SKU / ${remainingMUsMonthly} MU</p>
    `;
}

function toggleFullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}

function goToIndex() {
    window.location.href = "index.html";
}
