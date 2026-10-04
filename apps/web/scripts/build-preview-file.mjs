// Builds a single-file, click-through preview of the compiled site (run `pnpm build` first).
// Every prerendered page becomes a <template>; a small router swaps them in.
// Bookings are switched off and the Preview banner stays on every page, so the file
// can be shared as a draft without being mistaken for the official site.
import fs from "node:fs";
import path from "node:path";

const NEXT = path.resolve(import.meta.dirname, "../.next");
const APP = path.join(NEXT, "server/app");
const OUT = path.resolve(process.argv[2] ?? "preview/primegala-preview.html");
const MAPS = "https://www.google.com/maps/search/?api=1&query=Primegala+Medical+Centre+Maili+Sita+Nakuru";

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const routeOf = (file) => {
  const rel = path.relative(APP, file).replace(/\.html$/, "");
  if (rel === "index") return "/";
  if (rel === "_not-found") return "404";
  if (rel.startsWith("_")) return null;
  return "/" + rel;
};
const token = (route) => (route === "/" ? "p.home" : "p." + route.slice(1).replaceAll("/", "~"));

const stripScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");

function rewrite(html) {
  return (
    html
      // internal links -> in-page routes (drop query strings such as ?service=)
      .replace(/href="(\/(?!\/)[^"#?]*)(?:\?[^"#]*)?(#[^"]*)?"/g, (_, p) => {
        const route = p.length > 1 ? p.replace(/\/$/, "") : "/";
        return `href="#${token(route)}" data-route="${route}"`;
      })
      // the map loader can't embed Google Maps here: link out instead
      .replace(/<button type="button"([^>]*)>Show map here<\/button>/g, `<a href="${MAPS}" target="_blank" rel="noopener"$1>Open map</a>`)
      .replace(/<a href="#main"[^>]*>Skip to content<\/a>/, "")
  );
}

const files = walk(APP);
const index = fs.readFileSync(path.join(APP, "index.html"), "utf8");

// Shell: everything in <body> except the page content
const htmlClasses = index.match(/<html[^>]*class="([^"]*)"/)[1];
let body = stripScripts(index.slice(index.indexOf("<body"), index.lastIndexOf("</body>")));
body = body.replace(/^<body[^>]*>/, "").replace(/<div hidden="">[\s\S]*?<\/div>/, "");
const mStart = body.indexOf('<main id="main"');
const mOpenEnd = body.indexOf(">", mStart) + 1;
const mEnd = body.lastIndexOf("</main>");
const shell = rewrite(body.slice(0, mOpenEnd)) + "<!--ROUTE-->" + rewrite(body.slice(mEnd));

// Pages
const templates = [];
for (const file of files) {
  const route = routeOf(file);
  if (!route) continue;
  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Primegala").replace(/"/g, "&quot;");
  const s = html.indexOf('<main id="main"');
  const main = html.slice(html.indexOf(">", s) + 1, html.lastIndexOf("</main>"));
  templates.push(`<template id="route:${route}" data-title="${title}">${rewrite(stripScripts(main))}</template>`);
}

// CSS with fonts inlined
const cssHref = index.match(/<link rel="stylesheet" href="\/_next\/([^"]+\.css)"/)[1];
let css = fs.readFileSync(path.join(NEXT, cssHref), "utf8");
css = css.replace(/url\(([^)]*?media\/([^)"']+\.woff2))\)/g, (_, _u, name) => {
  const data = fs.readFileSync(path.join(NEXT, "static/media", name)).toString("base64");
  return `url(data:font/woff2;base64,${data})`;
});

// next/font puts its CSS variables on <html>; the artifact frame owns <html>, so copy them to :root
const fontVars = htmlClasses
  .split(/\s+/)
  .map((cls) => css.match(new RegExp("\\." + cls.replace(/[-_]/g, (c) => "\\" + c) + "\\{([^}]*)\\}"))?.[1])
  .filter(Boolean)
  .join(";");
if (!fontVars.includes("--font-jakarta")) throw new Error("font variables not found");

const script = `
(() => {
  const main = document.getElementById("main");
  const tpl = (route) => document.getElementById("route:" + route) || document.getElementById("route:404");
  const toRoute = (hash) => {
    const h = (hash || "").replace(/^#/, "");
    if (!h.startsWith("p.")) return null;
    return h === "p.home" ? "/" : "/" + h.slice(2).replaceAll("~", "/");
  };
  let current = null;
  function show(route, push) {
    const t = tpl(route);
    main.replaceChildren(t.content.cloneNode(true));
    document.title = t.dataset.title;
    current = route;
    closeMenu();
    window.scrollTo({ top: 0, behavior: "instant" });
    if (push) { try { history.pushState({ route }, "", "#" + (route === "/" ? "p.home" : "p." + route.slice(1).replaceAll("/", "~"))); } catch (e) {} }
  }
  window.addEventListener("popstate", (e) => show((e.state && e.state.route) || toRoute(location.hash) || "/", false));

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const route = a.getAttribute("data-route");
    if (route) { e.preventDefault(); show(route, true); return; }
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const el = document.getElementById(decodeURIComponent(href.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Bookings are switched off in this preview
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const note = document.createElement("div");
    note.setAttribute("role", "status");
    note.className = "rounded-[var(--radius-card)] bg-brand-50 p-8 ring-1 ring-brand-100";
    note.innerHTML = '<p class="eyebrow">Preview only</p>' +
      '<h3 class="mt-3 font-display text-2xl font-semibold text-ink">Booking is switched off in this preview</h3>' +
      '<p class="mt-3 leading-relaxed text-muted">On the live site, this request goes straight into Primegala\\'s patient system and the patient sees: <strong class="text-ink">“Asante! We\\'ve got your request. Your reference is PG-XXXXXX.”</strong> The front desk then confirms by WhatsApp or phone.</p>' +
      '<button type="button" class="mt-6 inline-flex h-11 items-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700">Back to the form</button>';
    note.querySelector("button").addEventListener("click", () => note.replaceWith(form));
    form.replaceWith(note);
  });

  // Mobile menu
  const btn = document.querySelector('button[aria-controls="mobile-menu"]');
  const iconOpen = btn ? btn.querySelector("svg").innerHTML : "";
  const iconClose = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
  let panel = null;
  function closeMenu() {
    if (!panel) return;
    panel.remove(); panel = null;
    document.body.style.overflow = "";
    btn.setAttribute("aria-expanded", "false");
    btn.querySelector("svg").innerHTML = iconOpen;
    btn.querySelector(".sr-only").textContent = "Open menu";
  }
  if (btn) btn.addEventListener("click", () => {
    if (panel) return closeMenu();
    const items = [["/", "Home"], ["/services", "Services"], ["/sha", "SHA"], ["/about", "Our Story"], ["/health-hub", "Health Hub"], ["/contact", "Find Us"], ["/faq", "FAQs"]];
    panel = document.createElement("div");
    panel.id = "mobile-menu";
    panel.className = "fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-white lg:hidden";
    panel.style.top = btn.closest("header").getBoundingClientRect().bottom + "px";
    panel.innerHTML = '<nav aria-label="Mobile" class="container-page py-6"><ul class="divide-y divide-line">' +
      items.map(([r, l]) => '<li><a href="#" data-route="' + r + '" class="flex items-center justify-between py-4 font-display text-2xl text-ink">' + l + '</a></li>').join("") +
      '</ul><a href="#" data-route="/book" class="mt-8 inline-flex h-13 w-full items-center justify-center rounded-full bg-brand-600 px-6 text-base font-semibold text-white">Book a visit</a></nav>';
    document.body.appendChild(panel);
    document.body.style.overflow = "hidden";
    btn.setAttribute("aria-expanded", "true");
    btn.querySelector("svg").innerHTML = iconClose;
    btn.querySelector(".sr-only").textContent = "Close menu";
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  show(toRoute(location.hash) || "/", false);
})();`;

const page = `<title>Primegala Site Preview</title>
<meta name="robots" content="noindex, nofollow">
<style>
${css}
/* Preview-only adjustments for the artifact frame */
:root { color-scheme: light; ${fontVars} }
body { background: #ffffff; color: #10221a; font-size: 16px; margin: 0; }
#app { font-family: var(--font-sans); }
#app header.sticky { top: env(safe-area-inset-top, 0px); }
</style>
<div id="app" class="${htmlClasses} flex min-h-dvh flex-col" lang="en-KE">
${shell.replace("<!--ROUTE-->", "")}
</div>
${templates.join("\n")}
<script>${script}</script>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, page);
console.log(`routes: ${templates.length}, size: ${(page.length / 1024 / 1024).toFixed(2)} MB, title in first 8KB: ${page.indexOf("<title>") < 8192}`);
