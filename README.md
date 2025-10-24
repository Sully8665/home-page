
# Saleh Rezaei — Modern Portfolio Website

A modern, responsive portfolio website built with Angular 17, featuring advanced animations, real-time GitHub statistics, and comprehensive SEO optimization.

## ✨ Features

### 🎨 **Modern Design**
- **Dark/Light themes** with harmonized color palette
- **Responsive design** for all devices
- **Advanced animations** and transitions
- **Glassmorphism effects** and modern UI components
- **Interactive elements** with hover effects

### 📱 **Sections**
- **Home** - Introduction with typewriter effect
- **About** - Professional summary
- **Skills** - Technical skills with GitHub statistics
- **Projects** - Showcase of featured projects
- **Experience** - Professional work history
- **Achievements** - Certifications and accomplishments
- **Education** - Academic background
- **Testimonials** - Professional recommendations
- **Articles** - Technical blog posts
- **Contact** - Contact information with copy functionality

### 🚀 **Technical Features**
- **Real-time GitHub API** integration
- **SEO optimization** with meta tags, Open Graph, Twitter Cards
- **JSON-LD structured data** for better search visibility
- **Performance optimization** with lazy loading
- **Accessibility** features and semantic HTML
- **PWA-ready** configuration

### 🛠️ **Technologies**
- **Angular 17** - Modern frontend framework
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive CSS framework
- **SCSS** - Advanced styling
- **RxJS** - Reactive programming
- **GitHub API** - Real-time data integration

### 📊 **Components**
- **Animated Skill Bars** - Dynamic skill visualization
- **Particle Background** - Interactive background effects
- **Scroll Progress** - Reading progress indicator
- **Typewriter Effect** - Dynamic text animation
- **GitHub Statistics** - Real-time repository data
- **Section Titles** - Consistent heading design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Sully8665/personal-website.git

# Navigate to project directory
cd personal-website

# Install dependencies
npm install

# Start development server
npm start
# Open http://localhost:4200
```

### Build for Production
```bash
# Build the project
npm run build
# Output: dist/personal-website
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure build settings:
   - **Build Command:** `ng build --configuration production`
   - **Output Directory:** `dist/personal-website`
4. Deploy!

### Other Platforms
The project is compatible with:
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                 # Core components (header, footer)
│   ├── pages/                # Page components
│   │   ├── home/            # Home page
│   │   ├── about/           # About section
│   │   ├── skills/          # Skills section
│   │   ├── projects/        # Projects showcase
│   │   ├── experience/      # Work experience
│   │   ├── achievements/    # Certifications & awards
│   │   ├── education/       # Education background
│   │   ├── testimonials/    # Professional recommendations
│   │   ├── articles/        # Technical blog
│   │   └── contact/         # Contact information
│   ├── shared/
│   │   ├── components/      # Reusable components
│   │   │   ├── github-stats/    # GitHub statistics
│   │   │   ├── section-title/   # Section headings
│   │   │   ├── typewriter/      # Typewriter effect
│   │   │   ├── particle-background/ # Particle effects
│   │   │   └── scroll-progress/ # Scroll indicator
│   │   ├── models/          # Data models and interfaces
│   │   └── services/        # Angular services
│   └── styles.scss          # Global styles
├── assets/                  # Static assets
├── index.html              # Main HTML file
└── sitemap.xml             # SEO sitemap
```

## 🎨 Customization

### Adding New Sections
1. Create a new component in `src/app/pages/`
2. Add the component to `app.module.ts`
3. Include it in `app.component.html`
4. Update navigation in `header.component.html`

### Modifying Data
- **Personal Information:** `src/app/shared/models/data.ts`
- **Skills:** Update `SKILLS` and `SKILL_DETAILS` arrays
- **Experience:** Modify `EXPERIENCES` array
- **Projects:** Update `PROJECTS` array
- **Achievements:** Modify `ACHIEVEMENTS` array

### Styling
- **Global Styles:** `src/styles.scss`
- **Component Styles:** Individual `.scss` files
- **Theme Variables:** CSS custom properties in `styles.scss`

## 📊 SEO Features

- **Meta Tags:** Comprehensive meta tag optimization
- **Open Graph:** Social media sharing optimization
- **Twitter Cards:** Twitter-specific meta tags
- **JSON-LD:** Structured data for search engines
- **Sitemap:** XML sitemap for better crawling
- **Robots.txt:** Search engine crawling instructions

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run unit tests
npm run lint       # Run ESLint
npm run e2e        # Run end-to-end tests
```

### Code Quality
- **TypeScript:** Strict type checking
- **ESLint:** Code linting and formatting
- **Prettier:** Code formatting
- **Angular CLI:** Standard Angular tooling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sully8665/personal-website/issues).

## 📞 Contact

**Saleh Rezaei**
- **Email:** saleh.rezaei@gmail.com
- **LinkedIn:** [linkedin.com/in/salehrezaei](https://www.linkedin.com/in/salehrezaei/)
- **GitHub:** [github.com/Sully8665](https://github.com/Sully8665)
- **Website:** [salehrezaei.com](https://salehrezaei.com)

---

⭐ **Star this repository if you found it helpful!**
