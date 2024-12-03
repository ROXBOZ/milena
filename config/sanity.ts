import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-10-21",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
});
