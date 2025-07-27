// Content script for YouTube pages
console.log('PlayYtApi TV Remote extension loaded');

let tvSettings = null;

// Load TV settings
chrome.storage.sync.get(['tvIp', 'tvPort'], function(result) {
  if (result.tvIp && result.tvPort) {
    tvSettings = {
      ip: result.tvIp,
      port: result.tvPort
    };
    console.log('TV settings loaded:', tvSettings);
    addPlayOnTvButtons();
  } else {
    console.log('No TV settings found. Please configure in extension options.');
  }
});

// Listen for settings changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && (changes.tvIp || changes.tvPort)) {
    chrome.storage.sync.get(['tvIp', 'tvPort'], function(result) {
      if (result.tvIp && result.tvPort) {
        tvSettings = {
          ip: result.tvIp,
          port: result.tvPort
        };
        console.log('TV settings updated:', tvSettings);
        addPlayOnTvButtons();
      }
    });
  }
});

function addPlayOnTvButtons() {
  if (!tvSettings) return;
  
  // Remove existing buttons to avoid duplicates
  document.querySelectorAll('.play-on-tv-btn').forEach(btn => btn.remove());
  
  // Watch for new content (YouTube is a SPA)
  observePageChanges();
}

function getVideoIdFromUrl(url) {
  if (!url) return null;
  
  // Extract video ID from various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function playOnTv(videoId) {
  if (!tvSettings || !videoId) {
    showNotification('❌ Error: Missing TV settings or video ID', 'error');
    return;
  }
  
  showNotification('📺 Sending to TV...', 'info');
  
  try {
    const response = await fetch(`http://${tvSettings.ip}:${tvSettings.port}/play`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoId: videoId
      }),
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      showNotification('✅ Video sent to TV successfully!', 'success');
    } else {
      showNotification(`❌ Failed to send to TV (Status: ${response.status})`, 'error');
    }
  } catch (error) {
    if (error.name === 'TimeoutError') {
      showNotification('❌ Connection timeout. Is your TV on?', 'error');
    } else {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  }
}

function showNotification(message, type) {
  // Remove existing notifications
  document.querySelectorAll('.playytapi-notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `playytapi-notification playytapi-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

function observePageChanges() {
  // YouTube is a Single Page Application, so we need to watch for navigation
  let currentUrl = window.location.href;
  
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      // Page changed, re-add buttons after a short delay
      setTimeout(() => {
        addPlayOnTvButtons();
      }, 1000);
    }
    // Removed thumbnail button checking since we no longer use thumbnail buttons
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
