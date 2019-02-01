package org.umhan35;

import android.content.Context;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.SearchView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.UIManagerModule;

import java.util.Map;

public class RNSearchBarModule extends ReactContextBaseJavaModule {
    public RNSearchBarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void blur(int reactTag) {
        uiCommand(reactTag, SearchView::clearFocus);
    }

    @ReactMethod
    public void clearText(int reactTag) {
        uiCommand(reactTag, searchView -> searchView.setQuery("", false));
    }

    @ReactMethod
    public void focus(int reactTag) {
        uiCommand(reactTag, searchView -> {
            if (searchView.isFocused()) {
                return;
            }

            if (searchView.requestFocus()) {
                // Focus acquired, open the keyboard.
                InputMethodManager imm = (InputMethodManager) getReactApplicationContext()
                        .getSystemService(Context.INPUT_METHOD_SERVICE);

                if (imm != null) {
                    imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
                }
            }
        });
    }

    @Override
    public Map<String, Object> getConstants() {
        return MapBuilder.of("ComponentHeight", 40);
    }

    @Override
    public String getName() {
        return "RNSearchBarManager";
    }

    @SuppressWarnings({"unused", "EmptyMethod"})
    @ReactMethod
    public void toggleCancelButton(int reactTag, boolean flag) {
        // Not implemented.
    }

    @ReactMethod
    public void unFocus(int reactTag) {
        uiCommand(reactTag, SearchView::clearFocus);
    }

    /**
     * Execute a command on the resolved SearchView.
     */
    private void uiCommand(int reactTag, Command<SearchView> command) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(nativeViewHierarchyManager -> {
            View view = nativeViewHierarchyManager.resolveView(reactTag);
            if (view instanceof SearchView) {
                command.execute((SearchView) view);
            }
        });
    }
}
