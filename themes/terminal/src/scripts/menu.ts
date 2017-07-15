let open = false;

export function initMenu() {
    const container = document.querySelector('#nav-pane');
    const toggleButton = document.querySelector('.mobile-menu-button');
    const openButton = document.querySelector('.open-button');
    const closeButton = document.querySelector('.close-button');

    applyClasses();

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


