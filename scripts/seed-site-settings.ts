process.loadEnvFile(".env");

import { getPayload } from "payload";

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      heroVideoUrl:
        "https://res.cloudinary.com/davx3yyob/video/upload/v1760238501/Portfolio_Video_t0y4tc_ykkaej.mp4",
    },
  });

  console.log("Seeded site-settings.heroVideoUrl");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed site settings:", error);
  process.exit(1);
});
