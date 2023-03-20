import { motion } from 'framer-motion';
import { useState } from 'react';

import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import Nav from './components/organisms/Nav';
import ThemeToggleButton from './components/ThemeToggleButton';

const textFontSizes = [16, 18, 24, 30];

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Nav />
      <Flex
        as="header"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        fontSize="3xl"
      >
        <Text fontSize={textFontSizes}>
          Hello Vite + React + Typescript + Chakra UI!
        </Text>
        <Button
          colorScheme="blue"
          fontSize={textFontSizes}
          onClick={() => setCount((c) => c + 1)}
          marginTop="2"
        >
          count is: {count}
        </Button>
        <Text fontSize={textFontSizes}>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </Text>
        <Text fontSize={textFontSizes}>
          <Link href="https://reactjs.org" isExternal color="#61dafb">
            Learn React
          </Link>
          {' | '}
          <Link
            href="https://vitejs.dev/guide/features.html"
            isExternal
            color="#61dafb"
          >
            Vite Docs
          </Link>
          {' | '}
          <Link
            href="https://www.typescriptlang.org/"
            isExternal
            color="#61dafb"
          >
            Typescript
          </Link>
          {' | '}
          <Link href="https://chakra-ui.com" isExternal color="#61dafb">
            Chakra UI
          </Link>
        </Text>
      </Flex>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
