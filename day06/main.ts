import { readStrFromArgs } from "../utils.ts"
import { _ } from "../deps.ts"

const input: string = await readStrFromArgs()

part1(input) // 1100
part2(input) // 2421

function part1(input: string) {
  solution(input, 4)
}

function part2(input: string) {
  solution(input, 14)
}

function solution(input: string, length: number) {
  const chunk: string[] = []

  for (let i = 0; i < input.length; i++) {
    chunk.push(input[i])

    if (chunk.length > length) {
      chunk.shift()
    }

    if (chunk.length === length && _.uniq(chunk).length === length) {
      console.log(i + 1)
      break
    }
  }
}
