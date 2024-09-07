import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import './EditProfileDraft.css';

interface DraftProps {
  ContentType: string;
  topInfo?: boolean;
  onChange: (content: JSONContent) => void;
  content?: JSONContent;
}

const Draft: React.FC<DraftProps> = ({ ContentType, onChange, content, topInfo }) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'custom-editor-content',
      },
    },
  });

  return (
    <>
      <div style={{display: !topInfo ? "none" : ""}} className="draft-container">
        <div className="ContentTypeText">{ContentType}</div>        
      </div>
      <div className="control-group" style={{ border: "1px solid #E7E5E4" }}>
        <EditorContent className="editor-content" editor={editor} />
      </div>
    </>
  );
};

export default Draft;
