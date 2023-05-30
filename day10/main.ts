import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"
import { unreachable } from "https://deno.land/std@0.182.0/testing/asserts.ts"

type Op = "addx" | "noop"

type Instructions = { op: Op; v: number }[]

const instructions: Instructions = (await readStdin())
  .trim()
  .split("\n")
  .map((line) => {
    const [op, v] = line.split(" ") as [Op, string]
    assert(["addx", "noop"].includes(op))
    return { op, v: parseInt(v) }
  })

class CPU {
  instructions: Instructions
  currentLine: number
  cycle: number
  wait: number
  X: 1

  constructor(instructions: Instructions) {
    this.instructions = instructions
    this.currentLine = 0
    this.cycle = 1
    this.wait = 0
    this.X = 1
  }

  runCycle() {
    if (this.currentLine >= this.instructions.length) {
      return false
    }

    this.cycle++

    const line = this.instructions[this.currentLine]

    switch (line.op) {
      case "noop":
        this.currentLine++
        break

      case "addx":
        if (this.wait === 0) {
          this.wait = 1
        } else {
          this.wait--

          if (this.wait === 0) {
            this.X += line.v
            this.currentLine++
          }
        }
        break

      default:
        unreachable()
    }

    return true
  }
}

class CRT {
  width: number
  height: number
  currentIndex: number
  content: string[][]

  constructor() {
    this.width = 40
    this.height = 6
    this.currentIndex = 0
    this.content = new Array(this.height)
      .fill("")
      .map((_) => new Array(this.width).fill(" "))
  }

  runCycle(spritePosition: number) {
    const x = this.currentIndex % this.width
    const y = Math.floor(this.currentIndex / this.width)

    if (y >= this.height) return false

    if (Math.abs(x - spritePosition) < 2) {
      this.content[y][x] = "#"
    } else {
      this.content[y][x] = " "
    }

    this.currentIndex++
  }

  draw() {
    console.log(this.content.map((line) => line.join("")).join("\n"))
  }
}

function part1(instructions: Instructions) {
  const cpu = new CPU(instructions)

  let sum = 0
  while (true) {
    if (!cpu.runCycle()) {
      break
    }

    if ([20, 60, 100, 140, 180, 220].includes(cpu.cycle)) {
      sum += cpu.cycle * cpu.X
    }
  }

  console.log(sum)
}

function part2(instructions: Instructions) {
  const cpu = new CPU(instructions)
  const crt = new CRT()

  while (true) {
    crt.runCycle(cpu.X)

    if (!cpu.runCycle()) {
      break
    }
  }

  crt.draw()
}

// part1(instructions) // 13820
part2(instructions) // ZKGRKGRK
