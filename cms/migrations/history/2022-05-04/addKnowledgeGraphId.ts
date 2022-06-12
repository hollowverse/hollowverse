import { Migration } from '../../Migration';
import fs from 'fs';
// import fetch from 'node-fetch';
// import { sort } from '../../../plugins/colr/KnowledgeGraph/sort';

const migration = new Migration();

const fetchDocuments = () =>
  JSON.parse(
    fs.readFileSync('./migrations/history/2022-05-04/results.json', 'utf-8'),
  );

const buildMutations = (results: any[]) => {
  const mutations = [];

  results.forEach((result) => {
    mutations.push({
      id: result[0][1],
      patch: {
        set: {
          // name: result[1][0],
          knowledgeGraphId: result[1][1],
        },
      },
    });
  });

  return mutations;
};

migration.run(fetchDocuments, buildMutations, true);

// const apiKey = 'AIzaSyCBx6VfaMSARVv_wTEn0tpaix94hcFmR_w'; // NO LONGER WORKS

// export function kgCall(query: string) {
//   return fetch(
//     `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(
//       query,
//     )}&key=${apiKey}&limit=10&types=Person`,
//   );
// }

// async function run() {
//   const mappings = [];
//   const results = JSON.parse(fs.readFileSync('./results.json', 'utf-8'));

//   for (let i = 0; i < results.length; i++) {
//     const item = results[i];

//     if (item[0][0] !== item[1][0]) {
//       mappings.push(item);
//     }
//   }

//   fs.writeFileSync('./results-diff.json', JSON.stringify(mappings));
// }

// async function run() {
//   const mappings = [];
//   const docs = await migration.client.fetch(
//     `*[_type == 'celeb'] | order(name) {_id,name}`,
//   );

//   for (let i = 0; i < docs.length; i++) {
//     const doc = docs[i];

//     console.log('processing name:', doc.name);

//     const kgResults = await (await kgCall(docs[i].name)).json();

//     const kgSortedResults = sort(doc.name, kgResults.itemListElement);
//     const result = kgSortedResults[0].result;

//     mappings.push([
//       [docs[i].name, docs[i]._id],
//       [result.name, result['@id']],
//     ]);
//   }

//   fs.writeFileSync('./results.json', JSON.stringify(mappings));
// }

// run();
