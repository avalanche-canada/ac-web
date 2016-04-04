webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.About = exports.Forecast = exports.ReactDom = exports.React = undefined;
	
	__webpack_require__(1);
	
	var _exposeReactReact = __webpack_require__(291);
	
	var _exposeReactReact2 = _interopRequireDefault(_exposeReactReact);
	
	var _exposeReactDOMReactDom = __webpack_require__(448);
	
	var _exposeReactDOMReactDom2 = _interopRequireDefault(_exposeReactDOMReactDom);
	
	var _Forecast2 = __webpack_require__(450);
	
	var _Forecast3 = _interopRequireDefault(_Forecast2);
	
	var _about = __webpack_require__(964);
	
	var _about2 = _interopRequireDefault(_about);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.React = _exposeReactReact2.default;
	exports.ReactDom = _exposeReactDOMReactDom2.default;
	exports.Forecast = _Forecast3.default;
	exports.About = _about2.default;

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["React"] = __webpack_require__(292);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ReactDOM"] = __webpack_require__(449);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ReactWeatherForecast"] = __webpack_require__(451);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(452);
	
	var _DaySet = __webpack_require__(640);
	
	var _DaySet2 = _interopRequireDefault(_DaySet);
	
	var _TabSet = __webpack_require__(747);
	
	var _TabSet2 = _interopRequireDefault(_TabSet);
	
	var _Outlook = __webpack_require__(962);
	
	var _Outlook2 = _interopRequireDefault(_Outlook);
	
	var _Footer = __webpack_require__(963);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _prismic = __webpack_require__(741);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Forecast.propTypes = {
		content: _react.PropTypes.object.isRequired
	};
	
	function Forecast(_ref) {
		var content = _ref.content;
	
		var date = content.getDate('weather-forecast.date');
	
		return _react2.default.createElement(
			'section',
			{ id: 'news-blog-event-landing-body' },
			_react2.default.createElement(_prismic.Text, { fragment: 'weather-forecast.headline', component: 'h1' }),
			_react2.default.createElement(_prismic.Html, { fragment: 'weather-forecast.synopsis' }),
			_react2.default.createElement(_TabSet2.default, null),
			_react2.default.createElement(_DaySet2.default, { start: date }),
			_react2.default.createElement(_Outlook2.default, null)
		);
	}
	
	var childContextTypes = {
		document: _react.PropTypes.object.isRequired
	};
	function getChildContext(props) {
		return {
			document: props.content
		};
	}
	
	exports.default = (0, _recompose.withContext)(childContextTypes, getChildContext, Forecast);

/***/ },

/***/ 640:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(641);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _Day = __webpack_require__(740);
	
	var _Day2 = _interopRequireDefault(_Day);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sequence = [1, 2, 3, 4];
	
	DaySet.propTypes = {
		start: _react.PropTypes.instanceOf(Date).isRequired
	};
	
	function DaySet(_ref) {
		var start = _ref.start;
	
		var dates = sequence.map(function (increment) {
			return (0, _moment2.default)(start).add(increment, 'day').toDate();
		});
	
		return _react2.default.createElement(
			'div',
			null,
			dates.map(function (date, index) {
				return _react2.default.createElement(_Day2.default, { date: date, index: index, key: index });
			})
		);
	}
	
	exports.default = DaySet;

/***/ },

/***/ 740:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _prismic = __webpack_require__(741);
	
	var _Date = __webpack_require__(746);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Day.propTypes = {
		date: _react.PropTypes.instanceOf(Date).isRequired,
		index: _react.PropTypes.oneOf([0, 1, 2, 3]).isRequired
	};
	
	var sequence = [1, 2, 3, 4];
	
	function Day(_ref) {
		var document = _ref.document;
		var date = _ref.date;
		var index = _ref.index;
	
		function get(type, increment) {
			return document.get('weather-forecast.day' + (index + 1) + '-' + type + increment);
		}
	
		if (!get('image', 1) && !get('text', 1)) {
			return _react2.default.createElement('noscript', null);
		}
	
		return _react2.default.createElement(
			'section',
			null,
			_react2.default.createElement(
				'h2',
				null,
				(0, _Date.format)(date)
			),
			sequence.map(function (increment) {
				return _react2.default.createElement(
					'div',
					{ key: increment },
					_react2.default.createElement(_prismic.Image, { fragment: 'weather-forecast.day' + (index + 1) + '-image' + increment }),
					_react2.default.createElement(_prismic.Html, { fragment: 'weather-forecast.day' + (index + 1) + '-text' + increment })
				);
			})
		);
	}
	
	exports.default = (0, _prismic.getDocument)(Day);

/***/ },

/***/ 741:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDocument = exports.Image = exports.Text = exports.Html = undefined;
	
	var _Html2 = __webpack_require__(742);
	
	var _Html3 = _interopRequireDefault(_Html2);
	
	var _Text2 = __webpack_require__(744);
	
	var _Text3 = _interopRequireDefault(_Text2);
	
	var _Image2 = __webpack_require__(745);
	
	var _Image3 = _interopRequireDefault(_Image2);
	
	var _getDocument2 = __webpack_require__(743);
	
	var _getDocument3 = _interopRequireDefault(_getDocument2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Html = _Html3.default;
	exports.Text = _Text3.default;
	exports.Image = _Image3.default;
	exports.getDocument = _getDocument3.default;

/***/ },

/***/ 742:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(743);
	
	var _getDocument2 = _interopRequireDefault(_getDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Html(_ref) {
		var fragment = _ref.fragment;
		var document = _ref.document;
	
		var frag = document.get(fragment);
	
		if (frag === null) {
			return _react2.default.createElement('noscript', null);
		}
	
		return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: frag.asHtml() } });
	}
	
	Html.propTypes = {
		fragment: _react.PropTypes.string.isRequired
	};
	
	exports.default = (0, _getDocument2.default)(Html);

/***/ },

/***/ 743:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getDocument;
	
	var _react = __webpack_require__(292);
	
	var _recompose = __webpack_require__(452);
	
	var contextTypes = {
		document: _react.PropTypes.object.isRequired
	};
	
	function getDocument(BaseComponent) {
		return (0, _recompose.getContext)(contextTypes, BaseComponent);
	}

/***/ },

/***/ 744:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(743);
	
	var _getDocument2 = _interopRequireDefault(_getDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var string = _react.PropTypes.string;
	var node = _react.PropTypes.node;
	var oneOfType = _react.PropTypes.oneOfType;
	
	
	function Text(_ref) {
		var document = _ref.document;
		var fragment = _ref.fragment;
		var _ref$component = _ref.component;
		var component = _ref$component === undefined ? 'p' : _ref$component;
	
		var frag = document.get(fragment);
	
		if (frag === null) {
			return _react2.default.createElement('noscript', null);
		}
	
		return (0, _react.createElement)(component, null, frag.asText());
	}
	
	Text.propTypes = {
		fragment: string.isRequired,
		component: oneOfType([string, node])
	};
	
	exports.default = (0, _getDocument2.default)(Text);

/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(743);
	
	var _getDocument2 = _interopRequireDefault(_getDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Image.propTypes = {
		fragment: _react.PropTypes.string.isRequired,
		openNewTab: _react.PropTypes.bool
	};
	
	function Image(_ref) {
		var fragment = _ref.fragment;
		var document = _ref.document;
		var _ref$openNewTab = _ref.openNewTab;
		var openNewTab = _ref$openNewTab === undefined ? false : _ref$openNewTab;
	
		var image = document.getImage(fragment);
	
		if (image === null) {
			return _react2.default.createElement('noscript', null);
		}
	
		var url = image.main.url;
	
	
		if (openNewTab === true) {
			return _react2.default.createElement(
				'a',
				{ href: url, target: '_blank' },
				_react2.default.createElement('img', { src: url })
			);
		}
	
		return _react2.default.createElement('img', { src: url });
	}
	
	exports.default = (0, _getDocument2.default)(Image);

/***/ },

/***/ 746:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.format = format;
	
	var _moment = __webpack_require__(641);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MASK = 'dddd MMMM Do';
	
	function format(date) {
		var mask = arguments.length <= 1 || arguments[1] === undefined ? MASK : arguments[1];
	
		return (0, _moment2.default)(date).format(mask);
	}

/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tab = __webpack_require__(748);
	
	var _prismic = __webpack_require__(741);
	
	var _Loop = __webpack_require__(933);
	
	var _Loop2 = _interopRequireDefault(_Loop);
	
	var _Image = __webpack_require__(938);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var TABS = new Map([['content-1-2', {
		title: 'Day 1-2'
	}], ['content-3-5', {
		title: 'Day 3-5'
	}], ['content-6-10', {
		title: 'Day 6-10'
	}]]);
	
	var NAMES = [].concat(_toConsumableArray(TABS.keys()));
	
	function WeatherTabSet(_ref) {
		var document = _ref.document;
	
		var tabs = NAMES.map(function (name) {
			var zone = document.get('weather-forecast.' + name);
	
			if (zone === null) {
				return null;
			}
	
			var slices = zone.value;
			var tab = TABS.get(name);
	
			return _react2.default.createElement(
				_tab.Tab,
				{ key: name, name: name, title: tab.title },
				slices.map(function (slice) {
					switch (slice.sliceType) {
						case 'text':
							var html = { __html: slice.asHtml() };
	
							return _react2.default.createElement('div', { dangerouslySetInnerHTML: html });
						case 'loop':
							var _slice$value$toArray = slice.value.toArray();
	
							var _slice$value$toArray2 = _slicedToArray(_slice$value$toArray, 1);
	
							var loop = _slice$value$toArray2[0];
	
							var _loop$getText$split = loop.getText('type').split('@');
	
							var _loop$getText$split2 = _slicedToArray(_loop$getText$split, 2);
	
							var type = _loop$getText$split2[0];
							var run = _loop$getText$split2[1];
	
							var props = {
								type: type,
								date: loop.getDate('date'),
								run: Number(run)
							};
	
							return _react2.default.createElement(_Loop2.default, props);
						case 'image':
							var _slice$value$toArray3 = slice.value.toArray();
	
							var _slice$value$toArray4 = _slicedToArray(_slice$value$toArray3, 1);
	
							var image = _slice$value$toArray4[0];
	
							var _image$getImage = image.getImage('image');
	
							var url = _image$getImage.url;
	
	
							return _react2.default.createElement(_Image2.default, { src: url, openNewTab: true });
					}
				})
			);
		}).filter(function (tab) {
			return !!tab;
		});
	
		if (tabs.length === 0) {
			return _react2.default.createElement('noscript', null);
		}
	
		return _react2.default.createElement(
			_tab.TabSet,
			null,
			tabs
		);
	}
	
	exports.default = (0, _prismic.getDocument)(WeatherTabSet);

/***/ },

/***/ 748:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tab = exports.TabSet = undefined;
	
	var _TabSet2 = __webpack_require__(749);
	
	var _TabSet3 = _interopRequireDefault(_TabSet2);
	
	var _Tab2 = __webpack_require__(932);
	
	var _Tab3 = _interopRequireDefault(_Tab2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.TabSet = _TabSet3.default;
	exports.Tab = _Tab3.default;

/***/ },

/***/ 749:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Panel = __webpack_require__(930);
	
	var _Panel2 = _interopRequireDefault(_Panel);
	
	var _Tab = __webpack_require__(931);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function childrenToTabs(children) {
		return _react.Children.toArray(children).filter(function (tab) {
			return !!tab;
		});
	}
	
	var TabSet = function (_React$Component) {
		_inherits(TabSet, _React$Component);
	
		function TabSet(props) {
			var _Object$getPrototypeO;
	
			_classCallCheck(this, TabSet);
	
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}
	
			var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TabSet)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));
	
			var activeIndex = props.activeIndex;
	
	
			_this.state = { activeIndex: activeIndex };
	
			_this.handleActivate = _this.handleActivate.bind(_this);
			return _this;
		}
	
		_createClass(TabSet, [{
			key: 'handleActivate',
			value: function handleActivate() {
				var onActivate = this.props.onActivate;
	
	
				if (typeof onActivate === 'function') {
					onActivate(activeIndex);
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(_ref) {
				var activeIndex = _ref.activeIndex;
				var children = _ref.children;
	
				if (typeof activeIndex !== 'number') {
					return;
				}
	
				var _childrenToTabs = childrenToTabs(children);
	
				var length = _childrenToTabs.length;
	
	
				this.activeIndex = Math.min(activeIndex, length - 1);
			}
		}, {
			key: 'renderTabHeader',
			value: function renderTabHeader(tab, index) {
				var _this2 = this;
	
				var styleName = index === this.activeIndex ? 'ListItem--active' : 'ListItem';
				var onClick = function onClick() {
					return _this2.activeIndex = index;
				};
	
				return _react2.default.createElement(
					'li',
					_extends({ role: 'tab', key: index }, { onClick: onClick, styleName: styleName }),
					tab.props.title
				);
			}
		}, {
			key: 'renderTabPanel',
			value: function renderTabPanel(tab, index) {
				return _react2.default.createElement(
					_Panel2.default,
					{ active: this.activeIndex === index },
					tab.props.children
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var tabs = this.tabs;
	
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'ul',
						{ role: 'tablist', styleName: 'List' },
						tabs.map(this.renderTabHeader, this)
					),
					tabs.map(this.renderTabPanel, this)
				);
			}
		}, {
			key: 'activeIndex',
			get: function get() {
				return this.state.activeIndex;
			},
			set: function set(activeIndex) {
				this.setState({ activeIndex: activeIndex }, this.handleActivate);
			}
		}, {
			key: 'tabs',
			get: function get() {
				return childrenToTabs(this.props.children);
			}
		}]);
	
		return TabSet;
	}(_react2.default.Component);
	
	TabSet.propTypes = {
		activeIndex: _react.PropTypes.number,
		onActivate: _react.PropTypes.func
	};
	TabSet.defaultProps = {
		activeIndex: 0
	};
	exports.default = (0, _reactCssModules2.default)(TabSet, _Tab2.default);

/***/ },

/***/ 930:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Tab = __webpack_require__(931);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Panel.propTypes = {
		active: _react.PropTypes.bool
	};
	
	function Panel(_ref) {
		var children = _ref.children;
		var _ref$active = _ref.active;
		var active = _ref$active === undefined ? false : _ref$active;
	
		return _react2.default.createElement(
			'div',
			{ styleName: active === true ? 'Panel--active' : 'Panel', role: 'tabpanel' },
			children
		);
	}
	
	exports.default = (0, _reactCssModules2.default)(Panel, _Tab2.default);

/***/ },

/***/ 931:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"List":"Tab__List___g5V8O","ListItem":"Tab__ListItem___1v3pE","ListItem--active":"Tab__ListItem--active___2Ie3c Tab__ListItem___1v3pE","Panel":"Tab__Panel___16HTS","Panel--active":"Tab__Panel--active___1gxeJ Tab__Panel___16HTS"};

/***/ },

/***/ 932:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Tab;
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Tab.propTypes = {
		title: _react.PropTypes.node.isRequired
	};
	
	function Tab(_ref) {
		var children = _ref.children;
	
		return _react2.default.createElement(
			'div',
			{ role: 'tabpanel' },
			children
		);
	}

/***/ },

/***/ 933:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _animation = __webpack_require__(934);
	
	var _Url = __webpack_require__(940);
	
	var _keycode = __webpack_require__(958);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _lodash = __webpack_require__(959);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _lodash3 = __webpack_require__(961);
	
	var _lodash4 = _interopRequireDefault(_lodash3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var memoizedRange = (0, _lodash2.default)(_lodash4.default);
	
	var HOURS = new Map([['AC_RDPS_BC_12hr-precip', memoizedRange(0, 48, 12)], ['AC_RDPS_BC_2500m-wind', memoizedRange(0, 48, 6)], ['AC_RDPS_BC_3hr-precip', memoizedRange(0, 48, 3)], ['AC_RDPS_BC_freezing-level', memoizedRange(0, 48, 6)], ['AC_RDPS_BC_hal-24hr-snowfall', memoizedRange(0, 48, 3)], ['AC_RDPS_BC_weather-systems', memoizedRange(0, 48, 6)], ['AC_GDPS_BC_12hr-precip', memoizedRange(0, 144, 12)], ['AC_GDPS_BC_1500m-temp', memoizedRange(0, 144, 6)], ['AC_GDPS_BC_2500m-wind', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_clouds-500hgts', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_pacific-systems', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_precipitable-water', memoizedRange(0, 144, 6)], ['AC_HRDPS_BC_wms-1hr-precip', memoizedRange(0, 48)], ['AC_HRDPS_BC_wms-cumulative-precip', memoizedRange(0, 48, 6)], ['AC_RDPS_BC_12hr-precip1', memoizedRange(0, 48, 12)], ['AC_RDPS_BC_precip-types', memoizedRange(0, 48, 3)], ['AC_RDPS_W-CST_3hr-precip-clds-th-slp', memoizedRange(0, 48, 6)], ['AC_GDPS_BC_750-wind', memoizedRange(0, 144, 6)], ['AC_GDPS_BC_850-temp', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_clouds-precip-th-slp', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_clouds-th-500hts', memoizedRange(0, 144, 6)], ['AC_GDPS_EPA_tpw', memoizedRange(0, 144, 6)], ['AC_GDPS_W-CAN_precip-th-slp', memoizedRange(0, 144, 6)], ['AC_HRDPS_BC_wms-1hr-precip1', memoizedRange(0, 42)], ['AC_HRDPS_BC-LAM_1hr-precip', memoizedRange(0, 42)], ['AC_HRDPS_S-CST_12hr-precip', memoizedRange(12, 36, 12)], ['AC_HRDPS_S-INT_12hr-precip', memoizedRange(12, 36, 12)]]);
	var TYPES = [].concat(_toConsumableArray(HOURS.keys()));
	
	var Loop = function (_Component) {
		_inherits(Loop, _Component);
	
		function Loop() {
			var _Object$getPrototypeO;
	
			_classCallCheck(this, Loop);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Loop)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			_this.state = {
				cursor: 0,
				isPlaying: false,
				isBroken: true
			};
	
	
			_this.handleNext = _this.next.bind(_this);
			_this.handlePrevious = _this.prev.bind(_this);
			_this.handleFirst = _this.first.bind(_this);
			_this.handleLast = _this.last.bind(_this);
			_this.handlePlay = _this.play.bind(_this);
			_this.handlePause = _this.pause.bind(_this);
			_this.handleKeyDown = _this.onKeyDown.bind(_this);
	
			_this.handleImageError = _this.onImageError.bind(_this);
			_this.handleImageLoad = _this.onImageLoad.bind(_this);
			return _this;
		}
	
		_createClass(Loop, [{
			key: 'next',
			value: function next() {
				if (this.maxCursor === this.cursor) {
					this.first();
				} else {
					this.cursor = this.cursor + 1;
				}
			}
		}, {
			key: 'prev',
			value: function prev() {
				if (this.cursor === 0) {
					this.last();
				} else {
					this.cursor = this.cursor - 1;
				}
			}
		}, {
			key: 'first',
			value: function first() {
				this.cursor = 0;
			}
		}, {
			key: 'last',
			value: function last() {
				this.cursor = this.maxCursor;
			}
		}, {
			key: 'play',
			value: function play() {
				var _this2 = this;
	
				var isPlaying = true;
	
				this.setState({ isPlaying: isPlaying }, function () {
					_this2.intervalID = window.setInterval(_this2.handleNext, 1500);
				});
			}
		}, {
			key: 'pause',
			value: function pause() {
				var _this3 = this;
	
				var isPlaying = false;
	
				this.setState({ isPlaying: isPlaying }, function () {
					window.clearInterval(_this3.intervalID);
				});
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				window.addEventListener('keydown', this.handleKeyDown);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				window.removeEventListener('keydown', this.handleKeyDown);
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(_ref) {
				var keyCode = _ref.keyCode;
				var _keycode$codes = _keycode2.default.codes;
				var left = _keycode$codes.left;
				var right = _keycode$codes.right;
	
	
				switch (keyCode) {
					case left:
						this.prev();
						break;
					case right:
						this.next();
						break;
				}
			}
		}, {
			key: 'onImageLoad',
			value: function onImageLoad() {
				this.isBroken = false;
			}
		}, {
			key: 'onImageError',
			value: function onImageError() {
				this.isBroken = true;
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props;
				var type = _props.type;
				var date = _props.date;
				var run = _props.run;
	
				var hour = this.hours[this.cursor];
				var url = (0, _Url.format)({ type: type, date: date, run: run, hour: hour });
				var toolbar = {
					isPlaying: this.state.isPlaying,
					onNext: this.handleNext,
					onPrevious: this.handlePrevious,
					onFirst: this.handleFirst,
					onLast: this.handleLast,
					onPlay: this.handlePlay,
					onPause: this.handlePause
				};
	
				var image = {
					url: url,
					onError: this.handleImageError,
					onLoad: this.handleImageLoad
				};
	
				return _react2.default.createElement(
					_animation.Animation,
					null,
					this.isBroken || _react2.default.createElement(_animation.Toolbar, toolbar),
					this.isBroken || _react2.default.createElement(
						_animation.Title,
						null,
						this.of
					),
					_react2.default.createElement(_animation.Image, _extends({}, image, { openNewTab: true }))
				);
			}
		}, {
			key: 'cursor',
			get: function get() {
				return this.state.cursor;
			},
			set: function set(cursor) {
				this.setState({ cursor: cursor });
			}
		}, {
			key: 'maxCursor',
			get: function get() {
				return this.hours.length - 1;
			}
		}, {
			key: 'isBroken',
			get: function get() {
				return this.state.isBroken;
			},
			set: function set(isBroken) {
				this.setState({ isBroken: isBroken });
			}
		}, {
			key: 'hours',
			get: function get() {
				return HOURS.get(this.props.type);
			}
		}, {
			key: 'of',
			get: function get() {
				return this.cursor + 1 + ' of ' + this.hours.length;
			}
		}]);
	
		return Loop;
	}(_react.Component);
	
	Loop.propTypes = {
		type: _react.PropTypes.oneOf(TYPES).isRequired,
		run: _react.PropTypes.oneOf((0, _lodash4.default)(0, 24, 6)),
		date: _react.PropTypes.instanceOf(Date).isRequired
	};
	exports.default = Loop;

/***/ },

/***/ 934:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Title = exports.Toolbar = exports.Image = exports.Animation = undefined;
	
	var _Animation2 = __webpack_require__(935);
	
	var _Animation3 = _interopRequireDefault(_Animation2);
	
	var _Image2 = __webpack_require__(937);
	
	var _Image3 = _interopRequireDefault(_Image2);
	
	var _Toolbar2 = __webpack_require__(944);
	
	var _Toolbar3 = _interopRequireDefault(_Toolbar2);
	
	var _Title2 = __webpack_require__(957);
	
	var _Title3 = _interopRequireDefault(_Title2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Animation = _Animation3.default;
	exports.Image = _Image3.default;
	exports.Toolbar = _Toolbar3.default;
	exports.Title = _Title3.default;

/***/ },

/***/ 935:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Animation = __webpack_require__(936);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Animation(_ref) {
		var children = _ref.children;
	
		return _react2.default.createElement(
			'div',
			{ styleName: 'Container' },
			children
		);
	}
	
	exports.default = (0, _reactCssModules2.default)(Animation, _Animation2.default);

/***/ },

/***/ 936:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Container":"Animation__Container___2-rB2","Title":"Animation__Title___7szC5","Toolbar":"Animation__Toolbar___1I23R","Image":"Animation__Image___1zapw"};

/***/ },

/***/ 937:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Animation = __webpack_require__(936);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _Image = __webpack_require__(938);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	AnimationImage.propTypes = {
		url: _react.PropTypes.string.isRequired,
		onError: _react.PropTypes.func,
		onLoad: _react.PropTypes.func
	};
	
	function K() {}
	
	function AnimationImage(props) {
		return _react2.default.createElement(_Image2.default, _extends({ styleName: 'Image' }, props));
	}
	
	exports.default = (0, _reactCssModules2.default)(AnimationImage, _Animation2.default);

/***/ },

/***/ 938:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(452);
	
	var _Image = __webpack_require__(939);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	Image.propTypes = {
		url: _react.PropTypes.string.isRequired,
		openNewTab: _react.PropTypes.bool
	};
	Image.defaultProps = {
		openNewTab: false
	};
	
	function Image(_ref) {
		var openNewTab = _ref.openNewTab;
	
		var props = _objectWithoutProperties(_ref, ['openNewTab']);
	
		var image = _react2.default.createElement('img', props);
	
		if (openNewTab) {
			return _react2.default.createElement(
				'a',
				{ href: props.url, target: '_blank' },
				image
			);
		}
	
		return image;
	}
	
	exports.default = (0, _recompose.mapProps)(function (props) {
		return (0, _Image.mapUrlToSrc)(props, true);
	}, Image);

/***/ },

/***/ 939:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.mapUrlToSrc = mapUrlToSrc;
	
	var _Url = __webpack_require__(940);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function mapUrlToSrc(_ref) {
		var url = _ref.url;
	
		var rest = _objectWithoutProperties(_ref, ['url']);
	
		var withSrcSet = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
		if (withSrcSet) {
			return _extends({
				// srcSet: asSrcSet(url),
				src: url
			}, rest);
		}
	
		return _extends({
			src: url
		}, rest);
	}

/***/ },

/***/ 940:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.format = format;
	exports.asSrcSet = asSrcSet;
	
	var _moment = __webpack_require__(641);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _lodash = __webpack_require__(941);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DOMAIN = 'http://msc.avalanche.ca';
	var PATH = 'loops/images';
	
	var resolutions = [{
		suffix: 'small',
		width: 500
	}, {
		suffix: 'medium',
		width: 1000
	}, {
		suffix: 'large',
		width: 1500
	}];
	
	function format(_ref) {
		var type = _ref.type;
		var date = _ref.date;
		var run = _ref.run;
		var hour = _ref.hour;
	
		hour = (0, _lodash2.default)(String(hour), 3, '0');
		run = (0, _lodash2.default)(String(run), 2, '0');
		date = (0, _moment2.default)(date).format('YYYYMMDD');
	
		return DOMAIN + '/' + PATH + '/' + type + '_' + date + run + '_' + hour + 'HR.jpg';
	}
	
	function asSrcSet(url) {
		function asSet(_ref2) {
			var suffix = _ref2.suffix;
			var width = _ref2.width;
	
			return url.replace('.jpg', '-' + suffix + '.jpg') + ' ' + width + 'w';
		}
	
		return resolutions.map(asSet).join(', ');
	}

/***/ },

/***/ 944:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _button = __webpack_require__(945);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _Animation = __webpack_require__(936);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _icons = __webpack_require__(949);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function AnimateButton(_ref) {
		var isPlaying = _ref.isPlaying;
		var onPause = _ref.onPause;
		var onPlay = _ref.onPlay;
	
		var title = (isPlaying ? 'Pause' : 'Play') + ' the animation';
		var onClick = isPlaying ? onPause : onPlay;
	
		return _react2.default.createElement(
			_button2.default,
			{ onClick: onClick, title: title },
			isPlaying ? _react2.default.createElement(_icons.Pause, { inverse: true }) : _react2.default.createElement(_icons.Play, { inverse: true })
		);
	}
	function Next(props) {
		return _react2.default.createElement(
			_button2.default,
			_extends({}, props, { title: 'Move to the next image' }),
			_react2.default.createElement(_icons.ChevronRight, { inverse: true })
		);
	}
	function Prev(props) {
		return _react2.default.createElement(
			_button2.default,
			_extends({}, props, { title: 'Move to the previous image' }),
			_react2.default.createElement(_icons.ChevronLeft, { inverse: true })
		);
	}
	function First(props) {
		return _react2.default.createElement(
			_button2.default,
			_extends({}, props, { title: 'Move to the first image' }),
			_react2.default.createElement(_icons.FirstPage, { inverse: true })
		);
	}
	function Last(props) {
		return _react2.default.createElement(
			_button2.default,
			_extends({}, props, { title: 'Mode to the last image' }),
			_react2.default.createElement(_icons.LastPage, { inverse: true })
		);
	}
	
	var func = _react.PropTypes.func;
	var bool = _react.PropTypes.bool;
	
	
	AnimationToolbar.propTypes = {
		isPlaying: bool,
		onNext: func,
		onPrevious: func,
		onFirst: func,
		onLast: func,
		onPause: func,
		onPlay: func
	};
	
	function AnimationToolbar(_ref2) {
		var onNext = _ref2.onNext;
		var onPrevious = _ref2.onPrevious;
		var onFirst = _ref2.onFirst;
		var onLast = _ref2.onLast;
		var onPause = _ref2.onPause;
		var onPlay = _ref2.onPlay;
		var _ref2$isPlaying = _ref2.isPlaying;
		var isPlaying = _ref2$isPlaying === undefined ? true : _ref2$isPlaying;
	
		return _react2.default.createElement(
			'div',
			{ styleName: 'Toolbar' },
			onFirst && _react2.default.createElement(First, { onClick: onFirst }),
			onPrevious && _react2.default.createElement(Prev, { onClick: onPrevious }),
			_react2.default.createElement(AnimateButton, { onPause: onPause, onPlay: onPlay, isPlaying: isPlaying }),
			onNext && _react2.default.createElement(Next, { onClick: onNext }),
			onLast && _react2.default.createElement(Last, { onClick: onLast })
		);
	}
	
	exports.default = (0, _reactCssModules2.default)(AnimationToolbar, _Animation2.default);

/***/ },

/***/ 945:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Top = exports.default = undefined;
	
	var _Button = __webpack_require__(946);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Top2 = __webpack_require__(948);
	
	var _Top3 = _interopRequireDefault(_Top2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Button2.default;
	exports.Top = _Top3.default;

/***/ },

/***/ 946:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SECONDARY = exports.PRIMARY = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(947);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _recompose = __webpack_require__(452);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var PRIMARY = exports.PRIMARY = 'primary';
	var SECONDARY = exports.SECONDARY = 'secondary';
	
	exports.default = (0, _reactCssModules2.default)((0, _recompose.setPropTypes)({
		type: _react.PropTypes.oneOf([PRIMARY, SECONDARY])
	}, function Button(_ref) {
		var _ref$type = _ref.type;
		var type = _ref$type === undefined ? PRIMARY : _ref$type;
		var children = _ref.children;
	
		var props = _objectWithoutProperties(_ref, ['type', 'children']);
	
		return _react2.default.createElement(
			'button',
			_extends({ styleName: type }, props),
			children
		);
	}), _Button2.default);

/***/ },

/***/ 947:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"common":"Button__common___3Q-wo","primary":"Button__primary___2P-Th Button__common___3Q-wo","secondary":"Button__secondary___KGcqL Button__common___3Q-wo","chevron":"Button__chevron___39rvy","top":"Button__top___2voAA Button__primary___2P-Th Button__common___3Q-wo Button__chevron___39rvy"};

/***/ },

/***/ 948:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Button = __webpack_require__(946);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function scrollTop(event) {
		event.preventDefault();
		window.scrollTop = 0;
	}
	
	exports.default = (0, _recompose.pure)(function Top() {
		return React.createElement(
			_Button2.default,
			{ onClick: scrollTop },
			'Top'
		);
	});

/***/ },

/***/ 949:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChevronRight = exports.ChevronLeft = exports.Play = exports.Pause = exports.Last = exports.First = exports.LastPage = exports.FirstPage = undefined;
	
	var _First2 = __webpack_require__(950);
	
	var _First3 = _interopRequireDefault(_First2);
	
	var _Last2 = __webpack_require__(952);
	
	var _Last3 = _interopRequireDefault(_Last2);
	
	var _Pause2 = __webpack_require__(953);
	
	var _Pause3 = _interopRequireDefault(_Pause2);
	
	var _Play2 = __webpack_require__(954);
	
	var _Play3 = _interopRequireDefault(_Play2);
	
	var _ChevronLeft2 = __webpack_require__(955);
	
	var _ChevronLeft3 = _interopRequireDefault(_ChevronLeft2);
	
	var _ChevronRight2 = __webpack_require__(956);
	
	var _ChevronRight3 = _interopRequireDefault(_ChevronRight2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.FirstPage = _First3.default;
	exports.LastPage = _Last3.default;
	exports.First = _First3.default;
	exports.Last = _Last3.default;
	exports.Pause = _Pause3.default;
	exports.Play = _Play3.default;
	exports.ChevronLeft = _ChevronLeft3.default;
	exports.ChevronRight = _ChevronRight3.default;

/***/ },

/***/ 950:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function First(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M24 24H0V0h24v24z', fill: 'none' })
		);
	}
	
	exports.default = (0, _recompose.pure)(First);

/***/ },

/***/ 951:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = Icon;
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	Icon.propTypes = {
		width: _react.PropTypes.number,
		height: _react.PropTypes.number
	};
	
	function Icon(_ref) {
		var children = _ref.children;
		var _ref$height = _ref.height;
		var height = _ref$height === undefined ? 24 : _ref$height;
		var _ref$width = _ref.width;
		var width = _ref$width === undefined ? 24 : _ref$width;
	
		var props = _objectWithoutProperties(_ref, ["children", "height", "width"]);
	
		return _react2.default.createElement(
			"svg",
			_extends({ fill: "none", viewBox: "0 0 24 24" }, { height: height, width: width }, { xmlns: "http://www.w3.org/2000/svg" }),
			children
		);
	}

/***/ },

/***/ 952:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Last(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' })
		);
	}
	
	exports.default = (0, _recompose.pure)(Last);

/***/ },

/***/ 953:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Pause(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
		);
	}
	
	exports.default = (0, _recompose.pure)(Pause);

/***/ },

/***/ 954:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Play(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M8 5v14l11-7z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
		);
	}
	exports.default = (0, _recompose.pure)(Play);

/***/ },

/***/ 955:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function ChevronLeft(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
		);
	}
	
	exports.default = (0, _recompose.pure)(ChevronLeft);

/***/ },

/***/ 956:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(951);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function ChevronRight(_ref) {
		var _ref$inverse = _ref.inverse;
		var inverse = _ref$inverse === undefined ? false : _ref$inverse;
	
		var props = _objectWithoutProperties(_ref, ['inverse']);
	
		return _react2.default.createElement(
			_Icon2.default,
			props,
			_react2.default.createElement('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z', fill: inverse ? 'white' : 'black' }),
			_react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
		);
	}
	
	exports.default = (0, _recompose.pure)(ChevronRight);

/***/ },

/***/ 957:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Animation = __webpack_require__(936);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Title(_ref) {
		var children = _ref.children;
	
		return _react2.default.createElement(
			'p',
			{ styleName: 'Title' },
			children
		);
	}
	
	exports.default = (0, _reactCssModules2.default)(Title, _Animation2.default);

/***/ },

/***/ 962:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _prismic = __webpack_require__(741);
	
	var _lodash = __webpack_require__(961);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sequence = [1, 2, 3, 4];
	
	function Outlook(_ref) {
		var document = _ref.document;
	
		var outlook = document.get('weather-forecast.outlook');
		var image1 = document.get('weather-forecast.outlook-image1');
		var text1 = document.get('weather-forecast.outlook-text1');
	
		if (outlook === null) {
			return _react2.default.createElement('noscript', null);
		}
	
		return _react2.default.createElement(
			'section',
			null,
			_react2.default.createElement(
				'h2',
				null,
				'Outlook'
			),
			_react2.default.createElement(_prismic.Html, { fragment: 'weather-forecast.outlook' }),
			sequence.map(function (increment) {
				return _react2.default.createElement(
					'div',
					{ key: increment },
					_react2.default.createElement(_prismic.Image, { fragment: 'weather-forecast.outlook-image' + increment, openNewTab: true }),
					_react2.default.createElement(_prismic.Html, { fragment: 'weather-forecast.outlook-text' + increment })
				);
			})
		);
	}
	
	exports.default = (0, _prismic.getDocument)(Outlook);

/***/ },

/***/ 963:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MAILTO = 'mailto:ec@canada.ca?subject=Mountain Weather Forecast feedback';
	
	function ForecastFooter(_ref) {
		var href = _ref.href;
		var onClick = _ref.onClick;
		var text = _ref.text;
	
		return _react2.default.createElement(
			'footer',
			null,
			'Forecasts and graphics produced by Environment Canada',
			' ',
			_react2.default.createElement(
				'a',
				{ href: MAILTO },
				'Send us feedback'
			)
		);
	}
	
	exports.default = (0, _recompose.pure)(ForecastFooter);

/***/ },

/***/ 964:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ReactAbout"] = __webpack_require__(965);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 965:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Staff = Staff;
	
	var _MemberList = __webpack_require__(966);
	
	var _MemberList2 = _interopRequireDefault(_MemberList);
	
	var _Section = __webpack_require__(968);
	
	var _Section2 = _interopRequireDefault(_Section);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Staff(_ref) {
	    var document = _ref.document;
	
	    var members = document.getGroup('staff-members.staff').toArray();
	
	    return React.createElement(
	        _Section2.default,
	        { title: 'Staff' },
	        React.createElement(_MemberList2.default, { members: members })
	    );
	}

/***/ },

/***/ 966:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(452);
	
	var _Member = __webpack_require__(967);
	
	var _Member2 = _interopRequireDefault(_Member);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	MemberList.propTypes = {
	    members: _react.PropTypes.arrayOf(_react.PropTypes.object)
	};
	
	function MemberList(_ref) {
	    var _ref$members = _ref.members;
	    var members = _ref$members === undefined ? [] : _ref$members;
	
	    return _react2.default.createElement(
	        'div',
	        null,
	        members.map(function (member, index) {
	            return _react2.default.createElement(_Member2.default, {
	                key: index,
	                fullName: member.getText('full_name'),
	                title: member.getText('title'),
	                email: member.getText('email'),
	                phone: member.getText('phone') });
	        })
	    );
	}
	
	exports.default = (0, _recompose.pure)(MemberList);

/***/ },

/***/ 967:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(452);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var string = _react.PropTypes.string;
	
	
	Member.propTypes = {
		fullName: string.isRequired,
		title: string.isRequired,
		email: string.isRequired,
		phone: string.isRequired
	};
	
	function Member(_ref) {
		var fullName = _ref.fullName;
		var title = _ref.title;
		var email = _ref.email;
		var phone = _ref.phone;
	
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'strong',
				null,
				title
			),
			' ',
			fullName,
			' ',
			email,
			' ',
			phone
		);
	}
	
	exports.default = (0, _recompose.pure)(Member);

/***/ },

/***/ 968:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(292);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(750);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Section = __webpack_require__(969);
	
	var _Section2 = _interopRequireDefault(_Section);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Section.propTypes = {
	    title: _react.PropTypes.string.isRequired
	};
	
	function Section(_ref) {
	    var title = _ref.title;
	    var children = _ref.children;
	
	    return _react2.default.createElement(
	        'section',
	        { styleName: 'Section' },
	        _react2.default.createElement(
	            'h2',
	            null,
	            title
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            children
	        )
	    );
	}
	
	exports.default = (0, _reactCssModules2.default)(Section, _Section2.default);

/***/ },

/***/ 969:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Section":"Section__Section___247M4"};

/***/ }

});
//# sourceMappingURL=bundle.js.map