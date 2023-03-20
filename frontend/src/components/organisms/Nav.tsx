import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import logo from '../../etherfiLogo.svg';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.200', 'gray.700')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Image src={logo} alt="" h="10vmin" />
        </Box>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <ConnectButton />
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
