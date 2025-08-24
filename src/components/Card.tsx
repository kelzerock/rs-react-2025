import type { SchemaFormTypeForDb } from "../models/types/schemaFormForDb";

export const Card = ({ card }: { card: SchemaFormTypeForDb }) => {
  return (
    <div className="relative flex flex-col text-xs bg-stone-100 border-2 rounded-md border-stone-900 p-1 overflow-x-auto">
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
