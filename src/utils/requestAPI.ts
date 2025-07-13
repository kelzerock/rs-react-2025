import { LINK_TO_API } from "../constant/global-constant";

export const requestAPI = async (name: string) => {
  return await fetch(LINK_TO_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      name,
    }),
  });
};
