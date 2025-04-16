export default function useFetch() {
  async function fetchData<T>(url: string, options?: RequestInit) {
    const response = await fetch(url, options);
    if (response.ok) {
      return (await response.json()) as T;
    }
  }

  return {
    fetchData,
  };
}
