import moment from 'moment';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  Text,
} from '@chakra-ui/react';

import taskManagerAbi from '../../abis/taskManager.json';

export type TaskProps = {
  dueDate: string;
  description: string;
  name: string;
  complete: boolean;
};

// TODO Add complete button call to contract

function Task({ name, description, dueDate, complete }: TaskProps) {
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
    abi: taskManagerAbi,
    functionName: 'completeTask',
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <Card variant="elevated" padding={5} marginY={5}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" size="xl">
          {name.toUpperCase()}
        </Heading>
        <Box>
          <Stat>
            <StatLabel>Due on:</StatLabel>
            <StatHelpText>
              {moment.unix(parseInt(dueDate, 10)).format('DD/MM/YYYY')}
            </StatHelpText>
          </Stat>
        </Box>
      </CardHeader>
      <CardBody>
        <Text fontSize="lg">{description}</Text>
        <Text>This task is {complete ? 'complete' : 'not complete'}</Text>
      </CardBody>
      <CardFooter>
        <Button variant="outline" marginLeft="auto" isDisabled={complete}>
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Task;
