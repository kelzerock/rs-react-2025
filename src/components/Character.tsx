import type { MainCharacter } from "../models/types/mainCharacter";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { memo } from "react";
import { Query } from "../models/enums/query";

export const Character = memo(function Character({
  character,
  setSearchParams,
  searchParams,
}: {
  character: MainCharacter;
  searchParams: URLSearchParams;
  setSearchParams: (data: URLSearchParams) => void;
}) {
  const { name, gender, alternateReality, bloodType, uid } = character;
  const updateQueryParams = (id: string) => {
    const page = searchParams.get(Query.PAGE);
    const params = new URLSearchParams();

    if (page) {
      params.set(Query.PAGE, page);
    }

    params.set(Query.DETAILS, id);

    setSearchParams(params);
  };
  return (
    <li
      className=" rounded-md p-2 bg-cyan-50 flex flex-col gap-0.5"
      onClick={() => updateQueryParams(uid)}
    >
      <span>
        Name: <strong>{name}</strong>
      </span>
      <div className="border bottom-1 rounded-md border-gray-600 p-1">
        <h2 className=" font-light text-sm">
          Addition information about character:
        </h2>
        <div className="flex items-center gap-1">
          <span>Gender: </span>
          <span>
            {gender ? (
              gender
            ) : (
              <CiNoWaitingSign
                className=" text-red-700"
                data-testid="gender-false"
              />
            )}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>Blood type: </span>
          <span>
            {bloodType ? (
              bloodType
            ) : (
              <CiNoWaitingSign className="text-red-700" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>Alternative reality:</span>
          <span>
            {alternateReality ? (
              <FaPlusCircle
                className=" text-emerald-700"
                data-testid="info-alternateReality-true"
              />
            ) : (
              <FaMinusCircle
                className=" text-red-700"
                data-testid="info-alternateReality-false"
              />
            )}
          </span>
        </div>
      </div>
    </li>
  );
});
