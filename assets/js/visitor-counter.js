// Simple visitor counter using localStorage
document.addEventListener('DOMContentLoaded', function() {
  // Check if localStorage is available
  function isLocalStorageAvailable() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Update visitor count
  function updateVisitorCount() {
    if (!isLocalStorageAvailable()) {
      document.getElementById('visitor-count').textContent = 'Visitor counting unavailable';
      return;
    }

    // Get the current date
    const today = new Date().toLocaleDateString();
    
    // Initialize counts object if it doesn't exist
    if (!localStorage.getItem('visitorCounts')) {
      localStorage.setItem('visitorCounts', JSON.stringify({
        total: 0,
        dailyStats: {}
      }));
    }
    
    const counts = JSON.parse(localStorage.getItem('visitorCounts'));
    
    // Increment total count
    counts.total += 1;
    
    // Update daily stats
    if (!counts.dailyStats[today]) {
      counts.dailyStats[today] = 0;
    }
    counts.dailyStats[today] += 1;
    
    // Save updated counts
    localStorage.setItem('visitorCounts', JSON.stringify(counts));
    
    // Update the count display
    document.getElementById('visitor-count').textContent = counts.total;
  }

  // Only count unique visits (once per browser session)
  if (!sessionStorage.getItem('visited')) {
    sessionStorage.setItem('visited', 'true');
    updateVisitorCount();
  } else {
    // If already visited in this session, just display the count
    if (isLocalStorageAvailable()) {
      const counts = JSON.parse(localStorage.getItem('visitorCounts')) || { total: 0 };
      document.getElementById('visitor-count').textContent = counts.total;
    } else {
      document.getElementById('visitor-count').textContent = 'Visitor counting unavailable';
    }
  }
});