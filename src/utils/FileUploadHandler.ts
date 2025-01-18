

import { axiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";
export const handleFileUpload = async (file: File, endpoint = ``) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const { data } = await axiosInstance.post(
            endpoint,
            formData
        );
        if (data.status.code == 200) {
            toast.success("File Uploaded Successfully!");
            return { type: "success", data: data.path };
        }
    } catch (error) {
        return { type: "error", error: error };
    }
};
