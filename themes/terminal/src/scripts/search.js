const DISPLAY_CLASS = 'display';
const KeyCode = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESCAPE: 27,
    S: 83,
    FORWARDSLASH: 191
};

export function initSearch() {

    const searchButton = document.querySelector('.search-button');
    const searchModal = document.querySelector('.search-modal');
    if (!searchModal) {
        return;
    }
    const input = searchModal.querySelector('input[type="text"]');
    const suggestionsList = getAllSuggestions();
    let closing = false;
    let suggestions = [];
    let selectedIndex = -1;


    renderSuggestions([]);

    document.addEventListener('keydown', e => {
        if (e.keyCode === KeyCode.S || e.keyCode === KeyCode.FORWARDSLASH) {
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault();
                openModal();
            }
        }
    })
    searchButton.addEventListener('click', openModal);
    input.addEventListener('blur', closeModal);
    input.addEventListener('input', e => {
        suggestions = filterSuggestions(e.target.value, suggestionsList);
        selectedIndex = -1;
        renderSuggestions(suggestions, selectedIndex);
    });
    input.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case KeyCode.UP:
                selectedIndex = selectedIndex === 0 ? suggestions.length - 1 : selectedIndex - 1;
                e.preventDefault();
                break;
            case KeyCode.DOWN:
                selectedIndex = selectedIndex === (suggestions.length - 1) ? 0 : selectedIndex + 1;
                e.preventDefault();
                break;
            case KeyCode.ENTER:
                const selected = document.querySelector('.search-suggestions li.selected a');
                if (selected) {
                    selected.click();
                    reset();
                    return;
                }
                break;
            case KeyCode.ESCAPE:
                input.blur();
                break;
        }
        renderSuggestions(suggestions, selectedIndex);
    });

    function openModal() {
        if (!searchModal.classList.contains(DISPLAY_CLASS) && !closing) {
            searchModal.classList.add(DISPLAY_CLASS);
            input.focus();
        }
    }

    function closeModal() {
        searchModal.classList.remove(DISPLAY_CLASS);
        closing = true;
        setTimeout(() => closing = false, 500);
        reset();
    }

    function reset() {
        input.value = '';
        suggestions = [];
        selectedIndex = -1;
        renderSuggestions(suggestions, selectedIndex);
    }
}

/**
 * Returns a list of all suggestions.
 *
 * @returns {Array.<{title: string, url: string}>}
 */
function getAllSuggestions() {
    return Array.from(document.querySelectorAll('.suggestion'))
        .map(el => {
            return {
                title: el.textContent,
                url: el.dataset['url']
            };
        });
}

/**
 * Filter suggestions based on the query.
 *
 * @param {string} query
 * @param {string[]} allSuggestions
 * @return {Array.<{title: string, url: string}>}
 */
function filterSuggestions(query, allSuggestions) {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
        return [];
    }
    const matches = s => s.title.toLowerCase().indexOf(normalizedQuery) !== -1;
    return allSuggestions
        .filter(matches)
        .slice(0, 5);
}

/**
 *
 * @param {string} query
 * @param {string[]} suggestions
 */
function renderSuggestions(suggestions, selectedIndex) {
    const list = document.querySelector('.search-suggestions > ul');
    removeAllChildren(list);
    suggestions
        .map(createListItem)
        .forEach((li, index) => {
            if (index === selectedIndex) {
                li.classList.add('selected');
            }
            list.appendChild(li);
        });
}

/**
 * Removes all children from a node
 * @param {HTMLElement} node
 */
function removeAllChildren(node) {
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

/**
 * Returns an li element with the given text as innerText, and a link to the suggestion url.
 *
 * @param {string} suggestion.title
 * @param {string} suggestion.url
 * @returns {HTMLLIElement}
 */
function createListItem(suggestion) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = suggestion.url;
    a.innerText = suggestion.title;
    li.appendChild(a);
    return li;
}