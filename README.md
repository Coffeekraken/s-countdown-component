# Coffeekraken s-countdown-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/s-countdown-component">
		<img src="https://img.shields.io/travis/coffeekraken/s-countdown-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-countdown-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-countdown-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-countdown-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-countdown-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-countdown-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-countdown-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-countdown-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-countdown-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-countdown-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-countdown-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Create a simple fully customizable countdown that support years, months, days, hours, minutes and seconds display</p>

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-countdown-component)

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-countdown-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Digit](#readme-digit)
5. [Active class](#readme-active-class)
6. [Step classes](#readme-step-classes)
7. [Javascript API](doc/js)
8. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
9. [Browsers support](#readme-browsers-support)
10. [Code linting](#readme-code-linting)
11. [Contribute](#readme-contribute)
12. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
13. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-countdown-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SCountdownComponent from 'coffeekraken-s-countdown-component'
```

Then simply use it inside your html like so:

```html
<s-countdown end-timestamp="2999999999">
  <span s-countdown-years></span> Years
  <span s-countdown-months></span> Months
  <span s-countdown-days></span> Days
  <span s-countdown-hours></span> Hours
  <span s-countdown-minutes></span> Minutes
  <span s-countdown-seconds></span> Seconds
</s-countdown>
```

<a id="readme-digit"></a>
## Digit

Each countdown elements like `[s-countdown-years]`, `[s-countdown-hours]`, etc... will contain his remaining digit. This digit will be wrapped inside a `span` that will have these classes:

- `.s-countdown-digit-container`: Applied on the parent element
- `.s-countdown-digit`: The main class applied during the whole life of the digit.
- `.s-countdown-digit--out`: The class applied on the digit that need to get out.

> Note that the new digit will be added **when the previous one has finished his `out` animation/transition**.

<a id="readme-active-class"></a>
## Active class

An active class will be applied on the element itself during the countdown and removed at the end. This is useful if you want to hide the countdown when it's finished.

- `.active`: Applied on the component itself during the countdown

<a id="readme-step-classes"></a>
## Step classes

Step classes are an interesting concept. There are classes applied depending on the number of seconds remaining in the countdown. By default, these are the step classes registered:

```js
stepClasses: {
  week1: 3600 * 24 * 7,
  day1: 3600 * 24,
  hour1: 3600,
  minutes30: 60 * 30,
  minutes10: 60 * 10,
  minutes5: 60 * 5,
  minute1: 60
},
```

Thie mean that the these classes will be applied on the countdown:

- `.week1`: Applied when the countdown is less than 1 week left
- `.day1`: Applied when the countdown is less than 1 day left
- `.hour1`: Applied when the countdown is less than 1 hour left
- `.minutes30`: Applied when the countdown is less than 30 minutes left
- `.minutes10`: Applied when the countdown is less than 10 minutes left
- `.minutes5`: Applied when the countdown is less than 5 minutes left
- `.minute1`: Applied when the countdown is less than 1 minute left

You can as well configure that by setting the `props.stepClasses` property

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-code-linting"></a>
##  Code linting

This package uses some code linting rules. Here's the list:

1. [StandardJS](https://standardjs.com/) for javascript files
2. [Stylelint](https://github.com/stylelint/stylelint) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) for `scss` files

> Your commits will not been accepted if the code style is not respected!

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
