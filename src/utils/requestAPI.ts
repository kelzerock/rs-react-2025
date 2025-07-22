import { ELEMENTS_PER_PAGE, LINK_TO_API } from "../constant/global-constant";

export const requestAPI = async (name: string) => {
  return await fetch(`${LINK_TO_API}?pageSize=${ELEMENTS_PER_PAGE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      name,
    }),
  });
};
