export { assert } from "https://deno.land/std@0.182.0/testing/asserts.ts"
import { readAllSync } from "https://deno.land/std@0.116.0/streams/conversion.ts"

export async function readStrFromArgs(): Promise<string> {
  const contents = await Deno.readTextFile(Deno.args[0])
  return contents.trim()
}

export const readStdin = () =>
  new TextDecoder().decode(readAllSync(Deno.stdin)).trim()

export function assertUnreachable(): never {
  throw new Error("Should be unreachable.")
}
