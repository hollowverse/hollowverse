import sanityClient from 'part:@sanity/base/client';
import groq from 'groq';

/**
 * Run these scripts with the following command in the terminal
 * but first comment/uncomment as needed.
 *
 * ```bash
 * sanity exec scripts/withUserToken.ts --with-user-token
 * ```
 */

// Delete a document
// async function script() {
//   const re = await sanityClient.delete({
//     query: groq`*[
//       _id == 'drafts.b969120e-14ae-4109-ab8b-30a001dff579' ||
//       _id == 'b969120e-14ae-4109-ab8b-30a001dff579'
//     ]`,
//   });

//   console.log('re', re);
// }

async function run() {
  try {
    // await script();
  } catch (e) {
    throw e;
  }
}

run();
