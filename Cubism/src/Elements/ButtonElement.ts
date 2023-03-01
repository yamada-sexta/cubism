import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";
import BasicIcon from "./Icons/BasicIcon";
import {VerticalLayout} from "./Layouts/VerticalLayout";
import {TextElement} from "./TextElement";
import {Point2D} from "../Utils/Math/Point";
import {PointerPoint} from "../Datatypes/PointerPoint";

export class ButtonElement extends PointerInteractThemeElement {
    _icon: BasicIcon | null = null;
    _text: TextElement | null = null;

    _onClick: (point:PointerPoint) => void = () => {};

    iconXOffset = 10;
    textXOffset = 10;

    set icon(icon: BasicIcon | null) {
        this._icon = icon;
        if (icon !== null) {
            icon.position.x = this.iconXOffset;
            icon.position.y = this.size.y / 2 - icon.height / 2;
            this.addChildren(icon);
        }
    }

    get icon(): BasicIcon | null {
        return this._icon;
    }

    get text(): TextElement | null {
        return this._text;
    }

    set text(text: TextElement | null) {
        this._text = text;
        if (text !== null) {
            text.position.x = this.textXOffset;
            text.position.y = this.size.y / 2 - text.height / 2 -2;
            if (this.icon !== null) {
                text.position.x += this.icon.width + this.iconXOffset;
            }
            this.addChildren(text);
        }
    }

    setOnClick(func:(point:Point2D)=>void) {
        this._onClick = func;
        return this;
    }

    onUp(point: PointerPoint): void {
        super.onUp(point);
        this._onClick(point);
    }

    draw() {
        this.updateCanvasDrawerTheme();
        this.c.offset(this.position);
        this.c.drawRectWithPoints(this.size);
        if (this.icon !== null) {

            this.icon.draw();
        }
        if (this.text !== null) {
            this.text.draw();
        }
        this.c.restoreTranslate();
    }

    setIcon(icon: BasicIcon) {
        this.icon = icon;
        return this;
    }

    setText(text: string | TextElement) {
        if (typeof text === "string") {
            text = new TextElement(text);
        }
        this.text = text;
        return this;
    }
}
