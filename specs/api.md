# API Requirements

This document outlines the API endpoints and data structures required for the Visual Approval Dashboard.

## Endpoints

### `GET /api/pull-requests`

Fetches a list of all open pull requests.

**Query Parameters:**

*   `status` (optional): Filter by status (e.g., `open`, `closed`, `merged`).
*   `repo` (optional): Filter by repository (e.g., `owner/repo`).

**Response:**

```json
[
  {
    "id": 1,
    "title": "Add new feature",
    "repo": "owner/repo",
    "author": "username",
    "status": "open",
    "tests": "passing", // "passing", "failing", "pending"
    "reviews": [
      {
        "user": "reviewer1",
        "status": "approved"
      },
      {
        "user": "reviewer2",
        "status": "changes_requested"
      }
    ],
    "conflicts": false
  }
]
```

### `GET /api/pull-requests/:id`

Fetches the details of a single pull request.

**Response:**

```json
{
  "id": 1,
  "title": "Add new feature",
  "repo": "owner/repo",
  "author": "username",
  "branch": "feature-branch",
  "description": "This is a detailed description of the new feature.",
  "status": "open",
  "tests": "passing",
  "reviews": [
    {
      "user": "reviewer1",
      "status": "approved"
    },
    {
      "user": "reviewer2",
      "status": "changes_requested"
    }
  ],
  "conflicts": false,
  "diff": "..." // The diff content
}
```

### `POST /api/pull-requests/:id/approve`

Approves a pull request.

**Request Body:**

```json
{
  "confidenceLevel": "high" // "high", "medium", "low"
}
```

**Response:**

```json
{
  "success": true
}
```

### `POST /api/pull-requests/:id/reject`

Rejects a pull request.

**Response:**

```json
{
  "success": true
}
```
