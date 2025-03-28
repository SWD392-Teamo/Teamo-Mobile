import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

// GET request
async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

// POST request
async function post(url: string, body: NonNullable<unknown>) {
    const headers = await getHeaders();
    
    // If body is FormData, don't set Content-Type header
    if (body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const requestOptions = {
        method: 'POST',
        headers: headers,
        // Don't stringify if it's FormData
        body: body instanceof FormData ? body : JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// PUT request
async function put(url: string, body: NonNullable<unknown>) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}


// PATCH request
async function patch(url: string, body: NonNullable<unknown>) {
    const headers = await getHeaders();
    
    // If body is FormData, don't set Content-Type header
    if (body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const requestOptions = {
        method: 'PATCH',
        headers: headers,
        // Don't stringify if it's FormData
        body: body instanceof FormData ? body : JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

// DELETE request
async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function getHeaders() {

    // Get token from async storage
    const token = await AsyncStorage.getItem("authToken");

    // Set header attributes
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    } as Record<string, string>;

    // If the session has token then added Authorization header with the token as value
    if (token) {
        headers.Authorization = 'Bearer ' + token
    }
    
    return headers;
}

// return JSON data or error object
async function handleResponse(response: Response) {
    const text = await response.text();

    // Check if the error is a json object or normal string
    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            // If there is an error text then display it
            message: typeof(data === 'string') ? data : response.statusText
        }
        return {error}
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    patch,
    del
}