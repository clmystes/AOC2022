import { readStrFromArgs, assert } from "../utils.ts"
import { _ } from "../deps.ts"

type Pairs = [number[], number[]][]

const input = await readStrFromArgs()

part1(input) //
part2(input) //

function part1(input: string) {
  const pairs = parseInput(input)
  let count = 0

  pairs.forEach((p) => {
    if (contain(p[0], p[1]) || contain(p[1], p[0])) {
      count++
    }
  })

  console.log("part1:", count)
}

function part2(input: string) {
  const pairs = parseInput(input)
  let count = 0

  pairs.forEach((p) => {
    if (overlap(p[0], p[1])) {
      count++
    }
  })

  console.log("part2:", count)
}

function parseInput(input: string): Pairs {
  return input.split("\n").map((line) => {
    const [a, b] = line.split(",")
    return [a.split("-").map(Number), b.split("-").map(Number)]
  })
}

function contain(a: number[], b: number[]) {
  const [a1, a2] = a
  const [b1, b2] = b
  return a1 >= b1 && a2 <= b2
}

function overlap(a: number[], b: number[]) {
  const [a1, a2] = a
  const [b1, b2] = b
  return a1 <= b2 && b1 <= a2
}
