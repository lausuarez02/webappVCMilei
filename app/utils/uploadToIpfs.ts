import {PinataSDK} from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
});

export async function uploadJSONToIPFS(data: any): Promise<string> {
    try {
        const result = await pinata.upload.json(data);
        
        console.log('Uploaded to Pinata:', result);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
} 