//@ts-check
import { assert } from "./misc.mjs"

export class Color {
  /** @type {number} */
  #red

  /** @type {number} */
  #green

  /** @type {number} */
  #blue

  /** @type {number} */
  #alpha = 1.0

  /**
   * @param {number} r 
   * @param {number} g 
   * @param {number} b 
   * @param {number | null} a 
   */
  constructor(r, g, b, a = null) {
    assert(r >= 0 && r <= 255, "red must be between 0-255")
    assert(g >= 0 && g <= 255, "green must be between 0-255")
    assert(b >= 0 && b <= 255, "blue must be between 0-255")
    if (a != null) {
      assert(a >= 0.0 && a <= 1.0, "alpha must be between 0.0-1.0")
    }

    this.#red = r
    this.#green = g
    this.#blue = b
    
    if (a != null) {
      this.#alpha = a
    }
  }

  /**
   * @return {string}
   */
  toHex() {
    const rHex = this.#red.toString(16).padStart(2, "0")
    const gHex = this.#green.toString(16).padStart(2, "0")
    const bHex = this.#blue.toString(16).padStart(2, "0")
    const aHex = Math.round(this.#alpha * 255).toString(16).padStart(2, "0")

    return `#${rHex}${gHex}${bHex}${aHex}`
  }
}

export const Colors = {
  Red: new Color(152, 60, 91),
  Orange: new Color(248, 121, 3),
  OrangeTransparent: new Color(76, 37, 1),
}