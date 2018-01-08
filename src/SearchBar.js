import React from 'react'
import PropTypes from 'prop-types'
import { NativeModules, requireNativeComponent, findNodeHandle } from 'react-native'

const RNSearchBar = requireNativeComponent('RNSearchBar', null)

class SearchBar extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    barTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    textColor: PropTypes.string,
    textFieldBackgroundColor: PropTypes.string,
    showsCancelButton: PropTypes.bool,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSearchButtonPress: PropTypes.func,
    onCancelButtonPress: PropTypes.func,
    enablesReturnKeyAutomatically: PropTypes.bool,
    hideBackground: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      // Cross-platform
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      // iOS-only
      'ascii-capable',
      'numbers-and-punctuation',
      'url',
      'number-pad',
      'name-phone-pad',
      'decimal-pad',
      'twitter',
      'web-search',
    ]),
    keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
    barStyle: PropTypes.oneOf(['default', 'black']),
    searchBarStyle: PropTypes.oneOf(['default', 'prominent', 'minimal']),
    editable: PropTypes.bool,
    returnKeyType: PropTypes.string,
  }

  static defaultProps = {
    text: '',
    placeholder: 'Search',
    barStyle: 'default',
    searchBarStyle: 'default',
    editable: true,
    showsCancelButton: false,
    hideBackground: false,
    enablesReturnKeyAutomatically: true,
    textFieldBackgroundColor: null,
    tintColor: null,
    barTintColor: null,
    textColor: null,
    returnKeyType: 'search',
    keyboardType: 'default',
    keyboardAppearance: 'default',
    onChange: () => null,
    onChangeText: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onSearchButtonPress: () => null,
    onCancelButtonPress: () => null,
  }

  onChange = (e) => {
    this.props.onChange(e)
    this.props.onChangeText(e.nativeEvent.text)
  }

  onSearchButtonPress = (e) => {
    this.props.onSearchButtonPress(e.nativeEvent.searchText)
  }

  blur() {
    return NativeModules.RNSearchBarManager.blur(findNodeHandle(this))
  }

  focus() {
    return NativeModules.RNSearchBarManager.focus(findNodeHandle(this))
  }

  clearText() {
    return NativeModules.RNSearchBarManager.clearText(findNodeHandle(this))
  }

  unFocus() {
    return NativeModules.RNSearchBarManager.unFocus(findNodeHandle(this))
  }

  render() {
    return (
      <RNSearchBar
        style={{ height: NativeModules.RNSearchBarManager.ComponentHeight }}
        {...this.props}
        onChange={this.onChange}
        onPress={this.onPress}
        onSearchButtonPress={this.onSearchButtonPress}
        onCancelButtonPress={this.props.onCancelButtonPress}
      />
    )
  }
}

export default SearchBar
