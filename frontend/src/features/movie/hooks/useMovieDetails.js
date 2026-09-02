import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";

const useMovieDetails = (id) =>
  useQuery({
    queryKey: ["movie-details", id],
    queryFn: ({ signal }) =>
      apiRequest({
        endpoint: `movies/${id}`,
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });

export default useMovieDetails;
