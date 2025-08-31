// Google OAuth client ID from environment variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Scope for Google Drive access (read/write specific files)
const SCOPE = "https://www.googleapis.com/auth/drive.file";

// Token client instance and access token storage
let tokenClient = null;
let accessToken = null;

// Used to resolve pending promises while waiting for token
let pendingResolve = null;

/**
 * Initialize Google OAuth token client
 * - Sets up the Google OAuth2 token client
 * - Registers a callback to store access tokens
 */
function initTokenClient() {
  if (!window.google) throw new Error("Google accounts library is not loaded.");
  if (tokenClient) return; // Already initialized

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPE,
    callback: (resp) => {
      // Store the received access token
      accessToken = resp.access_token;

      // Resolve any pending promise waiting for token
      if (pendingResolve) {
        pendingResolve(accessToken);
        pendingResolve = null;
      }
    },
  });
}

/**
 * Get a valid access token
 * - Returns existing token if available
 * - Otherwise requests a new token via the token client
 */
async function getAccessToken() {
  if (accessToken) return accessToken;

  return new Promise((resolve) => {
    pendingResolve = resolve; // Save resolve to call once token arrives
    if (!tokenClient) initTokenClient(); // Initialize if not done
    tokenClient.requestAccessToken(); // Trigger token request
  });
}

/**
 * Fetch wrapper that automatically adds Authorization header
 * @param {string} url - API endpoint
 * @param {object} options - fetch options
 * @returns fetch response
 */
async function authFetch(url, options = {}) {
  const token = await getAccessToken(); // Ensure token
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`, // Add OAuth token
  };
  return fetch(url, { ...options, headers });
}

/**
 * Ensure a Google Drive file exists
 * - Searches for a file by name
 * - Creates it with empty array if not found
 * @param {string} filename
 * @returns {string} fileId
 */
export async function ensureFile(filename = "applications.json") {
  // Search for file in Drive
  const search = await authFetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
      filename
    )}' and trashed=false&fields=files(id,name)`
  );

  const res = await search.json();
  if (res.files?.length) return res.files[0].id; // File exists

  // File not found → create new file
  const metadata = { name: filename, mimeType: "application/json" };
  const boundary = "-------jobs-json-boundary";
  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify(metadata) +
    `\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify([]) + // initial empty array
    `\r\n` +
    `--${boundary}--`;

  const createRes = await authFetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    }
  );

  const created = await createRes.json();
  return created.id;
}

/**
 * Load applications array from a Drive file
 * @param {string} fileId
 * @returns {Array} applications
 */
export async function loadApplications(fileId) {
  const r = await authFetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`
  );
  if (!r.ok) return []; // Return empty if fetch fails

  const data = await r.json();

  // Support both raw [] or { applications: [] }
  return Array.isArray(data) ? data : data.applications || [];
}

/**
 * Save applications array to a Drive file
 * @param {string} fileId
 * @param {Array} applicationsArray
 */
export async function saveApplications(fileId, applicationsArray) {
  const r = await authFetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(applicationsArray),
    }
  );

  if (!r.ok) throw new Error("Failed to save applications");
}