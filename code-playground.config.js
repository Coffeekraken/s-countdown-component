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

        .s-countdown {
          text-transform: uppercase;
          font-size: s-rem(20px);
        }

        .s-countdown-digit-container {
          position: relative;
          background: s-color(secondary);
          color: white;
          padding: s-rem(10px) s-rem(15px);
        }

        @keyframes digit-in {
          from {
            opacity: 0;
            transform: translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes digit-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(50%);
          }
        }
        .s-countdown-digit {
          animation: digit-in .6s cubic-bezier(1,0,0,1) forwards 0s;
        }
        .s-countdown-digit--out {
          animation: digit-out .4s cubic-bezier(1,0,0,1) forwards 0s;
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
