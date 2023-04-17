import { readStrFromArgs, assert } from "../utils.ts"
import { _ } from "../deps.ts"

const aP = "a".charCodeAt(0)
const AP = "A".charCodeAt(0)

const input = await readStrFromArgs()

part1(input) // 7742
part2(input) // 2276

function part1(input: string) {
  let sum = 0

  parseInput(input).forEach((line) => {
    const l = line.length

    assert(
      l % 2 === 0,
      "A given rucksack always has the same number of items in each of its two compartments"
    )

    const first = line.slice(0, l / 2).split("")
    const second = line.slice(l / 2).split("")

    const common = _.intersection(first, second)

    assert(common.length === 1, "Must have one common type.")

    sum += getPriorities(common[0])
  })

  console.log("part1: ", sum)
}

function part2(input: string) {
  let sum = 0
  let group: string[] = []

  parseInput(input).forEach((line) => {
    group.push(line)

    if (group.length === 3) {
      const common = _.intersection(...group.map((item) => item.split("")))

      assert(common.length === 1, "Must have one common type.")

      sum += getPriorities(common[0])

      group = []
    }
  })

  console.log("part2: ", sum)
}

function parseInput(input: string): string[] {
  return input.split("\n")
}

function getPriorities(s: string): number {
  const p = s.charCodeAt(0)

  if (p > aP) {
    return p - aP + 1
  } else {
    return p - AP + 27
  }
}
