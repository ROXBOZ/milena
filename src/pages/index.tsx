import React, { useState } from "react";

import Layout from "@/components/Layout";
import Portfolio from "@/components/Portfolio";
import { client } from "../../config/sanity";

export default function Home({
  settings,
  projects,
  menus,
}: {
  settings: Settings;
  projects: Project[];
  menus: Menus[];
}) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  console.log("menus home", menus);
  return (
    <Layout
      settings={settings}
      isLoaderFinished={isLoaderFinished}
      setIsLoaderFinished={setIsLoaderFinished}
      menus={menus}
    >
      {isLoaderFinished && <Portfolio projects={projects} />}
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const menus = await client.fetch('*[_type == "menus"]{headerMenu[]->}');
    const settings = await client.fetch('*[_type == "settings"][0]');
    const projects = await client.fetch(
      '*[_type == "project"]{..., cover{..., image{..., asset->{..., metadata {..., lqip}}},  hoverImage{..., asset->{..., metadata {..., lqip}}}}}',
    );
    return {
      props: {
        settings,
        projects,
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
