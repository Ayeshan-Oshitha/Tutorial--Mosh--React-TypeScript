import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by:
      </MenuButton>
      <MenuList>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Date Added</MenuItem>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Relevance</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
