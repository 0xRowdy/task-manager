import moment from 'moment';

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

export type TaskProps = {
  dueDate: string;
  description: string;
  name: string;
  complete: boolean;
};

function Task({ name, description, dueDate, complete }: TaskProps) {
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
        <Text>is complete {complete}</Text>
      </CardBody>
      <CardFooter>
        <Button variant="outline" marginLeft="auto">
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Task;
