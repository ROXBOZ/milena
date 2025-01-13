import { SanityImage, categoryTranslations } from "@/components/Portfolio";

import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
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

  return (
    <Layout settings={settings} menus={menus}>
      <div className="flex min-h-fit flex-col px-3">
        <div className="relative flex min-w-full flex-col pt-3">
          <div className="h-[60ch] overflow-hidden">
            <SanityImage
              image={currentProject.cover.image}
              alt={currentProject.cover.alt}
              lang={lang}
              copyright={currentProject.cover.copyright}
            />
          </div>
          <span className="text-right text-xs italic">
            © {currentProject.cover.copyright}
          </span>
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
          {currentProject.soldItem &&
            currentProject.soldItem.itemTitle &&
            currentProject.soldItem.itemTitle[lang] && (
              <div className="bg-stone-950 px-6 pb-6 pt-4 text-stone-50">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">
                      {currentProject.soldItem.itemTitle[lang]}
                    </h2>
                    {currentProject.soldItem.itemDescription && (
                      <p>{currentProject.soldItem.itemDescription[lang]}</p>
                    )}
                  </div>
                  {currentProject.soldItem.sellers && (
                    <div>
                      <h3 className="font-semibold">
                        {lang === "fr" ? "Points de vente" : "Store Locations"}
                      </h3>
                      <ul>
                        {currentProject.soldItem.sellers.map(
                          (seller, index: number) => {
                            return (
                              <li key={index} className="list-inside list-disc">
                                <Link
                                  className="border-b border-stone-50 delay-300 hover:border-transparent hover:transition-all"
                                  href={seller.url}
                                >
                                  {seller.name[lang]}
                                </Link>
                                , <span>{seller.city[lang]}</span>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  )}

                  {currentProject.soldItem.orderPerEmail === true && (
                    <Link
                      className="w-fit bg-stone-50 px-3 py-2 text-stone-950 ring-inset hover:ring-4 hover:ring-stone-200 hover:transition-all active:bg-stone-200"
                      href={`mailto:${settings.email}?subject=${currentProject.soldItem.email.subject[lang]} website&body=${currentProject.soldItem.email.message[lang]}`}
                    >
                      {lang === "fr" ? "Commander par email" : "Order by email"}
                    </Link>
                  )}
                </div>
              </div>
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
        {/* <div className="mx-auto mb-24 mt-12 flex w-full max-w-[65ch] flex-col bg-red-200">
          {currentProject.longDescription && (
            <>
              <span className="mb-6 text-xs text-red-700">
                sera mise en page plus tard, quand je verrai le type de contenu
                qu’on met là
              </span>
              <PortableText value={currentProject.longDescription[lang]} />
            </>
          )}
        </div> */}
        {/* {currentProject.gallery && (
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
        )} */}
        <div className="mx-auto mb-24 mt-12 flex w-full max-w-[65ch] flex-col gap-6">
          {currentProject.techniques && (
            <div className="mt-3 flex items-baseline gap-3 pt-1">
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
          )}
          {currentProject.performances && (
            <div className="mt-3 flex items-baseline gap-3 border-t border-stone-400 pt-1 first:border-t-0 first:pt-0">
              <div className="flex-1 font-semibold">
                {currentProject.categories &&
                currentProject.categories.includes("performance")
                  ? "Performances"
                  : "Évènements"}
              </div>
              <div className="flex w-fit flex-1 flex-col">
                {currentProject.performances &&
                  currentProject.performances.map(
                    (performance, index: number) => {
                      const currentDate = new Date();

                      return (
                        <div key={index} className="mb-3 flex flex-col">
                          {performance.title && performance.title[lang] && (
                            <span className="font-semibold">
                              {performance.title[lang]}
                            </span>
                          )}

                          <span>
                            {performance.location}, {performance.city}
                          </span>
                          <span>
                            {performance.dates &&
                              performance.dates.map(
                                (date: string, index: number) => {
                                  const performanceDate = new Date(date);
                                  const isPastDate =
                                    performanceDate < currentDate;
                                  return (
                                    <span
                                      key={index}
                                      className={`${isPastDate && "opacity-45"}`}
                                    >
                                      {formatDateToFrench(date)}
                                    </span>
                                  );
                                },
                              )}
                          </span>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          )}

          {currentProject.contributors && (
            <div className="mt-3 flex items-baseline gap-3 border-t border-stone-400 pt-1">
              <div className="flex-1 font-semibold">Distribution</div>
              <div className="w-fit flex-1">
                {currentProject.contributors &&
                  currentProject.contributors.map(
                    (contributor: Contributor, index: number) => {
                      return (
                        <div key={index} className="mb-3 leading-tight">
                          <div className="font-semibold">
                            <span className="whitespace-nowrap">
                              {contributor.name}
                            </span>
                            {contributor.company && (
                              <span>({contributor.company})</span>
                            )}
                          </div>

                          <div>
                            {contributor.roles &&
                              contributor.roles.map(
                                (role: Role, index: number) => {
                                  return (
                                    <span
                                      key={index}
                                      className={`${lang === "fr" && index !== 0 && "lowercase"}`}
                                    >
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
          )}
          {currentProject.supporters && (
            <div className="mt-3 flex items-baseline gap-3 border-t border-stone-400 pt-1">
              <div className="flex-1 font-semibold">Soutiens financiers</div>
              <div className="w-fit flex-1">
                {currentProject.supporters &&
                  currentProject.supporters.map((supporter, index: number) => {
                    return (
                      <span key={index} className="">
                        <span>{supporter}</span>
                        {index < currentProject.supporters.length - 1 && ", "}
                      </span>
                    );
                  })}
              </div>
            </div>
          )}

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
      *[_type == "project" && slug[$locale].current == $slug && !(_id in path("drafts.**"))]{..., soldItem, gallery[]{..., image{..., asset->{..., metadata{lqip}}}}, cover{..., image{..., asset->{..., metadata {..., lqip}}},  hoverImage{..., asset->{..., metadata {..., lqip}}}}}
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
