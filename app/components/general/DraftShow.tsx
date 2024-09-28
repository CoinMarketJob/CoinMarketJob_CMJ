"use client";
import "./Draft.css";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface DraftProps {
  content?: JSONContent;
}

const Draft: React.FC<DraftProps> = ({ content }) => {
  const editor = useEditor(
    {
      extensions: [
        Color.configure({
          /* Yapılandırma seçeneklerini buraya ekleyin, örneğin:  */
        }),
        TextStyle.configure({
          /* Yapılandırma seçeneklerini buraya ekleyin, örneğin:  */
        }),
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
      editable: false,
    },
    [content]
  );
  return (
    <div className="control-group">
      <EditorContent className="editor-content" editor={editor} />
    </div>
  );
};
export default Draft;
