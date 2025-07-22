import { LINK_TO_API } from "../constant/global-constant";
import { buildQueryString } from "./builderQueryParams";
import { Methods } from "../models/enums/methods";

type RequestAPI = {
  body?: { [key: string]: string };
  method: (typeof Methods)[keyof typeof Methods];
  queries?: { [key: string]: number | string | boolean };
  path?: string;
};

export const requestAPI = async ({
  body,
  method,
  queries,
  path = "",
}: RequestAPI) => {
  const queryString = queries ? buildQueryString(queries) : "";
  const resultQuery = queryString ? `?${queryString}` : "";
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  };

  // Только для методов, поддерживающих body
  if (method !== Methods.GET && body) {
    options.body = new URLSearchParams(body);
  }

  return await fetch(`${LINK_TO_API}${path}${resultQuery}`, options);
};
