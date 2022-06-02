export async function hFetch(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (!res.ok) {
    throw new Error(
      `${res.status}: ${res.statusText}. Params: ${JSON.stringify(args)}`,
    );
  }

  return res;
}
