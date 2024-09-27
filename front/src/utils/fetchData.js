export const fetchData = async (url, fetchMethod="GET", headers={}, body=null) => {
  const response = await fetch(url, {
    method: fetchMethod,
    headers: headers,
    body: body && JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  
  const data = await response.json()
  return data;
}