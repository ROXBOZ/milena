import React, { useState } from "react";

import Layout from "@/components/Layout";
import Portfolio from "@/components/Portfolio";
import { client } from "../../config/sanity";

export default function Home({
  settings,
  projects,
}: {
  settings: Settings;
  projects: Project[];
}) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <Layout
      settings={settings}
      isLoaderFinished={isLoaderFinished}
      setIsLoaderFinished={setIsLoaderFinished}
    >
      {isLoaderFinished && <Portfolio projects={projects} />}
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const settings = await client.fetch('*[_type == "settings"][0]');
    const projects = await client.fetch('*[_type == "project"]');

    return {
      props: {
        settings,
        projects,
      },
    };
  } catch (error) {
    console.error("Error fetching or validating data:", error);
    return {
      notFound: true,
    };
  }
};
