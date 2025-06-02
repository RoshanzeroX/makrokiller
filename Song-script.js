function updateDateTime() {
    let now = new Date();
    document.getElementById("currentTime").innerText = `⏳ ${now.toLocaleTimeString('th-TH')}`;
    document.getElementById("currentDate").innerText = `📅 ${now.toLocaleString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}`;
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

    let totalMonthlySKUs = 120 * daysInMonth;
    let totalMonthlyMUs = 340 * daysInMonth;

    let remainingDays = workingDays - today;
    let remainingSKUsMonthly = Math.max(0, totalMonthlySKUs - totalSKUs);
    let remainingMUsMonthly = Math.max(0, totalMonthlyMUs - totalMUs);

    let message = (totalSKUs >= totalMonthlySKUs && totalMUs >= totalMonthlyMUs) 
        ? "🌟 เก่งค่ะลูกกกก" 
        : "💪 ดีขึ้นให้ได้นะ";

    document.getElementById("results").innerHTML = `
        <p>📅 จำนวนวันทำงานที่เหลือ: ${remainingDays} วัน</p>
        <p>📦 เดือนนี้ต้องทำ: ${remainingSKUsMonthly} SKU / ${remainingMUsMonthly} MU</p>
        <h3>${message}</h3>
    `;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
