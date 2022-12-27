import { useFilesReader } from "@/hooks/useFileReader";
import { TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { type DragEvent, useState, useRef } from "react";
import { type FileEvent } from "../../ImageUploader";

const MAX_FILE_AMOUNT = 10;
// type ImagesUploaderProps = {};

export function ImagesUploader() {
  const [inDropZone, setInDropZone] = useState<boolean>(false);
  const fileInputRef = useRef("");

  const [{ results, files }, setFiles, deleteFile] = useFilesReader({
    method: "readAsDataURL",
  });

  const validateFiles = (files: File[], newFiles: File[]) => {
    const existingFiles = files.map((f) => f.name);
    return newFiles.filter((f) => !existingFiles.includes(f.name));
  };

  const onInputFiles = (e: FileEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    if (files.length >= MAX_FILE_AMOUNT) {
      return;
    }
    const filesToUpload = validateFiles(files, Array.from(e.target.files));

    if (files.length + filesToUpload.length >= MAX_FILE_AMOUNT) {
      setFiles(filesToUpload.slice(0, MAX_FILE_AMOUNT - files.length));
      return;
    }
    if (filesToUpload.length === 0) {
      return;
    }
    if (filesToUpload.length >= MAX_FILE_AMOUNT) {
      return;
    }
    fileInputRef.current = "";
    setFiles(filesToUpload);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(false);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = "copy";
    setInDropZone(true);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const filesToUpload = validateFiles(
      files,
      Array.from(e.dataTransfer.files)
    );

    if (files.length + filesToUpload.length >= MAX_FILE_AMOUNT) {
      setFiles(filesToUpload.slice(0, MAX_FILE_AMOUNT - files.length));
      return;
    }
    if (filesToUpload.length === 0) {
      return;
    }
    if (filesToUpload.length >= MAX_FILE_AMOUNT) {
      return;
    }
    setFiles(filesToUpload);
    setInDropZone(false);
  };

  return (
    <div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex justify-center rounded-md border-2 border-dashed border-gray-300 my-6 px-6 pt-5 pb-6"
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload</span>
              <input
                onInput={onInputFiles}
                value={fileInputRef.current || ""}
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
      <div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.length > 0 &&
            results.map((result, idx) => {
              return (
                <li
                  key={`result-${idx}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="absolute right-0 m-2 z-10 ">
                    <button
                      onClick={() => deleteFile(result.name)}
                      className="flex items-center p-2 bg-gray-500 rounded-full"
                    >
                      <TrashIcon className="w-5 h-5 opacity-100 text-white" />
                    </button>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none h-60 ">
                    <Image
                      src={result.data}
                      alt=""
                      width={720}
                      height={0}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
