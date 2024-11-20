import Papa from "papaparse"
import { triggerFileDownload } from "./triggerFileDownload"

export async function transformCsvToJSONandDownload(csvData: string, filename: string) {
  if (!csvData) return

  const parsedData = Papa.parse<{ [key: string]: string }>(csvData, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  })

  const jsonString = JSON.stringify(parsedData.data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })

  triggerFileDownload(blob, filename)
}
