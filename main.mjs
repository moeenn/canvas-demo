//@ts-check
import { getContext, assert, sleep } from "./scripts/misc.mjs"
import { Particle, ParticleWalker } from "./scripts/particle.mjs"
import { Position } from "./scripts/position.mjs"
import { Color, Colors } from "./scripts/color.mjs"

document.addEventListener("DOMContentLoaded", main)

/** 
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function main() {
  const canvas = document.querySelector("canvas")
  assert(canvas != null, "canvas element not found")
  const { ctx, width, height } = getContext(canvas)

  const padding = 50
  const adjustedHeigth = height - (2 * padding)
  const adjustedWidth = width - (2 * padding)

  const maxCount = 50
  const particles = []
  const walkers = []

  /** @type {number} */
  let i
  for (i = 0; i < maxCount; i++) {
    particles.push(new Particle(adjustedWidth, adjustedHeigth))
    walkers.push(new ParticleWalker(width, height, 5))
  }

  const startButton = /** @type {HTMLButtonElement | null} */ (document.querySelector("[data-button-start]"))
  assert(startButton != null, "start button not found")

  let lastParticlePosition = particles[0].position
  startButton.addEventListener("click", async () => {
    startButton.disabled = true
    while (true) {
      await sleep(16.6) // 60 FPS
      ctx.clearRect(0, 0, width, height)

      for (i = 0; i < maxCount; i++) {
        particles[i].render(ctx)
        walkers[i].walkParticle(particles[i])

        if (lastParticlePosition == particles[i].position) continue
        Line.render(ctx, lastParticlePosition, particles[i].position)
        lastParticlePosition = particles[i].position
      }
    }
  })
}

class Line {
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