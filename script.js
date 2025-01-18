const colorPicker = document.getElementById('color-picker');
const pasteColorInput = document.getElementById('paste-color');
const colorBox = document.getElementById('color-box');
const hexCode = document.getElementById('hex-code');
const rgbCode = document.getElementById('rgb-code');
const hslCode = document.getElementById('hsl-code');
const rgbaCode = document.getElementById('rgba-code');
const hslaCode = document.getElementById('hsla-code');
const themeToggleButton = document.getElementById('toggle-theme');

// Set dark mode by default when the page loads
document.body.classList.add('dark-mode');

// Set color and format when color is picked
colorPicker.addEventListener('input', updateColor);

pasteColorInput.addEventListener('input', function () {
    const color = pasteColorInput.value.trim();
    if (isValidColor(color)) {
        colorPicker.value = color;
        updateColor();
    }
});

themeToggleButton.addEventListener('click', toggleDarkMode);

function updateColor() {
    const color = colorPicker.value;
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    const hsla = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`;

    // Update the color box
    colorBox.style.backgroundColor = color;

    // Update the format displays
    hexCode.textContent = color;
    rgbCode.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    hslCode.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    rgbaCode.textContent = rgba;
    hslaCode.textContent = hsla;
}

// Utility function to convert HEX to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Utility function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const hsl = { h: 0, s: 0, l: (max + min) / 2 };

    if (max === min) {
        hsl.h = 0; // Achromatic
    } else {
        const d = max - min;
        hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                hsl.h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                hsl.h = (b - r) / d + 2;
                break;
            case b:
                hsl.h = (r - g) / d + 4;
                break;
        }
        hsl.h *= 60;
    }

    hsl.s = (hsl.s * 100).toFixed(0);
    hsl.l = (hsl.l * 100).toFixed(0);

    return hsl;
}

// Check if the color code is valid
function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

// Copy to clipboard function
function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text).then(function() {
        document.getElementById(id).innerText = 'Copied';
        setTimeout(() => {
            document.getElementById(id).innerText = 'Copy';
        }, 2000);
    }, function(err) {
        alert('Error copying text: ', err);
    });
}

// Copy buttons event listeners
document.getElementById('copy-hex').addEventListener('click', () => copyToClipboard(hexCode.textContent, 'copy-hex'));
document.getElementById('copy-rgb').addEventListener('click', () => copyToClipboard(rgbCode.textContent, 'copy-rgb'));
document.getElementById('copy-hsl').addEventListener('click', () => copyToClipboard(hslCode.textContent, 'copy-hsl'));
document.getElementById('copy-rgba').addEventListener('click', () => copyToClipboard(rgbaCode.textContent, 'copy-rgba'));
document.getElementById('copy-hsla').addEventListener('click', () => copyToClipboard(hslaCode.textContent, 'copy-hsla'));

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleButton.textContent = isDarkMode ? '🌙 Switch to Light Mode' : '🌑 Switch to Dark Mode';
}
