import { Migration } from '../../Migration';

const migration = new Migration();

const fetchDocuments = () =>
  migration.client.fetch(
    `*[_type == 'celeb' && facts[].tags[] != null && ${migration.notMigratedCondition}][0...100]{_id, _rev, facts}`,
  );

const buildMutations = (docs) => {
  const mutations = [];

  docs.forEach((doc) => {
    doc.facts.forEach((fact, factIndex) => {
      fact.tags.forEach((tag, tagIndex) => {
        mutations.push({
          id: doc._id,
          patch: {
            insert: {
              replace: `facts[${factIndex}].tags[${tagIndex}]`,
              items: [
                {
                  _key: tag._key,
                  _type: 'tagLink',
                  tag: {
                    _ref: tag._ref,
                    _type: 'reference',
                  },
                },
              ],
            },
          },
        });
      });
    });
  });

  return mutations;
};

migration.run(fetchDocuments, buildMutations);
