window.Prism = require('prismjs');
import {initMenu} from './menu';
import {initSearch} from './search';

window.addEventListener('load', () => {
    initMenu();
    initSearch();
});