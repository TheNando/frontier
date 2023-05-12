export const fetchJson = (url: string) =>
  fetch(url).then((response: Response) => response.json());
