export { assert } from "https://deno.land/std@0.182.0/testing/asserts.ts"

export async function readStrFromArgs(): Promise<string> {
  const contents = await Deno.readTextFile(Deno.args[0])
  return contents.trimEnd()
}

export function assertUnreachable(): never {
  throw new Error("Should be unreachable.")
}
