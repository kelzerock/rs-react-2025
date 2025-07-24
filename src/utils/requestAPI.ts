import { LINK_TO_API } from "../constant/global-constant";
import { Methods } from "../models/enums/methods";

type RequestAPI = {
  body?: { [key: string]: string };
  method: (typeof Methods)[keyof typeof Methods];
  queries?: URLSearchParams | null;
  path?: string;
};

export const requestAPI = async ({
  body,
  method,
  queries,
  path = "",
}: RequestAPI) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  };

  if (method !== Methods.GET && body) {
    options.body = new URLSearchParams(body);
  }

  return await fetch(
    `${LINK_TO_API}${path}${queries ? `?${queries}` : ""}`,
    options,
  );
};
