import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Shared motion for every page:
 * - hero headline words flip in (homepage only)
 * - [data-reveal] elements tip up as they scroll in (motion only, no fade, so contrast never drops)
 * - [data-tilt] elements lean toward the pointer (mouse only)
 * Everything is skipped when the OS asks for reduced motion.
 */
export function startMotion() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  if (document.querySelector(".hero h1 .w")) {
    gsap.from(".hero h1 .w", { yPercent: 60, rotateX: -70, opacity: 0, transformPerspective: 600, transformOrigin: "50% 100%", duration: 0.9, ease: "power3.out", stagger: 0.06 });
    // Text below the headline only moves, it never fades: it stays readable (and counts as painted) from the first frame.
    gsap.from(".hero .lede, .hero .cta-row, .hero .status", { y: 20, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.35 });
  }

  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
    const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.hasAttribute("data-reveal")) : [el];
    gsap.from(el, {
      y: 60, rotateX: -16, transformPerspective: 900, transformOrigin: "50% 0%",
      duration: 1, ease: "power3.out", delay: Math.min(siblings.indexOf(el), 3) * 0.1,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  if (!matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(el => {
    const rx = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
    });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}
