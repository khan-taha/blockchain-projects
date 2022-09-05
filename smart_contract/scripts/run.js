var axios = require("axios");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  const ipfsHash1 = await uploadJSONtoIPFS();
  let txn = await nftContract.makeAnEpicNFT(ipfsHash1);
  // Wait for it to be mined.
  await txn.wait();

  // Mint another NFT for fun.
  const ipfsHash2 = await uploadJSONtoIPFS();
  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
};

const uploadJSONtoIPFS = async () => {
  //insert 50 random images with json to ipfs

  const svgPartOne =
    "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='";
  const svgPartTwo =
    "'/><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  const firstWords = ["Red", "Yellow", "Blue", "Green", "Black", "Pink"];
  const secondWords = [
    "Charger",
    "Mobile",
    "Pen",
    "Pencil",
    "Moisturizer",
    "Sofa",
  ];
  const thirdWords = [
    "Biryani",
    "Burger",
    "Apple",
    "Banana",
    "Potato",
    "Tomato",
  ];

  // Get fancy with it! Declare a bunch of colors.
  const colors = ["red", "#08C2A8", "black", "yellow", "blue", "green"];

  const randomFirstWord = firstWords[Math.floor(Math.random() * firstWords.length)];
  const randomSecondWord = secondWords[Math.floor(Math.random() * secondWords.length)];
  const randomThirdWord = thirdWords[Math.floor(Math.random() * thirdWords.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const combinedWord = svgPartOne + randomColor + svgPartTwo + randomFirstWord + randomSecondWord + randomThirdWord + "</text></svg>";

  
  var data = JSON.stringify({
    // pinataOptions: {
    //   cidVersion: 1,
    // },
    pinataMetadata: {
      name: randomFirstWord + randomSecondWord + randomThirdWord,
      // description: "A highly acclaimed collection of squares.",
      // image: combinedWord
    },
    pinataContent: {
      name: randomFirstWord + randomSecondWord + randomThirdWord,
      description: "A highly acclaimed collection of squares.",
      image: combinedWord
    }
  });

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmY2M5NzgxYi05NmYyLTQ0NmEtYmE4My02OTkzMGY5OTA5YzgiLCJlbWFpbCI6InRhaGFraGFuMTAzMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGY5ODRmYzE4MTE5NmUyMmMzZWIiLCJzY29wZWRLZXlTZWNyZXQiOiIxMzliNTdjNTZmMDQ0ZjcyZWQ1YTEwOTczYTdmZjI0ODU1MGNkNTc1Y2ZjMjVlZjc3Njc1NDI3YTlkN2RiMjEyIiwiaWF0IjoxNjYwNzE5MTU2fQ.BmMQsmAebQzLSrBTjZaBUdk7lrrm-AzLy-HaQ82XNHE",
    },
    data: data,
  };

  const res = await axios(config);

  console.log(res.data.IpfsHash);
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
