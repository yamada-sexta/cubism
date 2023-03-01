import {CubismElement} from "./Basic/CubismElement";
import {FontTheme} from "../Theme/FontTheme";

export class TextElement extends CubismElement {
    theme: FontTheme = FontTheme.default;
    content: string = "NO CONTENT";

    setFontSize(size: number) {
        this.theme.fontSize = size;
    }

    constructor(content: string, id: string | null = null) {
        super(id);
        this.content = content;
    }

    get height(): number {
        return this.theme.fontSize;
    }

    draw() {
        super.draw();
        let c = this.c;
        c.setFont(`${this.theme.fontSize}px ${this.theme.fontFamily}`);
        c.offset(this.position);
        c.setFillStyle(this.theme.fillStyle);
        c.setStrokeStyle(this.theme.strokeStyle);

        let textWidth = c.measureText(this.content).width;
        let textHeight = this.theme.fontSize;
        c.fillText(this.content, 0, textHeight);
        c.restoreTranslate();
    }
}
