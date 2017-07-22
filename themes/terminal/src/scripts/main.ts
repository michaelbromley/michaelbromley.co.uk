declare const require: (path: string) => any;

require('prismjs/themes/prism.css');
require('../styles/main.scss');
require('prismjs');

import {initMenu} from './menu';
import {initSearch} from './search';
import {initTypeEffect} from './type-effect';
import {initFadeIn} from './fade-in';

window.addEventListener('load', () => {
    initMenu();
    initSearch();
    initTypeEffect();
    initFadeIn();
});