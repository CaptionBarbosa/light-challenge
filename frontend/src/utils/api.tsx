const domain = "http://localhost:8080"; //statically set here for simplicity, can be replaced with an environment variable

export async function api(router: string, endpoint: string, method = "POST", params = {}) {
  try {
    const response = await fetch(`${domain}/${router}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const json = await response.json();

    if (response.status >= 200 && response.status < 300) {
      return json;
    } else {
      throw new Error(json.error || "Request failed");
    }
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
}
