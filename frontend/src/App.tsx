import { useAccount } from 'wagmi';

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import TaskList from './components/molecules/TaskList';
import NewTask from './components/organisms/forms/NewTask';
import Nav from './components/organisms/Nav';

function App(): JSX.Element {
  const { connector: activeConnector, isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Nav />
      <Flex
        as="main"
        paddingTop={10}
        direction="column"
        alignItems="center"
        h="100vh"
      >
        {!isConnected && <Heading>Connect your wallet to get started</Heading>}
        {isConnected && (
          <Container centerContent>
            <Heading marginBottom={10} alignSelf="center">
              Connected to {activeConnector?.name}
            </Heading>
            <Box border="1px" borderRadius="10" padding="10" width="full">
              <Flex>
                <Button onClick={onOpen}>New Task</Button>
              </Flex>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>New Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <NewTask />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      mr={3}
                      colorScheme="blue"
                      variant="outline"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="blue" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Divider marginY="5" />
              <TaskList />
            </Box>
          </Container>
        )}
      </Flex>
    </Box>
  );
}

export default App;
