import BasicIcon from "./BasicIcon";

export class CloseIcon extends BasicIcon {
    drawIcon() {
        let size = this.size.min
        this.c.ctx.beginPath();
        this.c.ctx.moveTo(0, 0);
        this.c.ctx.lineTo(size, size);
        this.c.ctx.moveTo(size, 0);
        this.c.ctx.lineTo(0, size);
        this.c.ctx.stroke();
    }
}