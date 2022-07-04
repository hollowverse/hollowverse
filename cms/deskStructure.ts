import S from '@sanity/desk-tool/structure-builder';
import groq from 'groq';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { tag } from './schemas/tag';
import { issue } from './schemas/issue';
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
        $param1 in tags[].tag._ref
      ] | order(_createdAt desc)`,
      '_id',
      'Facts',
    );
  }

  if (schemaType === issue.name) {
    return getDocumentViews(
      groq`*[
        _type == 'fact' &&
        $param1 in topics[]._ref
      ] | order(_createdAt desc)`,
      '_id',
      'Facts',
    );
  }

  if (schemaType === celeb.name) {
    return getDocumentViews(
      groq`*[
        _type == 'fact' &&
        celeb._ref == $param1
      ] | order(_createdAt desc)`,
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
        .title('Order of issues')
        .child(
          S.editor()
            .title('Order of issues')
            .schemaType('orderOfTopics')
            .documentId('orderOfTopics'),
        ),
    ]);
