/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { fetchApi } from "@/configs/fetchApi";

const URL =
  "https://7a3d-2405-4802-8146-8480-ffff-ffff-ffff-fff9.ngrok-free.app";

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
  return axios.get(
    `https://7a3d-2405-4802-8146-8480-ffff-ffff-ffff-fff9.ngrok-free.app/api/v1/results/${filename}`,
    {
      responseType: "blob",
      headers: {
        "User-Agent": "",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
};
