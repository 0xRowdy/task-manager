const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaskManager", function () {
  let TaskManager, taskManager, owner, addr1, addr2;

  beforeEach(async function () {
    TaskManager = await ethers.getContractFactory("TaskManager");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    taskManager = await TaskManager.deploy();
  });

  describe("createTask", function () {
    it("Should create a new task with the provided details", async function () {
      await taskManager.createTask("Task 1", "Description 1", 1700000000);
      const task = await taskManager.tasks(1);
      expect(task.name).to.equal("Task 1");
      expect(task.description).to.equal("Description 1");
      expect(task.dueDate).to.equal(1700000000);
    });

    it("Should revert if the due date is in the past", async function () {
      await expect(
        taskManager.createTask("Task 1", "Description 1", 1000)
      ).to.be.revertedWith("Due date should be in the future");
    });
  });

  describe("completeTask", function () {
    it("Should mark a task as complete", async function () {
      await taskManager.createTask("Task 1", "Description 1", 1700000000);
      await taskManager.completeTask(1);
      const task = await taskManager.tasks(1);
      expect(task.complete).to.be.true;
    });

    it("Should revert if the task ID is invalid", async function () {
      await expect(taskManager.completeTask(1)).to.be.revertedWith(
        "Invalid task ID"
      );
    });

    it("Should revert if the task is already completed", async function () {
      await taskManager.createTask("Task 1", "Description 1", 1700000000);
      await taskManager.completeTask(1);
      await expect(taskManager.completeTask(1)).to.be.revertedWith(
        "Task already completed"
      );
    });
  });

  describe("getTasksInRange", function () {
    it("Should return an array of tasks within the specified index range, inclusive", async function () {
      await taskManager.createTask("Task 1", "Description 1", 1700000000);
      await taskManager.createTask("Task 2", "Description 2", 1710000000);
      await taskManager.createTask("Task 3", "Description 3", 1720000000);

      const tasks = await taskManager.getTasksInRange(1, 3);

      expect(tasks[0].name).to.equal("Task 1");
      expect(tasks[1].name).to.equal("Task 2");
      expect(tasks[2].name).to.equal("Task 3");
    });

    it("Should revert if range parameters are invalid", async function () {
      await expect(taskManager.getTasksInRange(0, 1)).to.be.revertedWith(
        "Invalid range parameters"
      );
      await expect(taskManager.getTasksInRange(2, 1)).to.be.revertedWith(
        "Invalid range parameters"
      );
      await expect(taskManager.getTasksInRange(1, 5)).to.be.revertedWith(
        "Invalid range parameters"
      );
    });
  });

  describe("Events", function () {
    it("Should emit events when tasks are created and completed", async function () {
      await expect(
        taskManager.createTask("Task 1", "Description 1", 1700000000)
      )
        .to.emit(taskManager, "TaskCreated")
        .withArgs(1, "Task 1", "Description 1", 1700000000);

      await taskManager.createTask("Task 2", "Description 2", 1710000000);
      await expect(taskManager.completeTask(2))
        .to.emit(taskManager, "TaskCompleted")
        .withArgs(2);
    });
  });
});
