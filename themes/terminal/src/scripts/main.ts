import {initAnchorLinks} from './anchor-links';

declare const require: (path: string) => any;

import {initMenu} from './menu';
import {initSearch} from './search';
import {initTypeEffect} from './type-effect';
import {initFadeIn} from './fade-in';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initSearch();
    initTypeEffect();
    initFadeIn();
    initAnchorLinks();
});
