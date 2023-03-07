import { useSelectedTopicStore } from "@/store/topic";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import Link from "next/link";
import { useTopics } from "@/hooks/useTopics";

export default function Sidebar({ session }: { session: Session | null }) {
  const { seletedTopic, setSelectedTopic } = useSelectedTopicStore();

  const { topics, refetchTopics } = useTopics({
    enabled: session?.user !== undefined,
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => void refetchTopics(),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements[0] as HTMLInputElement;
    createTopic.mutate({
      title: input.value,
    });
    input.value = "";
  };

  return (
    <aside>
      <ul className="menu rounded-box w-56 bg-base-100 p-2">
        {topics?.map?.((topic) => (
          <li key={topic.id} onClick={() => void setSelectedTopic(topic.id)}>
            <Link
              href={`/topic/${topic.id}`}
              className={`${seletedTopic === topic?.id ? "active" : ""}`}
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
      {topics?.length !== 0 && <div className="divider"></div>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm w-full"
        />
        <button type="submit" className="btn-primary btn-sm btn">
          Save
        </button>
      </form>
    </aside>
  );
}
