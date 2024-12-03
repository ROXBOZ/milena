import Layout from "@/components/Layout";
import { client } from "../../config/sanity";

export default function Home({
  userProfile,
  generalInfo,
}: {
  userProfile: User;
  generalInfo: GeneralInfo;
}) {
  return (
    <Layout userProfile={userProfile} generalInfo={generalInfo}>
      Homepage
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name}',
    );
    const generalInfo = await client.fetch(
      '*[_type == "general"][0]{infoBanner}',
    );

    return {
      props: {
        userProfile,
        generalInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching or validating data:", error);
    return {
      notFound: true,
    };
  }
};
