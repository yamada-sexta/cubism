import {Point2D} from "../../Math/Point";

export default class PhysicalPoint2D extends Point2D {
    velocity: Point2D = new Point2D(0, 0);
    // acceleration: Point2D = new Point2D(0, 0);
    resistance: number = 0;
    velocityScale: number = 0;

    setVelocity(velocity: Point2D) {
        this.velocity = velocity;
        return this;
    }

    setResistance(resistance: number) {
        this.resistance = resistance;
        return this;
    }

    impulse(impulse: Point2D) {
        this.velocity.offset(impulse);
        this.velocityScale = 1;
        return this;
    }

    update() {
        if (this.velocityScale > 0) {
            this.velocity = this.velocity.scale(this.velocityScale);
            this.velocityScale -= this.resistance;
        }
        if (this.velocityScale < 0) {
            this.velocityScale = 0;
        }
        if (this.velocityScale == 0) {
            this.velocity.setXY(0, 0)
        }
        this.offset(this.velocity);
    }

}
