import { readStrFromArgs, assert } from "../utils.ts"
import { _ } from "../deps.ts"

type Stacks = { [key: string]: string[] }

interface Move {
  move: number
  from: number
  to: number
}

const { moves, stacks } = parseInput(await readStrFromArgs())

// part1(moves, stacks) // BSDMQFLSP
part2(moves, stacks) // PGSQBFLDP

function part1(moves: Move[], stacks: Stacks) {
  const _stacks = _.cloneDeep(stacks)

  for (const move of moves) {
    for (let i = 0; i < move.move; i++) {
      const crate = _stacks[move.from].pop()
      _stacks[move.to].push(crate)
    }
  }

  const indexes = Object.keys(_stacks).sort()

  console.log(
    indexes
      .map((idx) => {
        const stack = _stacks[idx]
        return stack[stack.length - 1]
      })
      .join("")
  )
}

function part2(moves: Move[], stacks: Stacks) {
  const _stacks = _.cloneDeep(stacks)

  for (const move of moves) {
    const crates = _stacks[move.from].splice(-move.move, move.move)
    _stacks[move.to] = _stacks[move.to].concat(crates)
  }

  const indexes = Object.keys(_stacks).sort()

  console.log(
    indexes
      .map((value) => {
        const stack = _stacks[value]
        return stack[stack.length - 1]
      })
      .join("")
  )
}

function parseInput(input: string): { moves: Move[]; stacks: Stacks } {
  const [rawStacks, rawMoves] = input.split("\n\n").map((x) => x.split("\n"))

  const parsedStacks = rawStacks.map((line) =>
    [...line].filter((_, index) => index % 4 === 1)
  )

  const indexes = parsedStacks.pop() as string[] // [ [ "D" ], [ "N", "C" ], [ "Z", "M", "P" ] ]

  const stacks: Stacks = {}

  for (const line of parsedStacks) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== " ") {
        if (stacks[indexes[i]] == null) {
          stacks[indexes[i]] = []
        }
        stacks[indexes[i]].unshift(line[i])
      }
    }
  }

  const moves = []
  for (const move of rawMoves) {
    const match = /move (\d+) from (\d+) to (\d+)/g.exec(move.trim())

    assert(match && match.length === 4)

    moves.push({
      move: parseInt(match[1]),
      from: parseInt(match[2]),
      to: parseInt(match[3]),
    })
  }

  return {
    moves,
    stacks,
  }
}
