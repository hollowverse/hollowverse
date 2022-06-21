import groq from 'groq';

export type Picture = {
  _id: string;
  metadata: {
    lqip: string;
    // palette: any;
  };
  asset: any;
};

export const pictureProjection = groq`
_id,
'metadata': {
  'lqip': metadata.lqip,
  // 'palette': metadata.palette
}
`;
