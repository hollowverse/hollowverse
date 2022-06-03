export async function hFetch(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    throw new Error(
      `${res.status}: ${res.statusText}. Params: ${JSON.stringify(
        args,
      )}. Info: ${isJson ? await res.json() : await res.text()}`,
    );
  }

  return res;
}
