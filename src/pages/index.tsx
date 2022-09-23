
import { useAuthContext } from "@/context/AuthContext";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  const { user }  = useAuthContext();
  return (
    <div>
      {user ? (
          <div> {user} </div>
      ) : (
        <div>Checking Session...</div>
      )}
    </div>
  );
};

export default HomePage;
