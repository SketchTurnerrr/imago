"use client";
import { LikeDialog } from "./like-dialog";

interface PromptProps {
  id: string;
  question: string;
  answer: string;
  display: boolean;
  sender?: string;
  receiver?: string;
  type?: "like" | "discover" | "chat" | "single";
}

export function Prompt({
  id,
  answer,
  question,
  display,
  sender,
  receiver,
  type,
}: PromptProps) {
  async function editPrompt() {}

  if (!display) {
    return (
      <div className="relative flex flex-col rounded-lg border border-slate-100 p-4 text-sm font-bold shadow-sm">
        <p>{question}</p>
        <p className="mt-2 border-l border-gray-300 pl-2 text-gray-500">
          {answer}
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-4 rounded-lg bg-purple-50 px-4 py-16 dark:bg-secondary ">
      <p className="text-md font-semibold">{question}</p>
      <h2 className="text-3xl font-bold">{answer}</h2>
      {type !== "chat" && type !== "like" && (
        <LikeDialog
          itemId={id}
          type="prompt"
          sender={sender}
          receiver={receiver}
          question={question}
          answer={answer}
        />
      )}
    </div>
  );
}
