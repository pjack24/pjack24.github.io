import type { Metadata } from "next";
import { EmptyState } from "../components/EmptyState";
import { researchItems, withBasePath } from "../content";

export const metadata: Metadata = {
  title: "Research & Projects",
  description: "Research papers, projects, talks, datasets, and useful artifacts.",
};

export default function ResearchPage() {
  return (
    <main
      className="page-shell inner-page"
      id="main-content"
      data-page="research"
    >
      <header className="page-intro">
        <h1>Research &amp; Projects</h1>
      </header>

      {researchItems.length === 0 ? (
        <EmptyState title="In progress — check back soon." />
      ) : (
        <section
          className="research-grid"
          aria-label="Research and projects, newest first"
        >
          {researchItems.map((item) => (
            <article
              className="research-card"
              key={`${item.title}-${item.sortDate}`}
            >
              <div className="research-card-body">
                <div className="item-meta">
                  <time dateTime={item.sortDate}>{item.date}</time>
                  {item.affiliation && (
                    <span className="item-affiliation">{item.affiliation}</span>
                  )}
                </div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                {item.tags.length > 0 && (
                  <div className="tag-row" aria-label="Topics">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
                <div className="item-links">
                  {item.pdf && (
                    <a
                      href={withBasePath(item.pdf)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.pdfLabel}
                      {item.fileSize ? ` · ${item.fileSize}` : ""}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {item.links.map((link) =>
                    link.comingSoon ? (() => {
                      const tooltip = link.tooltip || "Coming soon";

                      return (
                        <span
                          className="coming-soon-link"
                          key={link.label}
                          tabIndex={0}
                          aria-label={`${link.label} — ${tooltip}`}
                        >
                          <span aria-hidden="true">{link.label}</span>
                          <span className="coming-soon-tooltip" role="tooltip">
                            {tooltip}
                          </span>
                        </span>
                      );
                    })() : (
                      <a
                        href={withBasePath(link.url)}
                        key={link.label}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
