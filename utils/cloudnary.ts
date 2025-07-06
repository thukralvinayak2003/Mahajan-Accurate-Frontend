import axios from "axios";
import mime from "mime";
import { ImageType } from "../types"; // You already have this

export const uploadToCloudinary = async (image: ImageType) => {
  const data = new FormData();

  const uri = image.uri.startsWith("file://")
    ? image.uri
    : `file://${image.uri}`;
  const mimeType = mime.getType(uri) || "image/jpeg";

  data.append("file", {
    uri,
    type: mimeType,
    name: image.fileName || `upload.${mime.getExtension(mimeType)}`,
  } as any);

  data.append("upload_preset", "default");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dlwiphxiu/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error.message);
    throw new Error("Image upload failed");
  }
};
