//@ts-check

/**
 * @typedef CanvasResult
 * @property {number} width
 * @property {number} height
 * @property {CanvasRenderingContext2D} ctx
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns {CanvasResult}
 * @throws {Error}
 */
export function getContext(canvas) {
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("failed to get canvas context")
  }

  const { height, width } = canvas.getBoundingClientRect()
  ctx.canvas.height = height
  ctx.canvas.width = width
  return { ctx, width, height }
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function random(min, max) {
  const f = Math.random() * (max - min) + min
  return Math.ceil(f)
}

/**
 * @param {boolean} condition 
 * @param {string} error 
 * @returns {asserts condition}
 */
export function assert(condition, error) {
  if (!condition) {
    throw new Error(error)
  }
}

/**
 * @param {string} selector 
 * @returns {string}
 * @throws {Error}
 */
export function readInput(selector) {
  const element = document.querySelector(selector)
  assert(element != null, `element with selector ${selector} not found`)
  assert(element.constructor == HTMLInputElement, `selector ${selector} does not refer to an input element`)
  return (/** @type {HTMLInputElement} */ (element)).value
}