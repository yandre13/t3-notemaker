import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export default function NoteEditor({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={content}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setContent(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn-primary btn"
          onClick={() => {
            onSave({ title, content });
            setTitle("");
            setContent("");
          }}
          disabled={title === "" || content === ""}
        >
          Save
        </button>
      </div>
    </div>
  );
}
