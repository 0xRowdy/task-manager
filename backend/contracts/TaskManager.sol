// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title TaskManager
 * @dev This contract allows users to create, complete, and view tasks.
 * @custom:dev-run-script todo_add_file_path
 */
contract TaskManager {
    /// @dev Struct representing a Task packed
    struct Task {
        bool complete;
        uint40 dueDate;
        string name;
        string description;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    /// @notice Event emitted when a task is created
    event TaskCreated(
        uint256 taskId,
        string name,
        string description,
        uint40 dueDate
    );
    /// @notice Event emitted when a task is marked as complete
    event TaskCompleted(uint256 taskId);

    /**
     * @notice Create a new task with the given name, description, and due date.
     * @param _name The name of the task
     * @param _description The description of the task
     * @param _dueDate The due date of the task as a Unix timestamp in seconds
     */
    function createTask(
        string memory _name,
        string memory _description,
        uint40 _dueDate
    ) public {
        require(_dueDate > block.timestamp, "Due date should be in the future");
        taskCount++;
        tasks[taskCount] = Task(false, _dueDate, _name, _description);
        emit TaskCreated(taskCount, _name, _description, _dueDate);
    }

    /**
     * @notice Mark a task as complete by taskId.
     * @param _taskId The ID of the task to be marked as complete
     */
    function completeTask(uint256 _taskId) public {
        require(_taskId > 0 && _taskId <= taskCount, "Invalid task ID");
        Task storage task = tasks[_taskId];
        require(!task.complete, "Task already completed");
        task.complete = true;
        emit TaskCompleted(_taskId);
    }

    /**
     * @notice Get an array of tasks within the specified index range, inclusive.
     * @dev This function is useful for pagination or batch retrieval of tasks.
     * @param _startIndex The starting index of the task range, inclusive
     * @param _endIndex The ending index of the task range, inclusive
     * @return result An array of Task structs within the specified index range
     */
    function getTasksInRange(
        uint256 _startIndex,
        uint256 _endIndex
    ) public view returns (Task[] memory) {
        require(_startIndex > 0 && _endIndex > 0, "Invalid range parameters");
        require(_startIndex <= _endIndex, "Invalid range parameters");
        require(_endIndex <= taskCount, "Invalid range parameters");

        Task[] memory result = new Task[](_endIndex - _startIndex + 1);
        for (uint256 i = _startIndex; i <= _endIndex; i++) {
            result[i - _startIndex] = tasks[i];
        }
        return result;
    }
}
