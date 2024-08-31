"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { JobQuestions } from "@prisma/client";
import styles from "./QuestionDraft.module.css";

interface DraftProps {
  question: JobQuestions;
  onAnswerChange: (questionId: number, answer: string) => void;
}

const QuestionDraft: React.FC<DraftProps> = ({ question, onAnswerChange }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    onAnswerChange(question.id, newAnswer);
  };

  return (
    <div
      className={styles.controlgroup}
      style={{ border: "1px solid #E7E5E4" }}
    >
      <div className={styles.questionarea}>{question.question}</div>
      <div className={styles.answerarea}>
        <textarea
          className={styles.answerbox}
          value={answer}
          onChange={handleAnswerChange}
        ></textarea>
      </div>
    </div>
  );
};

export default QuestionDraft;
