import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pitchDescription } = await req.json();
    
    const formData = new FormData();
    formData.append('samples', '1');
    formData.append('ipInfringementErrorThreshold', '100');
    formData.append('freeText', pitchDescription);

    const response = await fetch('https://api.ablo.ai/image-maker', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': process.env.ABLO_API_KEY || '',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    console.log('Generated image:', data);

    return NextResponse.json({ 
      imageUrl: data.images[0].url,
      clientId: data.images[0].clientId 
    });
  } catch (error) {
    console.error('Error in image generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}