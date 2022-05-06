import levenshtein from 'fast-levenshtein';

const apiKey = 'AIzaSyDiyeA6ZhuHWZd7LNgyI66PS1QEIx0DOQI';

function getDistance(a: string, b: string) {
  return levenshtein.get(a, b.substring(0, a.length), {
    useCollator: true,
  });
}

export async function kgCall(query: string) {
  const response = await fetch(
    `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(
      query,
    )}&key=${apiKey}&limit=20&types=Person`,
  );
  const results = await response.json();
  const items = results.itemListElement;

  const cleanItems = items.filter((i: any) => {
    return i.result?.image;
  });

  cleanItems.sort((a: any, b: any) => {
    const aDistance = getDistance(query, a.result.name);
    const bDistance = getDistance(query, b.result.name);

    if (aDistance > bDistance) {
      return 1;
    }

    if (aDistance < bDistance) {
      return -1;
    }

    return 0;
  });

  return cleanItems;
}
