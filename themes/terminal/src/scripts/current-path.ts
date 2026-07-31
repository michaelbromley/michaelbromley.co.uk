/**
 * The 404 page is served statically for any unmatched URL, so the path that was actually
 * requested is only known to the browser.
 */
export function showCurrentPath() {
    const el = document.querySelector('[data-current-path]') as HTMLElement;
    if (el) {
        el.textContent = location.pathname;
    }
}
