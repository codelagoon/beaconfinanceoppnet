import { writeFile } from "node:fs/promises";

const BASE = "https://highschoolopportunity.org";
const INDEX_PAGES = [
  "/remote",
  "/categories/internships",
  "/categories/research",
  "/categories/fellowships",
  "/categories/summer-programs",
  "/categories/competitions",
];
const NYC = /new york|brooklyn|bronx|queens|manhattan|staten island|nyc/i;
const REMOTE = /online|remote|hybrid/i;

const images = {
  Internship: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=84",
  Research: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=84",
  Fellowship: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=84",
  Competition: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=84",
  "Summer Program": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1800&q=84",
  Scholarship: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=84",
  Volunteer: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=84",
  default: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=84",
};

const decode = (value = "") => value
  .replaceAll("&amp;", "&")
  .replaceAll("&#39;", "'")
  .replaceAll("&quot;", '"')
  .replaceAll("&ndash;", "–")
  .replaceAll("&mdash;", "—")
  .replace(/<[^>]+>/g, "")
  .trim();

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "BeaconFinanceOpportunityIndexer/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function linksFrom(html) {
  return [...html.matchAll(/href="(\/opportunities\/[^"]+)"/g)].map((match) => match[1]);
}

function parseDetail(html, path) {
  const programMatch = html.match(/<script[^>]+type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"EducationalOccupationalProgram".*?\})<\/script>/);
  if (!programMatch) return null;
  const program = JSON.parse(programMatch[1]);
  const summary = html.match(/Offered by (.*?)\. (.*?) for high school students in (.*?)\. Format: (.*?)\. Cost: (.*?)\. Grades (.*?)\. Deadline: (.*?)\.<\/p>/);
  const fields = decode(html.match(/<p>Fields: (.*?)<\/p>/)?.[1] || "");
  const officialUrl = html.match(/<p><a href="(https?:\/\/[^"<]+)">Official program page<\/a><\/p>/)?.[1];
  if (!summary || !officialUrl) return null;

  const [, summaryOrg, rawCategory, location, rawFormat, rawCost, grades, rawDeadline] = summary.map(decode);
  const org = decode(program.provider?.name || summaryOrg);
  const format = /online|remote/i.test(rawFormat) ? "Remote" : /hybrid/i.test(rawFormat) ? "Hybrid" : "In person";
  if (!REMOTE.test(format) && !NYC.test(location)) return null;

  const deadlineDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDeadline) ? rawDeadline : "2099-12-31";
  if (deadlineDate !== "2099-12-31" && deadlineDate < "2026-09-26") return null;

  const knownCategories = ["Internship", "Research", "Fellowship", "Summer Program", "Competition", "Scholarship", "Volunteer"];
  const category = knownCategories.find((name) =>
    new RegExp(name.replace(" ", "\\s+"), "i").test(program.occupationalCategory || rawCategory),
  ) || "Summer Program";
  const paid = /stipend/i.test(rawCost) ? "Stipend / award" : "No stipend listed";
  const deadline = deadlineDate === "2099-12-31" ? (rawDeadline || "TBA") : new Date(`${deadlineDate}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  const description = decode(program.description || "");

  return {
    path,
    org,
    shortOrg: org.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((word) => word[0]).join("").slice(0, 4).toUpperCase() || org.slice(0, 3).toUpperCase(),
    title: decode(program.name),
    category,
    paid,
    location,
    grades: grades.replace(/^Gr(?:ades?)?\s*/i, ""),
    deadline,
    deadlineLong: deadlineDate === "2099-12-31" ? `${rawDeadline || "Deadline TBA"}; confirm on the official page` : new Date(`${deadlineDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    time: "See official page",
    duration: "See official page",
    difficulty: "Varies",
    format,
    applicationType: "Individual",
    deadlineDate,
    blurb: description,
    why: `${format === "In person" ? "A credible NYC option" : `A flexible ${format.toLowerCase()} option`} with direct high-school eligibility and a public application source.`,
    overview: `${description} Fields include ${fields || "career exploration and skill development"}. Listed cost: ${rawCost}. Confirm current dates, compensation, and requirements on the official program page before applying.`,
    eligibilityDetails: [`Open to students in grades ${grades.replace(/^Gr(?:ades?)?\s*/i, "")}`, format === "In person" ? `Based in ${location}` : `${format} participation`, "Review the official page for citizenship, residency, age, and school-specific requirements"],
    requirements: ["Review the official eligibility rules", "Prepare the materials requested by the organization", "Apply through the official program page"],
    image: images[category] || images.default,
    logo: "",
    impact: paid === "Stipend / award" ? "Compensated" : "Verified",
    added: "Public-source listing",
    verified: "September 26, 2026",
    applyUrl: officialUrl,
    sourceUrl: officialUrl,
    indexUrl: `${BASE}${path}`,
  };
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      try { results[index] = await mapper(items[index]); }
      catch (error) { console.warn(error.message); results[index] = null; }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

const indexHtml = await Promise.all(INDEX_PAGES.map((page) => fetchText(`${BASE}${page}`)));
const links = [...new Set(indexHtml.flatMap(linksFrom))];
const records = (await mapLimit(links, 16, async (path) => parseDetail(await fetchText(`${BASE}${path}`), path))).filter(Boolean);

records.sort((a, b) => a.deadlineDate.localeCompare(b.deadlineDate) || a.title.localeCompare(b.title));

if (records.length < 200) throw new Error(`Only ${records.length} qualifying records found`);
const nycInPerson = records.filter((item) => item.format === "In person" && NYC.test(item.location));
const flexible = records.filter((item) => item.format === "Remote" || item.format === "Hybrid");
const selectedPaths = new Set();
const balanced = [];
for (const item of [...nycInPerson.slice(0, 120), ...flexible.slice(0, 80), ...records]) {
  if (selectedPaths.has(item.path)) continue;
  selectedPaths.add(item.path);
  balanced.push(item);
  if (balanced.length === 200) break;
}
const selected = balanced.map((record, index) => ({ id: 2001 + index, ...record }));
await writeFile(new URL("../src/opportunities.generated.js", import.meta.url), `// Generated from public listings; run scripts/import-opportunities.mjs to refresh.\nexport const opportunities = ${JSON.stringify(selected, null, 2)};\n`);
console.log(`Wrote ${selected.length} opportunities (${selected.filter((item) => NYC.test(item.location)).length} NYC, ${selected.filter((item) => item.format === "Remote").length} remote, ${selected.filter((item) => item.format === "Hybrid").length} hybrid).`);
