import {toArray} from './utils';

let open = false;

/**
 * Code for the expandable version of the left nav menu when site is viewed on small screens.
 */
export function initMenu() {
    const container = document.querySelector('#nav-pane');
    const toggleButton = document.querySelector('.mobile-menu-button');
    const openButton = document.querySelector('.open-button');
    const closeButton = document.querySelector('.close-button');

    applyClasses();
    selectBlogItemIfBlogPost();

    toggleButton.addEventListener('click', () => {
        open = !open;
        applyClasses();
    });

    function applyClasses() {
        if (open) {
            openButton.classList.add('hidden');
            closeButton.classList.remove('hidden');
            container.classList.add('open');
        } else {
            openButton.classList.remove('hidden');
            closeButton.classList.add('hidden');
            container.classList.remove('open');
        }
    }
}

/**
 * AFAIK Hugo cannot automatically select a menu item for nested taxonimies. So it can auto-highlight
 * the "blog" item when on the blog list page, but cannot also highlight it when drilling down into
 * a blog entry itself. This function rectifies that with JavaScript.
 */
function selectBlogItemIfBlogPost() {
    const blogEntryUrlRe = /^\/blog\/[^/]+\//;
    const containsBlogText = el => -1 < el.textContent.toLowerCase().indexOf('blog');
    const addSelectedClass = el => el.classList.add('selected');

    if (blogEntryUrlRe.test(location.pathname)) {
        toArray(document.querySelectorAll('.main-nav-link'))
            .filter(containsBlogText)
            .forEach(addSelectedClass);
    }
}


