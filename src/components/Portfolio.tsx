import React, { useEffect } from "react";

import Image from "next/image";
import { Span } from "next/dist/trace";
import gsap from "gsap";
import { useSanityImage } from "../../config/sanity";

function Portfolio({ projects }: { projects: Project[] }) {
  const lang = "fr";
  useEffect(() => {
    gsap.fromTo(
      ".project",
      {
        opacity: 0,
      },
      {
        delay: 1,
        duration: 1,
        opacity: 1,
        stagger: 0.2,
      },
    );
  }, []);

  const SanityImage = ({
    image,
    alt,
    lang,
  }: {
    image: any;
    alt: { fr: string; en: string };
    lang: "fr" | "en";
  }) => {
    const imageProps = useSanityImage(image);
    if (!imageProps || !imageProps.src) {
      console.error("Image props are undefined or null", image);
      return null;
    }
    return (
      <Image
        {...imageProps}
        blurDataURL={image.asset.metadata.lqip}
        alt={alt[lang]}
        placeholder="blur"
        width={2000}
        height={1000}
      />
    );
  };
  const ProjectLabel = ({
    title,
    categories,
    year,
  }: {
    title: { fr: string; en: string };
    categories: any;
    year: { start: number; end: number };
  }) => {
    const categoryTranslations: {
      [key: string]: { fr: string; en: string };
    } = {
      performance: { fr: "performance", en: "performance" },
      dessin: { fr: "dessin", en: "drawing" },
      verre: { fr: "verre", en: "glass" },
    };
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent px-4 pb-2 pt-8">
        <h2 className="font-semibold text-slate-50">{title[lang]}</h2>
        <div className="flex items-baseline justify-between text-sm text-slate-300">
          {categories && (
            <p>
              {categories
                .map((category: string, index: number) => {
                  const categoryName =
                    categoryTranslations[category]?.[lang] || category;
                  return index === 0
                    ? categoryName.charAt(0).toUpperCase() +
                        categoryName.slice(1)
                    : categoryName.toLowerCase();
                })
                .join(", ")}
            </p>
          )}
          {year && (
            <p>
              {!year.end && <span>Depuis </span>}
              {year.start}
              {year.end && year.end !== year.start && <span>-{year.end}</span>}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen h-full flex-1 bg-slate-50 py-3">
      <h1 className="sr-only">Porfolio Milena Buckel</h1>
      <div className="scrollbar-hide flex h-full gap-3 overflow-x-scroll">
        {projects.map((project: Project, index: number) => {
          return (
            <div
              key={index}
              className="project group relative flex aspect-[2/3] h-full shrink-0 overflow-hidden bg-slate-950"
            >
              {/* <div className="absolute bottom-0 right-0 z-30 -translate-y-12 translate-x-8 -rotate-90 bg-black/50 p-1 text-xs text-white">
                ©{project.cover.copyright}
              </div> */}
              <div className="absolute left-0 top-0 z-20 transition-all delay-300 duration-500 group-hover:opacity-0">
                <SanityImage
                  image={project.cover.image}
                  alt={project.cover.alt}
                  lang={lang}
                />
              </div>
              <div className="absolute left-0 top-0 z-10">
                <ProjectLabel
                  title={project.title}
                  categories={project.categories}
                  year={project.year}
                />
                <SanityImage
                  lang={lang}
                  image={project.cover.hoverImage}
                  alt={project.cover.alt}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;
