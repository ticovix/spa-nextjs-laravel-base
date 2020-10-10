import api from 'services/api';
import useSWR from 'swr';

const useFetch = (uri, initialData, { ...options }) => {
  const { data, error, mutate } = useSWR(
    uri,
    async (uri) => {
      const response = await api().get(uri);

      return response.data;
    },
    {
      initialData: initialData,
      ...options,
    }
  );

  return { data, error, mutate };
};

export default useFetch;
