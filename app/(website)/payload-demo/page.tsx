import { getPayload } from "payload";
import config from "@/payload.config";
import type { Media } from "@/payload-types";

export const dynamic = "force-dynamic";

export default async function PayloadDemoPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "showcase",
    depth: 2,
    limit: 10,
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Payload CMS Demo</h1>
      <p className="text-muted-foreground mb-10">
        Content below is fetched server-side from a Payload CMS instance
        (Postgres + S3-backed media) via Payload&apos;s Local API.
      </p>

      {docs.length === 0 && (
        <p>
          No showcase entries yet — add one at <code>/studio</code>.
        </p>
      )}

      <div className="space-y-12">
        {docs.map((item) => {
          const cover: Media | null =
            typeof item.coverImage === "object" ? item.coverImage : null;
          const video: Media | null =
            typeof item.video === "object" ? item.video : null;

          return (
            <article key={item.id} className="space-y-4">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              {cover?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover.url}
                  alt={cover.alt ?? item.title}
                  className="w-full rounded-lg"
                />
              )}
              {video?.url && (
                <video src={video.url} controls className="w-full rounded-lg" />
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
