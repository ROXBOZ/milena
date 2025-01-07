import React, { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import { PortableText } from "@portabletext/react";
import Portfolio from "@/components/Portfolio";
import { client } from "../../config/sanity";

export default function Page({
  settings,
  menus,
  currentPage,
}: {
  settings: Settings;
  menus: Menus[];
  currentPage: Page;
}) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(true);
  const lang = "fr";
  const isAboutPage =
    currentPage._id === "9861c21d-5452-42d2-9b2e-fab56f6b3e32";

  const CV = () => {
    const categoryTranslations: { [key: string]: { fr: string; en: string } } =
      {
        residence: { fr: "Résidences", en: "Residences" },
        formation: { fr: "Formations", en: "Trainings" },
        performance: { fr: "Performances", en: "Performances" },
        exhibition: { fr: "Expositions collectives", en: "Group exhibitions" },
        publication: { fr: "Publications", en: "Editorial" },
        scenography: { fr: "Scénographie", en: "Scenography" },
        scene: { fr: "Scène", en: "Scene" },
        workshop: { fr: "Workshops", en: "Workshops" },
      };

    const categories = Array.from(
      new Set(settings.cv.map((item) => item.category)),
    );

    return (
      <div className="mt-12 flex flex-col gap-6">
        {categories &&
          categories.map((category, index) => {
            const translatedCategory =
              categoryTranslations[
                category as keyof typeof categoryTranslations
              ]?.[lang] || category;

            return (
              <div
                key={index}
                className="border-t border-stone-400 pt-1 first:border-t-0 first:pt-0"
              >
                <h2 className="mb-3 font-semibold">{translatedCategory}</h2>
                <div className="flex flex-col gap-2">
                  {settings.cv &&
                    settings.cv.map(
                      (item, itemIndex: number) =>
                        item.category === category && (
                          <div key={itemIndex} className="grid grid-cols-3">
                            <div className="col-start-1">
                              {!item.year.end && <span>Depuis </span>}
                              <span>{item.year.start}</span>
                              {item.year.end &&
                                item.year.end !== item.year.start && (
                                  <span>–{item.year.end}</span>
                                )}
                            </div>
                            <h3 className="col-start-2 col-end-4">
                              {item.title[lang]}
                            </h3>
                          </div>
                        ),
                    )}
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <Layout
      settings={settings}
      isLoaderFinished={isLoaderFinished}
      setIsLoaderFinished={setIsLoaderFinished}
      menus={menus}
    >
      <div className="screen-margin mx-auto mb-48 mt-24 w-full max-w-[65ch]">
        <div>
          {currentPage.title &&
            currentPage.name &&
            currentPage.title[lang] !== currentPage.name[lang] && (
              <span className="text-xs font-semibold uppercase tracking-wider">
                {currentPage.name[lang]}
              </span>
            )}
          <h1 className="text-4xl">{currentPage.title[lang]}</h1>
        </div>

        {isAboutPage && settings.bio && (
          <div className="mt-12 flex flex-col gap-1">
            <PortableText value={settings.bio[lang]} />
          </div>
        )}

        {isAboutPage && settings.cv && <CV />}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const slugsFR: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.fr.current)].slug.fr.current`,
    );

    const slugsEN: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.en.current)].slug.en.current`,
    );

    const allSlugs = [
      ...slugsFR.filter(Boolean).map((slug) => ["fr", slug]),
      ...slugsEN.filter(Boolean).map((slug) => ["en", slug]),
    ];

    const paths = allSlugs.map(([locale, slug]) => ({
      params: { page: slug },
      locale,
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: { page: string };
  locale: string;
}) => {
  const slug = params.page;
  try {
    const currentPage = await client.fetch(
      `*[_type == "page" && slug[$locale].current == $slug && !(_id in path("drafts.**"))][0]{...}`,
      { slug, locale },
    );

    if (!currentPage) {
      console.error(`Page not found for slug: ${slug}, locale: ${locale}`);
      return { notFound: true };
    }
    const menus = await client.fetch('*[_type == "menus"]{headerMenu[]->}');
    const settings = await client.fetch('*[_type == "settings"][0]');

    return {
      props: {
        currentPage,
        settings,
        menus,
      },
    };
  } catch (error) {
    console.error("Error fetching or validating data:", error);
    return {
      notFound: true,
    };
  }
};
