import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

type Pairs = { left: number | number[]; right: number | number[] }[]

// part1() // 5675
part2() //

async function part2() {
  const pairs = await parseInput2()

  const ret = pairs
    .sort((a, b) => {
      return isRightOrder(a, b) === true ? -1 : 1
    })
    .map((x) => JSON.stringify(x))

  console.log("part2:", (ret.indexOf("[[2]]") + 1) * (ret.indexOf("[[6]]") + 1))
}

async function part1() {
  const pairs = await parseInput1()
  const ret = pairs
    .map(({ left, right }, index) => {
      return isRightOrder(left, right) === true ? index + 1 : 0
    })
    .reduce((a, b) => a + b, 0)

  console.log("part1:", ret)
}

async function parseInput2(): Promise<Array<number | number[]>> {
  let str = (await readStdin()).trim().replace(/\n\n/g, "\n")

  str = str + "\n[[2]]\n[[6]]"

  return str.split("\n").map((line) => JSON.parse(line))
}

async function parseInput1(): Promise<Pairs> {
  return (await readStdin())
    .trim()
    .split("\n\n")
    .map((item) => {
      const [left, right] = item.split("\n").map((line) => JSON.parse(line))
      return { left, right }
    })
}

function isRightOrder(
  left: number | number[],
  right: number | number[]
): boolean | "no-decision" {
  const leftIsNumber = typeof left === "number"
  const rightIsNumber = typeof right === "number"

  if (leftIsNumber && rightIsNumber) {
    if (left === right) return "no-decision"

    return left < right
  }

  if (leftIsNumber && !rightIsNumber) {
    return isRightOrder([left], right)
  }

  if (!leftIsNumber && rightIsNumber) {
    return isRightOrder(left, [right])
  }

  if (!leftIsNumber && !rightIsNumber) {
    let index = 0
    while (true) {
      if (index > left.length - 1 && index <= right.length - 1) {
        // left out
        return true
      } else if (index <= left.length - 1 && index > right.length - 1) {
        // right out
        return false
      } else if (index > left.length - 1 && index > right.length - 1) {
        return "no-decision"
      }

      const ret = isRightOrder(left[index], right[index])

      if (ret !== "no-decision") {
        return ret
      }

      index++
    }
  }

  assertUnreachable()
}
