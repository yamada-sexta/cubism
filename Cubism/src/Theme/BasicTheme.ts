import {Colors} from "../Constants/Colors";

export default class BasicTheme{
    fillStyle: string = Colors.white;
    strokeStyle: string = Colors.blue700;
    lineWidth: number = 2;

    setFillStyle(fillStyle: string) {
        this.fillStyle = fillStyle;
        return this;
    }
    setStrokeStyle(strokeStyle: string) {
        this.strokeStyle = strokeStyle;
        return this;
    }
    setLineWidth(width: number) {
        this.lineWidth = width;
        return this;
    }
    static get default(): BasicTheme{
        return new BasicTheme();
    }
    static get transparent(): BasicTheme{
        return new BasicTheme().setLineWidth(0).setFillStyle(Colors.transparent).setStrokeStyle(Colors.transparent);
    }
    static get hover(): BasicTheme{
        return new BasicTheme().setFillStyle(Colors.grey100);
    }
    static get pressed(): BasicTheme{
        return new BasicTheme().setFillStyle(Colors.grey200);
    }
}
