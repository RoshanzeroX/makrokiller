document.addEventListener("DOMContentLoaded", function() {
    const skuInput = document.getElementById("skuInput");
    const muInput = document.getElementById("muInput");
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");

    const tierSKUElement = document.getElementById("tierSKU");
    const tierMUElement = document.getElementById("tierMU");
    const incentiveSKUElement = document.getElementById("incentiveSKU");
    const incentiveMUElement = document.getElementById("incentiveMU");
    const totalIncentiveElement = document.getElementById("totalIncentive");
    
    const progressBarFillDynamic = document.getElementById("progressBarFillDynamic");
    const progressTextOverlay = document.getElementById("progressTextOverlay");

    calculateBtn.addEventListener("click", function() {
        const sku = parseFloat(skuInput.value);
        const mu = parseFloat(muInput.value);

        if (isNaN(sku) || sku < 0 || isNaN(mu) || mu < 0) {
            alert("กรุณากรอกข้อมูลเป็นตัวเลขที่ถูกต้องและเป็นบวก");
            return;
        }

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

        const incentiveSKU = sku * payoutSKU;
        const incentiveMU = mu * payoutMU;
        const totalIncentive = incentiveSKU + incentiveMU;

        tierSKUElement.textContent = tierSKU;
        tierMUElement.textContent = tierMU;
        incentiveSKUElement.textContent = incentiveSKU.toFixed(2);
        incentiveMUElement.textContent = incentiveMU.toFixed(2);
        totalIncentiveElement.textContent = totalIncentive.toFixed(2);

        const limit = 300;
        const percentage = (totalIncentive / limit) * 100;
        
        // จำกัดความกว้างของแถบ Progress Bar ให้ไม่เกิน 100% ของกรอบเสมอ
        // แต่ยังคงแสดงค่าตามเปอร์เซ็นต์ที่คำนวณได้จริงใน text overlay
        progressBarFillDynamic.style.width = `${Math.min(percentage, 100)}%`;

        // ตรวจสอบเงื่อนไขเพื่อกำหนดสีของแถบ
        if (totalIncentive <= limit) {
            // ถ้า Incentive รวม ไม่เกิน Limit (300 บาท)
            // แถบจะเป็นสีน้ำเงินทั้งหมด
            progressBarFillDynamic.style.background = '#007bff'; // สีน้ำเงิน
        } else {
            // ถ้า Incentive รวม เกิน Limit (300 บาท)
            // แถบจะกว้าง 100% และใช้ linear-gradient แบ่งสีน้ำเงิน (ส่วนที่ถึง 300) 
            // กับสีแดง (ส่วนที่เกินมา) ภายในแถบ 100% นั้น
            
            // blueFillPercentageOfBar คือเปอร์เซ็นต์ของแถบ 100% ที่ควรเป็นสีน้ำเงิน
            // (คำนวณจากสัดส่วนของ Limit เทียบกับ Total Incentive ทั้งหมด)
            // เช่น ถ้า Total Incentive คือ 450 (150% ของ 300), Blue จะเป็น 300/450 = 66.67% ของแถบ
            const blueFillPercentageOfBar = (limit / totalIncentive) * 100; 
            
            progressBarFillDynamic.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${blueFillPercentageOfBar}%, #dc3545 ${blueFillPercentageOfBar}%, #dc3545 100%)`;
        }

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
        totalIncentiveElement.textContent = "0";

        // Reset Progress Bar to initial state (0% width, solid blue, 0% text)
        progressBarFillDynamic.style.width = "0%";
        progressBarFillDynamic.style.background = "#007bff"; // กลับเป็นสีน้ำเงินเริ่มต้น
        progressTextOverlay.textContent = "0%";
    });
});
