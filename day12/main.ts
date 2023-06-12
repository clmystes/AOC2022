import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Heightmap = number[][]
type Coordinate = `${number}.${number}`

const { heightmap, start, end } = await parseInput()

// part1(heightmap, start, end) // 497
part2(heightmap, end)

function part1(heightmap: Heightmap, start: Coordinate, end: Coordinate) {
  const res = bfs(heightmap, start, end)
  console.log("part1:", res)
  return res
}

function part2(heightmap: Heightmap, end: Coordinate) {
  const starts: Coordinate[] = []
  heightmap.forEach((line, y) => {
    line.forEach((v, x) => {
      if (v === 0) {
        starts.push(`${x}.${y}`)
      }
    })
  })

  const distance = starts.map((start) => part1(heightmap, start, end))
  distance.sort((a, b) => a - b)
  console.log("part2:", distance[0])
}

async function parseInput() {
  let start!: Coordinate
  let end!: Coordinate

  const heightmap: Heightmap = (await readStdin())
    .trim()
    .split("\n")
    .map((line, y) => {
      return line.split("").map((letter, x) => {
        if (letter === "S") {
          start = `${x}.${y}`
          return 0
        }

        if (letter === "E") {
          end = `${x}.${y}`
          return 25
        }

        return letter.charCodeAt(0) - "a".charCodeAt(0)
      })
    })

  assert(start != null)
  assert(end != null)

  return {
    heightmap,
    start,
    end,
  }
}

function bfs(map: Heightmap, start: Coordinate, end: Coordinate) {
  const visited = new Set<Coordinate>()
  const queue = new Array<{ point: Coordinate; steps: number }>()

  queue.push({ point: start, steps: 0 })

  while (queue.length > 0) {
    const current = queue.shift()

    assert(current != null)

    if (current.point === end) return current.steps

    const [x, y] = current.point.split(".").map(Number)
    const neighbors = getNeighbors(x, y, map)
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n)
        queue.push({ point: n, steps: current.steps + 1 })
      }
    }
  }

  return Number.MAX_SAFE_INTEGER
}

function getNeighbors(x: number, y: number, map: Heightmap): Coordinate[] {
  const res: Coordinate[] = []

  if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
    res.push(`${x}.${y + 1}`)
  }

  if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
    res.push(`${x}.${y - 1}`)
  }

  if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
    res.push(`${x + 1}.${y}`)
  }

  if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
    res.push(`${x - 1}.${y}`)
  }

  return res
}
