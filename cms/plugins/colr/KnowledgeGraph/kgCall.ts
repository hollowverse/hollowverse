const apiKey = 'AIzaSyDiyeA6ZhuHWZd7LNgyI66PS1QEIx0DOQI';

export function kgCall(query: string) {
  return fetch(
    `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(
      query,
    )}&key=${apiKey}&limit=20&prefix=true&types=Person`,
  );
}
