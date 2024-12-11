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
  menus: { headerMenu: any }[];
}) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

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
    const settings = await client.fetch('*[_type == "settings"][0]');
    const projects = await client.fetch(
      '*[_type == "project"]{..., cover{..., image{..., asset->{..., metadata {..., lqip}}},  hoverImage{..., asset->{..., metadata {..., lqip}}}}}',
    );
    const menus = await client.fetch('*[_type == "menus"]{headerMenu[]->}');
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
