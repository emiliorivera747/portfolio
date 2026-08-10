// payload.config.ts reads process.env at module-evaluation time, and ESM
// import statements are hoisted above other top-level code — so the env
// file must be loaded before payload.config is imported, via a dynamic
// import inside seed() rather than a static top-level import.
process.loadEnvFile(".env");

// The pooled connection on :5432 is Supavisor session mode, capped at 15
// concurrent sessions on this project — the schema-push introspection that
// runs on Payload init blows through that once there are this many tables.
// Route this one-off script through the transaction-mode pooler on :6543
// instead, which multiplexes far more clients onto the same backend
// connections (fine here since introspection is just plain selects, no
// session state like temp tables or prepared statements across calls).
if (process.env.DATABASE_URL?.includes("pooler.supabase.com:5432")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
    "pooler.supabase.com:5432",
    "pooler.supabase.com:6543"
  );
}

import { getPayload } from "payload";

// Minimal builders for Payload's Lexical rich-text shape. The about page's
// copy is full of inline <strong>/<i> runs and one link, and hand-writing the
// node JSON for each of those is unreadable — these keep the content below
// looking like the prose it came from.
const BOLD = 1;
const ITALIC = 2;

const text = (value: string, format = 0) => ({
  type: "text",
  text: value,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const bold = (value: string) => text(value, BOLD);
const boldItalic = (value: string) => text(value, BOLD | ITALIC);
const italic = (value: string) => text(value, ITALIC);

const link = (url: string, label: string) => ({
  type: "link",
  fields: { linkType: "custom", url, newTab: false },
  format: "",
  indent: 0,
  direction: "ltr",
  version: 3,
  children: [text(label)],
});

const paragraph = (children: unknown[]) => ({
  type: "paragraph",
  format: "",
  indent: 0,
  direction: "ltr",
  textFormat: 0,
  version: 1,
  children,
});

// `any` because the generated AboutPage type wants the full
// DefaultTypedEditorState union, which these hand-built nodes satisfy
// structurally but not nominally.
const richText = (...paragraphs: unknown[]): any => ({
  root: {
    type: "root",
    format: "",
    indent: 0,
    direction: "ltr",
    version: 1,
    children: paragraphs,
  },
});

const CLOUDINARY = "https://res.cloudinary.com/dcss55nem/image/upload";

// Every image here already lives in Cloudinary and is referenced by URL, the
// same way project card images are — see the note on `cardImage` in
// payload.config.ts. Switch any of these to Upload mode in the admin to
// manage them through the Media collection instead.
const about = {
  hero: {
    title: "About Me.",
    alt: "Milky Way galaxy captured by the Artemis II crew",
    imageSource: "url" as const,
    imageUrl: `${CLOUDINARY}/v1776990294/Untitled_design_11_apepib.png`,
    // No caption. The field is still there — set one in the admin under
    // About Page > Hero Banner > Caption if a photo credit is ever needed.
    caption: null,
  },
  sections: [
    {
      heading: "My Journey",
      imagePosition: "right" as const,
      imageSource: "url" as const,
      imageUrl: `${CLOUDINARY}/v1701486445/20221216_115051_ezqxrn.jpg`,
      imageAlt: "Virginia Tech Graduation",
      imageCaption: richText(
        paragraph([text("Virginia Tech Graduation Ceremony December 2022")])
      ),
      body: richText(
        paragraph([
          text(
            "The idea of inventing something new that could impact our world, whether big or small, has always excited me. While there were many fields I could have gone into to fulfill my desire to create—such as "
          ),
          bold("Aerospace Engineering"),
          text(", "),
          bold("Mechanical Engineering"),
          text(", and "),
          bold("Computer Science"),
          text(
            "—I ended up choosing the latter because of the profound impact it has on our everyday lives."
          ),
        ]),
        paragraph([
          text("I earned my bachelor's degree in Computer Science from "),
          bold("Virginia Tech"),
          text(
            " in December 2022. Since then, I've freelanced to sharpen my front-end and back-end skills while exploring modern frameworks and tools like "
          ),
          boldItalic("React.js"),
          text(", "),
          boldItalic("Node.js"),
          text(", "),
          boldItalic("FastAPI"),
          text(", "),
          boldItalic("Next.js"),
          text(", and "),
          boldItalic("AWS"),
          text(" to expand my technical toolbox."),
        ])
      ),
    },
    {
      heading: "Hobbies",
      imagePosition: "left" as const,
      imageSource: "url" as const,
      imageUrl: `${CLOUDINARY}/v1701747663/IMG_2215_kypj32.jpg`,
      imageAlt: "Intramural Soccer at Virginia Tech Fall 2022",
      imageCaption: richText(
        paragraph([text("Intramural "), bold("Soccer"), text(" at Virginia Tech")])
      ),
      body: richText(
        paragraph([
          text("In my free time, I enjoy playing"),
          bold(" soccer"),
          text(", practicing"),
          bold(" public speaking"),
          text(", and"),
          bold(" volunteering "),
          text("in my community."),
        ])
      ),
      quoteAfter: richText(
        paragraph([
          text(
            '"Everyone has a story, an idea, or message to share with the world and there is no one better than for you to share it through '
          ),
          bold("Public Speaking"),
          text('"'),
        ])
      ),
    },
    {
      heading: "Public Speaking",
      imagePosition: "right" as const,
      imageSource: "url" as const,
      imageUrl: `${CLOUDINARY}/v1758821016/Screenshot_2025-09-25_at_10.22.39_AM_yse58q.png`,
      imageAlt: "Toastmasters Open House 2025",
      imageCaption: richText(paragraph([text("Toastmasters Open House 2025")])),
      body: richText(
        paragraph([
          text("Fall 2024, I got the privilege to represent "),
          link(
            "https://www.toastmasters.org/Find-a-Club/00003572-saratoga-toastmasters-club",
            "Saratoga Toastmasters"
          ),
          text(
            " at the Divison level speech contest and was awarded 2nd place."
          ),
        ])
      ),
    },
  ],
};

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "about-page",
    data: about as any,
  });

  const saved = await payload.findGlobal({ slug: "about-page" });
  console.log(
    `Seeded about-page: hero "${saved.hero?.title}", ${saved.sections?.length ?? 0} sections`
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
