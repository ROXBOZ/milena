import React, { useState } from "react";

import Layout from "@/components/Layout";
import { client } from "../../../config/sanity";

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
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <Layout
      settings={settings}
      isLoaderFinished={isLoaderFinished}
      setIsLoaderFinished={setIsLoaderFinished}
      menus={menus}
    >
      {currentProject.title[lang]}
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
      *[_type == "project" && slug[$locale].current == $slug && !(_id in path("drafts.**"))]{...}
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
