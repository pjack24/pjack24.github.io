"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Direction = "forward" | "backward";

type NavigationDetail = {
  direction: Direction;
  href: string;
};

function normalizePath(pathname: string) {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function pageName(pathname: string) {
  if (pathname.startsWith("/writings")) return "writings";
  if (pathname.startsWith("/research")) return "research";
  return "home";
}

function pageIndex(name: string) {
  if (name === "writings") return 2;
  if (name === "research") return 1;
  return 0;
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const snapshotLayerRef = useRef<HTMLDivElement>(null);
  const targetPathRef = useRef<string | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function prepareTransition(detail: NavigationDetail) {
      const stage = stageRef.current;
      const currentPage = currentPageRef.current;
      const snapshotLayer = snapshotLayerRef.current;
      if (!stage || !currentPage || !snapshotLayer) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targetPathRef.current = null;
        return;
      }

      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }

      const snapshot = currentPage.cloneNode(true) as HTMLDivElement;
      snapshot.className = "route-page route-page-snapshot";
      snapshot.setAttribute("aria-hidden", "true");
      snapshot.setAttribute("inert", "");
      snapshot.querySelectorAll("[id]").forEach((element) => {
        element.removeAttribute("id");
      });

      snapshotLayer.replaceChildren(snapshot);
      targetPathRef.current = normalizePath(detail.href);
      stage.dataset.direction = detail.direction;
      stage.classList.remove("is-transitioning");
      stage.classList.add("is-prepared");
    }

    function handleNavigation(event: Event) {
      prepareTransition((event as CustomEvent<NavigationDetail>).detail);
    }

    function handleHistoryNavigation() {
      const nextPath = normalizePath(window.location.pathname);
      if (nextPath === normalizePath(pathname)) return;

      const currentName =
        currentPageRef.current?.querySelector<HTMLElement>("main[data-page]")
          ?.dataset.page ?? pageName(pathname);
      const nextName = pageName(nextPath);
      prepareTransition({
        href: nextPath,
        direction:
          pageIndex(nextName) > pageIndex(currentName) ? "forward" : "backward",
      });
    }

    window.addEventListener("portfolio:navigate", handleNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      window.removeEventListener("portfolio:navigate", handleNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
      }
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const currentPage = currentPageRef.current;
    const snapshotLayer = snapshotLayerRef.current;
    const targetPath = targetPathRef.current;
    if (!stage || !currentPage || !snapshotLayer || !targetPath) return;
    if (normalizePath(pathname) !== targetPath) return;

    const renderedPage =
      currentPage.querySelector<HTMLElement>("main[data-page]")?.dataset.page;
    if (renderedPage !== pageName(pathname)) return;

    const frame = window.requestAnimationFrame(() => {
      stage.classList.add("is-transitioning");
      cleanupTimerRef.current = window.setTimeout(() => {
        snapshotLayer.replaceChildren();
        stage.classList.remove("is-prepared", "is-transitioning");
        delete stage.dataset.direction;
        targetPathRef.current = null;
        cleanupTimerRef.current = null;
      }, 580);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [children, pathname]);

  return (
    <div className="route-stage" ref={stageRef}>
      <div className="route-snapshot-layer" ref={snapshotLayerRef} />
      <div className="route-page route-page-current" ref={currentPageRef}>
        {children}
      </div>
    </div>
  );
}
