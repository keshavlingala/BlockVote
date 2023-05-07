# BlockVote
**Secure and Transparent Elections: Implementing a Blockchain-Based Voting System**

## Introduction
This is a Final project done as part of the course CPSC 559 - Advanced Blockchain Technologies

> Professor: Dr. Wenlin Han <br>
> Department of Computer Science <br>
> California State University, Fullerton <br>
> Spring 2023 <br>

## Team Members ( Team Token )

- Keshav Lingala (885187559) ( keshavlingala@csu.fullerton.edu )
- Priya Keshri ( 885191452 ) ( priyakeshri@csu.fullerton.edu )
- Sri Vaishnavi Rudravallambi ( 885237289 ) ( srivaishnavi@csu.fullerton.edu )
- Saurabh Kudeti ( 885332130 ) ( kudeti1999@csu.fullerton.edu )

## Project Description

The application lets any user create campaigns, whoever creates the Campaign will be the Campaign's owner, and only he can
modify the Campaign. Each Campaign will have candidates. The Campaign owner can only add candidates.

In order to use the application, the user must install Metamask as a Blockchain wallet and connect to the respective network.
Users with voting rights can vote. 

Moreover, the Campaign owner can make the Campaign Inactive. Everyone can see the votes and the Winner and Download the Results in PDF format. Each Campaign and candidate in the Campaign will have a unique blockchain address so It can be transparent, and all the vote transactions can be seen in transaction history and Etherscan.
Users can always go to the help screen to understand the rules and see FAQs for better usability.

The application is also accessible for visually impaired users using a voiceover when hovered over the screen.
The application also supports multiple languages with a single click of a button.

## Technical Details

- Used Truffle to deploy smart contracts to Ganache and Sepolia Ethereum Network
- Used Angular 11 and NX Workspace for front-end development
- ng-web3 library to connect to Metamask and make blockchain transactions
- Used Google's Material Design Standard Components
- Used Multiple Solidity contracts and inheritance features to develop  robust smart contracts
- Used Dexie for Minimalist IndexedDB to store eligible voters
- Used JsPDF Library to generate PDF files



This project was bootstrapped from [this repository](https://github.com/WojcikMM/eth-angular-voting-dapp)

# Instructions to run the project

- Clone the repository
- Run `npm install` in the root directory
- Run `npm run truffle:develop` to start the local blockchain
- Run `npm run truffle:migrate` to deploy the smart contracts to the local blockchain
- Modify the `truffle-config.js` file to point to the local blockchain
- Copy the contract addresses from the terminal and paste them in the
  file [environment.ts](apps%2Fvoting-dapp%2Fsrc%2Fenvironments%2Fenvironment.ts).campaignFactory.address
- Run `npm run start` to start the frontend application
- Navigate to `http://localhost:4200/` to view the application

## Project Features

### Existing

- [x] Create Campaign
- [x] Adding Candidates to Campaign
- [ ] Voting Logic is not implemented yet

### Improvements and New Features

- [x] Voting for Candidates
- [x] Smart Contracts for Campaign operations and voting operations
- [x] Ability to make a Campaign InActive after Voting is done, so that no more votes can be cast
- [x] Security, cannot access any campaigns without logging in
- [x] ID verification and ability to add eligible voters ( Voter ID and Social Security)
- [x] Ability to Download Voting Results as PDF file
- [x] UI Improvements, Card Designs, Colors, Buttons, Animation, Icons, Images etc
- [x] Multiple Language Support
- [x] Improve accessibility for visually impaired users
- [x] Upcoming Elections Headers
- [x] Help Screen with Instructions and FAQs for Voters
- [x] Share Campaign on Any Social Media Platform with a single click
- [x] Deployed to Sepolia Testnet and Ganache
