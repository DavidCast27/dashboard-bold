import {Box, Image, Text} from "@chakra-ui/react";
import logo from "../../assets/bold-white-logo.svg";


const Header = () => {
  return (
    <Box
      as="header"
      bgGradient="linear(to-r, bold-blue, bold-red)"
      px={{base:4, md:12}}
      py={{base:4, md:0}}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={["column", "row"]}
    >
      <Image src={logo} alt="logo" boxSize={20}/>
      <Box as="nav" display="flex" justifyContent="space-between" gap={6} textColor="bold-light-gray" >
        <Text>
          Mi negocio
        </Text>
        <Text>
          Ayuda
        </Text>
      </Box>
    </Box>
  );
};

export default Header;