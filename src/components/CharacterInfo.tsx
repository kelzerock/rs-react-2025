import { useEffect, useState, type JSX } from "react";
import { useSearchParams } from "react-router";
import { requestAPI } from "../utils/requestAPI";
import { Methods } from "../models/enums/methods";
import { GridLoader } from "react-spinners";

export const CharacterInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [infoAboutCharacter, setInfoAboutCharacter] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get("details");

  const handleClose = () => {
    if (searchParams.has("details")) {
      searchParams.delete("details");
      setSearchParams(searchParams);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (details) {
      setIsOpen(true);
      const startFetch = async () => {
        const response = await requestAPI({
          method: Methods.GET,
          queries: { uid: details },
        });
        setIsLoading(false);
        if (!response.ok) return;

        const data = await response.json();
        setInfoAboutCharacter(data.character);
      };
      setIsLoading(true);

      startFetch();
    }
  }, [details]);

  const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  const renderCharacterInfo = (
    obj: Record<string, unknown>,
    depth = 0,
  ): JSX.Element[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const marginStyle = { marginLeft: `${depth * 12}px` };

      if (Array.isArray(value)) {
        if (value.length === 0) return <p key={key}>{key}: none</p>;
        return (
          <div key={key} style={marginStyle}>
            <strong>{key}:</strong>
            <ul style={marginStyle}>
              {value.map((item, index) => (
                <li key={index}>
                  {isObjectRecord(item)
                    ? renderCharacterInfo(item, depth + 1)
                    : String(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      if (isObjectRecord(value)) {
        return (
          <div key={key} style={marginStyle}>
            <strong>{key}:</strong>
            {renderCharacterInfo(value, depth + 1)}
          </div>
        );
      }

      return (
        <p key={key} style={marginStyle}>
          {`${key} : ${value ?? "none"}`}
        </p>
      );
    });
  };

  const openInfo = isLoading ? (
    <GridLoader className=" mt-20 mx-auto" />
  ) : (
    <div className="bg-amber-50 w-full p-3 rounded-2xl relative">
      <h4 className=" font-bold text-2xl">CharacterInfo</h4>
      {infoAboutCharacter &&
        infoAboutCharacter !== null &&
        typeof infoAboutCharacter === "object" &&
        renderCharacterInfo(infoAboutCharacter)}
      <div
        onClick={handleClose}
        className=" absolute top-1 right-1 uppercase font-extrabold border-4 rounded-full h-[30px] w-[30px] flex justify-center items-center bg-amber-600 hover:bg-amber-900 hover:cursor-pointer"
      >
        x
      </div>
    </div>
  );

  return (
    <div className="basis-1/2  sm:basis-1/3 sticky top-0 flex flex-col items-start">
      {isOpen ? (
        openInfo
      ) : (
        <h3>Select a character to view detailed information</h3>
      )}
    </div>
  );
};
