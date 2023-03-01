import {ThemedElement} from "./ThemedElement";
import BasicTheme from "../../Theme/BasicTheme";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import ThemeKeys from "../../Constants/ThemeKeys";
import {Colors} from "../../Constants/Colors";

export class PointerInteractThemeElement extends ThemedElement {

    onCreate() {
        super.onCreate();
        this.setTheme(ThemeKeys.ON_DOWN_THEME, BasicTheme.pressed);
        this.setTheme(ThemeKeys.ON_HOVER_THEME, BasicTheme.hover);
    }
    onDown(point: PointerPoint) {
        super.onDown(point);
        this.currTheme = this.themes[ThemeKeys.ON_DOWN_THEME];
    }
    onUp(point: PointerPoint) {
        super.onUp(point);
        this.currTheme = this.themes[ThemeKeys.ON_HOVER_THEME];
    }
    onEnter(point: PointerPoint) {
        super.onEnter(point);
        this.currTheme = this.themes[ThemeKeys.ON_HOVER_THEME];
    }
    onLeave(point: PointerPoint) {
        super.onLeave(point);
        this.currTheme = this.themes[ThemeKeys.DEFAULT_THEME];
    }
}
