export const factsDataTransform = (facts: any, orderOfIssues: string[]) => {
  const orderedFacts = facts.sort((a: any, b: any) => {
    return orderOfIssues.indexOf(a.issue) - orderOfIssues.indexOf(b.issue);
  });
};
