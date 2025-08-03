import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { memo } from "react";
import { FaRegStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/appHook";
import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";
import { FaStar } from "react-icons/fa6";
import { toggleItem } from "../store/itemsSlice";

export const Character = memo(function Character({
  character,
  onClick,
}: {
  character: z.infer<typeof CharacterBaseZ>;
  onClick: (id: string) => void;
}) {
  const { name, gender, alternateReality, bloodType, uid } = character;
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items);
  const isFavorite = items.some((item) => item.uid === character.uid);

  return (
    <li
      className=" rounded-md p-2 bg-stone-200 flex flex-col gap-0.5 hover:cursor-pointer"
      data-testid="wrapper"
    >
      <span data-testid="name">
        Name: <strong>{name}</strong>
      </span>
      <div className="flex gap-2 items-center h-10">
        <button
          className="bg-blue-500 p-2 rounded-md h-full hover:cursor-pointer hover:bg-blue-800 transition-colors duration-300"
          onClick={() => {
            dispatch(toggleItem(character));
          }}
        >
          {isFavorite ? <FaStar color="yellow" /> : <FaRegStar />}
        </button>
        <button
          data-testid="btn-more-info"
          onClick={() => onClick(uid)}
          className=" h-full bg-blue-500 font-semibold p-2 rounded-md hover:cursor-pointer hover:bg-blue-800 hover:text-blue-50 transition-colors duration-300"
        >
          More info
        </button>
      </div>
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
