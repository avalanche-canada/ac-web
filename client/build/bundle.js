webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Forecast = undefined;
	
	var _Forecast2 = __webpack_require__(1);
	
	var _Forecast3 = _interopRequireDefault(_Forecast2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Forecast = _Forecast3.default;

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ReactWeatherForecast"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(160);
	
	var _DaySet = __webpack_require__(348);
	
	var _DaySet2 = _interopRequireDefault(_DaySet);
	
	var _TabSet = __webpack_require__(454);
	
	var _TabSet2 = _interopRequireDefault(_TabSet);
	
	var _Outlook = __webpack_require__(668);
	
	var _Outlook2 = _interopRequireDefault(_Outlook);
	
	var _Footer = __webpack_require__(669);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _prismic = __webpack_require__(448);
	
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
			_react2.default.createElement(_Outlook2.default, null),
			_react2.default.createElement(_Footer2.default, null)
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

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(349);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _Day = __webpack_require__(447);
	
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

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _prismic = __webpack_require__(448);
	
	var _Date = __webpack_require__(453);
	
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

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDocument = exports.Image = exports.Text = exports.Html = undefined;
	
	var _Html2 = __webpack_require__(449);
	
	var _Html3 = _interopRequireDefault(_Html2);
	
	var _Text2 = __webpack_require__(451);
	
	var _Text3 = _interopRequireDefault(_Text2);
	
	var _Image2 = __webpack_require__(452);
	
	var _Image3 = _interopRequireDefault(_Image2);
	
	var _getDocument2 = __webpack_require__(450);
	
	var _getDocument3 = _interopRequireDefault(_getDocument2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Html = _Html3.default;
	exports.Text = _Text3.default;
	exports.Image = _Image3.default;
	exports.getDocument = _getDocument3.default;

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(450);
	
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

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getDocument;
	
	var _react = __webpack_require__(3);
	
	var _recompose = __webpack_require__(160);
	
	var contextTypes = {
		document: _react.PropTypes.object.isRequired
	};
	
	function getDocument(BaseComponent) {
		return (0, _recompose.getContext)(contextTypes, BaseComponent);
	}

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(450);
	
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

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getDocument = __webpack_require__(450);
	
	var _getDocument2 = _interopRequireDefault(_getDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Image.propTypes = {
		fragment: _react.PropTypes.string.isRequired
	};
	
	function Image(_ref) {
		var fragment = _ref.fragment;
		var document = _ref.document;
	
		var image = document.getImage(fragment);
	
		if (image === null) {
			return _react2.default.createElement('noscript', null);
		}
	
		var url = image.main.url;
	
	
		return _react2.default.createElement('img', { src: url });
	}
	
	exports.default = (0, _getDocument2.default)(Image);

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.format = format;
	
	var _moment = __webpack_require__(349);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MASK = 'dddd MMMM Do';
	
	function format(date) {
		var mask = arguments.length <= 1 || arguments[1] === undefined ? MASK : arguments[1];
	
		return (0, _moment2.default)(date).format(mask);
	}

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tab = __webpack_require__(455);
	
	var _prismic = __webpack_require__(448);
	
	var _Loop = __webpack_require__(639);
	
	var _Loop2 = _interopRequireDefault(_Loop);
	
	var _Image = __webpack_require__(644);
	
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
	
							var props = {
								date: loop.getTimestamp('date'),
								type: loop.getText('type')
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

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tab = exports.TabSet = undefined;
	
	var _TabSet2 = __webpack_require__(456);
	
	var _TabSet3 = _interopRequireDefault(_TabSet2);
	
	var _Tab2 = __webpack_require__(638);
	
	var _Tab3 = _interopRequireDefault(_Tab2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.TabSet = _TabSet3.default;
	exports.Tab = _Tab3.default;

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(457);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Tab = __webpack_require__(637);
	
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
			key: 'renderTab',
			value: function renderTab(tab, index) {
				var _this2 = this;
	
				var styleName = index === this.activeIndex ? 'ListItem--active' : 'ListItem';
				var onClick = function onClick() {
					return _this2.activeIndex = index;
				};
	
				return _react2.default.createElement(
					'li',
					_extends({ key: index }, { onClick: onClick, styleName: styleName }),
					tab.props.title
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var tabs = this.tabs;
	
				var tab = tabs[this.activeIndex];
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'ul',
						{ styleName: 'List' },
						tabs.map(this.renderTab, this)
					),
					_react2.default.createElement(
						'div',
						{ styleName: 'Content' },
						tab && tab.props.children
					)
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

/***/ 637:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"List":"Tab__List___g5V8O","ListItem":"Tab__ListItem___1v3pE","ListItem--active":"Tab__ListItem--active___2Ie3c Tab__ListItem___1v3pE","Content":"Tab__Content___36Fc2"};

/***/ },

/***/ 638:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Tab;
	
	var _react = __webpack_require__(3);
	
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

/***/ 639:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _animation = __webpack_require__(640);
	
	var _Url = __webpack_require__(646);
	
	var _keycode = __webpack_require__(664);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _lodash = __webpack_require__(665);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _lodash3 = __webpack_require__(667);
	
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
	
				var hour = this.hours[this.cursor];
				var url = (0, _Url.format)({ type: type, date: date, hour: hour });
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
		date: _react.PropTypes.instanceOf(Date).isRequired
	};
	exports.default = Loop;

/***/ },

/***/ 640:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Title = exports.Toolbar = exports.Image = exports.Animation = undefined;
	
	var _Animation2 = __webpack_require__(641);
	
	var _Animation3 = _interopRequireDefault(_Animation2);
	
	var _Image2 = __webpack_require__(643);
	
	var _Image3 = _interopRequireDefault(_Image2);
	
	var _Toolbar2 = __webpack_require__(650);
	
	var _Toolbar3 = _interopRequireDefault(_Toolbar2);
	
	var _Title2 = __webpack_require__(663);
	
	var _Title3 = _interopRequireDefault(_Title2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Animation = _Animation3.default;
	exports.Image = _Image3.default;
	exports.Toolbar = _Toolbar3.default;
	exports.Title = _Title3.default;

/***/ },

/***/ 641:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Animation = __webpack_require__(642);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(457);
	
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

/***/ 642:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Container":"Animation__Container___2-rB2","Title":"Animation__Title___7szC5","Toolbar":"Animation__Toolbar___1I23R","Image":"Animation__Image___1zapw"};

/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(457);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Animation = __webpack_require__(642);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _Image = __webpack_require__(644);
	
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

/***/ 644:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _recompose = __webpack_require__(160);
	
	var _Image = __webpack_require__(645);
	
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

/***/ 645:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.mapUrlToSrc = mapUrlToSrc;
	
	var _Url = __webpack_require__(646);
	
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

/***/ 646:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.format = format;
	exports.asSrcSet = asSrcSet;
	
	var _moment = __webpack_require__(349);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _lodash = __webpack_require__(647);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DOMAIN = 'http://msc.avalanche.ca';
	var PATH = 'loops/images';
	
	function formatDate() {
		var value = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
	
		return (0, _moment2.default)(value).format('YYYYMMDDHH');
	}
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
		var hour = _ref.hour;
	
		var run = (0, _lodash2.default)(String(hour), 3, '0');
	
		return DOMAIN + '/' + PATH + '/' + type + '_' + formatDate(date) + '_' + run + 'HR.jpg';
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

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _button = __webpack_require__(651);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _Animation = __webpack_require__(642);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(457);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _icons = __webpack_require__(655);
	
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

/***/ 651:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Top = exports.default = undefined;
	
	var _Button = __webpack_require__(652);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Top2 = __webpack_require__(654);
	
	var _Top3 = _interopRequireDefault(_Top2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Button2.default;
	exports.Top = _Top3.default;

/***/ },

/***/ 652:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SECONDARY = exports.PRIMARY = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(653);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _recompose = __webpack_require__(160);
	
	var _reactCssModules = __webpack_require__(457);
	
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

/***/ 653:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"common":"Button__common___3Q-wo","primary":"Button__primary___2P-Th Button__common___3Q-wo","secondary":"Button__secondary___KGcqL Button__common___3Q-wo","chevron":"Button__chevron___39rvy","top":"Button__top___2voAA Button__primary___2P-Th Button__common___3Q-wo Button__chevron___39rvy"};

/***/ },

/***/ 654:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Button = __webpack_require__(652);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 655:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChevronRight = exports.ChevronLeft = exports.Play = exports.Pause = exports.Last = exports.First = exports.LastPage = exports.FirstPage = undefined;
	
	var _First2 = __webpack_require__(656);
	
	var _First3 = _interopRequireDefault(_First2);
	
	var _Last2 = __webpack_require__(658);
	
	var _Last3 = _interopRequireDefault(_Last2);
	
	var _Pause2 = __webpack_require__(659);
	
	var _Pause3 = _interopRequireDefault(_Pause2);
	
	var _Play2 = __webpack_require__(660);
	
	var _Play3 = _interopRequireDefault(_Play2);
	
	var _ChevronLeft2 = __webpack_require__(661);
	
	var _ChevronLeft3 = _interopRequireDefault(_ChevronLeft2);
	
	var _ChevronRight2 = __webpack_require__(662);
	
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

/***/ 656:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 657:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = Icon;
	
	var _react = __webpack_require__(3);
	
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

/***/ 658:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 660:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 661:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 662:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Icon = __webpack_require__(657);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _recompose = __webpack_require__(160);
	
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

/***/ 663:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Animation = __webpack_require__(642);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _reactCssModules = __webpack_require__(457);
	
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

/***/ 665:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var MapCache = __webpack_require__(666);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoizing function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // modifying the result cache
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // replacing `_.memoize.Cache`
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new memoize.Cache;
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash 4.1.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}
	
	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;
	
	module.exports = MapCache;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(176)(module), (function() { return this; }())))

/***/ },

/***/ 667:
/***/ function(module, exports) {

	/**
	 * lodash 3.1.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991,
	    NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the new array of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toNumber(start);
	    start = start === start ? start : 0;
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toNumber(end) || 0;
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : (toNumber(step) || 0);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();
	
	module.exports = range;


/***/ },

/***/ 668:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _prismic = __webpack_require__(448);
	
	var _lodash = __webpack_require__(667);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sequence = [1, 2, 3, 4];
	
	function Outlook(_ref) {
		var document = _ref.document;
	
		var outlook = document.get('weather-forecast.outlook');
		var image1 = document.get('weather-forecast.outlook-image1');
		var text1 = document.get('weather-forecast.outlook-text1');
	
		if (!outlook || !image1 || !text1) {
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
					_react2.default.createElement(_prismic.Image, { fragment: 'weather-forecast.outlook-image' + increment }),
					_react2.default.createElement(_prismic.Html, { fragment: 'weather-forecast.outlook-text' + increment })
				);
			})
		);
	}
	
	exports.default = (0, _prismic.getDocument)(Outlook);

/***/ },

/***/ 669:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _button = __webpack_require__(651);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _recompose = __webpack_require__(160);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
				{ href: href, onClick: onClick },
				text
			)
		);
	}
	
	var HASH = '#';
	var MAILTO = 'mailto:ec@canada.ca?subject=Mountain Weather Forecast feedback';
	
	exports.default = (0, _recompose.compose)((0, _recompose.withState)('href', 'setHref', HASH), (0, _recompose.mapProps)(function (_ref2) {
		var setHref = _ref2.setHref;
		var href = _ref2.href;
		return {
			onClick: function onClick(event) {
				if (href !== HASH) {
					return;
				}
	
				event.preventDefault();
				setHref(MAILTO);
			},
			text: href === HASH ? 'Send us feedback' : '[Click again] Send us feedback',
			href: href
		};
	}), _recompose.pure)(ForecastFooter);

/***/ }

});
//# sourceMappingURL=bundle.js.map