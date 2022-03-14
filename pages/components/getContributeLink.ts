export const getContributeLink = (name: string) => {
  const bodyContent = `**What's a fact about ${name} that indicates their religion, politics, or social views?**
<!-- Keep the answer short and sweet. -->

**What is the source for this information?**
<!-- The source has to be credible. For a controversial fact, the source needs stronger credibility. -->

<!--
If you know more facts about ${name}, you can copy/paste the questions above and answer them again to add multiple facts to this post.

A Hollowverse staff member will review these facts and add them ${name}'s page :)
-->`;
  const href = `https://discuss.hollowverse.com/new-topic?title=${encodeURIComponent(
    name,
  )}&body=${encodeURIComponent(bodyContent)}&category=facts`;

  return href;
};
