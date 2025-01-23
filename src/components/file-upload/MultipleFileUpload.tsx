import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { axiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";

interface MultipleFileUploadProps {
  endpoint: string;
  contextId: string;
  contextType: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  maxFiles?: number;
  onUploadSuccess?: (data: any[]) => void;
  onUploadError?: (error: any) => void;
  id: string;
}

const MultipleFileUpload = ({
  endpoint,
  contextId,
  contextType,
  acceptedFileTypes = "*",
  maxSizeMB = 10,
  maxFiles = 100,
  onUploadSuccess,
  onUploadError,
  id,
}: MultipleFileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatuses, setUploadStatuses] = useState<
    Array<"idle" | "uploading" | "success" | "error">
  >([]);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    if (acceptedFileTypes !== "*" && !file.type.match(acceptedFileTypes)) {
      toast.error("File type not supported");
      return false;
    }

    return true;
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length + files.length > maxFiles) {
      toast.error(`Maximum of ${maxFiles} files allowed`);
      return;
    }

    const validFiles = selectedFiles.filter(validateFile);

    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);

    const initialStatuses = new Array(newFiles.length).fill("idle");
    initialStatuses[newFiles.length - 1] = "uploading";
    setUploadStatuses(initialStatuses);

    const formData = new FormData();
    validFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("context_id", contextId);
    formData.append("context_type", contextType);

    try {
      const { data } = await axiosInstance.post(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total || 0)
          );
          setUploadProgress(percentage);
        },
      });

      const successStatuses = initialStatuses.map(() => "success");
      setUploadStatuses(successStatuses as ["idle"]);
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
      onUploadSuccess?.(data);
    } catch (error) {
      const errorStatuses = initialStatuses.map(() => "error");
      setUploadStatuses(errorStatuses as ["idle"]);
      toast.error("Error uploading files");
      onUploadError?.(error);
      e.target.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    const updatedStatuses = uploadStatuses.filter(
      (_, index) => index !== indexToRemove
    );
    setFiles(updatedFiles);
    setUploadStatuses(updatedStatuses);
  };

  const getStatusIcon = (
    status: "idle" | "uploading" | "success" | "error"
  ) => {
    switch (status) {
      case "uploading":
        return <Upload className="h-4 w-4 animate-pulse" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Upload className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="tertiary" disabled={files.length >= maxFiles} asChild>
          <label
            className="cursor-pointer flex items-center gap-2"
            htmlFor={id ? id : "files"}
          >
            <Upload className="h-4 w-4" />
            Upload Files
          </label>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={file.name}
              className="flex items-center gap-2 bg-gray-100 p-2 rounded"
            >
              <div className="flex-grow flex items-center gap-2">
                {getStatusIcon(uploadStatuses[index])}
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              {uploadStatuses[index] !== "uploading" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="p-0 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {uploadStatuses.some((status) => status === "uploading") && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}

      <input
        onChange={handleChange}
        multiple
        accept={acceptedFileTypes}
        className="sr-only"
        type="file"
        id={id ? id : "files"}
      />
    </div>
  );
};

export default MultipleFileUpload;
