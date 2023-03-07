import { api } from "@/utils/api";

export const useTopics = ({ enabled }: { enabled: boolean }) => {
  const { data, refetch } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled,
    }
  );

  return {
    topics: data,
    refetchTopics: refetch,
  };
};
