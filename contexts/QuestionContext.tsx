import React, { createContext, useContext, useState } from "react";

type Question = {
  id: number;
  text: string;
  keywordList: string[];
};

type QuestionContextType = {
  questions: Question[];
  addQuestion: (question: Question) => void;
  removeQuestion: (id: number) => void;
  getQuestionListSize: () => number;
};

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const removeQuestion = (id: number) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  const getQuestionListSize = () => {
    return questions.length;
  }

  return (
    <QuestionContext.Provider value={{ questions, addQuestion, removeQuestion, getQuestionListSize}}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return context;
}
