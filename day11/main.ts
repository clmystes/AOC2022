import { readStdin, assert } from "../utils.ts"
import { _ } from "../deps.ts"

type Monkeys = {
  items: number[]
  operation: string // e.g. old * 17
  divisibleBy: number
  trueMonkey: number
  falseMonkey: number
  inspectedTimes: number
}[]

const monkeys: Monkeys = (await readStdin())
  .trim()
  .split("\n\n")
  .map((lines) => {
    const id = parseInt(lines.match(/Monkey (\d+)/)![1])

    const items = lines
      .match(/Starting items(?:[:,] (\d+))+/g)![0]
      .split(": ")[1]
      .split(", ")
      .map(Number)

    const operation = lines.match(/= ([^\n]+)/)![1]

    const divisibleBy = parseInt(lines.match(/divisible by (\d+)/)![1])

    const trueMonkey = parseInt(
      lines.match(/If true: throw to monkey (\d)/)![1]
    )

    const falseMonkey = parseInt(
      lines.match(/If false: throw to monkey (\d)/)![1]
    )

    return {
      items,
      divisibleBy,
      operation,
      trueMonkey,
      falseMonkey,
      inspectedTimes: 0,
    }
  })

function part1(monkeys: Monkeys) {
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      const items = monkey.items

      while (items.length) {
        let item = items.shift()

        monkey.inspectedTimes++

        item = eval(monkey.operation.replace(/old/g, String(item)))

        assert(item != null)

        item = Math.floor(item / 3)

        const target =
          item % monkey.divisibleBy === 0
            ? monkey.trueMonkey
            : monkey.falseMonkey

        monkeys[target].items.push(item)
      }
    }
  }

  const most = monkeys.map((m) => m.inspectedTimes)
  most.sort((a, b) => b - a)
  console.log(most[0] * most[1])
}

function part2(monkeys: Monkeys) {
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1)

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      const items = monkey.items

      while (items.length) {
        let item = items.shift()

        monkey.inspectedTimes++

        item = eval(monkey.operation.replace(/old/g, String(item)))

        assert(item != null)

        item = item % divider

        const target =
          item % monkey.divisibleBy === 0
            ? monkey.trueMonkey
            : monkey.falseMonkey

        monkeys[target].items.push(item)
      }
    }
  }

  const most = monkeys.map((m) => m.inspectedTimes)
  most.sort((a, b) => b - a)
  console.log(most[0] * most[1])
}

// part1(monkeys)
part2(monkeys)
