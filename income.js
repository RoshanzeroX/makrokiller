document.addEventListener("DOMContentLoaded", function() {
    // Get references to input elements
    const skuInput = document.getElementById("skuInput");
    const muInput = document.getElementById("muInput");
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");

    // Get references to display elements
    const tierSKUElement = document.getElementById("tierSKU");
    const tierMUElement = document.getElementById("tierMU");
    const incentiveSKUElement = document.getElementById("incentiveSKU");
    const incentiveMUElement = document.getElementById("incentiveMU");
    const totalIncentiveElement = document.getElementById("totalIncentive"); // The span for "วันนี้ได้เงิน"
    
    // Get references to Progress Bar elements
    const progressBarFillDynamic = document.getElementById("progressBarFillDynamic");
    const progressTextOverlay = document.getElementById("progressTextOverlay");

    // Event listener for the Calculate button
    calculateBtn.addEventListener("click", function() {
        const sku = parseFloat(skuInput.value);
        const mu = parseFloat(muInput.value);

        // Input validation
        if (isNaN(sku) || sku < 0 || isNaN(mu) || mu < 0) {
            alert("กรุณากรอกข้อมูลเป็นตัวเลขที่ถูกต้องและเป็นบวก");
            return; // Stop execution if input is invalid
        }

        // --- SKU Tier Calculation ---
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

        // --- MU Tier Calculation ---
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

        // --- Incentive Calculation ---
        const incentiveSKU = sku * payoutSKU;
        const incentiveMU = mu * payoutMU;
        const totalIncentive = incentiveSKU + incentiveMU;

        // --- Update UI for Tier and Incentives ---
        tierSKUElement.textContent = tierSKU;
        tierMUElement.textContent = tierMU;
        incentiveSKUElement.textContent = incentiveSKU.toFixed(2); // Format to 2 decimal places
        incentiveMUElement.textContent = incentiveMU.toFixed(2);   // Format to 2 decimal places
        totalIncentiveElement.textContent = totalIncentive.toFixed(2); // Update "วันนี้ได้เงิน"

        // --- Progress Bar Logic ---
        const limit = 300; // The defined limit for incentive
        const percentage = (totalIncentive / limit) * 100; // Calculate percentage relative to the limit
        
        // Set the width of the progress bar based on the calculated percentage.
        // The bar can visually exceed 100% of its container to show overage.
        progressBarFillDynamic.style.width = `${percentage}%`;

        // Determine the background color of the progress bar
        if (totalIncentive <= limit) {
            // If the total incentive is within or equal to the limit (300 Baht)
            // The entire bar should be solid blue.
            progressBarFillDynamic.style.background = '#007bff'; // Solid blue color
        } else {
            // If the total incentive exceeds the limit (300 Baht)
            // Use a linear-gradient to show the blue part (up to limit) and the red part (overage).
            
            // Calculate the relative percentage of the blue part within the total incentive.
            // Example: if totalIncentive = 400, limit = 300
            // bluePartRelative = (300 / 400) * 100 = 75%
            // This means 75% of the bar's total width will be blue, and the remaining 25% will be red.
            const bluePartRelative = (limit / totalIncentive) * 100; 

            // Apply the linear-gradient:
            // Blue from 0% to bluePartRelative% of the bar's width
            // Red from bluePartRelative% to 100% of the bar's width
            progressBarFillDynamic.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${bluePartRelative}%, #dc3545 ${bluePartRelative}%, #dc3545 100%)`;
        }

        // Update the percentage text displayed on the progress bar
        progressTextOverlay.textContent = `${percentage.toFixed(1)}%`;
    });

    // Event listener for the Reset button
    resetBtn.addEventListener("click", function() {
        // Clear input fields
        skuInput.value = "";
        muInput.value = "";

        // Reset all display elements to their initial state
        tierSKUElement.textContent = "-";
        tierMUElement.textContent = "-";
        incentiveSKUElement.textContent = "0";
        incentiveMUElement.textContent = "0";
        totalIncentiveElement.textContent = "0"; // Reset "วันนี้ได้เงิน"

        // Reset Progress Bar to initial state (0% width, solid blue, 0% text)
        progressBarFillDynamic.style.width = "0%";
        progressBarFillDynamic.style.background = "#007bff"; // Ensure it resets to solid blue
        progressTextOverlay.textContent = "0%";
    });
});
