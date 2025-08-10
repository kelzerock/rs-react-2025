import { useEffect, useState, type JSX } from "react";
import { useSearchParams } from "react-router";
import { GridLoader } from "react-spinners";
import { Title } from "./helperComponent/Title";
import { CloseIcon } from "./helperComponent/CloseIcon";
import { Query } from "../models/enums/query";
import { useGetSingleCharacterQuery } from "../serviceAPI/stapiAPI";

export const CharacterInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const details = searchParams.get(Query.DETAILS);

  const { data, isFetching } = useGetSingleCharacterQuery(
    { params: details },
    { skip: details === null },
  );
  const handleClose = () => {
    if (searchParams.has(Query.DETAILS)) {
      searchParams.delete(Query.DETAILS);
      setSearchParams(searchParams);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (data?.character || isFetching) {
      setIsOpen(true);
    }
  }, [data, isFetching]);

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

  const openInfo = isFetching ? (
    <div
      className="w-full h-full flex justify-center items-center"
      role="status"
    >
      <GridLoader />
    </div>
  ) : (
    <div className="relative border-8 border-amber-50 rounded-2xl bg-amber-50 w-full">
      <div className="bg-amber-50 w-full p-3 rounded-2xl  max-h-[600px] overflow-y-scroll overflow-x-hidden  scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300">
        <h4 className=" font-bold text-2xl" data-testid="main-title">
          CharacterInfo
        </h4>
        {data && renderCharacterInfo(data.character)}
        <CloseIcon onClick={handleClose} />
      </div>
    </div>
  );

  return (
    <div className="xl:col-span-2 flex flex-col items-start h-full">
      <div className=" top-0 sticky flex flex-col items-start w-full ">
        {isOpen ? (
          openInfo
        ) : (
          <Title
            title="Select a character to view detailed information"
            test-id="title-without-data"
          />
        )}
      </div>
    </div>
  );
};
