/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  CaretRightOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, message, Upload } from "antd";
import { getFile, processVideo } from "@/apis/pig-detection.api";

const VideoOption = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoProcessed, setVideoProcessed] = useState<any>(null);
  const [messageVideoProcessed, setMessageVideoProcessed] = useState<
    string | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const beforeUpload = (file: any) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
      return false;
    }

    const isLt20MB = file.size / 1024 / 1024 < 20;
    if (!isLt20MB) {
      message.error("Video must be smaller than 20MB!");
      return false;
    }

    setFile(file);
    setVideoUrl(null);
    return true;
  };

  const handleUpload = ({ file }: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setVideoUrl(reader.result as string);
      message.success("Upload successful!");
    };
    reader.readAsDataURL(file);
  };
  const getVideoProcessed = useMutation({
    mutationFn: async (name: string) => {
      return getFile(name);
    },
    onSuccess: async (response: any) => {
      const url = URL.createObjectURL(response.data);
      setVideoProcessed(url);
      message.success("Processed video fetched successfully!");
    },
    onError: () => {
      message.error("Can't get the image.");
    },
  });

  const processVideoMutation = useMutation({
    mutationFn: async (file: File) => {
      return processVideo(file);
    },
    onSuccess: (response: any) => {
      setMessageVideoProcessed(response.message);
      message.success("Image processed successfully!");
      getVideoProcessed.mutate(response.result_path.replace("results/", ""));
    },
    onError: () => {
      message.error("Failed to process image.");
    },
  });

  const handleProcessVideo = () => {
    if (file) {
      processVideoMutation.mutate(file);
    } else {
      message.error("No video selected for processing.");
    }
  };
  const handleDownload = () => {
    if (!videoProcessed) {
      message.error("No processed video to download.");
      return;
    }

    const link = document.createElement("a");
    link.href = videoProcessed;
    link.download = "processed-video.mp4"; // Specify the file name and extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Flex gap={5} className="flex-col md:flex-row">
      <div className="flex-1">
        <Upload
          accept="video/*"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleUpload({ file })}
        >
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        </Upload>
        <div className="mt-4 p-1 border border-border rounded-md h-96 flex justify-center items-center">
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
      <Flex justify="center" align="center" className="w-full p-5 md:w-32">
        <Button
          size="large"
          icon={<CaretRightOutlined />}
          onClick={handleProcessVideo}
          disabled={videoUrl ? false : true}
          loading={processVideoMutation.isPending}
        ></Button>
      </Flex>
      <div className="flex-1">
        <Button
          icon={<DownloadOutlined />}
          disabled={videoProcessed ? false : true}
          onClick={handleDownload}
        >
          Download
        </Button>
        <div className="flex-1 flex justify-center items-center flex-col mt-4 p-1 border border-border rounded-md h-96">
          {videoProcessed && (
            <video
              src={videoProcessed}
              controls
              className="max-h-full max-w-full object-contain"
            />
          )}
          {messageVideoProcessed && (
            <p className="text-xl text-green-700 mt-5">
              {messageVideoProcessed}
            </p>
          )}
        </div>
      </div>
    </Flex>
  );
};
export default VideoOption;
