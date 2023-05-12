import { useAtom } from "jotai";
import { Pagination } from "flowbite-react";

import { currentPageAtom } from "./routes";

type TProps = {
  totalPages: number;
};

function RoutesTablePagination({ totalPages }: TProps) {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  return (
    <Pagination
      currentPage={currentPage}
      layout="pagination"
      onPageChange={setCurrentPage}
      showIcons={true}
      totalPages={totalPages}
    />
  );
}

export default RoutesTablePagination;
