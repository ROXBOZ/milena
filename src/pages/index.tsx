import Layout from "@/components/Layout";
import { client } from "../../config/sanity";

export default function Home({ settings }: { settings: Settings }) {
  return <Layout settings={settings}>Homepage</Layout>;
}

export const getStaticProps = async () => {
  try {
    const settings = await client.fetch('*[_type == "settings"][0]');

    return {
      props: {
        settings,
      },
    };
  } catch (error) {
    console.error("Error fetching or validating data:", error);
    return {
      notFound: true,
    };
  }
};
