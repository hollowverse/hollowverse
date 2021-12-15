import { graphql } from 'gatsby';
import React from 'react';
import NotablePerson from 'src/components/NotablePerson/NotablePerson';

const Page = ({ data }: any) => {
  return <div>hello</div>;
  // return <NotablePerson />;
};

export const query = graphql`
  query PageQuery {
    allData(filter: { name: { eq: "Alyson Hannigan" } }) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export default Page;
