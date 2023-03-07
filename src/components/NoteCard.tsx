import { useState } from "react";
import { type Note } from "@prisma/client";
import ReactMarkdown from "react-markdown";

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-ease-100 card mt-5 border border-gray-200 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : "collapse"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <div className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </div>
          <div className="card-actions mx-2 flex justify-end">
            <button
              className="btn-error btn-xs btn px-5"
              onClick={() => onDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
