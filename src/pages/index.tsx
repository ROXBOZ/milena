import Layout from "@/components/Layout";
import { client } from "../../config/sanity";

export default function Home({ userProfile }: { userProfile: User }) {
  return <Layout userProfile={userProfile}>Homepage</Layout>;
}

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name}',
    );

    if (!userProfile) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userProfile,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
