/* Content lives here. Edit this object; experience, projects and skills render from it.
   To link a project, set its `url` (e.g. url: "https://github.com/...") and a link appears. */
const DATA = {
  experience: [
    {
      role: ".NET Backend Engineer",
      company: "epay (a Euronet Worldwide company)",
      location: "Munich",
      start: "Sep 2023",
      end: "Present",
      current: true,
      project: "Ria Money Transfer",
      bullets: [
        "Built .NET Core C# microservices and REST APIs for payment processing, transaction management and digital voucher distribution.",
        "Used Redis as a distributed cache to cut SQL Server load at peak transaction volume.",
        "Integrated 4 third-party platforms (Twilio, Segment, Iterable, Amplitude), including contract schemas, retry logic and event-driven pipelines.",
        "Delivered full-stack features across the Angular web and Ionic mobile apps.",
        "Worked on Kibana monitoring, Talon.One loyalty engine integration, CI/CD improvements and code reviews."
      ],
      stack: ["C#", ".NET Core", "Web API", "Microservices", "Angular", "Ionic", "TypeScript", "Entity Framework", "SQL Server", "Redis", "Azure", "Kibana"]
    },
    {
      role: "Senior Software Engineer",
      company: "Cemtrex Labs (Cemtrex Inc.)",
      location: "Remote",
      start: "May 2018",
      end: "Jan 2023",
      current: false,
      project: "Vicon Valerus video management system (security/surveillance)",
      bullets: [
        "Built REST Web APIs in C#/.NET Core integrating distributed VMS components with third-party security hardware (ONVIF), with service contracts and API versioning.",
        "Integrated multi-cloud storage (Amazon S3, Wasabi, Azure Blob Storage) for video assets.",
        "Built Angular/RxJS real-time monitoring dashboards.",
        "Practised TDD and code reviews, contributing to a ~30% reduction in production defect rate."
      ],
      stack: ["C#", ".NET Core", "Web API", "Angular", "Entity Framework", "LINQ", "SQL Server", "S3", "Wasabi", "Azure Blob"]
    },
    {
      role: "Software Engineer",
      company: "Sai Softek Private Limited",
      location: "India",
      start: "Jan 2015",
      end: "May 2018",
      current: false,
      project: "CLS (e-commerce), IntriCare (healthcare), NGAP (petroleum)",
      bullets: [
        "Delivered full-stack features with ASP.NET MVC, Web API, Angular and WPF.",
        "Built a Windows desktop app (C#, WPF, SQL Server) for natural-gas data acquisition and reporting."
      ],
      stack: ["C#", "ASP.NET MVC", "Web API", "Angular", "WPF", "SQL Server"]
    }
  ],

  projects: [
    {
      name: "GDPR Cookie Consent SaaS",
      url: "", // add a link later, e.g. "https://github.com/..."
      description: "Gives website owners a copy-paste JavaScript snippet that shows a GDPR-compliant cookie banner, blocks tracking scripts until the visitor consents, and records every consent decision in an audit log. One dashboard manages many websites.",
      detail: "Built as a .NET 8 Clean Architecture API, a vanilla JS SDK with a script-blocking engine, and an admin dashboard (Angular / Next.js). Dockerized.",
      stack: [".NET 8", "Clean Architecture", "Vanilla JS SDK", "Angular", "Next.js", "Docker"]
    },
    {
      name: "Slotly",
      url: "", // add a link later
      description: "Multi-tenant appointment booking for small businesses where customers book a slot and pay a deposit. Public booking page per business, plus a dashboard for services, staff, schedule and appointments.",
      detail: "Stripe payments and webhooks, email (Resend) and SMS (Twilio) reminders via Hangfire background jobs, JWT auth.",
      stack: [".NET API", "PostgreSQL", "Next.js 16", "React 19", "Tailwind", "Stripe", "Hangfire", "Docker Compose"]
    }
  ],

  skills: [
    { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL"] },
    { group: "Backend", items: [".NET Core 6/8", "ASP.NET Web API", "Microservices", "REST", "Entity Framework", "LINQ"] },
    { group: "Frontend", items: ["Angular", "Ionic", "RxJS", "Next.js/React"] },
    { group: "Data", items: ["SQL Server", "PostgreSQL", "Redis"] },
    { group: "Cloud", items: ["Azure (Blob Storage)", "Amazon S3", "Wasabi", "Docker"] },
    { group: "Practices", items: ["TDD", "CI/CD", "Code Review", "SOLID", "Agile/Scrum"] },
    { group: "Tooling", items: ["Kibana", "Segment", "Amplitude", "Iterable", "Talon.One", "Twilio", "Stripe", "SonarQube", "Git"] }
  ]
};

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function tagList(items) {
    var ul = el("ul", "tags");
    ul.setAttribute("aria-label", "Technologies");
    items.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    return ul;
  }

  /* ---------- theme ---------- */
  var STORAGE_KEY = "theme";
  var toggle = document.getElementById("theme-toggle");
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function readStoredTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) { return null; }
  }

  function storeTheme(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* storage unavailable */ }
  }

  function isDark() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit === "dark";
    return !!(darkQuery && darkQuery.matches);
  }

  function syncToggle() {
    if (!toggle) return;
    var dark = isDark();
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  var stored = readStoredTheme();
  if (stored) root.setAttribute("data-theme", stored);
  syncToggle();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      storeTheme(next);
      syncToggle();
    });
  }
  if (darkQuery && darkQuery.addEventListener) {
    darkQuery.addEventListener("change", syncToggle);
  }

  /* ---------- render ---------- */
  function renderExperience() {
    var host = document.getElementById("experience");
    if (!host) return;
    DATA.experience.forEach(function (job) {
      var row = el("article", "entry reveal");

      var date = el("div", "mono entry-date");
      if (job.current) {
        var now = el("span", "now");
        now.appendChild(el("span", "dot"));
        now.lastChild.setAttribute("aria-hidden", "true");
        now.appendChild(document.createTextNode("Present"));
        date.appendChild(document.createTextNode(job.start + " – "));
        date.appendChild(now);
      } else {
        date.appendChild(document.createTextNode(job.start + " – " + job.end));
      }
      date.appendChild(el("span", "place", job.location));
      row.appendChild(date);

      var body = el("div", "entry-body");
      body.appendChild(el("h3", null, job.role));
      body.appendChild(el("p", "entry-company", job.company));
      if (job.project) {
        var proj = el("p", "mono entry-project");
        proj.appendChild(el("span", "muted", "Project: "));
        proj.appendChild(document.createTextNode(job.project));
        body.appendChild(proj);
      }
      var ul = el("ul");
      job.bullets.forEach(function (b) { ul.appendChild(el("li", null, b)); });
      body.appendChild(ul);
      body.appendChild(tagList(job.stack));
      row.appendChild(body);

      host.appendChild(row);
    });
  }

  function renderProjects() {
    var host = document.getElementById("project-list");
    if (!host) return;
    DATA.projects.forEach(function (p, i) {
      var card = el("article", "project reveal");
      card.appendChild(el("p", "mono num", "P" + (i + 1)));
      card.appendChild(el("h3", null, p.name));
      card.appendChild(el("p", null, p.description));
      if (p.detail) card.appendChild(el("p", "muted", p.detail));
      card.appendChild(tagList(p.stack));
      if (p.url) {
        var a = el("a", "link mono project-link", "View project");
        a.href = p.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        card.appendChild(a);
      }
      host.appendChild(card);
    });
  }

  function renderSkills() {
    var host = document.getElementById("skill-list");
    if (!host) return;
    DATA.skills.forEach(function (g) {
      var row = el("div", "skill-row reveal");
      row.appendChild(el("dt", "mono", g.group));
      var dd = el("dd");
      g.items.forEach(function (item) { dd.appendChild(el("span", null, item)); });
      row.appendChild(dd);
      host.appendChild(row);
    });
  }

  renderExperience();
  renderProjects();
  renderSkills();

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (n) { n.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    items.forEach(function (n) { io.observe(n); });
  }
})();
