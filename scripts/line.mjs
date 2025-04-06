//@ts-check
import { Colors, Color } from "./color.mjs"
import { Position } from "./position.mjs"

export class Line {
  /** @type {Color} */
  static color = Colors.Red

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Position} start
   * @param {Position} end
   */
  static render(ctx, start, end) {
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.strokeStyle = this.color.toHex()
    ctx.stroke()
  }
}