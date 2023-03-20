import { ethers } from "hardhat";

async function main() {
  const TaskManager = await ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy();

  await taskManager.deployed();

  console.log(
    `Task Manager deployed to ${taskManager.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
