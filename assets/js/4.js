const body = document.body;
const pagetitle = document.getElementById('pagetitle');
const orangeButton = document.getElementById('orange');
const yellowButton = document.getElementById('yellow');
const turquiseButton = document.getElementById('turquise');
const greenButton = document.getElementById('green');
const blueButton = document.getElementById('blue');
const redButton = document.getElementById('red');
const purpleButton = document.getElementById('purple');
const darkButton = document.getElementById('dark');
const rainbowButton = document.getElementById('rainbow');
const colors = [
    {'name': 'orange', 'hex': '#FC5D1D'},
    {'name': 'yellow', 'hex': '#FBB126'},
    {'name': 'turquise', 'hex': '#71D5AD'},
    {'name': 'green', 'hex': '#44CA79'},
    {'name': 'blue', 'hex': '#0588E0'},
    {'name': 'red', 'hex': '#E74140'},
    {'name': 'purple', 'hex': '#9270EA'},
    {'name': 'dark', 'hex': '#2C3E50'}
];


const theme = localStorage.getItem('theme4');
let rainbow;


if (theme === null) {
    localStorage.setItem('theme4', 'orange');
    body.classList.add('orange')
}

/**
 * Restore Theme or start the rainbow
 */
if (theme) {
    if (theme !== 'rainbow') {
        body.classList.remove(...body.classList);
        body.classList.add(theme);
        rainbow = null;
    } else {
        rainbowButton.click();
    }

} else {
    rainbowButton.click();
}

/**
 * Action Listeners for Buttons
 */
orangeButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('orange');
    setTextColor('#FC5D1D');
    localStorage.setItem('theme4', 'orange');
};

yellowButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('yellow');
    setTextColor('#FBB126');
    localStorage.setItem('theme4', 'yellow');
};

turquiseButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('turquise');
    setTextColor('#71D5AD');
    localStorage.setItem('theme4', 'turquise');
};

greenButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('green');
    setTextColor('#44CA79');
    localStorage.setItem('theme4', 'green');
};

blueButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('blue');
    setTextColor('#0588E0');
    localStorage.setItem('theme4', 'blue');
};

redButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('red');
    setTextColor('#E74140');
    localStorage.setItem('theme4', 'red');
};

purpleButton.onclick = () => {
    clearInterval(rainbow);
    body.classList.remove(...body.classList);
    body.classList.add('purple');
    setTextColor('#9270EA');
    localStorage.setItem('theme4', 'purple');
};

darkButton.onclick = () => {
    clearInterval(rainbow);
    darkButtonClick();
};

function darkButtonClick() {
    console.log(rainbow)
    body.classList.remove(...body.classList);
    body.classList.add('dark');
    body.style.color = 'rgb(236,240,241)';

    pagetitle.style.borderBottom = '2px solid rgb(236,240,241)';
    pagetitle.style.borderBottomColor = 'rgb(236,240,241)';
    localStorage.setItem('theme4', 'dark');
}

rainbowButton.onclick = () => {

    clearInterval(rainbow);
    darkButtonClick();

    let i = 0;
    rainbow = setInterval(() => {
        if (i > colors.length - 1) {
            i = 0;
        }
        if (i === colors.length - 1) {
            darkButtonClick();
        } else {
            body.classList.remove(...body.classList);
            body.classList.add(colors[i].name);
            setTextColor(colors[i].hex);
        }
        i++;
    }, 2000);

    localStorage.setItem('theme4', 'rainbow');

};


/**
 * Custom Methods
 */

/**
 * set a Text Color based on a hex value
 * @param hex
 */
function setTextColor(hex) {
    body.style.color = hexToComplimentary(hex);
    pagetitle.style.borderColor = hexToComplimentary(hex);
}

/**
 * Get a hex value from any rgb
 * @param rgb
 * @returns {string}
 */
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}


/**
 * Calculate the complementary for any hex string
 * @param hex
 * @returns {string}
 */
function hexToComplimentary(hex) {

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
    }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if (max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if (max == r && g >= b) {
            h = 1.0472 * (g - b) / d;
        } else if (max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if (max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if (max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h += 180;
    if (h > 360) {
        h -= 360;
    }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}