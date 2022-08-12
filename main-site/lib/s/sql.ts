export function sql(strings: TemplateStringsArray, ...keys: string[]) {
  const lastIndex = strings.length - 1;
  return (
    strings.slice(0, lastIndex).reduce(function (acc, str, i) {
      return acc + str + keys[i];
    }, '') + strings[lastIndex]
  ).trim();
}
