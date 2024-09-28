import { HStack, useRadioGroup} from '@chakra-ui/react';
import {DateType} from "../../../../types/types.ts";
import {useFiltersStore} from "../../../../stores/use-filters.store.ts";
import {dateFilterLabelMapper} from "../../../../utils/label-mappers.constants.ts";
import RadioItem from "./radio-item.tsx";


function DateFilterButtonGroup() {
  const changeDate = useFiltersStore(state=> state.changeDate)
  const options = [DateType.DAY, DateType.WEEK, DateType.MONTH]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'date-select',
    defaultValue: DateType.DAY,
    onChange: changeDate,
  })

  const group = getRootProps()

  return (
    <HStack {...group}  w="100%" bg="white"  rounded="xl" gap={0}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioItem key={value} {...radio}>
            {dateFilterLabelMapper[value]}
          </RadioItem>
        )
      })}
    </HStack>
  )
}

export default DateFilterButtonGroup;
