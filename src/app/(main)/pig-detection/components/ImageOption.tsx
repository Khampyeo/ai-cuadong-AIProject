import { useState } from "react";
import { headers } from "next/headers";
import {
  CaretRightOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, message, Upload } from "antd";
import { getFile, processImage } from "@/apis/pig-detection.api";

const ImageOption = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageProcessed, setImageProcessed] = useState<any>(null);
  const [messageImageProcessed, setMessageImageProcessed] = useState<
    string | null
  >(null);

  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt5MB = file.size / 1024 / 1024 < 5;
    if (!isLt5MB) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    setFile(file);
    setImageProcessed(null);
    setMessageImageProcessed(null);
    return true;
  };

  const handleUpload = ({ file }: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      message.success("Upload successful!");
    };
    reader.readAsDataURL(file);
  };
  const getImageProcessed = useMutation({
    mutationFn: async (name: string) => {
      return getFile(name);
    },
    onSuccess: async (response: any) => {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageProcessed(url);
    },
    onError: () => {
      message.error("Can't get the image.");
    },
  });
  const processImageMutation = useMutation({
    mutationFn: async (file: File) => {
      return processImage(file);
    },
    onSuccess: (response: any) => {
      message.success("Image processed successfully!");
      setMessageImageProcessed(response.message);
      getImageProcessed.mutate(response.result_path.replace("results/", ""));
    },
    onError: (error) => {
      message.error("Failed to process image.");
    },
  });
  const handleProcessImage = () => {
    if (file) {
      processImageMutation.mutate(file);
    } else {
      message.error("No image selected for processing.");
    }
  };
  const handleDownload = () => {
    if (!imageProcessed) {
      message.error("No processed image to download.");
      return;
    }

    const link = document.createElement("a");
    link.href = imageProcessed;
    link.download = "processed-image.png"; // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Flex gap={5} className="flex-col md:flex-row">
      <div className="flex-1">
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleUpload({ file })}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <div className="mt-4 p-1 border border-border rounded-md h-80 flex justify-center items-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
      <Flex justify="center" align="center" className="w-full p-5 md:w-32">
        <Button
          size="large"
          icon={<CaretRightOutlined />}
          onClick={handleProcessImage}
          disabled={!imageUrl ? true : false}
          loading={processImageMutation.isPending}
        ></Button>
      </Flex>
      <div className="flex-1">
        <Button
          icon={<DownloadOutlined />}
          disabled={!imageProcessed ? true : false}
          onClick={handleDownload}
        >
          Download
        </Button>
        <div className="flex-1 flex justify-center items-center flex-col mt-4 p-1 border border-border rounded-md h-80">
          {imageProcessed && (
            <img
              src={imageProcessed}
              alt="Uploaded"
              className="max-h-full max-w-full object-contain"
            />
          )}
          {messageImageProcessed && (
            <p className="text-xl text-green-700 mt-5">
              {messageImageProcessed}
            </p>
          )}
        </div>
      </div>
    </Flex>
  );
};
export default ImageOption;
