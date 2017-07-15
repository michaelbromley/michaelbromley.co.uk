import {toArray} from './utils';

const DELAY = 30;

export function initTypeEffect() {
    const headers = toArray(document.querySelectorAll('[data-type-effect]'));
    headers.forEach(typeEffect)
}

function typeEffect(el: HTMLElement) {
    const chars = el.textContent.split('');
    const { height, width } = el.getBoundingClientRect();
    el.textContent = '';
    el.style.height = `${height}px`;
    el.style.width = `${width}px`;
    el.style.visibility = 'visible';
    const typeTarget = addTypeTarget(el);
    const caret = addCaret(el);

    function typeNextChar() {
        const nextChar = chars.shift();
        typeTarget.textContent = typeTarget.textContent + nextChar;
        if (0 < chars.length) {
            setTimeout(typeNextChar, DELAY);
        } else {
            removeCaret(caret);
            el.style.height = `initial`;
            el.style.width = `initial`;
        }
    }
    typeNextChar();
}

function addTypeTarget(el: HTMLElement) {
    const typeTarget = document.createElement('span');
    el.appendChild(typeTarget);
    return typeTarget;
}

function addCaret(el: HTMLElement) {
    let height = parseInt(window.getComputedStyle(el)['font-size']);
    height -= 4;
    const backgroundColor = window.getComputedStyle(el)['color'];
    const width = Math.ceil(height * 0.05);
    const marginBottom = Math.ceil(height * -0.1);
    const caret = document.createElement('span');
    caret.classList.add('type-effect-caret');
    caret.style.height = `${height}px`;
    caret.style.width = `${width}px`;
    caret.style.backgroundColor = backgroundColor;
    caret.style.marginBottom = `${marginBottom}px`;
    el.appendChild(caret);
    return caret;
}

function removeCaret(caret: HTMLElement) {
    if (caret) {
        setTimeout(() => caret.parentNode.removeChild(caret), 2000);
    }
}
