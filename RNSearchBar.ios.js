/**
 * @providesModule RNSearchBar
 * @flow
 */
'use strict';

var NativeRNSearchBar = require('NativeModules').RNSearchBar;
var invariant = require('invariant');

/**
 * High-level docs for the RNSearchBar iOS API can be written here.
 */

var RNSearchBar = {
  test: function() {
    NativeRNSearchBar.test();
  }
};

module.exports = RNSearchBar;
