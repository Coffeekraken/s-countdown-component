import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import countdown from 'countdown'
import STimer from 'coffeekraken-sugar/js/classes/STimer'
import getTransmationDuration from 'coffeekraken-sugar/js/dom/getTransmationDuration'

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
export default class SCountdownComponent extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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

    }
  }

  /**
   * Required props
   * @definition    SWebComponent.requiredProps
   * @protected
   */
  static get requiredProps() {
    return ['endTimestamp']
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : inline-block;
      }
      .${componentNameDash}-digit {
        display : inline-block;
      }
    `
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    // add the global class on the element itself
    this.classList.add(this.componentNameDash)

    // update html refs to elements like the $years, $months, $days, $hours, $minutes and $seconds
    this._update$Refs()

    // create a new timer
    this._timer = new STimer(1000, {
      loop: true
    })
    this._timer.onComplete(this._tick.bind(this))
    this._timer.start()

    // first tick
    this._tick()
  }

  /**
   * Unmount component
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    // destroy the timer
    this._timer.destroy()
  }

  /**
   * Update the reefa to HTMLElements
   */
  _update$Refs() {
    this._$years = this.querySelector(`[${this.componentNameDash}-years]`)
    if (this._$years) this._$years.classList.add(`${this.componentNameDash}-digit-container`)
    this._$months = this.querySelector(`[${this.componentNameDash}-months]`)
    if (this._$months) this._$months.classList.add(`${this.componentNameDash}-digit-container`)
    this._$days = this.querySelector(`[${this.componentNameDash}-days]`)
    if (this._$days) this._$days.classList.add(`${this.componentNameDash}-digit-container`)
    this._$hours = this.querySelector(`[${this.componentNameDash}-hours]`)
    if (this._$hours) this._$hours.classList.add(`${this.componentNameDash}-digit-container`)
    this._$minutes = this.querySelector(`[${this.componentNameDash}-minutes]`)
    if (this._$minutes) this._$minutes.classList.add(`${this.componentNameDash}-digit-container`)
    this._$seconds = this.querySelector(`[${this.componentNameDash}-seconds]`)
    if (this._$seconds) this._$seconds.classList.add(`${this.componentNameDash}-digit-container`)
  }

  /**
   * Tick function
   */
  _tick() {

    // start date
    let start = Date.now()
    if (this.props.startTimestamp) {
      start = new Date(this.props.startTimestamp * 1000)
    }

    // check if it's the end of the countdown
    if (this.props.endTimestamp < start / 1000) {
      // stop the timer
      this._timer.stop()
      // wait 1 second to compense the countdown display
      setTimeout(() => {
        // onComplete callback
        if (this.props.onComplete) this.props.onComplete(this)
      }, 1000)
    }

    // get the timespan object from now to the end of the countdown
    this._timespan = countdown(start, new Date(this.props.endTimestamp * 1000));

    // update html using the timespan
    this._updateHtmlWithTimespan(this._timespan)

    // on tick callback
    if (this.props.onTick) this.props.onTick(this)
  }

  /**
   * Update the html with the timespan
   * @param    {Object}    timespan    The timespan object containing the years, months, days, hours, minutes and seconds remaining
   */
  _updateHtmlWithTimespan(timespan) {
    if (this._$years && timespan.years !== undefined) {
      this._updateDigit(this._$years, timespan.years)
    }
    if (this._$months && timespan.months !== undefined) {
      this._updateDigit(this._$months, timespan.months)
    }
    if (this._$days && timespan.days !== undefined) {
      this._updateDigit(this._$days, timespan.days)
    }
    if (this._$hours && timespan.hours !== undefined) {
      this._updateDigit(this._$hours, timespan.hours)
    }
    if (this._$minutes && timespan.minutes !== undefined) {
      this._updateDigit(this._$minutes, timespan.minutes)
    }
    if (this._$seconds && timespan.seconds !== undefined) {
      this._updateDigit(this._$seconds, timespan.seconds)
    }
  }

  /**
   * Update a digit
   * @param    {HTMLElement}    $elm    The HTMLElement to update
   * @param    {String}    value    The new HTMLElement value
   */
  _updateDigit($elm, value) {

    // query the actual item in the html element
    const $actualElm = $elm.children[0]
    let duration = 0
    if ($actualElm && $actualElm.tagName) {
      if ($actualElm.innerHTML === value.toString()) return
      // add the `out` class
      $actualElm.classList.add(`${this.componentNameDash}-digit--out`)
      duration = getTransmationDuration($actualElm)
    }

    // append the new child
    const $newElm = document.createElement('span')
    $newElm.classList.add(`${this.componentNameDash}-digit`)
    $newElm.innerHTML = value

    // remove the old and add the new element
    // after than the old element has been animated/transitionned out
    setTimeout(() => {
      if ($actualElm && $actualElm.tagName) $elm.removeChild($actualElm)
      $elm.appendChild($newElm)
    }, duration)
  }

  /**
   * Get the remaining years
   * @return    {Integer}    The years remaining
   */
  getYears() {
    return this._timespan.years || 0
  }

  /**
   * Get the remaining months
   * @return    {Integer}    The months remaining
   */
  getMonths() {
    return this._timespan.months || 0
  }

  /**
   * Get the remaining days
   * @return    {Integer}    The days remaining
   */
  getDays() {
    return this._timespan.days || 0
  }

  /**
   * Get the remaining hours
   * @return    {Integer}    The hours remaining
   */
  getHours() {
    return this._timespan.hours || 0
  }

  /**
   * Get the remaining minutes
   * @return    {Integer}    The minutes remaining
   */
  getMinutes() {
    return this._timespan.minutes || 0
  }

  /**
   * Get the remaining seconds
   * @return    {Integer}    The seconds remaining
   */
  getSeconds() {
    return this._timespan.seconds || 0
  }
}
