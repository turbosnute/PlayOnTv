// Load saved settings
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
});

// Save settings
document.getElementById('settingsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  saveSettings();
});

// Test connection
document.getElementById('testButton').addEventListener('click', function() {
  testConnection();
});

function loadSettings() {
  chrome.storage.sync.get(['tvIp', 'tvPort'], function(result) {
    if (result.tvIp) {
      document.getElementById('tvIp').value = result.tvIp;
    }
    if (result.tvPort) {
      document.getElementById('tvPort').value = result.tvPort;
    } else {
      document.getElementById('tvPort').value = '8383';
    }
  });
}

function saveSettings() {
  const tvIp = document.getElementById('tvIp').value.trim();
  const tvPort = document.getElementById('tvPort').value.trim();
  
  if (!tvIp || !tvPort) {
    showStatus('Please fill in both IP address and port.', 'error');
    return;
  }
  
  // Validate IP address format
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(tvIp)) {
    showStatus('Please enter a valid IP address (e.g., 192.168.1.152).', 'error');
    return;
  }
  
  // Validate port
  const port = parseInt(tvPort);
  if (port < 1 || port > 65535) {
    showStatus('Please enter a valid port number (1-65535).', 'error');
    return;
  }
  
  chrome.storage.sync.set({
    tvIp: tvIp,
    tvPort: tvPort
  }, function() {
    showStatus('Settings saved successfully!', 'success');
  });
}

async function testConnection() {
  const tvIp = document.getElementById('tvIp').value.trim();
  const tvPort = document.getElementById('tvPort').value.trim();
  
  if (!tvIp || !tvPort) {
    showStatus('Please fill in IP address and port before testing.', 'error');
    return;
  }
  
  const testButton = document.getElementById('testButton');
  testButton.disabled = true;
  testButton.textContent = 'Testing...';
  
  try {
    const response = await fetch(`http://${tvIp}:${tvPort}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      showStatus(`✅ Connection successful! ${data.message || 'PlayYtApi is responding.'}`, 'success');
    } else {
      showStatus(`❌ Connection failed. Server returned status ${response.status}.`, 'error');
    }
  } catch (error) {
    if (error.name === 'TimeoutError') {
      showStatus('❌ Connection timeout. Check if PlayYtApi is running and the IP/port are correct.', 'error');
    } else if (error.message.includes('CORS')) {
      showStatus('❌ CORS error. This is expected - the extension should still work on YouTube.', 'error');
    } else {
      showStatus(`❌ Connection failed: ${error.message}`, 'error');
    }
  } finally {
    testButton.disabled = false;
    testButton.textContent = 'Test Connection';
  }
}

function showStatus(message, type) {
  const statusDiv = document.getElementById('statusMessage');
  statusDiv.textContent = message;
  statusDiv.className = `status-message status-${type}`;
  statusDiv.style.display = 'block';
  
  // Hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }
}
