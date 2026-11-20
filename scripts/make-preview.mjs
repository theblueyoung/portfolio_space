// Turns the static export in ./out into a folder that works when opened by double-click (file://).
// Rewrites absolute paths to relative ones and routes internal links to the right index.html.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const OUT = "out";
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(OUT);

const RUNTIME_PATH =
  '(function(){var s=document.querySelector(\'script[src*="/static/chunks/webpack"]\');return s?s.src.replace(/static\\/chunks\\/webpack[^/]*$/,""):"./_next/"})()';

for (const f of files) {
  if (f.endsWith(".js")) {
    let s = readFileSync(f, "utf8");
    if (s.includes("/__REL__/_next/")) {
      s = s.replace(/"\/__REL__\/_next\/"/g, RUNTIME_PATH).replace(/\/__REL__\/_next\//g, "./_next/");
    }
    // Image paths used from JS (e.g. the cursor-reveal probe) resolve against the preview root.
    s = s.replace(/"\/images\//g, '(window.__PREVIEW_ROOT__||"/")+"images/');
    writeFileSync(f, s);
  } else if (f.endsWith(".css")) {
    let s = readFileSync(f, "utf8");
    s = s.replace(/\/__REL__\/_next\/static\//g, "../");
    // Browsers refuse to load font files over file://, so embed them in the stylesheet.
    s = s.replace(/url\((\.\.\/media\/[^)]+\.woff2)\)/g, (_, rel) => {
      const data = readFileSync(resolve(dirname(f), rel)).toString("base64");
      return `url(data:font/woff2;base64,${data})`;
    });
    writeFileSync(f, s);
  } else if (f.endsWith(".html")) {
    const depth = relative(OUT, f).split(sep).length - 1;
    const root = depth ? "../".repeat(depth) : "./";
    let s = readFileSync(f, "utf8");
    s = s
      .replace(/\/__REL__\/_next\//g, `${root}_next/`)
      .replace(/(["'(])\/images\//g, `$1${root}images/`)
      .replace(/href="\/(?!\/)/g, `href="${root}`)
      .replace(/<link rel="preload"[^>]*as="font"[^>]*\/>/g, "");
    const nav = `<script>window.__PREVIEW_ROOT__=${JSON.stringify(root)};document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a||a.target==="_blank")return;var h=a.getAttribute("href");if(/^(mailto:|https?:|#)/.test(h))return;var u=new URL(h,location.href);if(u.protocol!=="file:")return;e.preventDefault();e.stopImmediatePropagation();var p=u.pathname;if(p.endsWith("/"))p+="index.html";if(p===location.pathname&&u.hash){var t=document.getElementById(u.hash.slice(1));if(t)t.scrollIntoView({behavior:"smooth"});return;}location.href=p+u.hash;},true);</script>`;
    s = s.replace("</head>", `${nav}</head>`);
    writeFileSync(f, s);
  }
}
console.log(`preview ready: ${files.length} files in ./${OUT}`);
