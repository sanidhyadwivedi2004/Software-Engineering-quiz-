# Advanced Software Engineering Quiz System
 
An interactive, feature-rich quiz application for software engineering students with achievements, leaderboards, and analytics.

## Features

- 🎯 **20 Software Engineering Questions** - Covering design patterns, algorithms, databases, and more
- 🏆 **Achievement System** - Unlock achievements based on performance, speed, and accuracy
- 📊 **Real-time Analytics** - Track user behavior and quiz performance with Vercel Analytics
- 🎨 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Advanced Features**:
  - Question shuffling every round
  - Timer with visual warnings
  - Answer explanations
  - Difficulty indicators
  - Locked answers (no changing after selection)
  - Confetti celebration for high scores
  - Leaderboard system
  - Downloadable achievement badges

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Analytics**: Vercel Analytics
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy"

### Option 3: Deploy via Git Integration

1. Connect your GitHub account to Vercel
2. Push to your repository
3. Vercel will automatically deploy on every push

## Enabling Vercel Analytics

Analytics is already configured in this project. After deployment:

1. Go to your project dashboard on Vercel
2. Navigate to the "Analytics" tab
3. Analytics will start collecting data automatically

### Tracked Events

The quiz tracks the following custom events:

- `quiz_started` - When a student starts the quiz
- `question_answered` - Each question answered (with correctness, time, difficulty)
- `quiz_completed` - Quiz completion (with score, time, accuracy)
- `badge_generated` - When achievement badge is downloaded
- `theme_changed` - Dark/light mode toggle
- `leaderboard_viewed` - When leaderboard is opened

## Local Development

Simply open `index.html` in a web browser. No build process required!

For a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Project Structure

```
quiz-system/
├── index.html          # Main HTML file
├── styles.css          # All styles including dark mode
├── script.js           # Quiz logic and analytics
├── questions.js        # Question bank
├── 1.svg              # Signature for badges
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## Configuration

### Adding More Questions

Edit `questions.js` and add questions in this format:

```javascript
{
    question: "Your question here?",
    options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    correct: 1, // Index of correct answer (0-3)
    difficulty: "Medium", // Easy, Medium, or Hard
    explanation: "Explanation of the correct answer"
}
```

### Customizing Quiz Settings

In `script.js`, modify the constructor:

```javascript
this.totalQuestions = 20;  // Number of questions per quiz
this.timePerQuestion = 30; // Seconds per question
```

## Analytics Dashboard

After deployment, view your analytics at:
```
https://vercel.com/[your-username]/[project-name]/analytics
```

You'll see:
- Page views
- Unique visitors
- Custom events (quiz completions, scores, etc.)
- Performance metrics
- Geographic data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for educational purposes.

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Analytics: [Vercel Analytics](https://vercel.com/analytics)

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for Software Engineering Students

