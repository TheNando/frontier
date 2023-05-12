import { atom } from "jotai";
import { fetchJson } from "../../lib/api";

const STAGING_ROUTES_URL = "staging/v2/frontends";
const PROD_ROUTES_URL = "prod/v2/frontends";

type RouteRaw = {
  BackendId: string;
  Id: string;
  Route: string;
  Type: string;
};

export type Route = {
  app: string;
  host: string;
  id: string;
  method: string;
  name: string;
  path: string;
};

type RouteResponse = {
  Frontends: RouteRaw[];
};

export const PAGE_LIMIT = 10;

export const currentPageAtom = atom(1);
export const filterAtom = atom("");
export const searchAtom = atom("");
export const selectedRouteAtom = atom<Route | null>(null);

export const dataFromRoutes = ({ Frontends }: RouteResponse) =>
  Frontends.map((item) => {
    const [hostStr, methodStr, pathStr] = item.Route.split(" && ");

    const app = item.BackendId;
    const host = hostStr.split('"')[1];
    const method = methodStr.split('"')[1];
    const path = pathStr.split('"')[1];

    const route: Route = {
      app: item.BackendId,
      host,
      id: `${app} ${host} ${path} ${method}`,
      method,
      name: `${app} - [${method}] ${path}`,
      path,
    };

    return route;
  }).sort((a, b) => (a.id > b.id ? 1 : -1));

export const getFilterOptions = (routes?: Route[]) => {
  return routes ? [...new Set(routes?.map((route) => route.host))].sort() : [];
};

export const getRoutes = async () => {
  try {
    return await fetchJson(STAGING_ROUTES_URL);
  } catch (error) {
    return fetchJson(PROD_ROUTES_URL);
  }
};
