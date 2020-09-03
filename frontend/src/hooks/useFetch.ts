import {useState, useEffect} from 'react';

interface UseFetchInterface {
  error: boolean;
  loading: boolean;
  results: any;
}

export const useFetch = (url: string, token: string = '') => {
  const [data, updateData] = useState<UseFetchInterface>({
    error: false,
    loading: true,
    results: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const headers =
          token !== ''
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {};
        const response = await fetch(url, headers);
        const json = await response.json();
        if (json.error) {
          updateData({
            error: true,
            loading: false,
            results: [],
          });
        } else {
          updateData({
            error: false,
            loading: false,
            results: json,
          });
        }
      } catch (e) {
        updateData({
          error: true,
          loading: false,
          results: [],
        });
      }
    }
    fetchData();
  }, [url, token]);
  return data;
};
