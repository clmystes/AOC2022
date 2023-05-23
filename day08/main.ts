import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Lines = number[][]

type Coordinate = `${number}-${number}`

const lines: Lines = (await readStdin())
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number))

// part1(lines)
part2(lines)

function part1(lines: Lines) {
  const set = new Set<Coordinate>()

  const check = (y: number, x: number, dy: number, dx: number) => {
    set.add(`${x}-${y}`)

    let maximum = lines[y][x]

    while (true) {
      y += dy
      x += dx

      if (y < 0 || y >= lines.length || x < 0 || x >= lines[y].length) {
        break
      }

      if (lines[y][x] > maximum) {
        maximum = lines[y][x]
        set.add(`${x}-${y}`)
      }
    }
  }

  for (let x = 0; x < lines[0].length; x++) {
    check(0, x, 1, 0)
    check(lines.length - 1, x, -1, 0)
  }

  for (let y = 0; y < lines.length; y++) {
    check(y, 0, 0, 1)
    check(y, lines[0].length - 1, 0, -1)
  }

  console.log(set.size)
}

function part2(lines: Lines) {
  const calcScore = (y: number, x: number, dy: number, dx: number): number => {
    let score = 0
    const maximum = lines[y][x]

    while (true) {
      y += dy
      x += dx

      if (y < 0 || y >= lines.length || x < 0 || x >= lines[y].length) {
        break
      }

      score++

      if (lines[y][x] >= maximum) {
        break
      }
    }

    return score
  }

  let max = 0

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const score =
        calcScore(y, x, -1, 0) *
        calcScore(y, x, 1, 0) *
        calcScore(y, x, 0, 1) *
        calcScore(y, x, 0, -1)

      if (score > max) {
        max = score
      }
    }
  }

  console.log(max)
}
