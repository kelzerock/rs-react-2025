import { useMemo, useState, type JSX } from "react";
import { useSearchParams } from "react-router";
import { GridLoader } from "react-spinners";
import { RequestQuery } from "../models/enums/requestQuery";
import { Title } from "./helperComponent/Title";
import { CloseIcon } from "./helperComponent/CloseIcon";
import { Query } from "../models/enums/query";
import { useGetSingleCharacterQuery } from "../serviceAPI/stapiAPI";

export const CharacterInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(Query.PAGE);
  const details = searchParams.get(Query.DETAILS);

  const queries = useMemo(() => {
    const params = new URLSearchParams();
    if (details) params.set(RequestQuery.ID, details);
    return params;
  }, [page, details]);
  console.log({ queries });
  const { data, isLoading } = useGetSingleCharacterQuery({ params: queries });
  console.log({ data });
  const handleClose = () => {
    if (searchParams.has(Query.DETAILS)) {
      searchParams.delete(Query.DETAILS);
      setSearchParams(searchParams);
    }
    setIsOpen(false);
  };

  // useEffect(() => {
  //   if (details) {
  //     setIsOpen(true);
  //     const startFetch = async () => {
  //       const queries = new URLSearchParams();
  //       queries.set(RequestQuery.ID, details);
  //       const response = await requestAPI({
  //         method: Methods.GET,
  //         queries,
  //       });
  //       if (!response.ok) {
  //         setInfoAboutCharacter(null);
  //         setIsOpen(false);
  //         return;
  //       }

  //       const data = await response.json();
  //       setInfoAboutCharacter(data.character);
  //     };

  //     startFetch();
  //   } else {
  //     setIsOpen(false);
  //     setInfoAboutCharacter(null);
  //   }
  // }, [details]);

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
    <div
      className="w-full h-full flex justify-center items-center"
      role="status"
    >
      <GridLoader className="" />
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
