import { readStrFromArgs } from "../utils.ts"
import { _ } from "../deps.ts"

type Sums = number[] // Calories that every elf carrying (desc by amount)

const input = await readStrFromArgs()

part1(input) // 69501
part2(input) // 202346

function part1(input: string) {
  console.log("part1: ", parseInput(input)[0])
}

function part2(input: string) {
  const parsed = parseInput(input)
  console.log("part2: ", parsed[0] + parsed[1] + parsed[2])
}

function parseInput(input: string): Sums {
  const sums: Sums = []

  input.split("\n\n").forEach((chunk) => {
    sums.push(_.sum(chunk.split("\n").map(Number)))
  })

  sums.sort((a, b) => b - a)

  return sums
}
