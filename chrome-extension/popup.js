document.addEventListener('DOMContentLoaded', function() {
  loadPopupData();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('openSettingsBtn').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
  
  document.getElementById('testConnectionBtn').addEventListener('click', function() {
    testConnection();
  });
  
  document.getElementById('playCurrentBtn').addEventListener('click', function() {
    playCurrentVideo();
  });
}

async function loadPopupData() {
  // Load settings and check connection
  const settings = await new Promise(resolve => {
    chrome.storage.sync.get(['tvIp', 'tvPort'], resolve);
  });
  
  if (!settings.tvIp || !settings.tvPort) {
    updateConnectionStatus('No TV configured', false);
    return;
  }
  
  // Check connection
  await checkConnection(settings.tvIp, settings.tvPort);
  
  // Get current video info
  getCurrentVideoInfo();
}

async function checkConnection(ip, port) {
  try {
    const response = await fetch(`http://${ip}:${port}/status`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      updateConnectionStatus(`Connected to ${ip}:${port}`, true);
    } else {
      updateConnectionStatus(`Connection failed (${response.status})`, false);
    }
  } catch (error) {
    updateConnectionStatus('Connection failed', false);
  }
}

function updateConnectionStatus(message, isConnected) {
  const statusDiv = document.getElementById('connectionStatus');
  statusDiv.textContent = message;
  statusDiv.className = `status ${isConnected ? 'status-connected' : 'status-disconnected'}`;
  
  // Make status more visible temporarily during tests
  if (message.includes('✅') || message.includes('❌')) {
    statusDiv.style.fontWeight = 'bold';
    statusDiv.style.fontSize = '14px';
    setTimeout(() => {
      statusDiv.style.fontWeight = 'normal';
      statusDiv.style.fontSize = '12px';
    }, 3000);
  }
}

async function getCurrentVideoInfo() {
  // Get current tab
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  
  if (tab && tab.url && tab.url.includes('youtube.com/watch')) {
    const videoId = extractVideoId(tab.url);
    if (videoId) {
      document.getElementById('videoInfo').textContent = `Video ID: ${videoId}`;
      document.getElementById('currentVideo').style.display = 'block';
      
      // Store current video ID for play button
      document.getElementById('playCurrentBtn').dataset.videoId = videoId;
    }
  }
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function testConnection() {
  const button = document.getElementById('testConnectionBtn');
  const originalText = button.textContent;
  button.textContent = '🔄 Testing...';
  button.disabled = true;
  
  const settings = await new Promise(resolve => {
    chrome.storage.sync.get(['tvIp', 'tvPort'], resolve);
  });
  
  if (!settings.tvIp || !settings.tvPort) {
    updateConnectionStatus('No TV configured', false);
    button.textContent = '❌ No Config';
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
    return;
  }
  
  try {
    const response = await fetch(`http://${settings.tvIp}:${settings.tvPort}/status`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      updateConnectionStatus(`✅ Connected to ${settings.tvIp}:${settings.tvPort}`, true);
      button.textContent = '✅ Connected!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
    } else {
      updateConnectionStatus(`❌ Connection failed (${response.status})`, false);
      button.textContent = `❌ Failed (${response.status})`;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
    }
  } catch (error) {
    let errorMsg = 'Connection failed';
    if (error.name === 'TimeoutError') {
      errorMsg = 'Connection timeout';
    } else if (error.message.includes('fetch')) {
      errorMsg = 'Network error';
    }
    
    updateConnectionStatus(`❌ ${errorMsg}`, false);
    button.textContent = `❌ ${errorMsg}`;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  }
}

async function playCurrentVideo() {
  const button = document.getElementById('playCurrentBtn');
  const videoId = button.dataset.videoId;
  
  if (!videoId) {
    alert('No video ID found');
    return;
  }
  
  const originalText = button.textContent;
  button.textContent = '📺 Sending...';
  button.disabled = true;
  
  const settings = await new Promise(resolve => {
    chrome.storage.sync.get(['tvIp', 'tvPort'], resolve);
  });
  
  if (!settings.tvIp || !settings.tvPort) {
    alert('Please configure TV settings first');
    button.textContent = originalText;
    button.disabled = false;
    return;
  }
  
  try {
    const response = await fetch(`http://${settings.tvIp}:${settings.tvPort}/play`, {
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
      button.textContent = '✅ Sent!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    button.textContent = '❌ Failed';
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }
}
