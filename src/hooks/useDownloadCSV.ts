"use client";

import { useCallback, useState } from "react";
import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";
import { downloadCSVAction } from "../actions/downloadCSV";

export const useDownloadCSV = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadCSV = useCallback(
    async (items: z.infer<typeof CharacterBaseZ>[]) => {
      if (items.length === 0) {
        setError("No items to download");
        return;
      }

      setIsDownloading(true);
      setError(null);

      try {
        const result = await downloadCSVAction(items);

        if (!result.success) {
          setError(result.error || "Failed to generate CSV");
          return;
        }

        if (!result.data || !result.filename) {
          setError("Invalid response from server");
          return;
        }

        const blob = new Blob([result.data], { type: result.contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = result.filename;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Download failed");
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return {
    downloadCSV,
    isDownloading,
    error,
    clearError: () => setError(null),
  };
};
