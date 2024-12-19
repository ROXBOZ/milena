import React, { useState } from "react";
import { SanityImage, categoryTranslations } from "@/components/Portfolio";

import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
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
      <div className="flex min-h-fit flex-col">
        <div className="relative flex h-[60ch] min-w-full overflow-hidden p-3">
          <Image
            className="absolute bottom-0 right-0 w-20 pb-1 pr-5"
            alt=""
            width={500}
            height={500}
            src="../milena_w.svg"
            priority
          />
          <SanityImage
            image={currentProject.cover.image}
            alt={currentProject.cover.alt}
            lang={lang}
            copyright={currentProject.cover.copyright}
          />
        </div>
        <div className="mx-auto my-12 flex w-full max-w-[65ch] flex-col gap-6">
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
                className="w-fit border-b border-slate-800 font-semibold transition-all delay-300 hover:border-transparent"
                target="_blank"
                href={currentProject.externalLink.url}
              >
                {currentProject.externalLink.label[lang]}
              </Link>
            )}
          {currentProject.video && currentProject.video.url && (
            <iframe
              width="full"
              height="400"
              className="my-12"
              src={currentProject.video.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          <div className="mt-9">
            <div className="mt-3 flex gap-3 border-t border-slate-800 pt-1">
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
            <div className="mt-3 flex gap-3 border-t border-slate-800 pt-1">
              <div className="flex-1 font-semibold">Distribution</div>
              <div className="w-fit flex-1">
                {currentProject.contributors &&
                  currentProject.contributors.map(
                    (contributor: Contributor, index: number) => {
                      return (
                        <div key={index} className="flex gap-1">
                          <span>{contributor.name}</span>
                          {contributor.company && (
                            <span>({contributor.company})</span>
                          )}
                          <span>:</span>

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
            <div className="mt-3 flex gap-3 border-t border-slate-800 pt-1">
              <div className="flex-1 font-semibold">Avec le soutien de</div>
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
          </div>

          {currentProject.acknowledgements && (
            <div className="mt-3 border-t border-slate-800 pt-1">
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
      *[_type == "project" && slug[$locale].current == $slug && !(_id in path("drafts.**"))]{..., cover{..., image{..., asset->{..., metadata {..., lqip}}},  hoverImage{..., asset->{..., metadata {..., lqip}}}}}
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
