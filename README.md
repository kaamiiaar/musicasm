# Musicasm Landing Page

Landing page for **Musicasm** - Infinite Musical Dopamine for Your Brain

## 🎵 About Musicasm

Musicasm is building the future of personalized music - infinite, AI-generated soundscapes that adapt to your mind, emotions, and needs in real-time. Never skip a track again.

## 🚀 Quick Start

1. Clone this repository
2. Open `index.html` in your browser, or
3. Run a local server: `python -m http.server 3000`
4. Visit `http://localhost:3000`

## 📁 Project Structure

```
├── index.html          # Main landing page
├── styles.css          # Styling and animations
├── script.js           # Interactive functionality
├── package.json        # Project configuration
└── README.md          # This file
```

## 🌐 Deployment

### GitHub Pages
1. Push to your GitHub repository
2. Go to Settings > Pages
3. Select source branch (main)
4. Your site will be available at `https://yourusername.github.io/musicasm`

### Vercel
1. Connect your GitHub repository to Vercel
2. No build configuration needed - it's a static site
3. Deploy automatically on every push

## ✨ Features

- **Responsive Design** - Works on all devices
- **Animated Music Waves** - Visual representation of infinite music
- **Waiting List Signup** - Collects emails for early access
- **Modern UI/UX** - Clean, professional design
- **Performance Optimized** - Fast loading, minimal dependencies

## 🎨 Customization

- Colors and gradients: Edit CSS variables in `styles.css`
- Content: Modify text in `index.html`
- Animations: Adjust wave animations in `styles.css` and `script.js`

## 📧 Email Collection

Currently stores emails in localStorage for development. For production:

1. Replace the `storeEmail()` function in `script.js`
2. Integrate with your backend API
3. Consider services like Mailchimp, ConvertKit, or Airtable

## 🔧 Development

No build process required. Simple static HTML/CSS/JS site that can be opened directly in browser or served with any static file server.

---

Built with ❤️ for the future of music