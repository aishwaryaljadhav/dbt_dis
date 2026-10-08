/*
 * dbt_dis behaviour: cube rotation, reveal, attract mode and the event countdown.
 * Content comes from js/storylines.js (window.DIS).
 */
(function () {
  "use strict";

  const { EVENT, TECH, STAGES, ICONS, ROWS } = window.DIS;

  // Attract mode: roll on its own after IDLE_MS without interaction, then every AUTO_MS.
  const IDLE_MS = 40000;
  const AUTO_MS = 20000;

  // Face order matches ROWS order. Each entry is the cube rotation [x, y] that shows that face.
  const FACES = [
    { cls: "front",  rot: [0, 0] },
    { cls: "right",  rot: [0, -90] },
    { cls: "back",   rot: [0, 180] },
    { cls: "left",   rot: [0, 90] },
    { cls: "top",    rot: [-90, 0] },
    { cls: "bottom", rot: [90, 0] }
  ];
  const TILT = [-18, 28]; // resting tilt so three faces are visible

  const $ = (id) => document.getElementById(id);
  const cube = $("cube");
  const rollBtn = $("roll");
  const chipsEl = $("chips");
  const story = $("story");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let current = -1;
  let rx = TILT[0];
  let ry = TILT[1];
  let rolling = false;
  let idleTimer = null;
  let autoTimer = null;

  const svg = (name) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Build ---------- */

  function fillEventText() {
    document.querySelectorAll("[data-event]").forEach((el) => {
      const key = el.getAttribute("data-event");
      if (EVENT[key]) el.textContent = EVENT[key];
    });
  }

  function buildCube() {
    cube.innerHTML = ROWS.slice(0, FACES.length).map((row, i) =>
      '<div class="face face-' + FACES[i].cls + '">' + svg(row.id) +
      "<span>" + escapeHtml(row.name) + "</span></div>"
    ).join("");
  }

  function buildChips() {
    chipsEl.innerHTML = ROWS.map((row, i) =>
      '<button type="button" class="chip" data-index="' + i + '" aria-pressed="false">' +
      svg(row.id) + escapeHtml(row.name) + "</button>"
    ).join("");
    chipsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      userAct();
      rollTo(Number(btn.dataset.index), 1);
    });
  }

  /* ---------- Cube ---------- */

  function setTransform() {
    cube.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
  }

  // Land on face idx after `spins` extra full turns, always turning forward.
  function rollTo(idx, spins) {
    if (rolling || idx < 0 || idx >= ROWS.length) return;
    if (idx === current && spins === 0) return;
    rolling = true;
    rollBtn.disabled = true;

    const [fx, fy] = FACES[idx].rot;
    const tx = fx + TILT[0] * (fx === 0 ? 1 : 0.4);
    const ty = fy + TILT[1] * (fx === 0 ? 1 : 0.4);
    const turnsX = Math.ceil((rx - tx) / 360) + spins;
    const turnsY = Math.ceil((ry - ty) / 360) + spins;
    rx = tx + 360 * turnsX; // >= current angle, so the cube always turns forward
    ry = ty + 360 * turnsY;
    setTransform();

    const done = () => {
      cube.removeEventListener("transitionend", done);
      clearTimeout(fallback);
      rolling = false;
      rollBtn.disabled = false;
      reveal(idx);
    };
    const ms = reducedMotion.matches ? 10 : 1700;
    const fallback = setTimeout(done, ms);
    cube.addEventListener("transitionend", done);
  }

  function roll() {
    let next = Math.floor(Math.random() * ROWS.length);
    if (next === current) next = (next + 1 + Math.floor(Math.random() * (ROWS.length - 1))) % ROWS.length;
    rollTo(next, 2);
  }

  /* ---------- Reveal ---------- */

  function reveal(idx) {
    const row = ROWS[idx];
    current = idx;

    $("story-where").textContent = row.company + ", " + row.city;
    $("story-title").textContent = row.headline;
    $("story-text").textContent = row.storyline;

    $("cases").innerHTML = row.useCases.map((uc) => {
      const tech = TECH[uc.tech] || { name: uc.tech, tagline: "" };
      return (
        '<article class="case">' +
        '<p class="case-tech">' + escapeHtml(tech.name) + "</p>" +
        '<p class="case-tagline">' + escapeHtml(tech.tagline) + "</p>" +
        "<h3>" + escapeHtml(uc.title) + "</h3>" +
        '<p class="case-outcome">' + escapeHtml(uc.outcome) + "</p>" +
        '<p class="case-metric">' + escapeHtml(uc.metric) + "</p>" +
        '<span class="case-stage">' + escapeHtml(STAGES[uc.stage] || "") + " stage</span>" +
        "</article>"
      );
    }).join("");

    $("demo-steps").innerHTML = row.demo.map((s) => "<li>" + escapeHtml(s) + "</li>").join("");

    chipsEl.querySelectorAll(".chip").forEach((c, i) =>
      c.setAttribute("aria-pressed", i === idx ? "true" : "false")
    );

    story.classList.remove("is-revealing");
    void story.offsetWidth; // restart the reveal animation
    story.classList.add("is-revealing");

    try { history.replaceState(null, "", "#" + row.id); } catch (e) { /* file:// or sandboxed */ }
  }

  /* ---------- Attract mode ---------- */

  function userAct() {
    clearTimeout(idleTimer);
    clearInterval(autoTimer);
    idleTimer = setTimeout(() => {
      roll();
      autoTimer = setInterval(roll, AUTO_MS);
    }, IDLE_MS);
  }

  /* ---------- Countdown ---------- */

  function startCountdown() {
    const box = document.querySelector(".countdown");
    const label = $("countdown-label");
    const units = {
      d: box.querySelector('[data-unit="d"]'),
      h: box.querySelector('[data-unit="h"]'),
      m: box.querySelector('[data-unit="m"]'),
      s: box.querySelector('[data-unit="s"]')
    };
    const start = Date.parse(EVENT.start);
    const end = Date.parse(EVENT.end);
    const pad = (n) => String(n).padStart(2, "0");
    let state = "";

    function tick() {
      const now = Date.now();
      let next;
      if (now < start) next = "soon";
      else if (now < end) next = "live";
      else next = "over";

      if (next !== state) {
        state = next;
        box.classList.toggle("is-live", state === "live");
        box.classList.toggle("is-over", state === "over");
        label.textContent =
          state === "soon" ? "Summit starts in" :
          state === "live" ? "The summit is live. Come and roll the cube at our booth." :
          "Thanks for visiting us at Data Innovation Summit MEA 2026.";
      }
      if (state === "soon") {
        let t = Math.floor((start - now) / 1000);
        const d = Math.floor(t / 86400); t -= d * 86400;
        const h = Math.floor(t / 3600);  t -= h * 3600;
        const m = Math.floor(t / 60);    t -= m * 60;
        units.d.textContent = pad(d);
        units.h.textContent = pad(h);
        units.m.textContent = pad(m);
        units.s.textContent = pad(t);
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Start ---------- */

  function init() {
    fillEventText();
    buildCube();
    buildChips();

    rollBtn.addEventListener("click", () => { userAct(); roll(); });

    document.addEventListener("keydown", (e) => {
      if (e.code !== "Space" || e.repeat) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "button" || tag === "input" || tag === "textarea") return; // let buttons handle Space
      e.preventDefault();
      userAct();
      roll();
    });
    ["pointerdown", "wheel", "touchstart"].forEach((ev) =>
      document.addEventListener(ev, userAct, { passive: true })
    );

    // Open on the industry in the URL hash, or the first one.
    const fromHash = ROWS.findIndex((r) => "#" + r.id === location.hash);
    const first = fromHash >= 0 ? fromHash : 0;
    const [fx, fy] = FACES[first].rot;
    rx = fx + TILT[0] * (fx === 0 ? 1 : 0.4);
    ry = fy + TILT[1] * (fx === 0 ? 1 : 0.4);
    setTransform();
    reveal(first);
    story.classList.remove("is-revealing");

    startCountdown();
    userAct();
  }

  init();
})();
