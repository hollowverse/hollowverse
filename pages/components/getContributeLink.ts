export const getContributeLink = (name: string) => {
  const bodyContent = `**What's a fact about ${name} that indicates their religion, politics, or social views?**
<!-- Keep the answer short and sweet. -->

**What is the source for this information?**
<!-- The source has to be credible. For a controversial fact, the source needs stronger credibility. -->

<!--
If you know more facts about ${name}, create a new post for each fact.

A moderator will review your posts and add them to ${name}'s page :)
-->`;
  const href = `https://discuss.hollowverse.com/new-topic?title=${encodeURIComponent(
    name,
  )}&body=${encodeURIComponent(bodyContent)}&category=facts`;

  return href;
};
