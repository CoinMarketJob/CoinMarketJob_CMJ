"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './QuestionDraft.css';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor, EditorContent, Editor, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';

// Ensure JobQuestion type is defined properly
interface JobQuestion {
  id: string;
  questionText: string;
  // Other properties if needed
}

interface DraftProps {
  key: number;
  show?: boolean;
  content?: JSONContent;
  onChange: (content: JSONContent) => void;
  border?: boolean;
  question: JobQuestion;  // This should be of type JobQuestion
}

const MenuBar: React.FC<{ editor: Editor | null; question?: string }> = ({ editor, question }) => {
  const [textSize, setTextSize] = useState<string>("Normal");

  if (!editor) {
    return null;
  }

  const changeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextSize(e.target.value);

    switch (e.target.value) {
      case "H2":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      default:
        editor.chain().focus().setParagraph().run();
        break;
    }
  };

  return (
    <div className="button-group">
      {/* Display the question text */}
      {question && <div className="question-text">{question}</div>}
    </div>
  );
};

const QuestionDraft: React.FC<DraftProps> = ({ show, content, onChange, border, question }) => {
  const editor = useEditor(
    {
      extensions: [
        Color.configure({}),
        TextStyle.configure({}),
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
        if (onChange) {
          onChange(editor.getJSON());
        }
      },
      editable: !show,
    },
    [content]
  );

  if (show) {
    return (
      <div className="control-group">
        <EditorContent className="editor-content" editor={editor} />
      </div>
    );
  }

  return (
    <div className="control-group" style={{ border: border ? "none" : "1px solid #E7E5E4" }}>
      {/* Use question.questionText to pass the string to MenuBar */}
      <MenuBar editor={editor} question={question.questionText} />
      <EditorContent className="editor-content" editor={editor} />
    </div>
  );
};

export default QuestionDraft;
