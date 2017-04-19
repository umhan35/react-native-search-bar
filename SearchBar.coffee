React = require 'react'
ReactNative = require 'react-native'

RNSearchBar = ReactNative.requireNativeComponent 'RNSearchBar', null

PropTypes = React.PropTypes

NativeModules = ReactNative.NativeModules


SearchBar = React.createClass

  propTypes:
    placeholder: PropTypes.string
    text: PropTypes.string
    barTintColor: PropTypes.string
    tintColor: PropTypes.string
    textColor: PropTypes.string
    textFieldBackgroundColor: PropTypes.string
    showsCancelButton: PropTypes.bool
    onChange: PropTypes.func
    onChangeText: PropTypes.func
    onFocus: PropTypes.func
    onBlur: PropTypes.func
    onSearchButtonPress: PropTypes.func
    onCancelButtonPress: PropTypes.func
    enablesReturnKeyAutomatically: PropTypes.bool
    hideBackground: PropTypes.bool
    barStyle: PropTypes.oneOf ['default', 'black']
    searchBarStyle: PropTypes.oneOf ['default', 'prominent', 'minimal']
    editable: PropTypes.bool

  getDefaultProps: ->
    barStyle: 'default'
    searchBarStyle: 'default'
    editable: true

  _onChange: (e) ->
    @props.onChange? e
    @props.onChangeText? e.nativeEvent.text

  _onPress: (e) ->
    button = e.nativeEvent.button

    if button == 'search'
      @props.onSearchButtonPress? e.nativeEvent.searchText
    else if button == 'cancel'
      @props.onCancelButtonPress?()

  blur: ->
    NativeModules.RNSearchBarManager.blur ReactNative.findNodeHandle(this)

  focus: ->
    NativeModules.RNSearchBarManager.focus ReactNative.findNodeHandle(this)

  unFocus: ->
    NativeModules.RNSearchBarManager.unFocus(ReactNative.findNodeHandle(this))

  resetText: -> 
    NativeModules.RNSearchBarManager.resetText(ReactNative.findNodeHandle(this))

  render: ->
    `<RNSearchBar
      style={{height: NativeModules.RNSearchBarManager.ComponentHeight}}
      onChange={this._onChange}
      onPress={this._onPress}
      {...this.props}
    />`

module.exports = SearchBar
