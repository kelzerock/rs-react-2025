import type { SchemaFormTypeForDb } from "../models/types/schemaFormForDb";
import { Card } from "./Card";

export const CardList = ({ list }: { list: SchemaFormTypeForDb[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 overflow-hidden break-all auto-rows-[200px]">
      {list.map((item) => (
        <Card card={item} key={item.id || item.picture + item.name} />
      ))}
    </div>
  );
};
