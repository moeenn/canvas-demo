//@ts-check

export class Position {
  /** @type {number} */
  x

  /** @type {number} */
  y

  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @param {Position} other
   * @returns {number}
   */
  distance(other) {
    let xDelta = this.x - other.x,
        yDelta = this.y - other.y

    return Math.sqrt((xDelta * xDelta) + (yDelta * yDelta))
  }
}
