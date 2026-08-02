import { load as parseYaml } from "js-yaml";

export default function (eleventyConfig) {
  // Content lives in YAML and Markdown so the curation Agent edits prose and
  // structured fields, never the display system. See README "內容架構".
  eleventyConfig.addDataExtension("yaml", (contents) => parseYaml(contents));

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  // The auto-refreshed social feed keeps its own path so the scheduled
  // workflow can keep committing a single JSON file.
  eleventyConfig.addPassthroughCopy("data/feeds.json");

  // Rendered at build time so the footer year needs no client-side JavaScript.
  eleventyConfig.addGlobalData("buildYear", new Date().getFullYear());

  eleventyConfig.addFilter("absoluteUrl", (path, base) =>
    new URL(path, base).href
  );

  eleventyConfig.addFilter("isoDate", (d) =>
    (d instanceof Date ? d : new Date(d)).toISOString().slice(0, 10)
  );

  // Featured cases first, then explicit order, then title.
  eleventyConfig.addCollection("cases", (collection) =>
    collection
      .getFilteredByGlob("src/content/cases/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "content/fields",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
