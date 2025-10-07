import { Text, Spinner, useColorModeValue } from '@chakra-ui/react'
import { useLinkColor } from 'components/theme'

interface DisplayTextProps {
  isLoading: boolean
  value: number | string
  fontSize?: string
}

const DisplayText: React.FC<DisplayTextProps> = ({ isLoading, value, fontSize = 'sm' }) => {
  const linkColor = useLinkColor()
  const textColor = useColorModeValue('gray.600', 'gray.200')

  if (isLoading) {
    return (
      <Spinner
        size="xs"
        speed="0.6s"
        emptyColor="gray.200"
        color={linkColor}
        thickness="2px"
      />
    )
  }

  return (
    <Text
      fontSize={fontSize}
      noOfLines={1}
      fontWeight="medium"
      color={textColor}
      textAlign="left"
    >
      {value}
    </Text>
  )
}

export default DisplayText
