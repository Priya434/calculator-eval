const display = document.querySelector('.display');
const result = document.querySelector('.result');

const kbd = document.getElementsByTagName('kbd');
for (let i = 0; i < kbd.length; i++) {
    kbd[i].addEventListener('click', evaluate);
}
document.body.addEventListener('keydown', evaluate);
document.body.addEventListener('touchmove', evaluate);

function evaluate(event) {
    let key = '';

    if (event.type === 'keydown') {
        key = event.key;
    }

    else {
        key = event.target.getAttribute('data-key');
    }

    removeAnimation();
    showDisplay(key);
    calculate(key);
    addAnimation(key);
}

function showDisplay(key) {
    if (key.match(/[0-9*-/+=]/)) {
        display.textContent += key;
    }
    else if (key === 'Backspace') {
        backspace();
    }

    if (key === 'Delete') {
            display.textContent = '';
            result.textContent = '';
    }

    console.log(key);
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

function calculate(key) {
    if (display.textContent.slice(-2, -1).match(/[*-/+]/) && key.match(/[*-/+]/)) {
        console.log(key);
        console.log(display.textContent.slice(-2, -1));
        alert('Please enter a number');
        display.textContent = display.textContent.slice(0, - 1);
    }

    else if ((display.textContent.slice(0, 1).match(/[*-/+]/) && key.match(/[*-/+]/))) {
        console.log(display.textContent.slice(-2, -1));
        alert('Please enter a number');
        display.textContent = display.textContent.slice(0, - 1);
    }

    if (key === '=' || key === 'Enter') display.textContent = '';
    else result.textContent = eval(display.textContent);
}

function removeAnimation() {
    const kbd = document.getElementsByTagName('kbd');
    for (let i = 0; i < kbd.length; i++) {
        kbd[i].classList.remove('active');
    }
}

function addAnimation(key) {
    if (key === '=') key = 'Enter';
    const kbd = document.querySelector(`kbd[data-key="${key}"]`);
    kbd.classList.add('active');
}
