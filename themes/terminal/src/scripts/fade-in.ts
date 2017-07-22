import {toArray} from './utils';

export function initFadeIn() {
    const fadeElements = toArray(document.querySelectorAll('[data-fade-in]'));
    fadeElements.forEach(fadeIn);
}

function fadeIn(el: HTMLElement): void {
    const delay = parseInt(el.dataset['fadeIn']);
    setTimeout(() => {
        el.classList.add('visible');
    }, delay);
}
