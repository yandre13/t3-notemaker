import { useSession } from "next-auth/react";

import { api } from "@/utils/api";
import NoteEditor from "@/components/NoteEditor";
import NoteCard from "@/components/NoteCard";
import { useSelectedTopicStore } from "@/store/topic";
import { type Note } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTopics } from "@/hooks/useTopics";

export default function Content({
  ssr,
  topicId,
  notes: notesSsr,
}: {
  notes?: Note[] | null;
  topicId?: string;
  ssr?: boolean;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const { seletedTopic, setSelectedTopic } = useSelectedTopicStore();

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: seletedTopic ?? "",
    },
    {
      enabled: session?.user !== undefined && seletedTopic !== null,
      initialData: notesSsr,
    }
  );
  const { topics } = useTopics({
    enabled: !!ssr,
  });

  const createNote = api.note.create.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const handleSave = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    createNote.mutate({
      title,
      content,
      topicId: seletedTopic ?? "",
      authorId: session?.user?.id ?? "",
    });
  };

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const handleDelete = (id: string) => {
    deleteNote.mutate({ id });
  };

  useEffect(() => {
    // if topics does not include topicId, then push to home
    if (
      ssr &&
      topicId &&
      topics &&
      !topics.map((t) => t.id).includes(topicId)
    ) {
      setSelectedTopic(topics[0]?.id ?? "");
      void router.push("/");
    } else {
      setSelectedTopic(topicId ?? topics?.[0]?.id ?? "");
    }
  }, [router, topics, topicId, ssr, setSelectedTopic]);

  return (
    <section>
      <div>
        {notes?.map((note) => (
          <div key={note.id} className="mt-5">
            <NoteCard note={note} onDelete={() => handleDelete(note.id)} />
          </div>
        ))}
      </div>
      <NoteEditor onSave={handleSave} />
    </section>
  );
}
