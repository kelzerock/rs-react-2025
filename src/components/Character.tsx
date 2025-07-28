import type { MainCharacter } from "../models/types/mainCharacter";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { memo } from "react";

export const Character = memo(function Character({
  character,
  onClick,
}: {
  character: MainCharacter;
  onClick: (id: string) => void;
}) {
  const { name, gender, alternateReality, bloodType, uid } = character;

  return (
    <li
      className=" rounded-md p-2 bg-stone-200 flex flex-col gap-0.5 hover:cursor-pointer"
      onClick={() => onClick(uid)}
      data-testid="wrapper"
    >
      <span data-testid="name">
        Name: <strong>{name}</strong>
      </span>
      <div
        className="border bottom-1 rounded-md border-gray-600 p-1"
        data-testid="addition-info"
      >
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
