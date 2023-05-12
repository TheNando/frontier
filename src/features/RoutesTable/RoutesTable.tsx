import { Card, Table } from "flowbite-react";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useQuery } from "react-query";

import {
  currentPageAtom,
  dataFromRoutes,
  filterAtom,
  getFilterOptions,
  getRoutes,
  PAGE_LIMIT,
  searchAtom,
} from "./routes";
import RoutesTableControls from "./RoutesTableControls";
import RoutesTablePagination from "./RoutesTablePagination";
import RoutesTableRow from "./RoutesTableRow";

function RoutesTable() {
  const currentPage = useAtomValue(currentPageAtom);
  const filter = useAtomValue(filterAtom);
  const search = useAtomValue(searchAtom);

  const { data, isSuccess } = useQuery("routes", getRoutes, {
    select: dataFromRoutes,
  });

  const filterOptions = useMemo(() => getFilterOptions(data), [data]);

  if (!isSuccess) {
    return null;
  }

  const filtered =
    data?.filter(
      (item) =>
        (!filter || filter === item.host) &&
        (!search || item.id.includes(search))
    ) || [];

  const totalPages = Math.floor(filtered.length / PAGE_LIMIT + 0.5);
  const start = (currentPage - 1) * PAGE_LIMIT;
  const paginated = filtered.slice(start, start + PAGE_LIMIT);

  return (
    <Card className="m-4">
      <RoutesTableControls options={filterOptions} />

      <Table className="shadow-md" hoverable>
        <Table.Head>
          <Table.HeadCell />
          <Table.HeadCell>App</Table.HeadCell>
          <Table.HeadCell>Method</Table.HeadCell>
          <Table.HeadCell>Path</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y overflow-scroll">
          {paginated.map((route) => (
            <RoutesTableRow key={route.id.toString()} route={route} />
          ))}
        </Table.Body>
      </Table>

      <RoutesTablePagination totalPages={totalPages} />
    </Card>
  );
}

export default RoutesTable;
