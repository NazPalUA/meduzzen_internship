import { ZodSchema } from "zod"

export function parseData<T>(schema: ZodSchema<T>, data: unknown): T {
  const parsedResult = schema.safeParse(data)
  if (!parsedResult.success) {
    throw new Error("Failed to parse data", {
      cause: parsedResult.error.flatten().fieldErrors,
    })
  }
  return parsedResult.data
}
