(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = function () {

	// Private helper vars
	var lang = /\blang(?:uage)?-(\w+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function type(o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function objId(obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function clone(o) {
				var type = _.util.type(o);

				switch (type) {
					case 'Object':
						var clone = {};

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key]);
							}
						}

						return clone;

					case 'Array':
						// Check for existence for IE8
						return o.map && o.map(function (v) {
							return _.util.clone(v);
						});
				}

				return o;
			}
		},

		languages: {
			extend: function extend(id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
    * Insert a token before another token in a language literal
    * As this needs to recreate the object (we cannot actually insert before keys in object literals),
    * we cannot just provide an object, we need anobject and a key.
    * @param inside The key (or language id) of the parent
    * @param before The key to insert before. If not provided, the function appends instead.
    * @param insert Object with the key/value pairs to insert
    * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
    */
			insertBefore: function insertBefore(inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function highlightAll(async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || document.querySelectorAll(env.selector);

			for (var i = 0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function highlightElement(element, async, callback) {
			// Find language
			var language,
			    grammar,
			    parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			_.hooks.run('before-sanity-check', env);

			if (!env.code || !env.grammar) {
				if (env.code) {
					env.element.textContent = env.code;
				}
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function highlight(text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},

		tokenize: function tokenize(text, grammar, language) {
			var Token = _.Token;

			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			tokenloop: for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
					    inside = pattern.inside,
					    lookbehind = !!pattern.lookbehind,
					    greedy = !!pattern.greedy,
					    lookbehindLength = 0,
					    alias = pattern.alias;

					if (greedy && !pattern.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
						pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
					}

					pattern = pattern.pattern || pattern;

					// Don’t cache length as it changes during the loop
					for (var i = 0, pos = 0; i < strarr.length; pos += strarr[i].length, ++i) {

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							break tokenloop;
						}

						if (str instanceof Token) {
							continue;
						}

						pattern.lastIndex = 0;

						var match = pattern.exec(str),
						    delNum = 1;

						// Greedy patterns can override/remove up to two previously matched tokens
						if (!match && greedy && i != strarr.length - 1) {
							pattern.lastIndex = pos;
							match = pattern.exec(text);
							if (!match) {
								break;
							}

							var from = match.index + (lookbehind ? match[1].length : 0),
							    to = match.index + match[0].length,
							    k = i,
							    p = pos;

							for (var len = strarr.length; k < len && p < to; ++k) {
								p += strarr[k].length;
								// Move the index i to the element in strarr that is closest to from
								if (from >= p) {
									++i;
									pos = p;
								}
							}

							/*
        * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
        * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
        */
							if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
								continue;
							}

							// Number of tokens to delete and replace with the new match
							delNum = k - i;
							str = text.slice(pos, p);
							match.index -= pos;
						}

						if (!match) {
							continue;
						}

						if (lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index + lookbehindLength,
						    match = match[0].slice(lookbehindLength),
						    to = from + match.length,
						    before = str.slice(0, from),
						    after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}

			return strarr;
		},

		hooks: {
			all: {},

			add: function add(name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function run(name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || "").length | 0;
		this.greedy = !!greedy;
	};

	Token.stringify = function (o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function (element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = Object.keys(env.attributes).map(function (name) {
			return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}).join(' ');

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
			    lang = message.language,
			    code = message.code,
			    immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (document.addEventListener && !script.hasAttribute('data-manual')) {
			if (document.readyState !== "loading") {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(_.highlightAll);
				} else {
					window.setTimeout(_.highlightAll, 16);
				}
			} else {
				document.addEventListener('DOMContentLoaded', _.highlightAll);
			}
		}
	}

	return _self.Prism;
}();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/i,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [{
		pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
		lookbehind: true
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: true
	}],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function () {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		if (Array.prototype.forEach) {
			// Check to prevent error in IE8
			Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
				var src = pre.getAttribute('data-src');

				var language,
				    parent = pre;
				var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (pre.className.match(lang) || [, ''])[1];
				}

				if (!language) {
					var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
					language = Extensions[extension] || extension;
				}

				var code = document.createElement('code');
				code.className = 'language-' + language;

				pre.textContent = '';

				code.textContent = 'Loading…';

				pre.appendChild(code);

				var xhr = new XMLHttpRequest();

				xhr.open('GET', src, true);

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {

						if (xhr.status < 400 && xhr.responseText) {
							code.textContent = xhr.responseText;

							Prism.highlightElement(code);
						} else if (xhr.status >= 400) {
							code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
						} else {
							code.textContent = '✖ Error: File does not exist or is empty';
						}
					}
				};

				xhr.send(null);
			});
		}
	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

var _menu = require('./menu');

var _search = require('./search');

var _typeEffect = require('./type-effect');

window.Prism = require('prismjs');


window.addEventListener('load', function () {
    (0, _menu.initMenu)();
    (0, _search.initSearch)();
    (0, _typeEffect.initTypeEffect)();
});

},{"./menu":3,"./search":4,"./type-effect":5,"prismjs":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMenu = initMenu;
var open = false;

function initMenu() {
    var container = document.querySelector('#nav-pane');
    var toggleButton = document.querySelector('.mobile-menu-button');
    var openButton = document.querySelector('.open-button');
    var closeButton = document.querySelector('.close-button');

    applyClasses();

    toggleButton.addEventListener('click', function () {
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initSearch = initSearch;
var DISPLAY_CLASS = 'display';
var KeyCode = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESCAPE: 27,
    S: 83,
    FORWARDSLASH: 191
};

function initSearch() {

    var searchButton = document.querySelector('.search-button');
    var searchModal = document.querySelector('.search-modal');
    if (!searchModal) {
        return;
    }
    var input = searchModal.querySelector('input[type="text"]');
    var suggestionsList = getAllSuggestions();
    var closing = false;
    var suggestions = [];
    var selectedIndex = -1;

    renderSuggestions([]);

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === KeyCode.S || e.keyCode === KeyCode.FORWARDSLASH) {
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault();
                openModal();
            }
        }
    });
    searchButton.addEventListener('click', openModal);
    input.addEventListener('blur', closeModal);
    input.addEventListener('input', function (e) {
        suggestions = filterSuggestions(e.target.value, suggestionsList);
        selectedIndex = -1;
        renderSuggestions(suggestions, selectedIndex);
    });
    input.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case KeyCode.UP:
                selectedIndex = selectedIndex === 0 ? suggestions.length - 1 : selectedIndex - 1;
                e.preventDefault();
                break;
            case KeyCode.DOWN:
                selectedIndex = selectedIndex === suggestions.length - 1 ? 0 : selectedIndex + 1;
                e.preventDefault();
                break;
            case KeyCode.ENTER:
                var selected = document.querySelector('.search-suggestions li.selected a');
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
        setTimeout(function () {
            return closing = false;
        }, 500);
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
    return Array.from(document.querySelectorAll('.suggestion')).map(function (el) {
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
    var normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
        return [];
    }
    var matches = function matches(s) {
        return s.title.toLowerCase().indexOf(normalizedQuery) !== -1;
    };
    return allSuggestions.filter(matches).slice(0, 5);
}

/**
 *
 * @param {string} query
 * @param {string[]} suggestions
 */
function renderSuggestions(suggestions, selectedIndex) {
    var list = document.querySelector('.search-suggestions > ul');
    removeAllChildren(list);
    suggestions.map(createListItem).forEach(function (li, index) {
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
    while (node.hasChildNodes()) {
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
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = suggestion.url;
    a.innerText = suggestion.title;
    li.appendChild(a);
    return li;
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTypeEffect = initTypeEffect;
var DELAY = 30;

function initTypeEffect() {
    var headers = Array.from(document.querySelectorAll('[data-type-effect]'));
    headers.forEach(typeEffect);
}

function typeEffect(el) {
    var chars = el.textContent.split('');

    var _el$getBoundingClient = el.getBoundingClientRect(),
        height = _el$getBoundingClient.height,
        width = _el$getBoundingClient.width;

    el.textContent = '';
    el.style.height = height + 'px';
    el.style.width = width + 'px';
    el.style.visibility = 'visible';
    var typeTarget = addTypeTarget(el);
    var caret = addCaret(el);

    function typeNextChar() {
        var nextChar = chars.shift();
        typeTarget.textContent = typeTarget.textContent + nextChar;
        if (0 < chars.length) {
            setTimeout(typeNextChar, DELAY);
        } else {
            removeCaret(caret);
            el.style.height = 'initial';
            el.style.width = 'initial';
        }
    }
    typeNextChar();
}

function addTypeTarget(el) {
    var typeTarget = document.createElement('span');
    el.appendChild(typeTarget);
    return typeTarget;
}

function addCaret(el) {
    var height = parseInt(window.getComputedStyle(el)['font-size']);
    height -= 4;
    var backgroundColor = window.getComputedStyle(el)['color'];
    var width = Math.ceil(height * 0.05);
    var marginBottom = Math.ceil(height * -0.1);
    var caret = document.createElement('span');
    caret.classList.add('type-effect-caret');
    caret.style.height = height + 'px';
    caret.style.width = width + 'px';
    caret.style.backgroundColor = backgroundColor;
    caret.style.marginBottom = marginBottom + 'px';
    el.appendChild(caret);
    return caret;
}

function removeCaret(caret) {
    if (caret) {
        setTimeout(function () {
            return caret.parentNode.removeChild(caret);
        }, 2000);
    }
}

},{}]},{},[2])//# sourceMappingURL=script.js.map
