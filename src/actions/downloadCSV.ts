"use server";

import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";

type DownloadCSVResult =
  | {
      success: true;
      data: string;
      filename: string;
      contentType: string;
    }
  | {
      success: false;
      error: string;
    };

export async function downloadCSVAction(
  items: z.infer<typeof CharacterBaseZ>[],
): Promise<DownloadCSVResult> {
  try {
    const csvContent = convertToCSV(items);

    return {
      success: true,
      data: csvContent,
      filename: `${items.length}_items.csv`,
      contentType: "text/csv",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

function convertToCSV(items: z.infer<typeof CharacterBaseZ>[]): string {
  if (items.length === 0) return "";

  const allKeys = new Set<string>();
  items.forEach((item) => {
    Object.keys(item).forEach((key) => allKeys.add(key));
  });

  const headers = Array.from(allKeys);

  const csvHeaders = headers.join(",");

  const csvRows = items.map((item) => {
    return headers
      .map((header) => {
        const value = item[header as keyof typeof item];
        const escapedValue = String(value || "").replace(/"/g, '""');
        return `"${escapedValue}"`;
      })
      .join(",");
  });

  return [csvHeaders, ...csvRows].join("\n");
}
