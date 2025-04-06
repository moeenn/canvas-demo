//@ts-check
import { getContext, assert, sleep } from "./scripts/misc.mjs"
import { Particle, ParticleWalker } from "./scripts/particle.mjs"
import { Position } from "./scripts/position.mjs"
import { Line } from "./scripts/line.mjs"
import { Dimentions } from "./scripts/dimentions.mjs"
document.addEventListener("DOMContentLoaded", main)

/** 
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function main() {
  const canvas = document.querySelector("canvas")
  assert(canvas != null, "canvas element not found")

  const startButton = /** @type {HTMLButtonElement | null} */ (document.querySelector("[data-button-start]"))
  assert(startButton != null, "start button not found")

  const { ctx, width, height } = getContext(canvas)
  const canvasSize = new Dimentions(width, height)
  const maxCount = 50

  /** @type {Map<string, {particle: Particle; walker: ParticleWalker}>} */
  const entities = new Map()

  /** @type {number} */
  let i

  /** @type {Particle} */
  let particle
  
  /** @type {ParticleWalker} */
  let walker
  
  for (i = 0; i < maxCount; i++) {
    particle = new Particle(canvasSize)
    walker = new ParticleWalker(canvasSize, 2)
    entities.set(particle.id, { particle, walker })
  }

  let lastParticlePosition = new Position(0, 0)
  startButton.addEventListener("click", async () => {
    startButton.disabled = true
    while (true) {
      await sleep(16.6) // 60 FPS
      ctx.clearRect(0, 0, width, height)

      for ({ particle, walker } of entities.values()) {
        particle.render(ctx)
        walker.walkParticle(particle)
        Line.render(ctx, lastParticlePosition, particle.position)
        lastParticlePosition = particle.position
      }
    }
  })
}

