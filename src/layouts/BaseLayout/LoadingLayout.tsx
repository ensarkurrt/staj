import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
type Props = {
  children: React.ReactNode;
};
const LoadingLayout: FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  var { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!loading && (user || router.pathname.includes("auth")) ? children : <InfinitySpin width="200" color="#4fa94d" />}
    </>
  );
};

export default LoadingLayout;
