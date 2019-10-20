package org.umhan35;

import android.content.res.ColorStateList;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.text.InputType;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.SearchView;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSearchBarManager extends SimpleViewManager<SearchView> {
    @Nonnull
    @Override
    public String getName() {
        return "RNSearchBar";
    }

    @Override
    public @Nullable
    Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        registerEvent(builder, "topBlur", "onBlur");
        registerEvent(builder, "topSearchButtonPress", "onSearchButtonPress");
        registerEvent(builder, "topFocus", "onFocus");

        return builder.build();
    }

    @ReactProp(name = "autoCapitalize")
    public void setAutoCapitalize(SearchView searchView, String type) {
        int flags = searchView.getInputType();

        // Remove capitalization flags.
        flags &= ~(InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
                | InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                | InputType.TYPE_TEXT_FLAG_CAP_WORDS
        );

        switch (type) {
            case "characters":
                flags |= InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS;
                break;

            case "sentences":
                flags |= InputType.TYPE_TEXT_FLAG_CAP_SENTENCES;
                break;

            case "words":
                flags |= InputType.TYPE_TEXT_FLAG_CAP_WORDS;
                break;

            default:
                break;
        }

        searchView.setInputType(flags);
    }

    @ReactProp(name = "editable")
    public void setEditable(SearchView searchView, boolean editable) {
        processViewRecursive(searchView, view -> view.setEnabled(editable));
    }

    @ReactProp(name = "keyboardType")
    public void setKeyboardType(SearchView searchView, String type) {
        int flags = searchView.getInputType();

        switch (type) {
            case "email-address":
                flags = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS;
                break;

            case "numeric":
                flags = InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_NORMAL;
                break;

            case "phone-pad":
                flags = InputType.TYPE_CLASS_PHONE;
                break;

            default:
                // Remove class and variants.
                flags &= ~(InputType.TYPE_MASK_CLASS | InputType.TYPE_MASK_VARIATION);

                flags |= InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_NORMAL;
                break;
        }

        searchView.setInputType(flags);
    }

    @ReactProp(name = "placeholder")
    public void setPlaceholder(SearchView searchView, @Nullable String placeholder) {
        searchView.setQueryHint(placeholder);
    }

    @ReactProp(name = "returnKeyType")
    public void setReturnKeyType(SearchView searchView, String type) {
        int flags = searchView.getImeOptions();

        // Remove action.
        flags &= ~EditorInfo.IME_MASK_ACTION;

        switch (type) {
            case "done":
                flags |= EditorInfo.IME_ACTION_DONE;
                break;

            case "go":
                flags |= EditorInfo.IME_ACTION_GO;
                break;

            case "next":
                flags |= EditorInfo.IME_ACTION_NEXT;
                break;

            case "send":
                flags |= EditorInfo.IME_ACTION_SEND;
                break;

            default:
                flags |= EditorInfo.IME_ACTION_SEARCH;
                break;
        }

        searchView.setImeOptions(flags);
    }

    @ReactProp(name = "text")
    public void setText(SearchView searchView, String text) {
        searchView.setQuery(text, false);
    }

    @ReactProp(name = "textColor", customType = "Color")
    public void setTextColor(SearchView searchView, @Nullable Integer color) {
        ColorStateList colorList;
        if (color == null) {
            final int[] attrs = {android.R.attr.textColorPrimary};
            final TypedArray a = searchView.getContext().obtainStyledAttributes(0, attrs);
            colorList = a.getColorStateList(0);
            a.recycle();
        } else {
            colorList = ColorStateList.valueOf(color);
        }

        processViewRecursive(searchView, view -> {
            if (view instanceof TextView) {
                ((TextView) view).setTextColor(colorList);
            }
        });
    }

    @ReactProp(name = "textFieldBackgroundColor", customType = "Color")
    public void setTextFieldBackgroundColor(SearchView searchView, @Nullable Integer color) {
        if (color == null) {
            searchView.setBackgroundColor(Color.WHITE);
        } else {
            searchView.setBackgroundColor(color);
        }
    }

    @Nonnull
    @Override
    protected SearchView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        SearchView searchView = new SearchView(reactContext);
        searchView.setIconifiedByDefault(false);
        int padding_start_in_dp = (int) (-16 * reactContext.getResources().getDisplayMetrics().density);
        searchView.setPaddingRelative(padding_start_in_dp, 5, 10, 5);

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                WritableMap event = Arguments.createMap();
                event.putString("searchText", query);
                ReactContext context = (ReactContext) searchView.getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        searchView.getId(),
                        "topSearchButtonPress",
                        event
                );
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                WritableMap event = Arguments.createMap();
                event.putString("text", newText);
                ReactContext context = (ReactContext) searchView.getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        searchView.getId(),
                        "topChange",
                        event
                );
                return false;
            }
        });

        searchView.setOnQueryTextFocusChangeListener((view, hasFocus) -> {
            ReactContext context = (ReactContext) searchView.getContext();
            context.getJSModule(RCTEventEmitter.class).receiveEvent(
                    searchView.getId(),
                    hasFocus ? "topFocus" : "topBlur",
                    null
            );
        });

        return searchView;
    }

    /**
     * Execute a command on the view and all its children.
     */
    private void processViewRecursive(View view, Command<View> command) {
        command.execute(view);
        if (view instanceof ViewGroup) {
            ViewGroup group = (ViewGroup) view;
            int count = group.getChildCount();
            for (int i = 0; i < count; ++i) {
                processViewRecursive(group.getChildAt(i), command);
            }
        }
    }

    /**
     * Helper to register React Native events.
     */
    private void registerEvent(MapBuilder.Builder<String, Object> builder, String topLevel, String callback) {
        builder.put(
                topLevel,
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", callback))
        );
    }
}
