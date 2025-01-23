import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import "@repo/ui/globals.css";

export const { GET } = createFromSource(source);
