/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CaretRightOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, message, Progress, Upload } from "antd";
import { processVideo } from "@/apis/pig-detection.api";

const VideoOption = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoProcessed, setVideoProcessed] = useState<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setprogress] = useState<any>(0);

  useEffect(() => {
    const ws = new WebSocket(process.env.BASE_URL + "/ws");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      const payload = { userId: "user123" };
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
      setprogress(event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const beforeUpload = (file: any) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
      return false;
    }

    const isLt20MB = file.size / 1024 / 1024 < 40;
    if (!isLt20MB) {
      message.error("Video must be smaller than 40MB!");
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

  const processVideoMutation = useMutation({
    mutationFn: async (file: File) => {
      return processVideo(file, "user123");
    },
    onSuccess: (response: any) => {
      const url = URL.createObjectURL(response.data);
      setVideoProcessed(url);
      message.success("Image processed successfully!");
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
        {processVideoMutation.isPending && (
          <Progress
            type="circle"
            percent={progress}
            showInfo={false}
            status="active"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        )}
        <Button
          size="large"
          icon={<CaretRightOutlined />}
          onClick={handleProcessVideo}
          disabled={!videoUrl ? true : false}
          loading={processVideoMutation.isPending}
          className="!absolute"
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
        </div>
      </div>
    </Flex>
  );
};
export default VideoOption;
