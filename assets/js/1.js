const canvas = document.querySelector("canvas"), c = canvas.getContext("2d");
canvas.width = innerWidth, canvas.height = innerHeight;
let wave = {y: canvas.height / 2, length: .01, amplitude: 100, frequency: .01}, strokeColor = {h: 200, s: 50, l: 50},
    frequency = wave.frequency;

function animate() {
    requestAnimationFrame(animate), c.fillStyle = "rgba(0,0,0,0.01)", c.fillRect(0, 0, canvas.width, canvas.height), c.beginPath(), c.moveTo(0, canvas.height / 2);
    for (let e = 0; e < canvas.width; e++) c.lineTo(e, wave.y + Math.sin(e * wave.length + frequency) * wave.amplitude * Math.sin(frequency));
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(frequency))}, ${strokeColor.s}%, ${strokeColor.l}%)`, c.stroke(), frequency += wave.frequency
}

animate();