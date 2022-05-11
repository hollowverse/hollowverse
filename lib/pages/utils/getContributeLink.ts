export const getContributeLink = (name: string) => {
  const unencodedBodyContent = `Tell us about ${name}'s political views or religion! And share a link to the source, if you've got one!

<!-- Don't forget to update the title. Make it more specific! -->`;

  const body = encodeURIComponent(unencodedBodyContent);
  const title = encodeURIComponent(`${name}'s political views and religion`);

  const href = `https://discuss.hollowverse.com/new-topic?title=${title}&body=${body}&category=comments`;

  return href;
};
