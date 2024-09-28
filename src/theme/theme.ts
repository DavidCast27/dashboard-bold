import {extendTheme} from "@chakra-ui/react";
import fonts from "./font.theme.ts";
import {tableTheme} from "./components/table.theme.ts";

const colors = {
  'bold-blue': '#121E6C',
  'bold-red': '#EE424E',
  'bold-dark-gray': '#606060',
  'bold-light-gray': '#F3F3F3',
  'bold-background': '#F6F4F9',
}

export const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      'html, body': {
        background: 'bold-background',
      }
    }
  },
  components: {
    Table: tableTheme
  }
})