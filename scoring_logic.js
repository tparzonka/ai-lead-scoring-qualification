/**
 * ENTERPRISE LEAD SCORING LOGIC
 * This script handles technical validation and merges it with AI-generated intent data.
 */

// 1. DATA SANITIZATION & TECHNICAL VALIDATION
function validateLead(inputData) {
    const email = inputData.email || "";
    const phoneInput = inputData.phone || "";
    
    // Clean Phone Number: Remove all non-digits and normalize Polish prefix
    let cleanPhone = phoneInput.replace(/\D/g, '');
    if (cleanPhone.length === 11 && cleanPhone.startsWith('48')) {
        cleanPhone = cleanPhone.substring(2);
    }
    const isPhoneValid = cleanPhone.length === 9;

    // Email Domain Analysis
    const freeDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    const emailParts = email.split('@');
    let domain = "";
    let isCorporateEmail = false;

    if (emailParts.length === 2) {
        domain = emailParts[1].toLowerCase();
        isCorporateEmail = !freeDomains.includes(domain);
    }

    // Technical Score Calculation (Base 50 points)
    let techScore = 0;
    if (isPhoneValid) techScore += 15;
    if (isCorporateEmail) techScore += 35; else techScore += 5;

    return { cleanPhone, domain, techScore, isPhoneValid };
}

// 2. FINAL AGGREGATION (Combining Tech Score with AI Intent Score)
function aggregateFinalScore(techScore, aiPoints) {
    const finalScore = techScore + aiPoints;
    let status = "❄️ COLD LEAD";
    let priorityColor = "#36a64f"; // Green

    if (finalScore >= 60) {
        status = "🔥 HOT LEAD";
        priorityColor = "#ff0000"; // Red Alert
    } else if (finalScore >= 30) {
        status = "🌤️ WARM LEAD";
        priorityColor = "#ffa500"; // Orange
    }

    return { finalScore, status, priorityColor };
}

// Example usage:
const lead = validateLead({ email: "john@company.com", phone: "+48 123-456-789" });
const result = aggregateFinalScore(lead.techScore, 45); // Assuming AI gave 45 points
console.log(`Lead Status: ${result.status} with Score: ${result.finalScore}`);