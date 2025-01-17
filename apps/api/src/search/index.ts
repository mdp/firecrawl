import { SearchResult } from "../../src/lib/entities";
import { google_search } from "./googlesearch";
import { serper_search } from "./serper";

export async function search({
  query,
  advanced = false,
  num_results = 7,
  tbs = null,
  filter = null,
  lang = "en",
  proxy = null,
  sleep_interval = 0,
  timeout = 5000,
}: {
  query: string;
  advanced?: boolean;
  num_results?: number;
  tbs?: string;
  filter?: string;
  lang?: string;
  proxy?: string;
  sleep_interval?: number;
  timeout?: number;
}) : Promise<SearchResult[]> {
  try {
    if (process.env.SERPER_API_KEY && !tbs) {
      return await serper_search(query, num_results);
    }
    return await google_search(
      query,
      advanced,
      num_results,
      tbs,
      filter,
      lang,
      proxy,
      sleep_interval,
      timeout
    );
  } catch (error) {
    console.error("Error in search function: ", error);
    return []
  }
  // if process.env.SERPER_API_KEY is set, use serper
}
