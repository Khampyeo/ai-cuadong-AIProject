export type GetOfferConnectionParams = {
  sdp: string;
  type: string;
  video_transforms: string;
};

export type TriggerNewMsgParams = {
  question: string;
  langCode: "en" | "vi";
  pcId: string;
  useGpt: boolean;
  conversation_histories?: Array<object>;
};
