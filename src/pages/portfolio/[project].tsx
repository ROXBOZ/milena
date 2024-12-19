import React, { useState } from "react";
import { SanityImage, categoryTranslations } from "@/components/Portfolio";

import Layout from "@/components/Layout";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "../../../config/sanity";

export function formatDuration(duration: string): string {
  const [hours, minutes, seconds] = duration.split(":");

  const formattedDuration =
    hours === "00"
      ? `${parseInt(minutes, 10)}min.${parseInt(seconds, 10)}`
      : `${parseInt(hours, 10)}h${parseInt(minutes, 10)}min.${parseInt(seconds, 10)}`;

  return formattedDuration;
}

export function formatDateToFrench(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Chaîne de date invalide");
  }

  return date.toLocaleDateString("fr-FR", {
    weekday: "long", // jour de la semaine
    year: "numeric", // année
    month: "long", // mois
    day: "numeric", // jour
    hour: "2-digit", // heures
    minute: "2-digit", // minutes
  });
}

function Project({
  menus,
  settings,
  currentProject,
}: {
  settings: Settings;
  currentProject: Project;
  menus: Menus[];
}) {
  const lang = "fr";
  const [isLoaderFinished, setIsLoaderFinished] = useState(true);

  return (
    <Layout
      settings={settings}
      isLoaderFinished={isLoaderFinished}
      setIsLoaderFinished={setIsLoaderFinished}
      menus={menus}
    >
      <div className="flex min-h-fit flex-col px-3">
        <div className="relative flex h-[60ch] min-w-full overflow-hidden pt-3">
          <SanityImage
            image={currentProject.cover.image}
            alt={currentProject.cover.alt}
            lang={lang}
            copyright={currentProject.cover.copyright}
          />
        </div>
        <div className="mx-auto mb-12 mt-24 flex w-full max-w-[65ch] flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl">{currentProject.title[lang]}</h1>
            <div className="flex gap-3">
              <div className="flex-1">
                {currentProject.categories && (
                  <span className="w-full">
                    {currentProject.categories
                      .map((category: string, index: number) => {
                        const categoryName =
                          categoryTranslations[category]?.[lang] || category;

                        return index === 0
                          ? categoryName.charAt(0).toUpperCase() +
                              categoryName.slice(1)
                          : categoryName.toLowerCase();
                      })
                      .join(", ")}
                  </span>
                )}
              </div>
              <div className="flex flex-1 gap-6">
                {currentProject.duration && (
                  <div className="flex min-w-fit">
                    {formatDuration(currentProject.duration)}
                  </div>
                )}
                {currentProject.year && (
                  <div className="flex gap-1">
                    {!currentProject.year.end && <span>Depuis </span>}
                    <div>
                      <span>{currentProject.year.start}</span>
                      {currentProject.year.end &&
                        currentProject.year.end !==
                          currentProject.year.start && (
                          <span>-{currentProject.year.end}</span>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {currentProject.shortDescription && (
            <div>{currentProject.shortDescription[lang]}</div>
          )}
          {currentProject.externalLink?.url &&
            currentProject.externalLink?.label && (
              <Link
                className="w-fit border-b border-stone-400 font-semibold transition-all delay-300 hover:border-transparent"
                target="_blank"
                href={currentProject.externalLink.url}
              >
                {currentProject.externalLink.label[lang]}
              </Link>
            )}
        </div>
        {currentProject.video && currentProject.video.url && (
          <iframe
            width="auto"
            height="auto"
            className="mx-auto my-12 aspect-video w-[66vw]"
            src={currentProject.video.url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        <div className="mx-auto mb-24 mt-12 flex w-full max-w-[65ch] flex-col gap-6">
          {currentProject.longDescription && (
            <PortableText value={currentProject.longDescription[lang]} />
          )}
        </div>
        {currentProject.gallery && (
          <div className="max-w-1/3 bg-green-500">
            Ici il faut uploader les images pour chaque projet pour que je voie
            comment les afficher
            <div className="flex flex-wrap gap-3">
              {currentProject.gallery.map((figure: Figure, index: number) => {
                return (
                  <div key={index} className="flex-1">
                    {figure.image && (
                      <SanityImage
                        image={figure.image}
                        alt={figure.alt}
                        lang={lang}
                        copyright={figure.copyright}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mx-auto mb-24 mt-12 flex w-full max-w-[65ch] flex-col gap-6">
          <div className="mt-3 flex gap-3 pt-1">
            <div className="flex-1 font-semibold">Techniques</div>
            <div className="w-fit flex-1">
              {currentProject.techniques &&
                currentProject.techniques.map((technique, index: number) => {
                  return (
                    <span key={index}>
                      {technique[lang]}
                      {index < currentProject.techniques.length - 1 && ", "}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="mt-3 flex gap-3 border-t border-stone-400 pt-1">
            <div className="flex-1 font-semibold">Représentations</div>
            <div className="flex w-fit flex-1 flex-col">
              {currentProject.performances &&
                currentProject.performances.map(
                  (performance, index: number) => {
                    return (
                      <div key={index} className="mb-3 flex flex-col">
                        <span>
                          {performance.location}, {performance.city}
                        </span>
                        <span>
                          {performance.dates &&
                            performance.dates.map(
                              (date: string, index: number) => (
                                <span key={index}>
                                  {formatDateToFrench(date)}
                                </span>
                              ),
                            )}
                        </span>
                      </div>
                    );
                  },
                )}
            </div>
          </div>

          <div className="mt-3 flex gap-3 border-t border-stone-400 pt-1">
            <div className="flex-1 font-semibold">Distribution</div>
            <div className="w-fit flex-1">
              {currentProject.contributors &&
                currentProject.contributors.map(
                  (contributor: Contributor, index: number) => {
                    return (
                      <div
                        key={index}
                        className="mb-3 flex flex-col gap-1 leading-tight md:flex-row"
                      >
                        <div>
                          <span>{contributor.name}</span>
                          {contributor.company && (
                            <span>({contributor.company})</span>
                          )}
                          <span>:</span>
                        </div>

                        <div>
                          {contributor.roles &&
                            contributor.roles.map(
                              (role: Role, index: number) => {
                                return (
                                  <span key={index}>
                                    {role[lang]}
                                    {index < contributor.roles.length - 1 &&
                                      ", "}
                                  </span>
                                );
                              },
                            )}
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          </div>
          <div className="mt-3 flex gap-3 border-t border-stone-400 pt-1">
            <div className="flex-1 font-semibold">Soutiens financiers</div>
            <div className="w-fit flex-1">
              {currentProject.supporters &&
                currentProject.supporters.map((supporter, index: number) => {
                  return (
                    <span key={index}>
                      {supporter}
                      {index > 0 && index < supporter.length - 1 && ", "}
                    </span>
                  );
                })}
            </div>
          </div>
          {currentProject.acknowledgements && (
            <div className="mt-3 pt-1 text-sm">
              {currentProject.acknowledgements[lang]}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Project;

export async function getStaticPaths() {
  try {
    const slugsFR: string[] = await client.fetch(
      `*[_type == "project" && defined(slug.fr)].slug.fr.current`,
    );

    const slugsEN: string[] = await client.fetch(
      `*[_type == "project" && defined(slug.en)].slug.en.current`,
    );

    const allSlugs = [
      ...slugsFR.filter(Boolean).map((slug) => ["fr", slug]),
      ...slugsEN.filter(Boolean).map((slug) => ["en", slug]),
    ];

    const paths = allSlugs.map((slug) => ({
      params: {
        project: slug[1],
      },
      locale: slug[0],
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      fallback: false,
      paths: [],
    };
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: { project: string };
  locale: string;
}) => {
  const { project } = params;

  try {
    const menus = await client.fetch('*[_type == "menus"]{headerMenu[]->}');
    const settings = await client.fetch('*[_type == "settings"][0]');
    const query = `
      *[_type == "project" && slug[$locale].current == $slug && !(_id in path("drafts.**"))]{..., gallery[]{..., image{..., asset->{..., metadata{lqip}}}}, cover{..., image{..., asset->{..., metadata {..., lqip}}},  hoverImage{..., asset->{..., metadata {..., lqip}}}}}
    `;

    const currentProject: Project[] = await client.fetch(query, {
      slug: project,
      locale,
    });

    return {
      props: {
        menus,
        settings,
        currentProject: currentProject[0] || null, // Ensure there is a valid current project or null
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { profile: { tagline: "" } },
    };
  }
};
