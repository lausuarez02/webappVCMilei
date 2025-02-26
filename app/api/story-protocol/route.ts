import { NextResponse } from 'next/server';
import { client } from '../../utils/story-protocol';
import { createHash } from 'crypto';
import { uploadJSONToIPFS } from '../../utils/uploadToIpfs';
import { IpMetadata } from '@story-protocol/core-sdk';

// Helper function to generate hash
function generateHash(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { imageUrl, pitchDescription, walletAddress, founderName } = await req.json();

    // Create IP metadata
    const ipMetadata = {
      title: `${founderName}'s Pitch - ${new Date().toISOString()}`,
      description: pitchDescription,
      image: imageUrl,
      imageHash: '0x' + generateHash(imageUrl),
      mediaUrl: imageUrl,
      mediaHash: '0x' + generateHash(imageUrl),
      mediaType: "image/png",
      creators: [
        {
          name: founderName,
          address: walletAddress,
          description: "Startup Founder",
          contributionPercent: 100,
          socialMedia: [
            {
              platform: "Story Protocol",
              url: "https://story.xyz"
            }
          ]
        }
      ]
    };

    // Create NFT metadata
    const nftMetadata = {
      name: `${founderName}'s Pitch NFT`,
      description: pitchDescription,
      image: imageUrl,
      attributes: [
        {
          trait_type: "Type",
          value: "Pitch Investment"
        }
      ]
    };

    // Upload both metadata to IPFS
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);

    // Generate hashes
    const ipHash = generateHash(JSON.stringify(ipMetadata));
    const nftHash = generateHash(JSON.stringify(nftMetadata));

    // Mint and register IP
    const response = await client.ipAsset.mintAndRegisterIp({
      spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc',
      allowDuplicates: true,
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: { waitForTransaction: true },
    });

    console.log('IP Registration:', response);
    console.log(`View on explorer: https://aeneid.explorer.story.foundation/ipa/${response.ipId}`);

    return NextResponse.json({ 
      success: true,
      ipId: response.ipId,
      txHash: response.txHash,
      explorerUrl: `https://aeneid.explorer.story.foundation/ipa/${response.ipId}`
    });
  } catch (error) {
    console.error('Error registering IP:', error);
    return NextResponse.json(
      { error: 'Failed to register IP' },
      { status: 500 }
    );
  }
} 