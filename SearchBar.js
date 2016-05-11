import React, { Component, PropTypes } from 'react';
import { NativeModules, requireNativeComponent } from 'react-native';

const RNSearchBar = requireNativeComponent('RNSearchBar', null);


export default class SearchBar extends Component {
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
    searchBarStyle: PropTypes.oneOf(['default', 'prominent', 'minimal'])
  };
  static defaultProps = {
    barStyle: 'default',
    searchBarStyle: 'default'
  };
  _onChange(e) {
    var base, base1;
    if (typeof (base = this.props).onChange === "function") {
      base.onChange(e);
    }
    return typeof (base1 = this.props).onChangeText === "function" ? base1.onChangeText(e.nativeEvent.text) : void 0;
  }
  _onPress(e) {
    var base, base1, button;
    button = e.nativeEvent.button;
    if (button === 'search') {
      return typeof (base = this.props).onSearchButtonPress === "function" ? base.onSearchButtonPress(e.nativeEvent.searchText) : void 0;
    } else if (button === 'cancel') {
      return typeof (base1 = this.props).onCancelButtonPress === "function" ? base1.onCancelButtonPress() : void 0;
    }
  }
  blur() {
    return NativeModules.RNSearchBarManager.blur(React.findNodeHandle(this));
  }
  focus() {
    return NativeModules.RNSearchBarManager.focus(React.findNodeHandle(this));
  }
  render() {
    return <RNSearchBar
      style={{height: NativeModules.RNSearchBarManager.ComponentHeight}}
      onChange={this._onChange.bind(this)}
      onPress={this._onPress.bind(this)}
      {...this.props}
    />;
  }
}
