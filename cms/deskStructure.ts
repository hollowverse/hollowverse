import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter((listItem) => {
        if (['orderOfTopics', 'media.tag'].includes(listItem.getId())) {
          return false;
        }

        return true;
      }),
      S.divider(),
      S.listItem()
        .title('Order of topics')
        .child(
          S.editor()
            .title('Order of topics')
            .schemaType('orderOfTopics')
            .documentId('orderOfTopics'),
        ),
    ]);
