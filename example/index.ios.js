/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var SearchBar = require('react-native-search-bar');

var SearchBarExample = React.createClass({
  render: function() {
    return (
      <SearchBar
        placeholder='Search'
        textFieldBackgroundColor='blue'
        />
    );
  }
});

React.AppRegistry.registerComponent('SearchBarExample', () => SearchBarExample);
