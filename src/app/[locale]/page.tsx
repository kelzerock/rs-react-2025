import { LINK_TO_API } from "@/constant/global-constant";
import { HomePage } from "@/page/homePage/HomePage";

export default async function LocaleHomePage() {
  const response = await fetch(`${LINK_TO_API}/search?pageSize=9`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({ name: "" }),
  });

  if (response.ok) {
    await response.json();
  }
  return <HomePage />;
}
