import type { Metadata } from "next";
import { site, withBasePath } from "./content";

export const metadata: Metadata = {
  title: "Home",
};

function Portrait() {
  if (site.photo) {
    return (
      <figure className="portrait-card portrait-card-with-image">
        <div className="portrait-image-frame">
          {/* A plain image keeps user-supplied portraits simple on GitHub Pages. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath(site.photo)} alt={site.photoAlt} />
        </div>
        <figcaption>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Fort%20Tryon%20Park%2C%20New%20York%2C%20NY"
            target="_blank"
            rel="noreferrer"
          >
            Fort Tryon Park
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span>Picture thanks to David Eirew</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className="portrait-card portrait-placeholder"
      aria-label="Portrait not added yet"
    >
      <div className="portrait-placeholder-copy" aria-hidden="true">
        <span className="portrait-plus">+</span>
        <strong>Photo coming soon</strong>
        <span>In progress — check back soon</span>
      </div>
    </figure>
  );
}

export default function Home() {
  const hasBio = site.bio.some((paragraph) => paragraph.trim().length > 0);

  return (
    <main
      className="page-shell home-page"
      id="main-content"
      data-page="home"
    >
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          {site.eyebrow && <p className="eyebrow">{site.eyebrow}</p>}
          <h1 id="home-title">{site.headline}</h1>
          <div className="bio-copy">
            {hasBio ? (
              site.bio.map((paragraph, index) => (
                <p key={paragraph}>
                  {paragraph}
                  {index === site.bio.length - 1 && site.email && (
                    <>
                      {" "}
                      <a className="bio-email" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </>
                  )}
                </p>
              ))
            ) : (
              <p>Bio in progress — check back soon.</p>
            )}
          </div>
          {site.links.length > 0 && (
            <div className="profile-links" aria-label="Profile links">
              {site.links.map((link) => (
                <a href={withBasePath(link.url)} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <Portrait />
      </section>
    </main>
  );
}
