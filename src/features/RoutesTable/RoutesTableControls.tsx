import { Dropdown, TextInput } from "flowbite-react";
import { useAtom, useSetAtom } from "jotai";
import { HiFunnel, HiMagnifyingGlass } from "react-icons/hi2";

import { filterAtom, searchAtom } from "./routes";
import { debounce } from "../../lib/functional";

type TProps = {
  options: string[];
};

const DISPLAY_MAP: Record<string, string> = {
  "": "All",
  localhost: "Protected",
};

const getDisplayOption = (option: string) => DISPLAY_MAP[option] || option;

function RoutesTableControls({ options }: TProps) {
  const [filter, setFilter] = useAtom(filterAtom);
  const setSearch = useSetAtom(searchAtom);
  const debouncedSetSearch = debounce(setSearch, 300);

  const setFilterWithValue = (value: string) => () => setFilter(value);

  return (
    <div className="flex items-center justify-between">
      <Dropdown
        arrowIcon={false}
        label={
          <>
            <HiFunnel />
            &nbsp;{getDisplayOption(filter)}
          </>
        }
        placement="right-start"
        size="sm"
      >
        <Dropdown.Item onClick={setFilterWithValue("")}>All</Dropdown.Item>

        {options.map((option) => (
          <Dropdown.Item key={option} onClick={setFilterWithValue(option)}>
            {getDisplayOption(option)}
          </Dropdown.Item>
        ))}
      </Dropdown>

      <TextInput
        icon={HiMagnifyingGlass}
        onInput={(event) => debouncedSetSearch(event.currentTarget.value)}
        placeholder="Search Paths"
      />
    </div>
  );
}

export default RoutesTableControls;
