# Interactive Password Generator

A modern, user-friendly password generator built with vanilla web technologies. This project was developed as part of a virtual internship at Micro IT.

## 🌐 Live Demo

[Click here to view the live project](https://password-generator-project-for-micro-it.vercel.app/)


## Overview

The Interactive Password Generator helps users create strong, secure passwords with customizable options. It features a sleek, modern interface with real-time password strength feedback and a history of generated passwords.

## Features

- **Customizable Password Generation**
  - Adjustable password length (4-32 characters)
  - Toggle options for uppercase, lowercase, numbers, and symbols
  - Exclude similar and ambiguous characters
  - Real-time password strength indicator

- **User Experience**
  - Modern glassmorphism design
  - Dark/Light theme support
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Copy to clipboard functionality
  - Password history tracking

- **Security Features**
  - Guaranteed inclusion of selected character types
  - Password strength meter
  - Secure password generation algorithm
  - No external dependencies

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/password-generator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd password-generator
   ```

3. Open `index.html` in your web browser

No build process or dependencies required!

## Project Structure

```
password-generator/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Password generation logic
└── README.md          # Project documentation
```

## Features in Detail

### Password Generation
- Generates cryptographically secure passwords
- Ensures at least one character from each selected type
- Excludes similar characters (i, l, 1, o, 0) when requested
- Excludes ambiguous characters when requested

### User Interface
- Clean, modern glassmorphism design
- Responsive layout works on all screen sizes
- Dark/Light theme with persistent preference
- Interactive elements with hover effects
- Smooth animations for better UX

### Password Management
- Copy to clipboard functionality
- Password strength visualization
- Recent passwords history
- Toast notifications for user feedback

## Credits

This project was independently created as part of a virtual internship submission at Micro IT. Special thanks to the open-source community for inspiration and best practices.

## License

This project is free to use for educational purposes.

---
