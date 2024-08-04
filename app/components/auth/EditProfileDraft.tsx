import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import './EditPRofileDraft.css';

interface DraftProps {
  ContentType: string;
  topInfo?: boolean;
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
      <svg
        width="21"
        height="19"
        viewBox="0 0 21 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <path
          d="M8.06594 17.896C7.88295 17.896 7.72956 17.834 7.60578 17.71C7.48199 17.586 7.4201 17.4324 7.4201 17.2492C7.4201 17.066 7.48199 16.9127 7.60578 16.7894C7.72956 16.666 7.88295 16.6043 8.06594 16.6043H20.1876C20.3706 16.6043 20.524 16.6663 20.6477 16.7903C20.7715 16.9143 20.8334 17.0679 20.8334 17.2511C20.8334 17.4343 20.7715 17.5876 20.6477 17.711C20.524 17.8343 20.3706 17.896 20.1876 17.896H8.06594ZM8.06594 10.146C7.88295 10.146 7.72956 10.084 7.60578 9.96001C7.48199 9.83601 7.4201 9.68241 7.4201 9.49921C7.4201 9.31601 7.48199 9.16273 7.60578 9.03938C7.72956 8.91602 7.88295 8.85434 8.06594 8.85434H20.1876C20.3706 8.85434 20.524 8.91634 20.6477 9.04034C20.7715 9.16434 20.8334 9.31794 20.8334 9.50115C20.8334 9.68435 20.7715 9.83762 20.6477 9.96098C20.524 10.0843 20.3706 10.146 20.1876 10.146H8.06594ZM8.06594 2.39601C7.88295 2.39601 7.72956 2.33401 7.60578 2.21001C7.48199 2.08601 7.4201 1.93241 7.4201 1.74921C7.4201 1.566 7.48199 1.41273 7.60578 1.28937C7.72956 1.16602 7.88295 1.10434 8.06594 1.10434H20.1876C20.3706 1.10434 20.524 1.16634 20.6477 1.29034C20.7715 1.41434 20.8334 1.56794 20.8334 1.75115C20.8334 1.93435 20.7715 2.08762 20.6477 2.21098C20.524 2.33433 20.3706 2.39601 20.1876 2.39601H8.06594ZM1.88079 18.9642C1.40933 18.9642 1.00579 18.7964 0.670175 18.4608C0.334557 18.125 0.166748 17.7214 0.166748 17.2502C0.166748 16.7789 0.334557 16.3754 0.670175 16.0396C1.00579 15.7039 1.40933 15.5361 1.88079 15.5361C2.35203 15.5361 2.75546 15.7039 3.09108 16.0396C3.4267 16.3754 3.59451 16.7789 3.59451 17.2502C3.59451 17.7214 3.4267 18.125 3.09108 18.4608C2.75546 18.7964 2.35203 18.9642 1.88079 18.9642ZM1.88079 11.2142C1.40933 11.2142 1.00579 11.0464 0.670175 10.7108C0.334557 10.375 0.166748 9.97142 0.166748 9.50018C0.166748 9.02893 0.334557 8.6254 0.670175 8.28956C1.00579 7.95394 1.40933 7.78613 1.88079 7.78613C2.35203 7.78613 2.75546 7.95394 3.09108 8.28956C3.4267 8.6254 3.59451 9.02893 3.59451 9.50018C3.59451 9.97142 3.4267 10.375 3.09108 10.7108C2.75546 11.0464 2.35203 11.2142 1.88079 11.2142ZM1.88079 3.46422C1.40933 3.46422 1.00579 3.29641 0.670175 2.96079C0.334557 2.62496 0.166748 2.22142 0.166748 1.75018C0.166748 1.27893 0.334557 0.875394 0.670175 0.539561C1.00579 0.203943 1.40933 0.0361328 1.88079 0.0361328C2.35203 0.0361328 2.75546 0.203943 3.09108 0.539561C3.4267 0.875394 3.59451 1.27893 3.59451 1.75018C3.59451 2.22142 3.4267 2.62496 3.09108 2.96079C2.75546 3.29641 2.35203 3.46422 1.88079 3.46422Z"
          fill="#999999"
        />
      </svg>

      {addButton ? (
        <div className="add-button-div">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.18996 9.0184L9.19013 15.8036C9.19002 15.9887 9.12097 16.1525 8.98299 16.2949C8.84501 16.4372 8.6791 16.5083 8.48528 16.5084C8.29146 16.5083 8.12556 16.4393 7.98757 16.3013C7.84959 16.1633 7.78054 15.9974 7.78043 15.8036L7.7806 9.0184L0.995417 9.01857C0.810288 9.01846 0.646503 8.94941 0.504062 8.81143C0.361843 8.67345 0.290678 8.50754 0.290567 8.31372C0.290678 8.1199 0.359725 7.954 0.497708 7.81601C0.635691 7.67803 0.801594 7.60898 0.995416 7.60887L7.7806 7.60904L7.78043 0.823856C7.78054 0.638728 7.84959 0.474943 7.98757 0.332501C8.12556 0.190283 8.29146 0.119118 8.48528 0.119006C8.6791 0.119118 8.84501 0.188165 8.98299 0.326148C9.12097 0.464131 9.19002 0.630034 9.19013 0.823856L9.18996 7.60904L15.9751 7.60887C16.1603 7.60898 16.3241 7.67803 16.4665 7.81601C16.6087 7.95399 16.6799 8.1199 16.68 8.31372C16.6799 8.50754 16.6108 8.67345 16.4729 8.81143C16.3349 8.94941 16.169 9.01846 15.9751 9.01857L9.18996 9.0184Z"
              fill="#999999"
              fill-opacity="0.6"
            />
          </svg>
        </div>
      ) : (<></>)}
    </div>
  );
};

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
  });

  return (
    <>
      <div style={{display: !topInfo ? "none" : ""}} className="draft-container">
        <div className="ContentTypeText">{ContentType}</div>        
      </div>
      <div className="control-group" style={{ border: "1px solid #E7E5E4" }}>
        <MenuBar editor={editor} addButton={ContentType != "About"} />
        <EditorContent className="editor-content" editor={editor} />
      </div>
    </>
  );
};

export default Draft;
