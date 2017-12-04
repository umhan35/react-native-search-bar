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
    barStyle: PropTypes.oneOf(['default', 'black']),
    searchBarStyle: PropTypes.oneOf(['default', 'prominent', 'minimal']),
    editable: PropTypes.bool,
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
    onChange: null,
    onChangeText: null,
    onFocus: null,
    onBlur: null,
    onSearchButtonPress: null,
    onCancelButtonPress: null,
  }

  onChange = (e) => {
    this.props.onChange && this.props.onChange(e)
    this.props.onChangeText && this.props.onChangeText(e.nativeEvent.text)
  }

  onPress = (e) => {
    const { button } = e.nativeEvent

    if (button === 'search') {
      this.props.onSearchButtonPress && this.props.onSearchButtonPress(e.nativeEvent.searchText)
    } else if (button === 'cancel') {
      this.props.onCancelButtonPress && this.props.onCancelButtonPress()
    }
  }

  blur() {
    return NativeModules.RNSearchBarManager.blur(findNodeHandle(this))
  }

  focus() {
    return NativeModules.RNSearchBarManager.focus(findNodeHandle(this))
  }

  unFocus() {
    return NativeModules.RNSearchBarManager.unFocus(findNodeHandle(this))
  }

  render() {
    return (
      <RNSearchBar
        style={{ height: NativeModules.RNSearchBarManager.ComponentHeight }}
        onChange={this.onChange}
        onPress={this.onPress}
        {...this.props}
      />
    )
  }
}

export default SearchBar
