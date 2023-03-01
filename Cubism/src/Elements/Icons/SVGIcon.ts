import BasicIcon from "./BasicIcon";

export class WebSvgIcon extends BasicIcon {
    svgImg: HTMLImageElement;

    constructor(svgUrl: string) {
        super();

        this.svgImg = new Image()
        this.svgImg.src = svgUrl;

    }

    draw() {
        this.c.offset(this.position);
        this.c.drawImage(this.svgImg, 0, 0, this.width, this.height);
        this.c.restoreTranslate();
    }
}
