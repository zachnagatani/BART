// Karma configuration
// Generated on Thu Oct 13 2016 14:53:30 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
        'app/scripts/main.js',
        'app/scripts/controllers/indexCtrl.js',
        'app/scripts/controllers/homeCtrl.js',
        'app/scripts/controllers/plannerCtrl.js',
        'app/scripts/controllers/tripCtrl.js',
        'app/scripts/controllers/scheduleCtrl.js',
        'app/scripts/services/services.js',
        'test/spec/index.spec.js',
        'test/spec/home.spec.js',
        'test/spec/planner.spec.js',
        'test/spec/trip.spec.js',
        'test/spec/schedule.spec.js',
        'test/spec/services.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
