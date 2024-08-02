"use strict";

const BASE_URL = 'http://127.0.0.1';
const BASE_PORT = 8000;

/**
 * Appends the base URL and port to the given endpoint.
 *
 * @param {string} endpoint - The API endpoint to which the base URL and port will be appended.
 * @returns {string} The full URL combining the base URL, port, and the given endpoint.
 */
function addBaseUrl(endpoint){
    return `${BASE_URL}:${BASE_PORT}/${endpoint}`;
}

export { addBaseUrl };