import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { requestAPI } from "../utils/requestAPI";
import { Methods } from "../models/enums/methods";

export const CharacterInfo = () => {
  const [infoAboutCharacter, setInfoAboutCharacter] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const details = searchParams.get("details");
  // if (newDetails !== details && newDetails) setDetails(newDetails);

  console.log("Details:", details);

  useEffect(() => {
    const startFetch = async () => {
      if (details) {
        const response = await requestAPI({
          method: Methods.GET,
          queries: { uid: details },
        });
        console.log({ response });
        if (!response.ok) return;

        const data = await response.json();
        setInfoAboutCharacter(data.character);
        console.log({ data_info: data.character });
      }
    };

    startFetch();
  }, [details]);

  return (
    <div className="basis-1/2  sm:basis-1/3 sticky top-0 flex flex-col items-start">
      CharacterInfo
      {infoAboutCharacter &&
        Object.entries(infoAboutCharacter).map(([key, value]) => (
          <p key={key}>
            {typeof value !== "object"
              ? `${key} : ${value ? value : "none"}`
              : ""}
          </p>
        ))}
    </div>
  );
};
