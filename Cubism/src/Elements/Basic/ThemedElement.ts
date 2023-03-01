import {CubismCanvasDrawer} from "../../Drawer/CubismCanvasDrawer";
import {PointerPoint} from "../../Datatypes/PointerPoint";

import PointerHandlerParentElement from "./PointerHanderParentElement";
import BasicTheme from "../../Theme/BasicTheme";
import {needsRedrawAccessor} from "../../Utils/Decorators/NeedsRedraw";
import ThemeKeys from "../../Constants/ThemeKeys";

export class ThemedElement extends PointerHandlerParentElement {
    _themes: { [key: string]: BasicTheme } | undefined;
    _currTheme: BasicTheme | undefined;

    get themes(): { [key: string]: BasicTheme } {
        if (this._themes === undefined) {
            this._themes = {};
        }
        return this._themes;
    }

    setTheme(name: string, theme: BasicTheme): ThemedElement {
        this.themes[name] = theme;
        return this;
    }

    onCreate() {
        super.onCreate();
        this.setTheme(ThemeKeys.DEFAULT_THEME, BasicTheme.default);
        this.currTheme = this.themes[ThemeKeys.DEFAULT_THEME];
    }

    get currTheme(): BasicTheme {
        if (this._currTheme === undefined) {
            this._currTheme = new BasicTheme();
        }
        return this._currTheme;
    }

    @needsRedrawAccessor()
    set currTheme(theme: BasicTheme) {
        // console.log("Setting theme to: ", theme);
        this._currTheme = theme;
    }

    updateCanvasDrawerTheme(): void {
        if (this.currTheme) {
            this.c.setFillStyle(this.currTheme.fillStyle);
            this.c.setStrokeStyle(this.currTheme.strokeStyle);
            this.c.setStrokeWidth(this.currTheme.lineWidth);
        } else {
            console.log("No theme set for element");
        }
    }

    draw(): void {
        super.draw();
        this.updateCanvasDrawerTheme();
    }
}
