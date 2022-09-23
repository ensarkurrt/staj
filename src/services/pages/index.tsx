import Layout from "@/components/App/layout";
import Feature from "@/components/Home/Feature";
import HowItWorks from "@/components/Home/HowItWorks";
import Landing from "@/components/Home/Landing";
import { useAuthContext } from "@/context/AuthContext";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  const { user } = useAuthContext();
  return (
    <div>
      {JSON.stringify(user)}
      {user ? (
        <Layout>
          <Landing />
          <HowItWorks />
          <Feature />
        </Layout>
      ) : (
        <div>Checking Session...</div>
      )}
    </div>
  );
};

export default HomePage;
