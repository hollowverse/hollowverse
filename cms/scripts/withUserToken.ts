import groq from 'groq';
import { sanityClient } from '../lib/client';

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
//       _id == 'drafts.f68fce9b-a5b0-4e22-a1b3-5e82e6d15a9f' ||
//       _id == 'f68fce9b-a5b0-4e22-a1b3-5e82e6d15a9f'
//     ]`,
//   });

//   console.log('re', re);
// }

async function run() {
  try {
    await script();
  } catch (e) {
    throw e;
  }
}

run();
