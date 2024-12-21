export const calculateRankings = (users) => {
    return users.sort((a, b) => b.score - a.score); // Sort by score (descending)
  };
  
  export const formatChallengeProgress = (current, goal) => {
    return `${current} / ${goal}`;
  };