import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Icon from "../general/Icon";

interface DraftProps {
  ContentType: string;
  close: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onChange: (content: JSONContent) => void;
  content?: JSONContent;
}

const MenuBar: React.FC<{ editor: Editor | null, addButton: boolean }> = ({ editor, addButton }) => {
  const [textSize, setTextSize] = React.useState<string>("Normal");

  if (!editor) {
    return null;
  }

  return (
    <div className="button-group">
      {/* MenuBar component code */}
    </div>
  );
};

const Draft: React.FC<DraftProps> = ({ ContentType, close, onChange, content }) => {
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
  });

  return (
    <>
      <div className="draft-container">
        <div className="ContentTypeText">{ContentType}</div>
        <div className="CloseSvg">
          <Icon onClick={close} hoverSize={40} hoverContent="Delete">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                fill="#242220"
                fill-opacity="0.2"
              />
            </svg>
          </Icon>
        </div>
      </div>
      <div className="control-group" style={{ border: "1px solid #E7E5E4" }}>
        <MenuBar editor={editor} addButton={ContentType != "About"} />
        <EditorContent className="editor-content" editor={editor} />
      </div>
    </>
  );
};

export default Draft;
