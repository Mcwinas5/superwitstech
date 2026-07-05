"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Immediately show all when reduced motion
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const d = Number(e.target.dataset.delay ?? 0);
          setTimeout(() => e.target.classList.add("revealed"), d);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      obs.observe(el);
    });

    // Safety net: reveal any remaining elements after 3s
    // (catches elements missed by the observer on fast scrolls or late renders)
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.revealed)").forEach((el) => {
        el.classList.add("revealed");
      });
      obs.disconnect();
    }, 3000);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, []);
  return null;
}