import type { Metadata } from "next";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import config from "../../../../payload.config";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });

const Page = ({ params, searchParams }: Args) =>
  RootPage({
    config,
    params,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
    importMap,
  });

export default Page;
