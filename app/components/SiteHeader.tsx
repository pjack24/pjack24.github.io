"use client";

import Link from "next/link";
import { type MouseEvent } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research & Projects" },
  { href: "/writings", label: "Writings" },
];

export function SiteHeader() {
  const pathname = usePathname();

  function prepareNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const currentIndex = navigation.findIndex((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href),
    );
    const nextIndex = navigation.findIndex((item) => item.href === href);
    if (currentIndex === nextIndex) return;

    window.dispatchEvent(
      new CustomEvent("portfolio:navigate", {
        detail: {
          href,
          direction: nextIndex > currentIndex ? "forward" : "backward",
        },
      }),
    );
  }

  function toggleTheme() {
    const currentTheme: Theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="primary-nav" aria-label="Primary">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace(/\/$/, ""));

            return (
              <Link
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                onClick={(event) => prepareNavigation(event, item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          <span className="theme-icon theme-icon-sun" aria-hidden="true">
            <span className="sun-rays" />
          </span>
          <span className="theme-icon theme-icon-moon" aria-hidden="true">
            ☾
          </span>
          <span className="sr-only">Switch to </span>
          <span className="theme-action-dark sr-only">dark theme</span>
          <span className="theme-action-light sr-only">light theme</span>
        </button>
      </div>
    </header>
  );
}
