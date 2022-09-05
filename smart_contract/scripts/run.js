const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Iron Man", "Captain America", "Wanda"], // Names
    [
      "https://eu-images.contentstack.com/v3/assets/blt95b381df7c12c15d/blt41ab9a2ae3b34e26/62fd3484b3e76929177391e0/iron.jpg", // Images
      "https://static.toiimg.com/thumb/msid-92807013,imgsize-69816,width-800,height-600,resizemode-75/92807013.jpg",
      "https://i.pinimg.com/736x/db/8a/b9/db8ab9f478603ca51b32b7432167d6b2.jpg",
    ],
    [100, 200, 300], // HP values
    [100, 50, 25], // Attack damage values
    "Thanos",
    "https://helios-i.mashable.com/imagery/articles/07bAauLimCnLwZRJTeiMdoe/hero-image.fill.size_1248x702.v1623370441.jpg",
    1000,
    50
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
