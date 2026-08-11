import researchData from "../content/research.json";
import siteData from "../content/site.json";
import writingData from "../content/writings.generated.json";

export type ProfileLink = {
  label: string;
  url: string;
};

export type SiteContent = {
  name: string;
  eyebrow: string;
  headline: string;
  bio: string[];
  photo: string;
  photoAlt: string;
  email: string;
  links: ProfileLink[];
};

export type ResearchLink = {
  label: string;
  url: string;
  comingSoon: boolean;
  tooltip: string;
};

export type ResearchItem = {
  title: string;
  date: string;
  sortDate: string;
  affiliation: string;
  kind: "Paper" | "Project" | "Talk" | "Dataset" | "Other";
  summary: string;
  pdf: string;
  pdfLabel: string;
  fileSize: string;
  links: ResearchLink[];
  tags: string[];
};

export type WritingType = "blog-post" | "short-fiction" | "quick-take";

export type WritingItem = {
  slug: string;
  title: string;
  date: string;
  type: WritingType;
  excerpt: string;
  body: string;
  url: string;
  linkLabel: string;
  tags: string[];
};

type UnknownRecord = Record<string, unknown>;

const researchKinds = new Set<ResearchItem["kind"]>([
  "Paper",
  "Project",
  "Talk",
  "Dataset",
  "Other",
]);
const writingTypes = new Set<WritingType>([
  "blog-post",
  "short-fiction",
  "quick-take",
]);

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => asString(item)).filter(Boolean)
    : [];
}

function asLinkArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const record = asRecord(item);
      return {
        label: asString(record.label),
        url: asString(record.url),
        comingSoon: record.comingSoon === true,
        tooltip: asString(record.tooltip),
      };
    })
    .filter((link) => link.label && (link.url || link.comingSoon));
}

const rawSite = asRecord(siteData);

export const site: SiteContent = {
  name: asString(rawSite.name, "Peyton Jackson"),
  eyebrow: asString(rawSite.eyebrow),
  headline: asString(rawSite.headline, "Peyton Jackson"),
  bio: asStringArray(rawSite.bio),
  photo: asString(rawSite.photo),
  photoAlt: asString(rawSite.photoAlt, "Portrait of Peyton Jackson"),
  email: asString(rawSite.email),
  links: asLinkArray(rawSite.links),
};

export const researchItems: ResearchItem[] = (
  Array.isArray(researchData) ? researchData : []
)
  .map((item) => {
    const record = asRecord(item);
    const kind = asString(record.kind, "Other") as ResearchItem["kind"];

    return {
      published: record.published === true,
      title: asString(record.title, "Untitled project"),
      date: asString(record.date, asString(record.year, "Undated")),
      sortDate: asString(record.sortDate, asString(record.year)),
      affiliation: asString(record.affiliation),
      kind: researchKinds.has(kind) ? kind : "Other",
      summary: asString(record.summary),
      pdf: asString(record.pdf),
      pdfLabel: asString(record.pdfLabel, "PDF"),
      fileSize: asString(record.fileSize),
      links: asLinkArray(record.links),
      tags: asStringArray(record.tags),
    };
  })
  .filter((item) => item.published)
  .map(
    (item): ResearchItem => ({
      title: item.title,
      date: item.date,
      sortDate: item.sortDate,
      affiliation: item.affiliation,
      kind: item.kind,
      summary: item.summary,
      pdf: item.pdf,
      pdfLabel: item.pdfLabel,
      fileSize: item.fileSize,
      links: item.links,
      tags: item.tags,
    }),
  )
  .sort((a, b) => b.sortDate.localeCompare(a.sortDate));

export const writings: WritingItem[] = (
  Array.isArray(writingData) ? writingData : []
)
  .map((item) => {
    const record = asRecord(item);
    const type = asString(record.type, "blog-post") as WritingType;

    return {
      published: record.published === true,
      slug: asString(record.slug),
      title: asString(record.title, "Untitled"),
      date: asString(record.date),
      type: writingTypes.has(type) ? type : "blog-post",
      excerpt: asString(record.excerpt),
      body: asString(record.body),
      url: asString(record.url),
      linkLabel: asString(record.linkLabel),
      tags: asStringArray(record.tags),
    };
  })
  .filter((item) => item.published && item.slug)
  .map(
    (item): WritingItem => ({
      slug: item.slug,
      title: item.title,
      date: item.date,
      type: item.type,
      excerpt: item.excerpt,
      body: item.body,
      url: item.url,
      linkLabel: item.linkLabel,
      tags: item.tags,
    }),
  )
  .sort((a, b) => b.date.localeCompare(a.date));

export const writingTypeLabels: Record<WritingType, string> = {
  "blog-post": "Blog post",
  "short-fiction": "Short fiction",
  "quick-take": "Quick take",
};

export function withBasePath(path: string) {
  if (!path || /^(?:https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${normalizedPath}`;
}
