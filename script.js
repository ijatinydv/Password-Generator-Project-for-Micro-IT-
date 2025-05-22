// DOM Elements
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const lengthValueEl = document.getElementById('length-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const similarEl = document.getElementById('similar');
const ambiguousEl = document.getElementById('ambiguous');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const themeBtn = document.getElementById('theme-btn');
const historyList = document.getElementById('history-list');
const strengthBars = document.querySelectorAll('.bar');
const strengthText = document.querySelector('.strength-text');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const similarChars = 'iIlL1oO0';
const ambiguousChars = '{}[]()/\\\'"`~,;:.<>';

// Theme handling
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Password history
const passwordHistory = JSON.parse(localStorage.getItem('passwordHistory') || '[]');
const MAX_HISTORY = 5;

function updateHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > MAX_HISTORY) {
        passwordHistory.pop();
    }
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = passwordHistory.map((password, index) => `
        <div class="history-item">
            <span>${password}</span>
            <button onclick="copyHistoryPassword(${index})" class="copy-btn">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `).join('');
}

function copyHistoryPassword(index) {
    const password = passwordHistory[index];
    navigator.clipboard.writeText(password);
    showToast('Password copied to clipboard!');
}

// Update length value display
lengthEl.addEventListener('input', () => {
    lengthValueEl.textContent = lengthEl.value;
});

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        symbols: /[^A-Za-z0-9]/.test(password)
    };

    strength += checks.length ? 1 : 0;
    strength += checks.uppercase ? 1 : 0;
    strength += checks.lowercase ? 1 : 0;
    strength += checks.numbers ? 1 : 0;
    strength += checks.symbols ? 1 : 0;

    // Update strength bars
    strengthBars.forEach((bar, index) => {
        bar.style.background = index < strength ? getStrengthColor(strength) : 'var(--input-bg)';
    });

    // Update strength text
    strengthText.textContent = getStrengthText(strength);
    strengthText.style.color = getStrengthColor(strength);
}

function getStrengthColor(strength) {
    const colors = ['#ff4444', '#ffbb33', '#ffeb3b', '#00C851', '#007E33'];
    return colors[strength - 1] || colors[0];
}

function getStrengthText(strength) {
    const texts = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return texts[strength - 1] || texts[0];
}

// Generate password
function generatePassword() {
    let chars = '';
    let password = '';

    // Validate at least one option is selected
    if (!uppercaseEl.checked && !lowercaseEl.checked && 
        !numbersEl.checked && !symbolsEl.checked) {
        showToast('Please select at least one option');
        return;
    }

    // Build character set based on selected options
    if (uppercaseEl.checked) chars += uppercaseChars;
    if (lowercaseEl.checked) chars += lowercaseChars;
    if (numbersEl.checked) chars += numberChars;
    if (symbolsEl.checked) chars += symbolChars;

    // Remove similar and ambiguous characters if selected
    if (similarEl.checked) {
        chars = chars.split('').filter(char => !similarChars.includes(char)).join('');
    }
    if (ambiguousEl.checked) {
        chars = chars.split('').filter(char => !ambiguousChars.includes(char)).join('');
    }

    // Generate password
    const length = parseInt(lengthEl.value);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    // Ensure at least one character from each selected type
    if (uppercaseEl.checked && !/[A-Z]/.test(password)) {
        password = password.slice(0, -1) + uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (lowercaseEl.checked && !/[a-z]/.test(password)) {
        password = password.slice(0, -1) + lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (numbersEl.checked && !/[0-9]/.test(password)) {
        password = password.slice(0, -1) + numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (symbolsEl.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        password = password.slice(0, -1) + symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    passwordEl.value = password;
    checkPasswordStrength(password);
    updateHistory(password);
}

// Copy password to clipboard
function copyToClipboard() {
    if (!passwordEl.value) {
        showToast('Generate a password first!');
        return;
    }

    navigator.clipboard.writeText(passwordEl.value);
    showToast('Password copied to clipboard!');
}

// Show toast message
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
themeBtn.addEventListener('click', toggleTheme);

// Generate initial password and render history
generatePassword();
renderHistory(); 