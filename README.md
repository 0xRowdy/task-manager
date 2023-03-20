# Task Manager Take Home Project

This project demonstrates a basic task manager contract using Hardhat and React Frontend.

## Overview

The project is broken into two folders. Contracts are deployed to Goerli and can be found [here](https://goerli.etherscan.io/address/0xC5C8dA64DfF5C2482C6BcE522BE119DAC6653A46#writeContract).

* backend - This is where the smart contracts are, along with tests and deployment scripts.
* frontend - This is the presentation layer and interacts with the smart contract.

The front end is currently pointing to the deployed contract but you will still need to provide a few valies. To help get that configured you will find a  

### 1. Project Setup

#### SSH

```bash
git clone git@github.com:0xRowdy/task-manager.git

cd task-manager

```

#### HTTPS

```bash
git clone https://github.com/0xRowdy/task-manager.git

cd task-manager

```

### 2. `.env` Setup

There are two .env files and .env.sample files to help you get started. You'll find them in the fronend and backend folders respectively. 

here is an example on how to get the frontend .env set up

```bash
cp .env.sample .env
```
 
```yaml
VITE_ALCHEMY_API_KEY
```

Get a free Alchemy key [here](https://www.alchemy.com/)

```yaml
VITE_EXPLORER_KEY
```

Get an Etherscan API key [here](https://etherscan.io/apis)

### 3. Run the Development Server

Currently the backend is using npm while the frontend is using yarn. I will migrate both of these to yarn or pnpm in the near future.


```
 // backend
 npm install
 
 //frontend
 
 yarn install
```

```bash
backend
// npx hardhat node

// frontend
yarn dev
```
