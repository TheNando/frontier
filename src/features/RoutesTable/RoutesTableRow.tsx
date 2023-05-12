import { Table } from "flowbite-react";
import { useAtom } from "jotai";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import { Route, selectedRouteAtom } from "./routes";

type TProps = {
  route: Route;
};

function RoutesTableRow({ route }: TProps) {
  const [selectedRoute, setSelectedRoute] = useAtom(selectedRouteAtom);

  const isExpanded = route === selectedRoute;

  const closeRoute = () => setSelectedRoute(null);
  const openRoute = () => setSelectedRoute(route);

  return (
    <>
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        onClick={isExpanded ? closeRoute : openRoute}
      >
        <Table.Cell>
          {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
        </Table.Cell>

        <Table.Cell>{route.app}</Table.Cell>

        <Table.Cell>{route.method}</Table.Cell>

        <Table.Cell>{route.path}</Table.Cell>
      </Table.Row>

      {isExpanded && (
        <tr>
          <td colSpan={4}>This route is open</td>
        </tr>
      )}
    </>
  );
}

export default RoutesTableRow;
