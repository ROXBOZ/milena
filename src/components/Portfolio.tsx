import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSanityImage } from "../../config/sanity";

export const SanityImage = ({
  image,
  alt,
  lang,
  copyright,
}: {
  image: {
    asset: {
      metadata: { lqip: string };
    };
  };
  alt: { fr: string; en: string };
  lang: "fr" | "en";
  copyright: string;
}) => {
  const imageProps = useSanityImage(image);

  if (!imageProps || !imageProps.src) {
    return null;
  }

  return (
    <figure className="h-full">
      <Image
        {...imageProps}
        blurDataURL={image.asset.metadata.lqip}
        alt={alt[lang]}
        placeholder="blur"
        width={3000}
        height={3000}
        className="h-full object-cover"
      />
      <label className="sr-only">© {copyright}</label>
    </figure>
  );
};

export const categoryTranslations: {
  [key: string]: { fr: string; en: string };
} = {
  performance: { fr: "performance", en: "performance" },
  dessin: { fr: "dessin", en: "drawing" },
  verre: { fr: "verre", en: "glass" },
};

function Portfolio({ projects }: { projects: Project[] }) {
  const lang = "fr";
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".project",
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       delay: 1,
  //       duration: 1,
  //       opacity: 1,
  //       stagger: 0.2,
  //     },
  //   );
  // }, []);

  const ProjectLabel = ({
    title,
    categories,
    year,
  }: {
    title: { fr: string; en: string };
    categories: string[];
    year: { start: number; end: number };
  }) => {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950 to-transparent px-4 pb-2 pt-8">
        <h2 className="font-semibold text-stone-50">{title[lang]}</h2>
        <div className="flex items-baseline justify-between text-stone-300">
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
    <div className="max-w-screen h-full flex-1 bg-stone-50 p-3">
      <h1 className="sr-only">Porfolio Milena Buckel</h1>
      <div className="scrollbar-hide flex h-full gap-3 overflow-x-scroll">
        {projects.map((project: Project, index: number) => {
          return (
            <Link key={index} href={`portfolio/${project.slug[lang].current}`}>
              <div className="project group relative flex aspect-[2/3] h-full shrink-0 overflow-hidden bg-red-500">
                <div
                  className={`absolute left-0 top-0 z-20 h-full transition-all delay-300 duration-500 group-hover:opacity-0`}
                >
                  <SanityImage
                    image={project.cover.image}
                    alt={project.cover.alt}
                    lang={lang}
                    copyright={project.cover.copyright}
                  />
                </div>
                <div className="absolute left-0 top-0 z-10 h-full">
                  <ProjectLabel
                    title={project.title}
                    categories={project.categories}
                    year={project.year}
                  />
                  {project.cover.hoverImage ? (
                    <SanityImage
                      lang={lang}
                      image={project.cover.hoverImage}
                      alt={project.cover.alt}
                      copyright={project.cover.copyright}
                    />
                  ) : (
                    <SanityImage
                      image={project.cover.image}
                      alt={project.cover.alt}
                      lang={lang}
                      copyright={project.cover.copyright}
                    />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;
