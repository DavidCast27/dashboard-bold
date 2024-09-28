import {InfoOutlineIcon} from "@chakra-ui/icons";
import {
  Button,
  Hide,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Tooltip
} from "@chakra-ui/react";

const TotalSalesTooltip = () => {
  const text = "El total de ventas es la sumatoria de todas las transacciones exitosas, sin tener en cuenta la deduccion de Bold"
  return (
    <>
      <Show above="md">
        <Tooltip hasArrow label={text}>
          <InfoOutlineIcon boxSize={5} color="bold-light-gray"/>
        </Tooltip>
      </Show>
      <Hide above="md">
        <Popover>
          <PopoverTrigger>
            <IconButton
              isRound
              colorScheme='white'
              aria-label="tooltip"
              boxSize={5}
              icon={<InfoOutlineIcon />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody color="bold-dark-gray">{text}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Hide>
    </>
  );
};

export default TotalSalesTooltip;