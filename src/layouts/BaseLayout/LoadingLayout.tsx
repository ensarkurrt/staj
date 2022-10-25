import { useAuthContext } from "@/context/AuthContext";
import { FC, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
type Props = {
  children: React.ReactNode;
};
const LoadingLayout: FC<Props> = ({ children }: Props) => {
  var { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{!loading && user ? children : <InfinitySpin width="200" color="#4fa94d" />}</>;
};

export default LoadingLayout;
