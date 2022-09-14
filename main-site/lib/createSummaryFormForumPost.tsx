import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SummaryFormPayload } from '~/lib/SummaryForm';

function SummaryFormForumPost(props: SummaryFormPayload) {
  return (
    <>
      <p>
        I'd like to propose the following update to {props.celeb.name}'s summary
      </p>

      <p>Religion: {props.religionSummary}</p>
      <p>Political views: {props.polvisSummary}</p>
    </>
  );
}

export function createSummaryFormForumPost(props: SummaryFormPayload) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(SummaryFormForumPost, props),
  );
}
