import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders all three portfolio pages", async () => {
  const pages = [
    ["/", /Peyton Jackson/],
    ["/research", /Research &amp; Projects/],
    ["/writings", /Writings/],
  ];

  for (const [pathname, expected] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expected);
    assert.match(html, /Switch to/);
    assert.match(html, /Skip to main content/);
    assert.match(html, /route-stage/);
    assert.match(html, /favicon-pj\.png/);
    assert.match(html, /favicon\.ico/);
    assert.match(html, /apple-touch-icon\.png/);
    assert.doesNotMatch(html, /class="name-mark"/);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  }
});

test("shows profile content, projects, and published writing", async () => {
  const [home, research, writings, blogPost] = await Promise.all([
    render("/").then((response) => response.text()),
    render("/research").then((response) => response.text()),
    render("/writings").then((response) => response.text()),
    render("/writings/slop-in-the-age-of-agi").then((response) =>
      response.text(),
    ),
  ]);

  assert.match(
    home,
    /Columbia Undergrad\. AI Safety; interested in mathematical and statistical foundations of mechinterp\. I also play violin\./,
  );
  assert.match(home, /pj2465@columbia\.edu/);
  assert.match(home, /profile-cropped\.png/);
  assert.match(home, /Fort Tryon Park/);
  assert.match(home, /google\.com\/maps\/search/);
  assert.match(home, /Picture thanks to David Eirew/);
  assert.doesNotMatch(home, /Open research|Browse writing/);
  assert.doesNotMatch(home, /Built for quiet reading|©/);
  assert.match(
    research,
    /Topological and Geometric Signals of Alignment Faking/,
  );
  assert.match(research, /BlueDot Impact/);
  assert.match(research, /August 2026/);
  assert.match(research, /alignment-faking-pilot\.pdf/);
  assert.match(research, /Pilot PDF/);
  assert.match(
    research,
    /Looking for topological and geometric features and characterizations associated with alignment-faking\. In progress\./,
  );
  assert.match(research, /Optimized Persistence Distance/);
  assert.match(research, /METAGENE-1 Interpretability/);
  assert.match(research, /NSF REU/);
  assert.match(research, /CAIAC/);
  assert.match(research, /metagene-1-interpretability\.pdf/);
  assert.match(research, /Coming soon/);
  assert.match(research, /LDP in Graph Theoretic Metric Spaces/);
  assert.match(research, /Duke\/AMT/);
  assert.match(research, /May 2025/);
  assert.match(research, /Probably never/);
  assert.match(research, /Polyomino Tilings/);
  assert.match(research, /NCSSM/);
  assert.match(research, /January 2025/);
  assert.match(research, /polyomino-tilings\.pdf/);
  assert.match(research, /Published in Broad Street Scientific 24-25/);
  assert.match(research, /broadstreetscientific\.ncssm\.edu\/archive/);
  assert.ok(
    research.indexOf("Topological and Geometric Signals of Alignment Faking") <
      research.indexOf("Optimized Persistence Distance") &&
      research.indexOf("Optimized Persistence Distance") <
      research.indexOf("METAGENE-1 Interpretability"),
    "projects should render newest first",
  );
  assert.ok(
    research.indexOf("METAGENE-1 Interpretability") <
      research.indexOf("LDP in Graph Theoretic Metric Spaces") &&
      research.indexOf("LDP in Graph Theoretic Metric Spaces") <
        research.indexOf("Polyomino Tilings"),
    "2025 projects should follow 2026 projects in reverse chronological order",
  );
  assert.match(writings, /Most forbidden technique alert\?/);
  assert.match(writings, /August 7, 2026/);
  assert.match(writings, /Read my quick take on LessWrong/);
  assert.match(writings, /c8motPmnvJCJELmce/);
  assert.match(writings, /Slop in the Age of AGI/);
  assert.match(writings, /August 27, 2026/);
  assert.ok(
    writings.indexOf("Slop in the Age of AGI") <
      writings.indexOf("Most forbidden technique alert?"),
    "writing should render newest first",
  );
  assert.match(blogPost, /Slop in the Age of AGI/);
  assert.match(blogPost, /August 27, 2026/);
  assert.match(blogPost, /data-footnotes="true"/);
  assert.match(blogPost, /id="user-content-fn-0"/);
});

test("keeps owner-editable content files in place", async () => {
  const [site, research, writings, template, guide] = await Promise.all([
    readFile(new URL("content/site.json", projectRoot), "utf8"),
    readFile(new URL("content/research.json", projectRoot), "utf8"),
    readFile(new URL("content/writings.generated.json", projectRoot), "utf8"),
    readFile(new URL("content/writings/_template.md", projectRoot), "utf8"),
    readFile(new URL("content/README.md", projectRoot), "utf8"),
  ]);

  assert.match(site, /"bio"/);
  const researchItems = JSON.parse(research);
  assert.equal(researchItems.length, 5);
  assert.equal(researchItems[0].sortDate, "2026-08-01");
  assert.equal(researchItems[1].sortDate, "2026-07-01");
  assert.equal(researchItems[2].sortDate, "2026-04-01");
  assert.equal(researchItems[3].sortDate, "2025-05-01");
  assert.equal(researchItems[4].sortDate, "2025-01-01");
  const generatedWritings = JSON.parse(writings);
  assert.equal(generatedWritings.length, 3);
  assert.equal(
    generatedWritings.filter((item) => item.published).length,
    2,
  );
  assert.match(template, /published: false/);
  assert.match(guide, /public\/files/);
  assert.match(guide, /short-fiction/);
});
