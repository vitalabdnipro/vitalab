import useSWR from "swr";
import fetcher from "../lib/fetcher";

//todo разобраться
function useUser(id) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
