import { Migration } from '../../Migration';

const migration = new Migration();

const fetchDocuments = () =>
  migration.client.fetch(
    `*[_type == 'celeb' && facts[] != null][0...100]{_id, _rev, facts}`,
  );

const buildMutations = (docs) => {
  const mutations = [];

  docs.forEach((doc) => {
    doc.facts.forEach((fact) => {
      mutations.push({
        create: {
          ...fact,
          _type: 'fact',
          _id: migration.generateUuid(),
          celeb: {
            _ref: doc._id,
            _type: 'reference',
          },
        },
      });
    });

    mutations.push({
      patch: {
        id: doc._id,
        unset: ['facts'],
      },
    });
  });

  return mutations;
};

migration.run(fetchDocuments, buildMutations);
