import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';
import { useContractRead } from 'wagmi';

import { Divider, Heading, Spinner } from '@chakra-ui/react';

import taskManagerAbi from '../../abis/taskManager.json';

import Task, { TaskProps } from './Task';

type TaskData = {
  id?: number;
  dueDate: number;
  description: string;
  name: string;
  complete: boolean;
};

function TaskList() {
  const [taskCount, setTaskCount] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  // TODO Move to context for application wide use
  const { isError, isLoading } = useContractRead({
    address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
    abi: taskManagerAbi,
    functionName: 'taskCount',
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    onSuccess(result: BigNumber) {
      setTaskCount(ethers.BigNumber.from(result).toNumber());
    },
  });

  useContractRead({
    address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
    abi: taskManagerAbi,
    functionName: 'getTasksInRange',
    enabled: taskCount !== null,
    args: [1, taskCount],
    onSuccess(taskList: TaskData[]) {
      if (!taskList) {
        return;
      }
      const newTaskList = taskList.map(
        (task, index: number) => ({ ...task, id: index + 1 } as TaskProps)
      );
      newTaskList.sort((a, b) => a.dueDate - b.dueDate);
      setTasks(newTaskList);
    },
  });

  return (
    <div>
      {!tasks && <Heading>No Tasks</Heading>}
      {isLoading && <Spinner size="lg" />}
      {/* TODO Better Error handling */}
      {isError && <p>Something went wrong</p>}
      {tasks &&
        tasks.map(
          (task, index) =>
            !task.complete && (
              <Task
                key={`${task.id}`}
                id={task.id ? task.id : index}
                name={task.name}
                description={task.description}
                dueDate={task.dueDate}
                complete={task.complete}
              />
            )
        )}
    </div>
  );
}

export default TaskList;
