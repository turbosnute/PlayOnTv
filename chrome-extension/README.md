# PlayYtApi Chrome Extension

A Chrome extension that adds "Play on TV" functionality to YouTube, allowing you to send videos directly to your Android TV running PlayYtApi.

## 🚀 Features

- **📺 Play on TV Button**: Adds TV buttons to YouTube video player and thumbnails
- **⚙️ Easy Configuration**: Simple settings page to configure your Android TV IP and port
- **🔍 Connection Testing**: Test your connection to make sure everything works
- **📱 Popup Interface**: Quick access via extension popup
- **🎯 Auto-Detection**: Automatically detects video IDs from any YouTube page

## 📦 Installation

### Method 1: Load as Unpacked Extension (Development)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from your PlayYtApi project
5. The extension should now appear in your extensions list

### Method 2: Create Extension Package

1. In Chrome, go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Pack extension"
4. Select the `chrome-extension` folder
5. This creates a `.crx` file you can install

## ⚙️ Setup

### 1. Configure Your Android TV

1. Make sure your PlayYtApi app is running on your Android TV
2. Note your Android TV's IP address (Settings → Device Preferences → About → Status → IP address)

### 2. Configure the Extension

1. Click the extension icon in Chrome toolbar
2. Click "⚙️ Settings"
3. Enter your Android TV IP address (e.g., `192.168.1.152`)
4. Enter the port (default: `8383`)
5. Click "Test Connection" to verify
6. Click "Save Settings"

## 🎯 How to Use

### On YouTube Video Pages:
- Look for the 📺 button in the video player controls
- Click it to send the current video to your TV

### On YouTube Browse Pages:
- Hover over video thumbnails to see the 📺 button
- Click it to send that video to your TV

### Via Extension Popup:
- Click the extension icon
- If you're on a YouTube video page, click "▶️ Play on TV"

## 🔧 Troubleshooting

### "Connection refused" or "Connection timeout"
- Verify your Android TV IP address is correct
- Make sure PlayYtApi app is running on your TV
- Check that both devices are on the same network
- Try port 8383 (default) or check what port your app is using

### "No TV configured"
- Go to extension settings and configure your TV IP and port
- Click "Test Connection" to verify

### Buttons not appearing on YouTube
- Refresh the YouTube page
- Make sure the extension is enabled
- Check that you've configured your TV settings

### CORS Errors in Test Connection
- This is normal for the test button
- The extension should still work on YouTube pages
- CORS doesn't affect the content script functionality

## 📱 Extension Features

### Settings Page (`options.html`)
- Clean, user-friendly interface
- IP address validation
- Port number validation
- Connection testing
- Persistent storage of settings

### Content Script (`content.js`)
- Adds buttons to YouTube player and thumbnails
- Handles video ID extraction
- Sends API requests to PlayYtApi
- Shows success/error notifications
- Watches for page changes (YouTube SPA navigation)

### Popup Interface (`popup.html`)
- Shows connection status
- Quick access to current video
- Direct links to settings and testing
- Displays current video information

## 🎨 Styling

The extension uses a clean, modern design that integrates well with YouTube's interface:
- TV buttons appear as subtle overlays
- Notifications slide in from the top-right
- Settings page matches modern web app aesthetics

## 🔒 Permissions

The extension requires these permissions:
- `storage`: To save your TV settings
- `activeTab`: To detect current YouTube video
- `host_permissions`: To access YouTube and send requests to your TV

## 🛠️ Development

To modify the extension:

1. Edit files in the `chrome-extension` folder
2. Go to `chrome://extensions/`
3. Click the reload button on the PlayYtApi TV Remote extension
4. Test your changes

### File Structure:
```
chrome-extension/
├── manifest.json       # Extension configuration
├── options.html        # Settings page
├── options.js          # Settings functionality
├── popup.html          # Extension popup
├── popup.js           # Popup functionality
├── content.js         # YouTube integration
├── styles.css         # Button and notification styles
└── icons/             # Extension icons
```

## 🎉 Enjoy!

Now you can easily send any YouTube video to your Android TV with just one click! 📺✨
