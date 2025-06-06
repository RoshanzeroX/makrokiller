document.getElementById("calculateBtn").addEventListener("click", function() {
    const sku = parseFloat(document.getElementById("skuInput").value);
    const mu = parseFloat(document.getElementById("muInput").value);

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

    // Calculate % of limit
    const percent = (totalIncentive / 300) * 100;
    const percentText = percent.toFixed(1) + "%";

    // Update UI
    document.getElementById("tierSKU").textContent = tierSKU;
    document.getElementById("tierMU").textContent = tierMU;
    document.getElementById("incentiveSKU").textContent = incentiveSKU.toFixed(2);
    document.getElementById("incentiveMU").textContent = incentiveMU.toFixed(2);
    document.getElementById("totalIncentive").textContent = totalIncentive.toFixed(2);

    const percentElement = document.getElementById("percentLimit");
    percentElement.textContent = percentText;
    percentElement.classList.remove("green", "red");

    if (percent <= 100) {
        percentElement.classList.add("green");
    } else {
        percentElement.classList.add("red");
    }
});

document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("skuInput").value = "";
    document.getElementById("muInput").value = "";

    document.getElementById("tierSKU").textContent = "-";
    document.getElementById("tierMU").textContent = "-";
    document.getElementById("incentiveSKU").textContent = "0";
    document.getElementById("incentiveMU").textContent = "0";
    document.getElementById("totalIncentive").textContent = "0";
    const percentElement = document.getElementById("percentLimit");
    percentElement.textContent = "0%";
    percentElement.classList.remove("green", "red");
});
