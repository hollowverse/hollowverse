import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { celeb } from './celeb';
import { fact } from './fact';
import { topic } from './topic';
import { tag } from './tag';
import { orderOfTopics } from './orderOfTopics';
import { tagLink } from './tagLink';
// import { wildCard } from './wildCard';

export default createSchema({
  name: 'hollowverse',

  types: schemaTypes.concat([fact, celeb, tag, topic, orderOfTopics, tagLink]),
});
