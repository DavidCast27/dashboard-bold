import {Box, useRadio, UseRadioProps} from "@chakra-ui/react";
import {PropsWithChildren} from "react";

const RadioItem = (props: PropsWithChildren<UseRadioProps>) => {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label' mx="auto" cursor='pointer' textAlign="center" w="100%" >
      <input {...input} />
      <Box
        {...checkbox}
        py={1}
        rounded="2xl"
        _checked={{
          bg: 'bold-light-gray',
        }}
        w="100%"
        color="bold-blue"
      >
        {props.children}
      </Box>
    </Box>
  )
};

export default RadioItem;