import sanityClient from 'part:@sanity/base/client';
import { v4 as uuidv4 } from 'uuid';

const migrationMarker = 's83msxz2Migrated';

export class Migration {
  private _notMigratedCondition = `${migrationMarker} != true`;
  private _migratedCondition = `${migrationMarker} == true`;
  private _requireCleanup = false;

  get notMigratedCondition() {
    this._requireCleanup = true;

    return this._notMigratedCondition;
  }

  generateUuid = () => {
    return uuidv4();
  };

  client = sanityClient.withConfig({
    apiVersion: '2022-03-28',
    dataset: process.env.PROD !== undefined ? 'production' : 'staging',
  });

  private createTransaction = (mutations) => {
    return mutations.reduce((tx, mutation) => {
      if (mutation.patch) {
        if (this._requireCleanup) {
          mutation.patch = {
            ...mutation.patch,
            set: {
              ...mutation.patch.set,
              [migrationMarker]: true,
            },
          };
        }

        return tx.patch(mutation.id, mutation.patch);
      }
      if (mutation.delete) {
        return tx.delete(mutation.delete);
      }
      if (mutation.create) {
        return tx.createIfNotExists(mutation.create);
      }
    }, this.client.transaction());
  };

  run = async (
    fetchDocuments: () => any,
    buildMutations: (docs: any) => any[],
    runOnce = false,
  ) => {
    const migrateNextBatch = async () => {
      const documents = await fetchDocuments();

      if (!Array.isArray) {
        throw new Error('Returned docs not array');
      }

      if (documents.length === 0) {
        if (this._requireCleanup) {
          console.log('Cleaning up migration!');
          const migration = new Migration();
          migration.run(
            () =>
              migration.client.fetch(
                `*[${migration._migratedCondition}][0...100]{_id, _rev}`,
              ),
            (docs) => {
              const mutations = [];

              docs.forEach((doc) => {
                mutations.push({
                  patch: {
                    id: doc._id,
                    unset: [migrationMarker],
                  },
                });
              });

              return mutations;
            },
          );
        } else {
          console.log('No more documents to migrate!');
        }

        return null;
      }
      const mutations = buildMutations(documents);

      console.log(
        `Migrating batch:\n\n %s`,
        mutations.map((mutation) => `${JSON.stringify(mutation)}`).join('\n\n'),
      );

      const transaction = this.createTransaction(mutations);
      await transaction.commit();

      if (runOnce) {
        console.log('Ran once!');
        return;
      }

      return migrateNextBatch();
    };

    migrateNextBatch().catch((err) => {
      console.log(err);
      process.exit(1);
    });
  };
}
