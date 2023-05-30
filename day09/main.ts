import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Direction = "R" | "L" | "U" | "D"

type Lines = {
  direction: Direction
  totalMoves: number
}[]

type Coordinate = `${number}-${number}`

const lines: Lines = (await readStdin())
  .trim()
  .split("\n")
  .map((line) => {
    const [letter, number] = line.split(" ")

    assert(["R", "L", "U", "D"].includes(letter))

    return {
      direction: letter as Direction,
      totalMoves: parseInt(number),
    }
  })

class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  move(direction: Direction) {
    const delta = {
      R: {
        x: 1,
        y: 0,
      },
      L: {
        x: -1,
        y: 0,
      },
      U: {
        x: 0,
        y: -1,
      },
      D: {
        x: 0,
        y: 1,
      },
    }[direction]

    this.x += delta.x
    this.y += delta.y
  }

  follow(point: Point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    )

    if (distance > 1) {
      const directionX = point.x - this.x
      if (directionX !== 0) {
        this.x += directionX / Math.abs(directionX)
      }

      const directionY = point.y - this.y
      if (directionY !== 0) {
        this.y += directionY / Math.abs(directionY)
      }
    }
  }
}

function part1(lines: Lines) {
  const head = new Point(0, 0)
  const tail = new Point(0, 0)
  const visited = new Set<Coordinate>()

  visited.add("0-0")

  for (const line of lines) {
    for (let i = 0; i < line.totalMoves; i++) {
      head.move(line.direction)
      tail.follow(head)
      visited.add(`${tail.x}-${tail.y}`)
    }
  }

  console.log(visited.size)
}

function part2(lines: Lines) {
  const points = new Array(10).fill(0).map((_) => new Point(0, 0))
  const visited = new Set<Coordinate>()

  visited.add("0-0")

  for (const line of lines) {
    for (let i = 0; i < line.totalMoves; i++) {
      points[0].move(line.direction)

      for (let point = 1; point < points.length; point++) {
        const p = points[point]
        p.follow(points[point - 1])
      }

      const tail = points[points.length - 1]
      visited.add(`${tail.x}-${tail.y}`)
    }
  }

  console.log(visited.size)
}

// part1(lines) // 5695
part2(lines) // 2434
