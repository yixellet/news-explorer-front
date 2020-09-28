const presets = [
  [
    "@babel/env",
    {
      targets: { // указать цели, для полифилов
            edge: "17",
            ie: "11",
            firefox: "50",
            chrome: "64",
            safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.5"
    }
  ],
];

module.exports = { presets };