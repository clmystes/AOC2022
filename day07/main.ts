import { readStdin, assert, assertUnreachable } from "../utils.ts"
import { _ } from "../deps.ts"

interface FileTree {
  name: string
  isDirectory: boolean
  size?: number
  parent?: FileTree
  children?: FileTree[]
}

const fileTree: FileTree = await parseInput()

// part1(fileTree) //
part2(fileTree) //

function part1(fileTree: FileTree) {
  let total = 0

  getSize(fileTree, (_, size) => {
    if (size < 100000) {
      total += size
    }
  })

  console.log(total)
}

function part2(fileTree: FileTree) {
  const TOTAL_DISK_SPACE = 70000000
  const REQUIRED_SPACE = 30000000

  const usedSpace = getSize(fileTree)

  const availableSpace = TOTAL_DISK_SPACE - usedSpace

  assert(REQUIRED_SPACE > availableSpace)

  const minimumSize = REQUIRED_SPACE - availableSpace

  const candidates: { name: string; size: number }[] = []

  getSize(fileTree, (name, size) => {
    if (size >= minimumSize) {
      candidates.push({
        name,
        size,
      })
    }
  })

  candidates.sort((a, b) => a.size - b.size)

  console.log(candidates[0].size)
}

async function parseInput(): Promise<FileTree> {
  const lines = (await readStdin()).trim().split("\n")

  const fileTree = {
    name: "/",
    isDirectory: true,
    children: [],
  } as FileTree

  let currentNode = fileTree
  let currentCommand = null

  for (const line of lines) {
    if (line[0] === "$") {
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)

      assert(match && match.groups)

      currentCommand = match.groups.command

      if (currentCommand === "cd") {
        const target = match.groups.arg

        switch (target) {
          case "/":
            currentNode = fileTree
            break

          case "..":
            assert(currentNode.parent != null)

            currentNode = currentNode.parent
            break

          default:
            currentNode = currentNode.children!.find(
              (folder) => folder.isDirectory && folder.name === target
            )!
        }
      }
    } else {
      if (currentCommand === "ls") {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line)

        if (fileMatch) {
          assert(fileMatch.groups)

          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode,
          }

          currentNode.children!.push(node)
        }
        const dirMatch = /^dir (?<name>.+)$/.exec(line)

        if (dirMatch) {
          assert(dirMatch.groups)

          const node = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          }

          currentNode.children!.push(node)
        }
      } else {
        assertUnreachable()
      }
    }
  }

  return fileTree
}

function getSize(
  fileTree: FileTree,
  directoryCallback = (name: string, size: number) => {}
): number {
  if (!fileTree.isDirectory) {
    return fileTree.size!
  }

  const directorySize = fileTree
    .children!.map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0)

  directoryCallback(fileTree.name, directorySize)

  return directorySize
}
