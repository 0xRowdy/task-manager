import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';
import { useContractRead } from 'wagmi';

import { Divider, Spinner } from '@chakra-ui/react';

import taskManager from '../../abis/taskManager.json';

import Task, { TaskProps } from './Task';

type TaskData = {
  [key: string]: TaskProps;
};

const taskManageContract = {
  address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
  abi: taskManager,
};

function TaskList() {
  const [taskCount, setTaskCount] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TaskData | null>(null);
  // TODO Move to context for application wide use
  const { isError, isLoading } = useContractRead({
    address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
    abi: taskManager,
    functionName: 'taskCount',
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    onSuccess(result: BigNumber) {
      setTaskCount(ethers.BigNumber.from(result).toNumber());
    },
  });

  useContractRead({
    address: import.meta.env.VITE_TASK_MANAGER_CONTRACT_ADDRESS,
    abi: taskManager,
    functionName: 'getTasksInRange',
    enabled: taskCount !== null,
    args: [1, taskCount],
    onSuccess(taskList: TaskData) {
      if (!taskList) {
        return;
      }
      setTasks(taskList);
      // TODO Sort tasks by due date
    },
  });

  return (
    <div>
      {isLoading && <Spinner size="lg" />}
      {/* TODO Better Error handling */}
      {isError && <p>Something went wrong</p>}
      {tasks &&
        Object.values(tasks).map((task, index) => (
          <Task
            key={`${task.name}-${index}`}
            name={task.name}
            description={task.description}
            dueDate={task.dueDate}
            complete={task.complete}
          />
        ))}
      <Divider />
    </div>
  );
}

export default TaskList;
