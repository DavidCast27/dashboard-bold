import {createMultiStyleConfigHelpers} from "@chakra-ui/react";
import {tableAnatomy} from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const customStripedStyle = definePartsStyle((props) => ({
  tr: {
    'td, th': {
      background: 'transparent',
      borderBottomWidth: '1px',
      borderColor: props.colorMode === 'light' ? 'gray.200' : 'gray.700',
    },
    '&:nth-of-type(odd)': {
      'td:first-of-type': {
        borderLeftWidth: '4px',
        borderLeftColor: props.colorMode === 'light' ? 'bold-blue' : 'blue.600',
      }
    },
    '&:nth-of-type(even)': {
      'td:first-of-type': {
        borderLeftWidth: '4px',
        borderLeftColor: props.colorMode === 'light' ? 'gray.300' : 'gray.600',
      },
    },
  },
}));


export const tableTheme = defineMultiStyleConfig({
  variants:{
    customStriped: customStripedStyle
  }
})