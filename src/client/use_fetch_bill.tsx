import * as React from "react";
import { Bills } from "../typings/LoginType";

export const useFetchBills = (): {
  refetch: () => void;
  loading: boolean;
  state: Bills[];
} => {
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState([]);

  const refetch = () => {
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://deliver-api.cescoferraro.xyz/api/bills"
        : "http://localhost:4000/api/bills"
    )
      .then((response) => response.json())
      .then((result: Bills[]) => {
        console.log(result);
        setState(result);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    refetch();
  }, []);
  return { loading, state, refetch };
};
