import { create } from "zustand";

export type SelectedTopicStore = {
  seletedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
};

export const useSelectedTopicStore = create<SelectedTopicStore>((set) => ({
  seletedTopic: null,
  setSelectedTopic: (topic: string | null) => set({ seletedTopic: topic }),
}));
