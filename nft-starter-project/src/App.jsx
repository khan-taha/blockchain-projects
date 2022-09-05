import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import myEpicNft from './utils/MyEpicNFT.json';
import axios from 'axios';

const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-xig4vgsc3b';
const TOTAL_MINT_COUNT = 50;

// I moved the contract address to the top for easy access.
const CONTRACT_ADDRESS = "0x8Ee12Db57E1750a7Aaec88beFe4E013c38130076";

const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [count, setCount] = useState(0);

    const getTotalNFTsMinted = async () => {
      try{
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
  
          console.log("Fetching total NFTs minted...");
          let totalCount = await connectedContract.getTotalNFTsMintedSoFar();
          setCount(totalCount.toNumber());
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      
      } catch(error){
        console.log(error);
      }
    }
  useEffect(() => {
   console.log('Do something after counter has changed', count);
}, [count]);
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      
      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
      	alert("You are not connected to the Rinkeby Test Network!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)
          
          // Setup listener! This is for the case where a user comes to our site
          // and ALREADY had their wallet connected + authorized.
          setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      
      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
      	alert("You are not connected to the Rinkeby Test Network!");
        return;
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);


        //checking
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

  console.log(res.data);
        //
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT(res.data.IpfsHash);

        console.log("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        getTotalNFTsMinted()
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
    getTotalNFTsMinted();
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
      Mint NFT
    </button>
  )

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          <p className="count-text">
            Total NFTs Minted so far : {count} / 50
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
        <div className="footer-container">
          <button onClick={() => window.open(OPENSEA_LINK, '_blank', 'noopener,noreferrer')} className="cta-button connect-wallet-button">
            View The Collection at OpenSea
          </button>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;