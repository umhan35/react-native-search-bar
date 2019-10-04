<h2 align="center">React Native Search Bar</h2>

<p align="center">The high-quality
 <a href="https://developer.apple.com/documentation/uikit/uisearchbar">native search bar</a> for <a href="https://facebook.github.io/react-native/">react native.</a>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-search-bar">
    <img alt="npm version" src="https://img.shields.io/npm/v/react-native-search-bar.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-react-native-search-bar">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-native-search-bar.svg?style=flat-square">
  </a>
   <a href="https://prettier.io">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <img src="./.github/SearchBar.png"/>
</p>

<br>

## Getting Started

This is a native library. **It does not work with expo or
create-react-native-app.**

### Installation

```bash
# npm
npm install react-native-search-bar --save

# yarn
yarn add react-native-search-bar
```

### Pods

> If using CocoaPods or React Native version >= 0.60.0

```bash
cd ios && pod install && cd ..
```

### Linking

> For React Native <= 0.59 only

```bash
react-native link react-native-search-bar
```

If linking fails, follow the
[manual linking steps](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

## Usage

```javascript
import SearchBar from 'react-native-search-bar';
```

```JSX
<SearchBar
  ref="searchBar"
  placeholder="Search"
  onChangeText={...}
  onSearchButtonPress={...}
  onCancelButtonPress={...}
/>
```

### Managing the keyboard

- Show - `this.refs.searchBar.focus();`
- Hide
  - `this.refs.searchBar.blur();` - uses the iOS `endEditing:true` method on the
    underlying `UISearchBar` view.
  - `this.refs.searchBar.unFocus();` - calls `resignFirstResponder` on the
    `UITextField` used by the `UISearchBar`.

### Examples

- Show the keyboard when the view loads:

```javascript
componentDidMount() {
  this.refs.searchBar.focus();
}
```

- Hide the keyboard when the user searches:

```javascript
...
onSearchButtonPress={this.refs.searchBar.unFocus}
...
```

For a full list of props check out
[the typescript definitions file](./src/index.d.ts).

There is also an example project in the [example](./example) directory.

## Contribution

For now, only some of the features of
[UISearchBar](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UISearchBar_Class/)
are implemented.

Feel free to send a pull request to the
[next](https://github.com/umhan35/react-native-search-bar/tree/next) branch. To
get started, you can read the
["Native UI Components (iOS)"](http://facebook.github.io/react-native/docs/native-components-ios.html)
guide on the React Native website.

Along with code contribution, you are welcomed to answer questions asked in the
[Issues](https://github.com/umhan35/react-native-search-bar/issues).

## License

MIT
