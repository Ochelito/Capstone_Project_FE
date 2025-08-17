const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPE = "https://www.googleapis.com/auth/drive.file";

let tokenClient = null;
let accessToken = null;

function initTokenClient() {
    if (!window.google) throw new Error("Google accounts library is not loaded.");)
    if (tokenClient) return;
    tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: (resp) => {
            accessToken = resp.access_token;
            if (pendingResolve) {
                pendingResolve(accessToken);
                pendingResolve = null;
            }
        },
    }),
}

async function authFetch(url, options = {}) {
    const token = await getAccessToken();
    const headers = { ...(options.headers || {}), Authorization: `Bearer ${token}` };
    return fetch(url, { ...options, headers });
}

export async function ensureFile(filename = "application.json") {
    //Search by name {root "My Drive"}
    const search = await authFetch(
        `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
            filename    
        )}` and trashed=false%fields=FileSystem(id,name)
    );
    const res = await search.json();
    if (res.files?.length) return res.files[0].id;

    //create new file with empty array
    const metadata = { name: filename, mimeType: "application/json" };
    const boundary = "-------jobs-json-boundary";
    const body =
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        JSON.stringify(metadata) + `\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        JSON.stringify([]) + `\r\n` +
        `--${boundary}--`;

    const createRes = await authFetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
        { method: "POST", headers: {"Content-Type": `multipart/related; boundary=${boundary}` }, body }
    );
    const creted = await createRes.json();
    return created.id;
}

export async function loadApplications(fileId) {
    const r = await authFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
    if (!r.ok) return [];
    const data = await r.json();

    //support either [] or { applications: [] }
    return Array.isArray(data) ? data : data.applications || [];
}

export async function saveApplications(fileId, applicationsArray) {
    //upload raw JSON (media) with PATCH
    const r = await authFetch(
        `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json; charset=UTF-8"},
            body: JSON.stringify(applicationsArray),
        }
    );
    if (!r.ok) throw new Error("Failed to save applications");
}

