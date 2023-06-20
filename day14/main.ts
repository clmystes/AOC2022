import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Point = `${number},${number}`

// part1()
part2()

async function part2() {
  const { points, maxY } = await parseInput()

  let sandUnits = 0

  while (true) {
    if (points.has(`500,0`)) {
      break
    }

    const point = { x: 500, y: 0 }

    sandUnits++

    while (true) {
      if (point.y === maxY + 1) {
        points.add(`${point.x},${point.y}`)
        break
      } else if (!points.has(`${point.x},${point.y + 1}`)) {
        point.y++
      } else if (!points.has(`${point.x - 1},${point.y + 1}`)) {
        point.y++
        point.x--
      } else if (!points.has(`${point.x + 1},${point.y + 1}`)) {
        point.y++
        point.x++
      } else {
        points.add(`${point.x},${point.y}`)
        break
      }
    }
  }

  console.log(sandUnits)
}

async function part1() {
  const { points, maxY } = await parseInput()

  let isEnd = false
  let sandUnits = 0

  while (!isEnd) {
    const point = { x: 500, y: 0 }

    sandUnits++

    while (!isEnd) {
      if (!points.has(`${point.x},${point.y + 1}`)) {
        point.y++
      } else if (!points.has(`${point.x - 1},${point.y + 1}`)) {
        point.y++
        point.x--
      } else if (!points.has(`${point.x + 1},${point.y + 1}`)) {
        point.y++
        point.x++
      } else {
        points.add(`${point.x},${point.y}`)
        break
      }

      if (point.y >= maxY) {
        isEnd = true
        sandUnits--
      }
    }
  }

  console.log(sandUnits)
}

async function parseInput(): Promise<{ points: Set<Point>; maxY: number }> {
  const lines = (await readStdin()).trim().split("\n")

  const ps = new Set<Point>()

  let maxY = 0

  for (const line of lines) {
    const points = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map(Number)
      if (y > maxY) {
        maxY = y
      }
      return { x, y }
    })

    const currentPoint = points.shift()
    while (points.length > 0) {
      const targetPoint = points.shift()

      assert(currentPoint != null && targetPoint != null)

      while (
        currentPoint.x !== targetPoint.x ||
        currentPoint.y !== targetPoint.y
      ) {
        ps.add(`${currentPoint.x},${currentPoint.y}`)

        if (currentPoint.x !== targetPoint.x) {
          const delta =
            (targetPoint.x - currentPoint.x) /
            Math.abs(targetPoint.x - currentPoint.x)

          currentPoint.x += delta
        } else {
          const delta =
            (targetPoint.y - currentPoint.y) /
            Math.abs(targetPoint.y - currentPoint.y)

          currentPoint.y += delta
        }
      }
      ps.add(`${currentPoint.x},${currentPoint.y}`)
    }
  }

  return { points: ps, maxY }
}
