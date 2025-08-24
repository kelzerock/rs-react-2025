import { useEffect, useState } from "react";
import type { SchemaFormTypeForDb } from "../models/types/schemaFormForDb";

export const Card = ({ card }: { card: SchemaFormTypeForDb }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (card.id) {
      const cardTime = parseInt(card.id);
      const currentTime = Date.now();
      const timeDiff = currentTime - cardTime;

      if (timeDiff < 10000) {
        setIsNew(true);

        const timer = setTimeout(() => {
          setIsNew(false);
        }, 10000 - timeDiff);

        return () => clearTimeout(timer);
      }
    }
  }, [card.id]);

  return (
    <div
      className={`relative flex flex-col text-xs border-2 rounded-md p-1 overflow-x-auto transition-all duration-500 ${
        isNew
          ? "bg-yellow-100 border-yellow-400 shadow-lg"
          : "bg-stone-100 border-stone-900"
      }`}
    >
      {isNew && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          NEW!
        </div>
      )}
      <img
        src={card.picture}
        alt="avatar"
        className="w-[50px] aspect-square object-cover rounded-2xl"
      />
      <span className="">Name: {card.name}</span>
      <span>Age: {card.age}</span>
      <span>Password: {card.password}</span>
      <span>Email: {card.email}</span>
      <span>Gender: {card.gender}</span>
      <span>Country: {card.country}</span>
      <span>T&C: {card.acceptTerms ? "agree" : "disagree"}</span>
    </div>
  );
};
