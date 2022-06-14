import S from '@sanity/desk-tool/structure-builder';
import groq from 'groq';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { tag } from './schemas/tag';
import { topic } from './schemas/topic';
import { celeb } from './schemas/celeb';

function getDocumentViews(query: string, param1: string, title: string) {
  return S.document().views([
    S.view.form(),
    S.view
      .component(DocumentsPane)
      .options({
        query,
        params: {
          param1,
        },
      })
      .title(title),
  ]);
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === tag.name) {
    return getDocumentViews(
      groq`*[
        _type == 'fact' &&
        $param1 in *[_id == ^._id][0]{'tags': tags[]{'tag': tag->{name}}.tag.name}.tags
      ]`,
      'name',
      'Facts',
    );
  }

  if (schemaType === topic.name) {
    return getDocumentViews(
      groq`*[
        _type == 'fact' &&
        $param1 in *[_id == ^._id][0]{'topics': topics[]->{name}.name}.topics[]
      ]`,
      'name',
      'Facts',
    );
  }

  if (schemaType === celeb.name) {
    return getDocumentViews(
      groq`*[
        _type == 'fact' &&
        celeb._ref == $param1
      ]`,
      '_id',
      'Facts',
    );
  }
};

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
