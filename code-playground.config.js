module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-countdown-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <s-countdown end-timestamp="2999999999">
          <span s-countdown-years></span> Years
          <span s-countdown-months></span> Months
          <span s-countdown-days></span> Days
          <span s-countdown-hours></span> Hours
          <span s-countdown-minutes></span> Minutes
          <span s-countdown-seconds></span> Seconds
        </s-countdown>
      `
    },
    css: {
      language: "scss",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @include s-init();
        @include s-classes();
        @include s-typography-classes();
        body {
          padding: s-space(bigger);
        }
      `
    },
    js: {
      language: "js",
      data: `
        import SCountdownComponent from './dist/index'
      `
    }
  }
}
