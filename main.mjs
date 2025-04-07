//@ts-check
import { getContext, assert, sleep, readInput } from "./scripts/misc.mjs"
import { Particle, ParticleWalker } from "./scripts/particle.mjs"
import { Dimentions } from "./scripts/dimentions.mjs"
import { Line } from "./scripts/line.mjs"
document.addEventListener("DOMContentLoaded", main)

/** 
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function main() {
  const canvas = document.querySelector("canvas")
  assert(canvas != null, "canvas element not found")

  const form = /** @type {HTMLFormElement | null} */ (document.querySelector("[data-form]"))
  assert(form != null, "data form not found")

  const submitButton = /** @type {HTMLButtonElement | null} */ (document.querySelector("[data-submit-button]"))
  assert(submitButton != null, "form submit button not found")

  const { ctx, width, height } = getContext(canvas)
  const canvasSize = new Dimentions(width, height)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const speed = parseFloat(readInput("[data-speed]"))
    const particleCount = parseFloat(readInput("[data-particle-count]"))
    const distanceThreshold = parseFloat(readInput("[data-distance-threshold]"))

    /** @type {Particle[]} */
    const particles = []

    /** @type {ParticleWalker[]} */
    const walkers = []

    /** @type {number} */
    let i
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvasSize))
      walkers.push(new ParticleWalker(canvasSize, speed))
    }

    /** @type {Particle} */
    let particle

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (i = 0; i < particleCount; i++) {
        particle = particles[i]
        drawProximity(ctx, distanceThreshold, particles)
        particle.render(ctx)
        walkers[i].walkParticle(particle)
      }
    }

    submitButton.disabled = true
    while (true) {
      draw()
      await sleep(12)
    }
  })
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} proximity 
 * @param {Particle[]} particles 
 * @returns {void}
 */
function drawProximity(ctx, proximity, particles) {
  const size = particles.length

  /** @type {number} */
  let i = 0, j = 1

  /** @type {Particle} */
  let a
  
  /** @type {Particle} */  
  let b

  while (i < j) {
    a = particles[i]
    b = particles[j]
    if (a.position.distance(b.position) <= proximity) {
      Line.render(ctx, a.position, b.position)
    }

    // increment counts.
    j++
    if (j == size) {
      i++
      j = i+1
    }

    if (i == (size-1)) break
  }
}

