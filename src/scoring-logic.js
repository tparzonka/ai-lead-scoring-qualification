/**
 * Lead Scoring Algorithm
 * Calculates total score based on technical quality and AI assessment.
 */

export default function calculateScore(techData, aiResponse) {
    const techScore = techData.techScore;
    const aiScore = aiResponse.punkty_ai;
    
    const totalScore = techScore + aiScore;
    
    let label = "COLD";
    let priority = "Low";
    
    // Thresholds
    if (totalScore >= 60) {
        label = "HOT LEAD";
        priority = "High";
    } else if (totalScore >= 30) {
        label = "WARM LEAD";
        priority = "Medium";
    }
    
    return {
        totalScore,
        label,
        priority
    };
}
