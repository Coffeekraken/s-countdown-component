# SCountdownComponent

Create a simple fully customizable countdown that support years, months, days, hours, minutes and seconds display


### Example
```html
	<s-countdown end-timestamp="1549322620">
  <span s-countdown-days></span> Days
  <span s-countdown-hours></span> Hours
  <span s-countdown-minutes></span> Minutes
  <span s-countdown-seconds></span> Seconds
</s-countdown>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **SWebComponent**




## Attributes

Here's the list of available attribute(s).

### endTimestamp

Specify the end timestamp of the countdown

Type : **{ Integer }**

Default : **null**


### startTimestamp

Specify the start timestamp of the countdown.

Type : **{ Integer }**

Default : **null**


### onComplete

Specify a callback to call on countdown complete

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onTick

Specify a callback to call on each tick

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**




## Methods


### getYears

Get the remaining years

Return **{ Integer }** The years remaining


### getMonths

Get the remaining months

Return **{ Integer }** The months remaining


### getDays

Get the remaining days

Return **{ Integer }** The days remaining


### getHours

Get the remaining hours

Return **{ Integer }** The hours remaining


### getMinutes

Get the remaining minutes

Return **{ Integer }** The minutes remaining


### getSeconds

Get the remaining seconds

Return **{ Integer }** The seconds remaining