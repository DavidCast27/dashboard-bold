import {Box, useRadio, UseRadioProps} from "@chakra-ui/react";
import {PropsWithChildren} from "react";

const RadioItem = (props: PropsWithChildren<UseRadioProps>) => {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label' mx="auto" cursor='pointer' textAlign="center" w="100%" px={2}>
      <input {...input} />
      <Box
        {...checkbox}
        my={2}
        rounded="lg"
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