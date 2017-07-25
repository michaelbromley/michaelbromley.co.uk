import {toArray} from './utils';

export function initAnchorLinks() {
    const headers = toArray(document.querySelectorAll('.article-entry h2[id], .article-entry h3[id]'));
    headers.forEach(wrapInAnchorLink);
}

window.addEventListener("hashchange", initAnchorLinks);

function wrapInAnchorLink(el: HTMLHeadingElement) {
    const selected = `#${el.id}` === location.hash;
    const innerText= el.innerText;
    const aHtml = `<a href="#${el.id}" class="heading-anchor ${selected ? 'selected' : ''}">${innerText}</a>`;
    el.innerHTML = aHtml;
}