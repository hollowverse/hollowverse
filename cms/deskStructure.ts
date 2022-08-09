import S from '@sanity/desk-tool/structure-builder';
import groq from 'groq';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { tag } from './schemas/tag';
import { issue } from './schemas/issue';
import { celeb } from './schemas/celeb';

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === tag.name) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: groq`*[
            _type == 'fact' &&
            $param1 in tags[].tag._ref
          ] | order(_createdAt desc)`,
          params: {
            param1: '_id',
          },
        })
        .title('Facts'),
    ]);
  }

  if (schemaType === issue.name) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: groq`*[
            _type == 'fact' &&
            $param1 in topics[]._ref
          ] | order(_createdAt desc)`,
          params: {
            param1: '_id',
          },
        })
        .title('Facts'),
      S.view
        .component(DocumentsPane)
        .options({
          query: groq`*[
            _type == 'tag' &&
            $param1 == topic._ref
          ] | order(_createdAt desc)`,
          params: {
            param1: '_id',
          },
        })
        .title('Issue Tags'),
    ]);
  }

  if (schemaType === celeb.name) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: groq`*[
            _type == 'fact' &&
            celeb._ref == $param1
          ] | order(_createdAt desc)`,
          params: {
            param1: '_id',
          },
        })
        .title('Facts'),
    ]);
  }
};

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter((listItem) => {
        if (
          ['orderOfTopics', 'media.tag', 'forum-cta'].includes(listItem.getId())
        ) {
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
      S.listItem()
        .title('Forum CTA')
        .child(
          S.editor()
            .title('Forum CTA')
            .schemaType('forum-cta')
            .documentId('forum-cta'),
        ),
    ]);
