import BasicIcon from "./BasicIcon";

export class OkIcon extends BasicIcon{
    drawIcon() {
        let size = this.size.min;
        this.c.ctx.beginPath();
        this.c.ctx.moveTo(0, size/2);
        this.c.ctx.lineTo(size/2, size);
        this.c.ctx.lineTo(size, 0);
        this.c.ctx.stroke();
    }
}