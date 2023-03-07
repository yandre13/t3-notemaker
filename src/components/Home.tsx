import { useSession } from "next-auth/react";

import { api } from "@/utils/api";
import NoteEditor from "@/components/NoteEditor";
import NoteCard from "@/components/NoteCard";
import { type Session } from "next-auth";
import { useSelectedTopicStore } from "@/store/topic";

export default function HomeContent() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <main>
      <Content session={session} />
    </main>
  );
}

const Content = ({ session }: { session: Session }) => {
  const { seletedTopic } = useSelectedTopicStore();

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: seletedTopic?.id ?? "",
    },
    {
      enabled: session?.user !== undefined && seletedTopic !== null,
    }
  );

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
      topicId: seletedTopic?.id ?? "",
    });
  };

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const handleDelete = (id: string) => {
    deleteNote.mutate({ id });
  };

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
};
