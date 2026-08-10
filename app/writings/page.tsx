import type { Metadata } from "next";
import { EmptyState } from "../components/EmptyState";
import { writings } from "../content";
import { WritingCollection } from "./writing-collection";

export const metadata: Metadata = {
  title: "Writings",
  description: "Blog posts, short fiction, and quick takes.",
};

export default function WritingsPage() {
  return (
    <main
      className="page-shell inner-page"
      id="main-content"
      data-page="writings"
    >
      <header className="page-intro">
        <h1>Writings</h1>
      </header>

      {writings.length === 0 ? (
        <EmptyState title="In progress — check back soon." />
      ) : (
        <WritingCollection items={writings} />
      )}
    </main>
  );
}
