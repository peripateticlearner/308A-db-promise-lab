# DB Promise Lab

## Overview
This project retrieves user data from multiple databases using `async/await` and Promises. It ensures efficient data fetching within 200ms while handling errors properly.

## Files
- **index.html** - Basic HTML structure
- **script.js** - Fetches and processes user data
- **database.js** - Simulated database functions

## How It Works
1. The `central(id)` function identifies which database (`db1`, `db2`, or `db3`) contains user data.
2. The correct database provides the user's `username`, `website`, and `company`.
3. The `vault(id)` function retrieves the user's `name`, `email`, `address`, and `phone`.
4. The data is merged into a single object and returned.
5. Errors are handled if an invalid ID or database failure occurs.

## Author
This project was completed for a JavaScript lab on asynchronous programming.

