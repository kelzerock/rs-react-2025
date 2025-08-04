import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";

export function downloadCSVFile(items: z.infer<typeof CharacterBaseZ>[]) {
  const countItems = items.length;
  const CSVFile = new Blob([JSON.stringify(items)], { type: "text/csv" });
  const temp_link = document.createElement("a");
  temp_link.download = `${countItems}_items.csv`;
  const url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);
  temp_link.click();
  document.body.removeChild(temp_link);
}
