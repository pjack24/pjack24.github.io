import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const sourceDirectory = path.resolve("content/writings");
const outputPath = path.resolve("content/writings.generated.json");
const editableJsonFiles = [
  path.resolve("content/site.json"),
  path.resolve("content/research.json"),
];

for (const jsonPath of editableJsonFiles) {
  const source = await readFile(jsonPath, "utf8");

  try {
    JSON.parse(source);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Invalid JSON in ${path.relative(process.cwd(), jsonPath)}: ${detail}`,
    );
  }
}

await mkdir(sourceDirectory, { recursive: true });

const files = (await readdir(sourceDirectory))
  .filter((file) => file.endsWith(".md"))
  .sort();

const writings = [];
const slugSources = new Map();

for (const file of files) {
  const source = await readFile(path.join(sourceDirectory, file), "utf8");
  const { data, content } = matter(source);
  const slug = String(data.slug ?? path.basename(file, ".md"))
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    throw new Error(
      `Writing ${path.relative(process.cwd(), path.join(sourceDirectory, file))} has an empty slug. Rename the file or add a slug in its front matter.`,
    );
  }

  const previousFile = slugSources.get(slug);
  if (previousFile) {
    throw new Error(
      `Duplicate writing slug "${slug}" in content/writings/${previousFile} and content/writings/${file}. Rename one file or give it a unique slug.`,
    );
  }
  slugSources.set(slug, file);

  writings.push({
    slug,
    title: String(data.title ?? "Untitled").trim(),
    date: String(data.date ?? "").trim(),
    type: String(data.type ?? "blog-post").trim(),
    excerpt: String(data.excerpt ?? "").trim(),
    published: data.published === true,
    tags: Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    body: content.trim(),
    url: String(data.url ?? "").trim(),
    linkLabel: String(data.linkLabel ?? "").trim(),
  });
}

await writeFile(outputPath, `${JSON.stringify(writings, null, 2)}\n`, "utf8");

console.log(`Prepared ${writings.length} writing file${writings.length === 1 ? "" : "s"}.`);
