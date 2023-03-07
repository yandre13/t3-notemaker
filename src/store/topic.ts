import { type Topic } from "@prisma/client";
import create from "zustand";

export type SelectedTopicStore = {
  seletedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
};

export const useSelectedTopicStore = create<SelectedTopicStore>((set) => ({
  seletedTopic: null,
  setSelectedTopic: (topic: Topic | null) => set({ seletedTopic: topic }),
}));
