import React from 'react';

const NFTCard = ({ nft }) => {
  return (
    <div className="nft-card">
      <img src={nft.media[0]?.gateway || '/placeholder.png'} alt={nft.title} />
      <h3>{nft.title || 'Unnamed NFT'}</h3>
      <p>Contract: {nft.contract.address}</p>
      <p>Token ID: {nft.id.tokenId}</p>
    </div>
  );
};

export default NFTCard;
