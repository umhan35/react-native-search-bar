var NativeModules, PropTypes, RNSearchBar, React, ReactNative;

React = require("react");

ReactNative = require("react-native");

PropTypes = require("prop-types");

RNSearchBar = ReactNative.requireNativeComponent("RNSearchBar", null);

NativeModules = ReactNative.NativeModules;

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  _onChange(e) {
    var base, base1;
    if (typeof (base = this.props).onChange === "function") {
      base.onChange(e);
    }
    return typeof (base1 = this.props).onChangeText === "function"
      ? base1.onChangeText(e.nativeEvent.text)
      : void 0;
  }

  _onPress(e) {
    var base, base1, button;
    button = e.nativeEvent.button;
    if (button === "search") {
      return typeof (base = this.props).onSearchButtonPress === "function"
        ? base.onSearchButtonPress(e.nativeEvent.searchText)
        : void 0;
    } else if (button === "cancel") {
      return typeof (base1 = this.props).onCancelButtonPress === "function"
        ? base1.onCancelButtonPress()
        : void 0;
    }
  }

  blur() {
    return NativeModules.RNSearchBarManager.blur(
      ReactNative.findNodeHandle(this)
    );
  }

  focus() {
    return NativeModules.RNSearchBarManager.focus(
      ReactNative.findNodeHandle(this)
    );
  }

  unFocus() {
    return NativeModules.RNSearchBarManager.unFocus(
      ReactNative.findNodeHandle(this)
    );
  }

  render() {
    return (
      <RNSearchBar
        style={{ height: NativeModules.RNSearchBarManager.ComponentHeight }}
        onChange={this._onChange}
        onPress={this._onPress}
        barStyle={"default"}
        searchBarStyle={"default"}
        editable={true}
        {...this.props}
      />
    );
  }
}

SearchBar.propTypes = {
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
  barStyle: PropTypes.oneOf(["default", "black"]),
  searchBarStyle: PropTypes.oneOf(["default", "prominent", "minimal"]),
  editable: PropTypes.bool
};
