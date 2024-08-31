"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./QuestionDraft.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { JobQuestions } from "@prisma/client";

interface DraftProps {
  question: JobQuestions;
}

const QuestionDraft: React.FC<DraftProps> = ({ question }) => {
  return (
    <div className="control-group" style={{ border: "1px solid #E7E5E4" }}>
      <div className="question-area">{question.question}</div>
      <div className="answer-area"><textarea></textarea></div>
    </div>
  );
};

export default QuestionDraft;
