import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function GlobalNotFound() {
  const t = await getTranslations("Error");
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            {t("button")}
          </Link>
        </div>
      </body>
    </html>
  );
}
