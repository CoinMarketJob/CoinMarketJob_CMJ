"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Draft.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface DraftProps {
  show?: boolean;
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
  onContentChange?: () => void; // Yeni eklenen prop
  border?: boolean;
  error?: boolean;
}

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [textSize, setTextSize] = useState<string>("Normal");
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) {
    return null
  }

  const changeSize = (newSize: string) => {
    setTextSize(newSize);
    setIsOpen(false);

    switch(newSize) {
      case "H2":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      default:
        editor.chain().focus().setParagraph().run();
        break;
    }
  }

  return (
    <div className="button-group">
      <div className="text-size-container">
        <span className="text-size-label">Text Size</span>
        <span className="text-size-value" onClick={() => setIsOpen(!isOpen)}>{textSize}</span>
        {isOpen && (
          <div className="text-size-dropdown">
            <div className="dropdown-item" onClick={() => changeSize("Normal")}>Normal</div>
            <div className="dropdown-item" onClick={() => changeSize("H2")}>H2</div>
          </div>
        )}
      </div>
      <div className="right-line"></div>
      <button
  onClick={() => editor.chain().focus().toggleBold().run()}
  style={{
    cursor: 'pointer',
    transition: 'color 0.3s',
    color: editor.isActive('bold') ? 'rgba(36, 34, 32, 0.8)' : '#999999'
  }}
  disabled={
    !editor.can().chain().focus().toggleBold().run()
  }
  className="bold-button-draft"
>
  B
</button>

<div className='svg-container-italic'>
  <svg width="14" height="21" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
    onClick={() => editor.chain().focus().toggleItalic().run()} 
    style={{
      marginRight: '21.38px',
      cursor: 'pointer',
      transition: 'color 0.3s',
      color: editor.isActive('italic') ? 'rgba(36, 34, 32, 0.8)' : '#999999'
    }}
    className="italic-button"
  >
    <path d="M0.662383 14C0.47692 14 0.320157 13.9394 0.192094 13.8183C0.0640314 13.6971 0 13.5489 0 13.3736C0 13.1982 0.0640314 13.0505 0.192094 12.9307C0.320157 12.8107 0.47692 12.7506 0.662383 12.7506H4.31633L8.45006 1.24936H4.79611C4.61065 1.24936 4.45389 1.18879 4.32583 1.06764C4.19776 0.946494 4.13373 0.798186 4.13373 0.62272C4.13373 0.44744 4.19776 0.299786 4.32583 0.17976C4.45389 0.0599195 4.61065 0 4.79611 0H13.3376C13.5231 0 13.6798 0.0605731 13.8079 0.18172C13.936 0.302866 14 0.45108 14 0.62636C14 0.801827 13.936 0.94948 13.8079 1.06932C13.6798 1.18935 13.5231 1.24936 13.3376 1.24936H9.82055L5.68681 12.7506H9.20388C9.38935 12.7506 9.54611 12.8112 9.67417 12.9324C9.80224 13.0535 9.86627 13.2018 9.86627 13.3773C9.86627 13.5526 9.80224 13.7002 9.67417 13.8202C9.54611 13.9401 9.38935 14 9.20388 14H0.662383Z" fill="currentColor"/>
  </svg>
</div>

<div className='svg-container-strike'>
  <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg" 
    onClick={() => editor.chain().focus().toggleStrike().run()} 
    style={{
      marginRight: '21.38px',
      cursor: 'pointer',
      transition: 'color 0.3s',
      color: editor.isActive('strike') ? 'rgba(36, 34, 32, 0.8)' : '#999999'
    }}
    className="strike-button"
  >
    <path d="M9.53125 4.27557C9.45549 3.60322 9.14299 3.08239 8.59375 2.71307C8.04451 2.33902 7.35322 2.15199 6.51989 2.15199C5.9233 2.15199 5.4072 2.24669 4.97159 2.43608C4.53598 2.62074 4.19744 2.87642 3.95597 3.20312C3.71922 3.52509 3.60085 3.89205 3.60085 4.30398C3.60085 4.64962 3.68134 4.94792 3.84233 5.19886C4.00805 5.44981 4.22349 5.66051 4.48864 5.83097C4.75852 5.99669 5.04735 6.13636 5.35511 6.25C5.66288 6.3589 5.95881 6.44886 6.2429 6.51989L7.66335 6.8892C8.12737 7.00284 8.60322 7.15672 9.09091 7.35085C9.5786 7.54498 10.0308 7.80066 10.4474 8.1179C10.8641 8.43513 11.2003 8.82812 11.456 9.29688C11.7164 9.76562 11.8466 10.3267 11.8466 10.9801C11.8466 11.804 11.6335 12.5355 11.2074 13.1747C10.786 13.8139 10.1728 14.3182 9.3679 14.6875C8.56771 15.0568 7.59943 15.2415 6.46307 15.2415C5.37405 15.2415 4.43182 15.0687 3.63636 14.723C2.84091 14.3774 2.21828 13.8873 1.76847 13.2528C1.31866 12.6136 1.07008 11.8561 1.02273 10.9801H3.22443C3.26705 11.5057 3.4375 11.9437 3.7358 12.294C4.03883 12.6397 4.42472 12.8977 4.89347 13.0682C5.36695 13.2339 5.88542 13.3168 6.44886 13.3168C7.06913 13.3168 7.62074 13.2197 8.10369 13.0256C8.59138 12.8267 8.97491 12.5521 9.25426 12.2017C9.53362 11.8466 9.6733 11.4323 9.6733 10.9588C9.6733 10.5279 9.55019 10.1752 9.30398 9.90057C9.0625 9.62595 8.73343 9.39867 8.31676 9.21875C7.90483 9.03883 7.43845 8.88021 6.91761 8.7429L5.19886 8.27415C4.03409 7.95691 3.1108 7.49053 2.42898 6.875C1.75189 6.25947 1.41335 5.44508 1.41335 4.43182C1.41335 3.59375 1.64063 2.86222 2.09517 2.23722C2.54972 1.61222 3.16525 1.12689 3.94176 0.78125C4.71828 0.430871 5.59422 0.255681 6.5696 0.255681C7.55445 0.255681 8.4233 0.428503 9.17614 0.774148C9.93371 1.11979 10.5303 1.59564 10.9659 2.2017C11.4015 2.80303 11.6288 3.49432 11.6477 4.27557H9.53125Z" fill="currentColor"/>
    <path d="M0 8.4517H12.8693V9.81534H0V8.4517Z" fill="currentColor" />
  </svg>
</div>

<div className='svg-container-list'>
  <svg width="17" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"
    onClick={() => editor.chain().focus().toggleBulletList().run()} 
    style={{
      cursor: 'pointer',
      transition: 'color 0.3s',
      color: editor.isActive('bulletList') ? 'rgba(36, 34, 32, 0.8)' : '#999999'
    }}
  >
    <path d="M8.06594 17.896C7.88295 17.896 7.72956 17.834 7.60578 17.71C7.48199 17.586 7.4201 17.4324 7.4201 17.2492C7.4201 17.066 7.48199 16.9127 7.60578 16.7894C7.72956 16.666 7.88295 16.6043 8.06594 16.6043H20.1876C20.3706 16.6043 20.524 16.6663 20.6477 16.7903C20.7715 16.9143 20.8334 17.0679 20.8334 17.2511C20.8334 17.4343 20.7715 17.5876 20.6477 17.711C20.524 17.8343 20.3706 17.896 20.1876 17.896H8.06594ZM8.06594 10.146C7.88295 10.146 7.72956 10.084 7.60578 9.96001C7.48199 9.83601 7.4201 9.68241 7.4201 9.49921C7.4201 9.31601 7.48199 9.16273 7.60578 9.03938C7.72956 8.91602 7.88295 8.85434 8.06594 8.85434H20.1876C20.3706 8.85434 20.524 8.91634 20.6477 9.04034C20.7715 9.16434 20.8334 9.31794 20.8334 9.50115C20.8334 9.68435 20.7715 9.83762 20.6477 9.96098C20.524 10.0843 20.3706 10.146 20.1876 10.146H8.06594ZM8.06594 2.39601C7.88295 2.39601 7.72956 2.33401 7.60578 2.21001C7.48199 2.08601 7.4201 1.93241 7.4201 1.74921C7.4201 1.566 7.48199 1.41273 7.60578 1.28937C7.72956 1.16602 7.88295 1.10434 8.06594 1.10434H20.1876C20.3706 1.10434 20.524 1.16634 20.6477 1.29034C20.7715 1.41434 20.8334 1.56794 20.8334 1.75115C20.8334 1.93435 20.7715 2.08762 20.6477 2.21098C20.524 2.33433 20.3706 2.39601 20.1876 2.39601H8.06594ZM1.88079 18.9642C1.40933 18.9642 1.00579 18.7964 0.670175 18.4608C0.334557 18.125 0.166748 17.7214 0.166748 17.2502C0.166748 16.7789 0.334557 16.3754 0.670175 16.0396C1.00579 15.7039 1.40933 15.5361 1.88079 15.5361C2.35203 15.5361 2.75546 15.7039 3.09108 16.0396C3.4267 16.3754 3.59451 16.7789 3.59451 17.2502C3.59451 17.7214 3.4267 18.125 3.09108 18.4608C2.75546 18.7964 2.35203 18.9642 1.88079 18.9642ZM1.88079 11.2142C1.40933 11.2142 1.00579 11.0464 0.670175 10.7108C0.334557 10.375 0.166748 9.97142 0.166748 9.50018C0.166748 9.02893 0.334557 8.6254 0.670175 8.28956C1.00579 7.95394 1.40933 7.78613 1.88079 7.78613C2.35203 7.78613 2.75546 7.95394 3.09108 8.28956C3.4267 8.6254 3.59451 9.02893 3.59451 9.50018C3.59451 9.97142 3.4267 10.375 3.09108 10.7108C2.75546 11.0464 2.35203 11.2142 1.88079 11.2142ZM1.88079 3.46422C1.40933 3.46422 1.00579 3.29641 0.670175 2.96079C0.334557 2.62496 0.166748 2.22142 0.166748 1.75018C0.166748 1.27893 0.334557 0.875394 0.670175 0.539561C1.00579 0.203943 1.40933 0.0361328 1.88079 0.0361328C2.35203 0.0361328 2.75546 0.203943 3.09108 0.539561C3.4267 0.875394 3.59451 1.27893 3.59451 1.75018C3.59451 2.22142 3.4267 2.62496 3.09108 2.96079C2.75546 3.29641 2.35203 3.46422 1.88079 3.46422Z" fill="currentColor"/>
  </svg>
</div>

    </div>
  )
}

const Draft: React.FC<DraftProps> = ({show, content, onChange, onContentChange, border, error}) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ /* Yapılandırma seçeneklerini buraya ekleyin, örneğin:  */}),
      TextStyle.configure({ /* Yapılandırma seçeneklerini buraya ekleyin, örneğin:  */}),
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
      if (onContentChange) {
        onContentChange();
      }
    },
    
    editable: !show
  }, [content])

  if (show) {
    return (      
      <div className="control-group">
        <EditorContent className="editor-content" editor={editor} />
      </div>
    );
  }

  return (
    <div className={`control-group ${error ? 'error-border' : ''}`} style={{border: border ? "none" : "1px solid #E7E5E4" }}>
      <MenuBar editor={editor} />
      <EditorContent className="editor-content" editor={editor} />
    </div>
  )
}
export default Draft;