/**
 * Recommendation Engine
 * 
 * Core algorithm for generating recommendations based on user preferences
 * and desired adventure level.
 */

const { mapComfortZone, calculateNovelty, calculateSimilarity } = require('./comfort_zone');

/**
 * Generate recommendations for a user
 * @param {Object} userPreferences User's preference data
 * @param {Array} availableItems Pool of items to recommend from
 * @param {string} domain Content domain ("music", "art", "fashion")
 * @param {number} count Number of recommendations to return
 * @returns {Array} Recommended items
 */
function getRecommendations(userPreferences, availableItems, domain = 'music', count = 10) {
  // Map the user's comfort zone
  const comfortZone = mapComfortZone(userPreferences, domain);
  
  // Get adventure level (0-1)
  const adventureLevel = normalizeAdventureLevel(userPreferences);
  
  // Score all available items
  const scoredItems = scoreItems(availableItems, comfortZone, adventureLevel, domain);
  
  // Select top items
  const recommendations = selectTopItems(scoredItems, count);
  
  // Add recommendation metadata
  return enrichRecommendations(recommendations, comfortZone, domain);
}

/**
 * Normalize adventure level to 0-1 scale
 * @param {Object} userPreferences User preferences
 * @returns {number} Normalized adventure level
 */
function normalizeAdventureLevel(userPreferences) {
  // Default to moderate adventure level
  if (!userPreferences.adventureLevel) {
    return 0.5;
  }
  
  // Convert adventure level to 0-1 scale
  return userPreferences.adventureLevel / 100;
}

/**
 * Score all available items based on comfort zone and adventure level
 * @param {Array} items Items to score
 * @param {Object} comfortZone User's comfort zone
 * @param {number} adventureLevel How adventurous recommendations should be (0-1)
 * @param {string} domain Content domain
 * @returns {Array} Items with scores
 */
function scoreItems(items, comfortZone, adventureLevel, domain) {
  return items.map(item => {
    // Calculate similarity score (how well it matches preferences)
    const similarityScore = calculateSimilarity(item, comfortZone, domain);
    
    // Calculate novelty score (how different/new it is)
    const noveltyScore = calculateNovelty(item, comfortZone, domain);
    
    // Calculate blended score based on adventure level
    // - Low adventure: prioritize similarity
    // - High adventure: prioritize novelty
    const blendedScore = calculateBlendedScore(similarityScore, noveltyScore, adventureLevel);
    
    // Return scored item
    return {
      item,
      scores: {
        similarity: similarityScore,
        novelty: noveltyScore,
        blended: blendedScore
      }
    };
  });
}

/**
 * Calculate blended score based on similarity, novelty and adventure level
 * @param {number} similarityScore How similar the item is to preferences
 * @param {number} noveltyScore How novel the item is
 * @param {number} adventureLevel User's adventure preference (0-1)
 * @returns {number} Blended recommendation score
 */
function calculateBlendedScore(similarityScore, noveltyScore, adventureLevel) {
  // Basic linear blend
  // - At adventureLevel = 0, only similarity matters
  // - At adventureLevel = 1, only novelty matters
  // - In between, it's a weighted blend
  
  // The novelty component increases with adventure level
  const noveltyComponent = noveltyScore * adventureLevel;
  
  // The similarity component decreases with adventure level
  const similarityComponent = similarityScore * (1 - adventureLevel);
  
  // Combine them (could use more sophisticated formula)
  return similarityComponent + noveltyComponent;
}

/**
 * Select top-scoring items
 * @param {Array} scoredItems Items with scores
 * @param {number} count Number of items to select
 * @returns {Array} Top-scoring items
 */
function selectTopItems(scoredItems, count) {
  // Sort by blended score (descending)
  const sortedItems = [...scoredItems].sort((a, b) => {
    return b.scores.blended - a.scores.blended;
  });
  
  // Return top N items
  return sortedItems.slice(0, count);
}

/**
 * Add recommendation metadata for display/explanation
 * @param {Array} recommendations Scored recommendations
 * @param {Object} comfortZone User's comfort zone
 * @param {string} domain Content domain
 * @returns {Array} Enriched recommendations
 */
function enrichRecommendations(recommendations, comfortZone, domain) {
  return recommendations.map(recommendation => {
    const { item, scores } = recommendation;
    
    // Create explanation of why this was recommended
    const explanation = generateExplanation(item, scores, comfortZone, domain);
    
    // Add additional display metadata
    return {
      item,
      scores,
      explanation,
      recommendedAt: new Date()
    };
  });
}

/**
 * Generate human-readable explanation for recommendation
 * @param {Object} item Recommended item
 * @param {Object} scores Item scores
 * @param {Object} comfortZone User's comfort zone
 * @param {string} domain Content domain
 * @returns {Object} Explanation data
 */
function generateExplanation(item, scores, comfortZone, domain) {
  // Different explanation strategies based on scores
  
  // High similarity, low novelty: "Because you like X"
  if (scores.similarity > 0.8 && scores.novelty < 0.3) {
    return generateSimilarityExplanation(item, comfortZone, domain);
  }
  
  // High novelty, decent similarity: "Something new that matches your taste"
  if (scores.novelty > 0.7 && scores.similarity > 0.4) {
    return generateNoveltyExplanation(item, comfortZone, domain);
  }
  
  // Balanced: "A blend of familiar and new"
  return generateBalancedExplanation(item, comfortZone, domain);
}

// These functions would generate appropriate explanations based on the domain and item details
function generateSimilarityExplanation(item, comfortZone, domain) {
  // Implementation would create specific explanation
  return { type: 'similarity', text: 'Based on your preferences' };
}

function generateNoveltyExplanation(item, comfortZone, domain) {
  // Implementation would create specific explanation
  return { type: 'novelty', text: 'Something new you might enjoy' };
}

function generateBalancedExplanation(item, comfortZone, domain) {
  // Implementation would create specific explanation
  return { type: 'balanced', text: 'A balance of familiar and new' };
}

/**
 * Process user feedback on recommendations
 * @param {Object} userPreferences Current user preferences
 * @param {Object} item Item that received feedback
 * @param {string} reaction User's reaction ('like', 'dislike', 'save')
 * @param {string} domain Content domain
 * @returns {Object} Updated user preferences
 */
function processFeedback(userPreferences, item, reaction, domain = 'music') {
  // Clone preferences to avoid modifying the original
  const updatedPreferences = JSON.parse(JSON.stringify(userPreferences));
  
  switch(reaction) {
    case 'like':
      // Expand comfort zone to include this item
      expandComfortZone(updatedPreferences, item, domain);
      
      // If this was novel, slightly increase adventure level
      if (isNovelItem(item, userPreferences, domain)) {
        updatedPreferences.adventureLevel = Math.min(
          100, 
          (updatedPreferences.adventureLevel || 50) + 5
        );
      }
      break;
      
    case 'dislike':
      // If this was novel, slightly decrease adventure level
      if (isNovelItem(item, userPreferences, domain)) {
        updatedPreferences.adventureLevel = Math.max(
          0, 
          (updatedPreferences.adventureLevel || 50) - 3
        );
      }
      
      // Add to exclusion patterns
      addToExclusionPatterns(updatedPreferences, item, domain);
      break;
      
    case 'save':
      // Similar to like but with stronger preference signal
      expandComfortZone(updatedPreferences, item, domain, 1.5); // Higher expansion factor
      break;
  }
  
  return updatedPreferences;
}

/**
 * Determine if an item is novel relative to user preferences
 * @param {Object} item Item to check
 * @param {Object} userPreferences User preferences
 * @param {string} domain Content domain
 * @returns {boolean} Whether the item is novel
 */
function isNovelItem(item, userPreferences, domain) {
  const comfortZone = mapComfortZone(userPreferences, domain);
  const noveltyScore = calculateNovelty(item, comfortZone, domain);
  
  // Items with novelty > 0.6 are considered "novel"
  return noveltyScore > 0.6;
}

// Placeholder functions that would be implemented in a complete system

function expandComfortZone(preferences, item, domain, factor = 1) {
  // Implementation would expand preference boundaries
}

function addToExclusionPatterns(preferences, item, domain) {
  // Implementation would add patterns to avoid
}

module.exports = {
  getRecommendations,
  processFeedback
};