import { headers } from "next/headers";
import { fetchApi } from "@/configs/fetchApi";

const URL =
  "https://8c51-2405-4802-8146-8480-ffff-ffff-ffff-fff9.ngrok-free.app";
export const processImage = (file: any) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchApi.postFormData<{ message: string; data: string }>(
    URL + "/api/v1/detect/image",
    formData
  );
};
export const processVideo = (file: any) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchApi.postFormData<{ message: string; data: string }>(
    URL + "/api/v1/detect/video",
    formData
  );
};
export const getFile = (filename: string) => {
  return fetch(
    `https://8c51-2405-4802-8146-8480-ffff-ffff-ffff-fff9.ngrok-free.app/api/v1/results/${filename}`,
    {
      method: "GET",
      headers: {
        "User-Agent": "",
      },
    }
  );
};
