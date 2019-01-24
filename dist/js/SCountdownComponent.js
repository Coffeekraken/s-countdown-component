"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _countdown = _interopRequireDefault(require("countdown"));

var _STimer = _interopRequireDefault(require("coffeekraken-sugar/js/classes/STimer"));

var _getTransmationDuration = _interopRequireDefault(require("coffeekraken-sugar/js/dom/getTransmationDuration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Create a simple fully customizable countdown that support years, months, days, hours, minutes and seconds display
 *
 * @example    html
 * <s-countdown end-timestamp="1549322620">
 *   <span s-countdown-days></span> Days
 *   <span s-countdown-hours></span> Hours
 *   <span s-countdown-minutes></span> Minutes
 *   <span s-countdown-seconds></span> Seconds
 * </s-countdown>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SCountdownComponent =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(SCountdownComponent, _SWebComponent);

  function SCountdownComponent() {
    _classCallCheck(this, SCountdownComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SCountdownComponent).apply(this, arguments));
  }

  _createClass(SCountdownComponent, [{
    key: "componentMount",

    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */
    value: function componentMount() {
      _get(_getPrototypeOf(SCountdownComponent.prototype), "componentMount", this).call(this); // add the global class on the element itself


      this.classList.add(this.componentNameDash); // update html refs to elements like the $years, $months, $days, $hours, $minutes and $seconds

      this._update$Refs(); // create a new timer


      this._timer = new _STimer.default(1000, {
        loop: true
      });

      this._timer.onComplete(this._tick.bind(this));

      this._timer.start(); // first tick


      this._tick();
    }
    /**
     * Unmount component
     * @definition    SWebComponent.componentUnmount
     * @protected
     */

  }, {
    key: "componentUnmount",
    value: function componentUnmount() {
      // destroy the timer
      this._timer.destroy();
    }
    /**
     * Update the reefa to HTMLElements
     */

  }, {
    key: "_update$Refs",
    value: function _update$Refs() {
      this._$years = this.querySelector("[".concat(this.componentNameDash, "-years]"));
      if (this._$years) this._$years.classList.add("".concat(this.componentNameDash, "-digit-container"));
      this._$months = this.querySelector("[".concat(this.componentNameDash, "-months]"));
      if (this._$months) this._$months.classList.add("".concat(this.componentNameDash, "-digit-container"));
      this._$days = this.querySelector("[".concat(this.componentNameDash, "-days]"));
      if (this._$days) this._$days.classList.add("".concat(this.componentNameDash, "-digit-container"));
      this._$hours = this.querySelector("[".concat(this.componentNameDash, "-hours]"));
      if (this._$hours) this._$hours.classList.add("".concat(this.componentNameDash, "-digit-container"));
      this._$minutes = this.querySelector("[".concat(this.componentNameDash, "-minutes]"));
      if (this._$minutes) this._$minutes.classList.add("".concat(this.componentNameDash, "-digit-container"));
      this._$seconds = this.querySelector("[".concat(this.componentNameDash, "-seconds]"));
      if (this._$seconds) this._$seconds.classList.add("".concat(this.componentNameDash, "-digit-container"));
    }
    /**
     * Tick function
     */

  }, {
    key: "_tick",
    value: function _tick() {
      var _this = this;

      // start date
      var start = Date.now();

      if (this.props.startTimestamp) {
        start = new Date(this.props.startTimestamp * 1000);
      } // check if it's the end of the countdown


      if (this.props.endTimestamp < start / 1000) {
        // stop the timer
        this._timer.stop(); // wait 1 second to compense the countdown display


        setTimeout(function () {
          // onComplete callback
          if (_this.props.onComplete) _this.props.onComplete(_this);
        }, 1000);
      } // get the timespan object from now to the end of the countdown


      this._timespan = (0, _countdown.default)(start, new Date(this.props.endTimestamp * 1000)); // update html using the timespan

      this._updateHtmlWithTimespan(this._timespan); // on tick callback


      if (this.props.onTick) this.props.onTick(this);
    }
    /**
     * Update the html with the timespan
     * @param    {Object}    timespan    The timespan object containing the years, months, days, hours, minutes and seconds remaining
     */

  }, {
    key: "_updateHtmlWithTimespan",
    value: function _updateHtmlWithTimespan(timespan) {
      if (this._$years && timespan.years !== undefined) {
        this._updateDigit(this._$years, timespan.years);
      }

      if (this._$months && timespan.months !== undefined) {
        this._updateDigit(this._$months, timespan.months);
      }

      if (this._$days && timespan.days !== undefined) {
        this._updateDigit(this._$days, timespan.days);
      }

      if (this._$hours && timespan.hours !== undefined) {
        this._updateDigit(this._$hours, timespan.hours);
      }

      if (this._$minutes && timespan.minutes !== undefined) {
        this._updateDigit(this._$minutes, timespan.minutes);
      }

      if (this._$seconds && timespan.seconds !== undefined) {
        this._updateDigit(this._$seconds, timespan.seconds);
      }
    }
    /**
     * Update a digit
     * @param    {HTMLElement}    $elm    The HTMLElement to update
     * @param    {String}    value    The new HTMLElement value
     */

  }, {
    key: "_updateDigit",
    value: function _updateDigit($elm, value) {
      // query the actual item in the html element
      var $actualElm = $elm.children[0];
      var duration = 0;

      if ($actualElm && $actualElm.tagName) {
        if ($actualElm.innerHTML === value.toString()) return; // add the `out` class

        $actualElm.classList.add("".concat(this.componentNameDash, "-digit--out"));
        duration = (0, _getTransmationDuration.default)($actualElm);
      } // append the new child


      var $newElm = document.createElement('span');
      $newElm.classList.add("".concat(this.componentNameDash, "-digit"));
      $newElm.innerHTML = value; // remove the old and add the new element
      // after than the old element has been animated/transitionned out

      setTimeout(function () {
        if ($actualElm && $actualElm.tagName) $elm.removeChild($actualElm);
        $elm.appendChild($newElm);
      }, duration);
    }
    /**
     * Get the remaining years
     * @return    {Integer}    The years remaining
     */

  }, {
    key: "getYears",
    value: function getYears() {
      return this._timespan.years || 0;
    }
    /**
     * Get the remaining months
     * @return    {Integer}    The months remaining
     */

  }, {
    key: "getMonths",
    value: function getMonths() {
      return this._timespan.months || 0;
    }
    /**
     * Get the remaining days
     * @return    {Integer}    The days remaining
     */

  }, {
    key: "getDays",
    value: function getDays() {
      return this._timespan.days || 0;
    }
    /**
     * Get the remaining hours
     * @return    {Integer}    The hours remaining
     */

  }, {
    key: "getHours",
    value: function getHours() {
      return this._timespan.hours || 0;
    }
    /**
     * Get the remaining minutes
     * @return    {Integer}    The minutes remaining
     */

  }, {
    key: "getMinutes",
    value: function getMinutes() {
      return this._timespan.minutes || 0;
    }
    /**
     * Get the remaining seconds
     * @return    {Integer}    The seconds remaining
     */

  }, {
    key: "getSeconds",
    value: function getSeconds() {
      return this._timespan.seconds || 0;
    }
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display : inline-block;\n      }\n      .").concat(componentNameDash, "-digit {\n        display : inline-block;\n      }\n    ");
    }
  }, {
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
      return {
        /**
         * Specify the end timestamp of the countdown
         * @prop
         * @type    {Integer}
         */
        endTimestamp: null,

        /**
         * Specify the start timestamp of the countdown.
         * @prop
         * @type    {Integer}
         */
        startTimestamp: null,

        /**
         * Specify a callback to call on countdown complete
         * @prop
         * @type    {Function}
         */
        onComplete: null,

        /**
         * Specify a callback to call on each tick
         * @prop
         * @type    {Function}
         */
        onTick: null
      };
    }
    /**
     * Required props
     * @definition    SWebComponent.requiredProps
     * @protected
     */

  }, {
    key: "requiredProps",
    get: function get() {
      return ['endTimestamp'];
    }
  }]);

  return SCountdownComponent;
}(_SWebComponent2.default);

exports.default = SCountdownComponent;