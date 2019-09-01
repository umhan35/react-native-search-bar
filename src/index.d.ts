import * as React from 'react';
import {
  ReturnKeyType,
  ReturnKeyTypeIOS,
  KeyboardType,
  KeyboardTypeIOS,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface Props {
  /**
   * Text for the placeholder
   *
   * Default is 'Search'
   */
  placeholder?: string;

  /**
   * Text in the search bar
   */
  text?: string;

  /**
   * Background color of the search bar
   */
  barTintColor?: string;

  /**
   * Color of the Cancel button, highlight and cursor
   */
  tintColor?: string;

  /**
   * Textfield text color
   */
  textColor?: string;

  /**
   * Textfield background color
   */
  textFieldBackgroundColor?: string;

  /**
   * Toggles whether to show the cancel button or not
   *
   * Default is false
   */
  showsCancelButton?: boolean;

  /**
   * String for the cancel button
   *
   * Default is 'Cancel'
   */
  cancelButtonText?: string;

  /**
   * Only shows the cancel button while the search bar has focus
   *
   * Default is true
   */
  showsCancelButtonWhileEditing?: boolean;

  /**
   * Indicates whether the Return key is automatically enabled when the user is entering text.
   *
   * Default is true
   */
  enablesReturnKeyAutomatically?: boolean;

  /**
   * Indicates whether just to show the text input only
   *
   * Default is false
   */
  hideBackground?: boolean;

  /**
   * Style of the bar
   *
   * Default is 'default'
   */
  barStyle?: 'default' | 'black';

  /**
   * Style of the search bar
   *
   * Default is 'default'
   */
  searchBarStyle?: 'default' | 'prominent' | 'minimal';

  /**
   * Toggles if the user can interact with the search bar
   *
   * Default is true
   */
  editable?: boolean;

  /**
   * Return key type for the keyboard
   *
   * Default is 'search'
   */
  returnKeyType?: ReturnKeyType | ReturnKeyTypeIOS;

  /**
   * The type of keyboard to display
   *
   * Default is 'default'
   */
  keyboardType?: KeyboardType | KeyboardTypeIOS;

  /**
   * The appearance of the keyboard
   *
   * Default is 'default'
   */
  keyboardAppearance?: 'default' | 'dark' | 'light';

  /**
   * The auto-capitalization behavior
   *
   * Default is 'sentences'
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  /**
   * If autoCorrect is enabled
   *
   * Default is false
   */
  autoCorrect?: boolean;

  /**
   * If red underline is shown for misspelt words
   *
   * Default is false
   */
  spellCheck?: boolean;

  /**
   * Event fired when
   */
  onChange?(event: { target: number; text: string; eventCount: number }): void;

  /**
   * Searchbar style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Event fired when the text in the input changes
   *
   * Returns the current text value in the input
   */
  onChangeText?(text: string): void;

  /**
   * Event fired when the text input is focused
   */
  onFocus?(): void;

  /**
   * Event fired the input is blurred
   */
  onBlur?(): void;

  /**
   * Event fired when the search button is pressed
   *
   * Returns the current text value in the input
   */
  onSearchButtonPress?(text: string): void;

  /**
   * Event fired when the cancel button is pressed
   */
  onCancelButtonPress?(): void;
}

export default class SearchBar extends React.Component<Props> {
  focus(): void;
  blur(): void;
  unFocus(): void;
  clearText(): void;
}
