import { readStrFromArgs, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Code = "A" | "B" | "C" | "X" | "Y" | "Z"

type HandShape = "r" | "p" | "s"

type Game = { me: HandShape; opponent: HandShape }

type Games = Game[]

const handShape2Score = {
  r: 1,
  p: 2,
  s: 3,
} as const

const gameResult2Score = {
  win: 6,
  draw: 3,
  loss: 0,
} as const

const code2HandShape = {
  A: "r",
  B: "p",
  C: "s",
  X: "r",
  Y: "p",
  Z: "s",
} as const

const input = await readStrFromArgs()

part1(input) // 13565
part2(input) // 12424

function part1(input: string) {
  const games = parseInput(input)
  console.log(_.sum(games.map(getGameScore)))
}

function part2(input: string) {
  const games = parseInput(input, true)
  console.log(_.sum(games.map(getGameScore)))
}

function parseInput(input: string, isPart2 = false): Games {
  return input.split("\n").map((line) => {
    const [opponent, me] = line.split(" ") as Code[]
    return genGame({ me, opponent }, isPart2)
  })
}

function getGameScore({ me, opponent }: Game): number {
  if (me === opponent) return gameResult2Score.draw + handShape2Score[me]

  switch (me) {
    case "r": {
      switch (opponent) {
        case "p":
          return gameResult2Score.loss + handShape2Score[me]
        case "s":
          return gameResult2Score.win + handShape2Score[me]
      }
      break
    }

    case "p": {
      switch (opponent) {
        case "s":
          return gameResult2Score.loss + handShape2Score[me]
        case "r":
          return gameResult2Score.win + handShape2Score[me]
      }
      break
    }

    case "s": {
      switch (opponent) {
        case "r":
          return gameResult2Score.loss + handShape2Score[me]
        case "p":
          return gameResult2Score.win + handShape2Score[me]
      }
      break
    }
  }

  assertUnreachable()
}

function genGame(
  { me, opponent }: { me: Code; opponent: Code },
  isPart2: boolean
): Game {
  if (!isPart2) {
    return {
      me: code2HandShape[me],
      opponent: code2HandShape[opponent],
    }
  }

  let _me: HandShape | null = null
  const _opponent = code2HandShape[opponent]

  switch (me) {
    case "X": {
      // loss
      switch (_opponent) {
        case "p":
          _me = "r"
          break
        case "s":
          _me = "p"
          break
        case "r":
          _me = "s"
          break
      }
      break
    }

    case "Y": {
      // draw
      _me = _opponent
      break
    }

    case "Z": {
      // win
      switch (_opponent) {
        case "p":
          _me = "s"
          break
        case "s":
          _me = "r"
          break
        case "r":
          _me = "p"
          break
      }
      break
    }
  }

  if (_me == null) {
    assertUnreachable()
  }

  return {
    me: _me,
    opponent: _opponent,
  }
}
