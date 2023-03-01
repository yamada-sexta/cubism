import BasicTheme from "./BasicTheme";
import {Colors} from "../Constants/Colors";

export class FontTheme extends BasicTheme{
    fontSize: number = 20;
    fontFamily: string = "Arial";

    setFontSize(size: number) {
        this.fontSize = size;
        return this;
    }

    setFontFamily(fontFamily: string) {
        this.fontFamily = fontFamily;
        return this;
    }

    static get default(): FontTheme{
        return new FontTheme().setFillStyle(Colors.black);
    }
}