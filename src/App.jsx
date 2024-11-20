import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Your Alchemy API Key (replace with your actual API key)
  const apiKey = "<-- ALCHEMY APP API KEY -->";
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/`;

  // Fetch NFTs from a specific collection
  const fetchNFTsForCollection = async () => {
    setLoading(true);
    try {
      const url = `${baseURL}getNFTsForCollection?contractAddress=${collectionAddress}&withMetadata=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.nfts) {
        setNfts(data.nfts);
      } else {
        console.error('No NFTs found in the collection');
      }
    } catch (error) {
      console.error('Error fetching NFTs for collection:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch NFTs owned by a wallet address
  const fetchNFTsByWallet = async () => {
    setLoading(true);
    try {
      const url = `${baseURL}getNFTs?owner=${walletAddress}`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.ownedNfts) {
        setNfts(data.ownedNfts);
      } else {
        console.error('No NFTs found for this wallet');
      }
    } catch (error) {
      console.error('Error fetching NFTs by wallet address:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Fetch NFTs</h1>
      
      {/* Wallet Input */}
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      
      {/* Collection Input */}
      <input
        type="text"
        placeholder="Enter Collection Address"
        value={collectionAddress}
        onChange={(e) => setCollectionAddress(e.target.value)}
      />
      
      {/* Buttons */}
      <button onClick={fetchNFTsByWallet} disabled={loading}>
        Fetch NFTs by Wallet
      </button>
      <button onClick={fetchNFTsForCollection} disabled={loading}>
        Fetch NFTs for Collection
      </button>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display NFTs */}
      {nfts.length > 0 && (
        <div className="nft-gallery">
          {nfts.map((nft, index) => (
            <div key={index} className="nft-card">
              <img src={nft.metadata?.image || '/placeholder.png'} alt={nft.title} />
              <p>{nft.title}</p>
              <p>{nft.contract.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
