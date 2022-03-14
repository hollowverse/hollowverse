export const getContributeLink = (name: string) => {
  const bodyContent = `Fill out the template below to submit a fact about the religion, political views or beliefs of ${name}:

  **What did ${name} say or do?**

  **What is the source for this information?**`;
  const href = `https://discuss.hollowverse.com/new-topic?title=${encodeURIComponent(
    name,
  )}&body=${encodeURIComponent(bodyContent)}&category=facts`;

  return href;
};
