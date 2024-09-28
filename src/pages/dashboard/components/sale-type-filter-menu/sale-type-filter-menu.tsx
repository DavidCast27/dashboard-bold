import {
  Button, Checkbox, CheckboxGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter,
  PopoverHeader,
  PopoverTrigger, Stack, useDisclosure
} from "@chakra-ui/react";
import {SalesType} from "../../../../types/types.ts";
import {ChangeEvent, useState} from "react";
import {useFiltersStore} from "../../../../stores/use-filters.store.ts";

const SaleTypeFilterMenu = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  const changeSaleType = useFiltersStore((state)=> state.changeSaleType)
  const salesType =useFiltersStore(state => state.salesType)
  const [checkedItems, setCheckedItems] = useState<SalesType[]>(salesType)

  const onChange = (value: SalesType[]) => setCheckedItems(value)
  const onChangeAll = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.checked) return setCheckedItems([])
    setCheckedItems([SalesType.TERMINAL, SalesType.PAYMENT_LINK])
  }

  const onSubmit = ()=> {
    changeSaleType(checkedItems)
    onToggle()
  }

  const allChecked = checkedItems.length === 2
  const isIndeterminate = checkedItems.length > 0 && checkedItems.length < 2

  return (
    <Popover
      isLazy
      placement="bottom-end"
      isOpen={isOpen}
      onClose={onClose}>
      <PopoverTrigger>
        <Button bgColor="white" color="bold-blue" w={{base:"full", md:"auto"}} onClick={onToggle}>Filtrar</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader textAlign="center" borderBottomWidth={0}>Filtrar</PopoverHeader>
        <PopoverBody >
          <CheckboxGroup colorScheme='red' size="lg" onChange={onChange} value={checkedItems}>
            <Stack>
              <Checkbox
                spacing={4}
                value={SalesType.TERMINAL}
              >
                Cobro con datáfono
              </Checkbox>
              <Checkbox spacing={4} value={SalesType.PAYMENT_LINK}>Cobro con link de pago</Checkbox>
              <Checkbox
                spacing={4}
                onChange={onChangeAll}
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
              >
                Ver todos
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </PopoverBody>
        <PopoverFooter borderTopWidth={0}>
          <Button bgColor="bold-red" color="bold-light-gray" w="full" rounded="3xl" onClick={onSubmit}>
            Aplicar
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default SaleTypeFilterMenu;