# react-native-search-bar

<a href="https://www.npmjs.com/package/react-native-search-bar"><img src="https://badge.fury.io/js/react-native-search-bar.svg" alt="" height="18"></a>

The high-quality [iOS native search bar](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UISearchBar.html) for [react native](https://facebook.github.io/react-native/).

<img src="SearchBar.png"/>

:sunny: Battle-tested in [WeatherEh](http://weathereh.hanzhao.name/) app.

## Installation

In your react native project, run `npm install react-native-search-bar --save`

To link this library, please follow the first two steps in the [Linking Libraries (iOS)](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) guide on React Native website. The `.xcodeproj` file is in `node_modules/react-native-search-bar/`. In the end, you should have `RNSearchBar.xcodeproj` in the `Libaries` group on Xcode and `libRNSearchBar.a` in the `Link Binary With Libraries` section inside the `Build Phases` tab of your project target.

## Update

In your react native project, run

```Bash
npm install react-native@latest --save # optional, just for the latest react-native
npm install react-native-search-bar@latest --save
```

## Usage

```javascript
var SearchBar = require('react-native-search-bar');
```

```JSX
<SearchBar
	ref='searchBar'
	placeholder='Search'
	onChangeText={...}
	onSearchButtonPress={...}
	onCancelButtonPress={...}
	/>
```

### Managing the keyboard
* Show - `this.refs.searchBar.focus();`
* Hide
  - `this.refs.searchBar.blur();` - uses the iOS `endEditing:true` method on the underlying `UISearchBar` view.
  - `this.refs.searchBar.unFocus();` - calls `resignFirstResponder` on the `UITextField` used by the `UISearchBar`.
* Examples
 * Show the keyboard when the view loads:
```javascript
componentDidMount() {
  this.refs.searchBar.focus();
}
```
 * Hide the keyboard when the user searches:
```javascript
...
onSearchButtonPress={this.refs.searchBar.unFocus}
...
```

For all supportted properties, please check out `propTypes` in either [SearchBar.coffee](SearchBar.coffee) or [SearchBar.js](SearchBar.js).

There is also an example project in the [SearchBarExample](SearchBarExample) directory.

## Contribution

For now, implemented are only some of the features of [UISearchBar](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UISearchBar_Class/).
Feel free to send a pull request. To get started, you can read the ["Native UI Components (iOS)"](http://facebook.github.io/react-native/docs/native-components-ios.html) guide on React Native website.

Except code contribution, you are welcome to answer question asked in [Issues](https://github.com/umhan35/react-native-search-bar/issues).

## License

MIT
