// Type definitions for react-native-search-bar
// Project: https://github.com/umhan35/react-native-search-bar
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.6

import * as React from 'react'

interface Props {
  /**
   * Text for the placeholder
   *
   * Default is 'Search'
   */
  placeholder?: string

  /**
   * Text in the search bar
   */
  text?: string

  /**
   * Background color of the search bar
   */
  barTintColor?: string

  /**
   * Color of the Cancel button, highlight and cursor
   */
  tintColor?: string

  /**
   * Textfield text color
   */
  textColor?: string

  /**
   * Textfield background color
   */
  textFieldBackgroundColor?: string

  /**
   * Toggles whether to show the cancel button or not
   *
   * Default is false
   */
  showsCancelButton?: boolean

  /**
   * Indicates whether the Return key is automatically enabled when the user is entering text.
   *
   * Default is true
   */
  enablesReturnKeyAutomatically?: boolean

  /**
   * Indicates whether just to show the text input only
   *
   * Default is false
   */
  hideBackground?: boolean

  /**
   * Style of the bar
   *
   * Default is 'default'
   */
  barStyle?: 'default' | 'black'

  /**
   * Style of the search bar
   *
   * Default is 'default'
   */
  searchBarStyle?: 'default' | 'prominent' | 'minimal'

  /**
   * Toggles if the user can interact with the search bar
   *
   * Default is true
   */
  editable?: boolean

  /**
   * Event fired when
   */
  onChange?(event: { target: number; text: string; eventCount: number }): void

  /**
   * Event fired when the text in the input changes
   *
   * Returns the current text value in the input
   */
  onChangeText?(text: string): void

  /**
   * Event fired when the text input is focused
   */
  onFocus?(): void

  /**
   * Event fired the input is blurred
   */
  onBlur?(): void

  /**
   * Event fired when the search button is pressed
   *
   * Returns the current text value in the input
   */
  onSearchButtonPress?(text: string): void

  /**
   * Event fired when the cancel button is pressed
   */
  onCancelButtonPress?(): void
}

export default class SearchBar extends React.Component<Props> {}
