import groq from 'groq';

export type PictureGroq = {
  _id: string;
  metadata: {
    lqip: string;
    palette: any;
  };
};

export const pictureGroq = groq`{
  _id,
  'metadata': {
    'lqip': metadata.lqip,
    'palette': metadata.palette
  }
}`;
