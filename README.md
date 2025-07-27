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

### On YouTube Video Pages
- Look for the 📺 button in the video player controls
- Click it to send the current video to your TV

### On YouTube Browse/Search Pages
- Hover over any video thumbnail
- Click the 📺 button that appears to send that video to your TV

### Via Extension Popup
- Click the extension icon in Chrome toolbar
- If you're on a YouTube video page, click "▶️ Play on TV"
- Access settings and connection testing from the popup

## 🔧 Troubleshooting

### Common Issues

**Play on TV button covers other YouTube controls**
- The button is now positioned before the settings gear icon to avoid overlapping
- If you still experience issues, try refreshing the YouTube page
- The button should appear with proper spacing between other controls

**"Connection refused" or "Connection timeout"**
- Verify your Android TV IP address is correct
- Ensure PlayYtApi app is running on your TV
- Check that both devices are on the same WiFi network
- Confirm the port number (default: 8383)

**"No TV configured"**
- Go to extension settings (⚙️) and configure your TV IP and port
- Use the "Test Connection" feature to verify setup

**Buttons not appearing on YouTube**
- Refresh the YouTube page
- Make sure the extension is enabled in `chrome://extensions/`
- Verify your TV settings are configured

**CORS Errors during connection testing**
- This is normal behavior for the test button
- The extension will still work properly on YouTube pages
- CORS doesn't affect the main functionality

## 🛠️ Development

### Making Changes

1. Edit files in the `chrome-extension` folder
2. Go to `chrome://extensions/`
3. Click the reload button (🔄) on the PlayYtApi TV Remote extension
4. Test your changes on YouTube

**No data is sent to external servers** - all communication happens directly between your browser and your local Android TV.

## 📝 License

This project is open source. Feel free to modify and distribute according to your needs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 🎉 Enjoy Your Big Screen Experience!

Now you can effortlessly send any YouTube video to your Android TV with just one click! 📺✨
