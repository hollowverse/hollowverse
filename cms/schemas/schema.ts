import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { celeb } from './celeb';
import { fact } from './fact';
import { topic } from './topic';
import { tag } from './tag';
import { orderOfIssues } from './orderOfIssues';
import { tagLink } from './tagLink';

export default createSchema({
  name: 'hollowverse',

  types: schemaTypes.concat([fact, celeb, tag, topic, orderOfIssues, tagLink]),
});
