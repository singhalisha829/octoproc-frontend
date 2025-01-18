import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { axiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";

interface SingleFileUploadProps {
  endpoint: string;
  contextId: string;
  contextType: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: any) => void;
}

const SingleFileUpload = ({
  endpoint,
  contextId,
  contextType,
  acceptedFileTypes = "*",
  maxSizeMB = 10,
  onUploadSuccess,
  onUploadError,
}: SingleFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const resetState = () => {
    setFile(null);
    setUploadProgress(0);
    setStatus("idle");
  };

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
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!validateFile(selectedFile)) {
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("context_id", contextId);
    formData.append("context_type", contextType);

    try {
      setStatus("uploading");
      setUploadProgress(0);

      const { data } = await axiosInstance.post(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total || 0)
          );
          setUploadProgress(percentage);
        },
      });

      setStatus("success");
      toast.success("File uploaded successfully");
      onUploadSuccess?.(data);
    } catch (error) {
      setStatus("error");
      toast.error("Error uploading file");
      onUploadError?.(error);
      e.target.value = "";
    }
  };

  const getStatusIcon = () => {
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
        <Button
          variant={status === "error" ? "destructive" : "tertiary"}
          disabled={status === "uploading"}
          asChild
        >
          <label
            className="cursor-pointer flex items-center gap-2"
            htmlFor="file"
          >
            {getStatusIcon()}
            {status === "uploading" ? "Uploading..." : "Upload File"}
          </label>
        </Button>

        {file && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {file.name}
            </span>
            {status !== "uploading" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetState}
                className="p-0 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {status === "uploading" && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}

      <input
        onChange={handleChange}
        accept={acceptedFileTypes}
        className="sr-only"
        type="file"
        id="file"
      />
    </div>
  );
};

export default SingleFileUpload;
