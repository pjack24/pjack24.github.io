"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type WritingItem,
  type WritingType,
  withBasePath,
  writingTypeLabels,
} from "../content";

type Filter = "all" | WritingType;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "blog-post", label: "Blog posts" },
  { value: "short-fiction", label: "Short fiction" },
  { value: "quick-take", label: "Quick takes" },
];

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value || "Undated";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function WritingCollection({ items }: { items: WritingItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);
  const selectedLabel =
    filters.find((item) => item.value === filter)?.label ?? "writing";

  return (
    <section aria-label="Published writing">
      <div className="writing-toolbar">
        <span className="sr-only" id="writing-filter-label">
          Filter writing by type
        </span>
        <div
          className="filter-row"
          role="group"
          aria-labelledby="writing-filter-label"
        >
          {filters.map((item) => (
            <button
              type="button"
              key={item.value}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="result-count">
          {filteredItems.length} {selectedLabel.toLowerCase()} {filteredItems.length === 1 ? "piece" : "pieces"} shown
        </p>
      </div>

      {filteredItems.length === 0 ? (
        <p className="filter-empty">
          No {selectedLabel.toLowerCase()} published yet — check back soon.
        </p>
      ) : (
        <div className="writing-list">
          {filteredItems.map((item, itemIndex) => (
            <article className="writing-card" id={item.slug} key={item.slug}>
              <div className="item-number" aria-hidden="true">
                {String(itemIndex + 1).padStart(2, "0")}
              </div>
              <div className="writing-card-body">
                <div className="item-meta">
                  <span>{writingTypeLabels[item.type]}</span>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <h2>{item.title}</h2>
                {item.excerpt && <p>{item.excerpt}</p>}
                {item.tags.length > 0 && (
                  <div className="tag-row" aria-label="Topics">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
                {item.url ? (
                  <a
                    className="text-link"
                    href={withBasePath(item.url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.linkLabel || `Read ${item.title}`} {" "}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : item.body ? (
                  <Link className="text-link" href={`/writings/${item.slug}/`}>
                    Read {item.title} <span aria-hidden="true">↗</span>
                  </Link>
                ) : (
                  <p className="item-in-progress">In progress — check back soon.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
