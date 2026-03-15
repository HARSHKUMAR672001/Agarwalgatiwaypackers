"use client";

import { useEffect } from "react";

export function RevealInit() {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.add("js-ready");

        const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return () => {
                root.classList.remove("js-ready");
            };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
            root.classList.remove("js-ready");
        };
    }, []);

    return null;
}
