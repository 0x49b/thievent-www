// DOM Elements

const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const solarButton = document.getElementById('solar');
const body = document.body;
const pagetitle = document.getElementById('pagetitle');


// Apply the cached theme on reload

const theme = localStorage.getItem('theme2');
const isSolar = localStorage.getItem('isSolar');

if (theme) {
    body.classList.add(theme);
    isSolar && body.classList.add('solar');

    if (theme === 'light') {
        pagetitle.classList.replace('pagetitle', 'pagetitle-light')
    } else {
        pagetitle.classList.replace('pagetitle-light', 'pagetitle')
    }

}else {
    body.classList.add('light');
}

// Button Event Handlers

darkButton.onclick = () => {
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme2', 'dark');
    pagetitle.classList.replace('pagetitle-light', 'pagetitle')
};

lightButton.onclick = () => {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme2', 'light');
    pagetitle.classList.replace('pagetitle', 'pagetitle-light')
};

solarButton.onclick = () => {

    if (body.classList.contains('solar')) {
        body.classList.remove('solar');
        solarButton.style.cssText = `--bg-solar: var(--yellow);`
        solarButton.innerText = 'solarize';
        localStorage.removeItem('isSolar');
    } else {
        solarButton.style.cssText = `--bg-solar: white;`
        body.classList.add('solar');
        solarButton.innerText = 'normalize';
        localStorage.setItem('isSolar', true);
    }
};