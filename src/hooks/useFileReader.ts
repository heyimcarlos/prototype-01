import { asStringOrNull } from "@/lib/asStringOrNull";
import { useEffect, useState } from "react";

// @INFO: FileReader methods
type ReadAsMethod = "readAsText" | "readAsDataURL" | "readAsArrayBuffer" | "readAsBinaryString";

type UseFileReaderProps = {
  method: ReadAsMethod;
  onLoad?: (result: unknown) => void;
};
export const useFileReader = (options: UseFileReaderProps) => {
  const { method = "readAsText", onLoad } = options;
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<DOMException | null>(null);
  const [result, setResult] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!file && result) {
      setResult(null);
    }
  }, [file, result]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setLoading(true);
    reader.onloadend = () => setLoading(false);
    reader.onerror = () => setError(reader.error);

    reader.onload = (e) => {
      const result = e.target?.result ?? null;
      setResult(result);
      if (onLoad) {
        onLoad(result);
      }
    };
    reader[method](file);
  }, [file, method, onLoad]);

  return [{ result, error, file, loading }, setFile] as const;
};

export const useFilesReader = (options: UseFileReaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<DOMException | null>(null);
  const [results, setResults] = useState<{ name: string; data: string }[]>([]);

  const handleSetFiles = (files: File[]) => {
    setFiles((prev) => prev.concat(files));
    return;
  };

  const deleteFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
    return;
  };

  useEffect(() => {
    if (files.length !== results.length) {
      setResults([]);
    }
  }, [files.length, results.length]);

  useEffect(() => {
    if (files?.length === 0) {
      return;
    }
    const images: typeof results = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadstart = () => setLoading(true);
      reader.onloadend = () => setLoading(false);
      reader.onerror = () => setError(reader.error);

      reader.onload = (e) => {
        const result = asStringOrNull(e.target?.result);
        if (result) {
          images.push({ name: file.name, data: result });
        }
        if (images.length === files.length) {
          setResults(images);
        }
      };
      reader[options.method](file);
    });
  }, [files, options.method]);

  return [{ results, error, files, loading }, handleSetFiles, deleteFile] as const;
};
