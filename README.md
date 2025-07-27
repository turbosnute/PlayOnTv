# PlayOnTv 📺

A Chrome extension that seamlessly integrates with [PlayYtApi](https://github.com/turbosnute/PlayYtApi) to send YouTube videos directly to your Android TV.

## 📋 Prerequisites

- **Chrome Browser**: The extension is built for Chrome
- **Android TV**: Running the [PlayYtApi](https://github.com/turbosnute/PlayYtApi) application
- **Same Network**: Both devices must be on the same local network

## 📦 Installation

### 1. Download/Clone the Repository

```bash
git clone https://github.com/yourusername/PlayOnTv.git
cd PlayOnTv
```

### 2. Install the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from this project
5. The extension should now appear in your extensions list

### 3. Configure Your Android TV

1. Ensure PlayYtApi is running on your Android TV
2. Find your TV's IP address:
   - Go to Settings → Device Preferences → About → Status → IP address
   - Note this IP address (e.g., `192.168.1.152`)

### 4. Configure the Extension

1. Click the PlayYtApi TV Remote icon in your Chrome toolbar
2. Click "⚙️ Settings"
3. Enter your Android TV's IP address
4. Enter the port number (default: `8383`)
5. Click "Test Connection" to verify connectivity
6. Click "Save Settings"

## 🎯 How to Use

### Via Extension Popup
- Click the extension icon in Chrome toolbar
- If you're on a YouTube video page, click "▶️ Play on TV"
- Access settings and connection testing from the popup

**No data is sent to external servers** - all communication happens directly between your browser and your local Android TV.
