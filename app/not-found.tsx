import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell not-found" id="main-content">
      <p className="eyebrow">404 · Not found</p>
      <h1>This page is still in the margins.</h1>
      <p>The address may have changed, or the page may not exist yet.</p>
      <Link className="text-link" href="/">
        Return home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
