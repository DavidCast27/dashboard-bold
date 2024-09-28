import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useSearchStore} from "../../../../stores/use-search.store.ts";


const SearchInput = () => {
  const search = useSearchStore(state => state.search);
  const changeSearch = useSearchStore(state => state.changeSearch);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input variant='flushed' placeholder='Buscar' value={search} onChange={(e) => changeSearch(e.target.value)} />
    </InputGroup>
  );
};

export default SearchInput;