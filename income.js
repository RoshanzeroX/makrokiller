document.addEventListener("DOMContentLoaded", function() {
    const skuInput = document.getElementById("skuInput");
    const muInput = document.getElementById("muInput");
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");

    const tierSKUElement = document.getElementById("tierSKU");
    const tierMUElement = document.getElementById("tierMU");
    const incentiveSKUElement = document.getElementById("incentiveSKU");
    const incentiveMUElement = document.getElementById("incentiveMU");
    const totalIncentiveElement = document.getElementById("totalIncentive"); // อ้างอิงถึง span ใน p "วันนี้ได้เงิน"
    
    // อ้างอิงถึง elements ของ Progress Bar ใหม่
    const progressBarFillDynamic = document.getElementById("progressBarFillDynamic");
    const progressTextOverlay = document.getElementById("progressTextOverlay");

    calculateBtn.addEventListener("click", function() {
        const sku = parseFloat(skuInput.value);
        const mu = parseFloat(muInput.value);

        // ตรวจสอบข้อมูลนำเข้า
        if (isNaN(sku) || sku < 0 || isNaN(mu) || mu < 0) {
            alert("กรุณากรอกข้อมูลเป็นตัวเลขที่ถูกต้องและเป็นบวก");
            return;
        }

        // Check tier for SKU
        let tierSKU = "-", payoutSKU = 0;
        if (sku <= 120) {
            tierSKU = "<= 10"; payoutSKU = 0;
        } else if (sku >= 132 && sku <= 168) {
            tierSKU = "Silver"; payoutSKU = 0.50;
        } else if (sku >= 180 && sku <= 204) {
            tierSKU = "Gold"; payoutSKU = 0.58;
        } else if (sku >= 216 && sku <= 240) {
            tierSKU = "Platinum"; payoutSKU = 0.67;
        } else if (sku >= 252) {
            tierSKU = "Diamond"; payoutSKU = 0.83;
        }

        // Check tier for MU
        let tierMU = "-", payoutMU = 0;
        if (mu <= 340) {
            tierMU = "<= 10"; payoutMU = 0;
        } else if (mu >= 374 && mu <= 476) {
            tierMU = "Silver"; payoutMU = 0.18;
        } else if (mu >= 510 && mu <= 578) {
            tierMU = "Gold"; payoutMU = 0.21;
        } else if (mu >= 612 && mu <= 680) {
            tierMU = "Platinum"; payoutMU = 0.24;
        } else if (mu >= 714) {
            tierMU = "Diamond"; payoutMU = 0.29;
        }

        // Calculate incentives
        const incentiveSKU = sku * payoutSKU;
        const incentiveMU = mu * payoutMU;
        const totalIncentive = incentiveSKU + incentiveMU;

        // Update UI
        tierSKUElement.textContent = tierSKU;
        tierMUElement.textContent = tierMU;
        incentiveSKUElement.textContent = incentiveSKU.toFixed(2);
        incentiveMUElement.textContent = incentiveMU.toFixed(2);
        totalIncentiveElement.textContent = totalIncentive.toFixed(2); // อัปเดต "วันนี้ได้เงิน"

        // --- Logic สำหรับ Progress Bar ---
        const limit = 300;
        const percentage = (totalIncentive / limit) * 100;
        
        // กำหนดความกว้างรวมของแถบ Progress Bar
        // ถ้าเกิน 100% ก็ให้แถบยื่นออกไปเกิน Container ได้
        progressBarFillDynamic.style.width = `${percentage}%`;

        // คำนวณจุดแบ่งสีน้ำเงินและแดง
        // bluePartRatio คือสัดส่วนของ Incentive เทียบกับ Limit (สูงสุดคือ 1 หรือ 100%)
        const bluePartRatio = Math.min(1, totalIncentive / limit); 
        // แปลงเป็นเปอร์เซ็นต์สำหรับ gradient (ถ้า totalIncentive = 400, limit = 300 -> bluePartRatio = 0.75 -> 75%)
        const bluePercentOfBar = bluePartRatio * 100; 

        // กำหนดสีของแถบด้วย linear-gradient
        // สีน้ำเงิน 0% ถึง bluePercentOfBar%
        // สีแดง bluePercentOfBar% ถึง 100% (ของความยาวแถบที่คำนวณได้)
        progressBarFillDynamic.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${bluePercentOfBar}%, #dc3545 ${bluePercentOfBar}%, #dc3545 100%)`;

        // อัปเดตข้อความบนแถบ
        progressTextOverlay.textContent = `${percentage.toFixed(1)}%`;
    });

    resetBtn.addEventListener("click", function() {
        skuInput.value = "";
        muInput.value = "";

        tierSKUElement.textContent = "-";
        tierMUElement.textContent = "-";
        incentiveSKUElement.textContent = "0";
        incentiveMUElement.textContent = "0";
        totalIncentiveElement.textContent = "0"; // Reset "วันนี้ได้เงิน"

        // Reset Progress Bar
        progressBarFillDynamic.style.width = "0%";
        progressBarFillDynamic.style.background = "#007bff"; // กลับเป็นสีน้ำเงินเริ่มต้น
        progressTextOverlay.textContent = "0%";
    });
});
