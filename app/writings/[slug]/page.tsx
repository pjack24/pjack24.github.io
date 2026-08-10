import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  type WritingItem,
  withBasePath,
  writings,
  writingTypeLabels,
} from "../../content";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = writings
    .filter((item) => item.body && !item.url)
    .map((item) => ({ slug: item.slug }));

  // Next's static exporter requires at least one known parameter. This hidden
  // not-found path keeps an empty new site exportable until the first piece is
  // published.
  return params.length > 0 ? params : [{ slug: "in-progress" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = writings.find((writing) => writing.slug === slug);

  return item
    ? { title: item.title, description: item.excerpt }
    : { title: "Writing not found" };
}

function formatDate(item: WritingItem) {
  const date = new Date(`${item.date}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return item.date || "Undated";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = writings.find(
    (writing) => writing.slug === slug && writing.body && !writing.url,
  );

  if (!item) notFound();

  return (
    <main
      className="page-shell writing-detail"
      id="main-content"
      data-page="writings"
    >
      <Link className="back-link" href="/writings/">
        <span aria-hidden="true">←</span> All writing
      </Link>
      <article>
        <header className="writing-detail-header">
          <p className="eyebrow">{writingTypeLabels[item.type]}</p>
          <h1>{item.title}</h1>
          <div className="writing-detail-meta">
            <time dateTime={item.date}>{formatDate(item)}</time>
            {item.tags.length > 0 && (
              <div className="tag-row" aria-label="Topics">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="prose">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={withBasePath(href ?? "")}>{children}</a>
              ),
              img: ({ src, alt }) => (
                // Markdown image dimensions are not known at build time.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={typeof src === "string" ? withBasePath(src) : undefined}
                  alt={alt ?? ""}
                />
              ),
            }}
          >
            {item.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
