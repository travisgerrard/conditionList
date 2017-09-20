
export function setHeaders(headers) {
  if (localStorage.jwtToken) {
    console.log("This ran");
    return {
      ...headers,
      'Authorization': `Bearer ${localStorage.jwtToken}`
    }
  } else {
    return headers;
  }
}

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
