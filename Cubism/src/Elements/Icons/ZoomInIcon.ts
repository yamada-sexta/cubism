import BasicIcon from "./BasicIcon";

export class ZoomInIcon extends BasicIcon{
    drawIcon() {
        let size = this.size.min;
        this.c.ctx.beginPath();
        this.c.ctx.moveTo(0, size/2);
        this.c.ctx.lineTo(size, size/2);
        this.c.ctx.moveTo(size/2, 0);
        this.c.ctx.lineTo(size/2, size);
        this.c.ctx.stroke();
        this.c.ctx.beginPath();
        this.c.ctx.arc(size/2, size/2, size/2, 0, 2*Math.PI);
        this.c.ctx.stroke();
    }
}