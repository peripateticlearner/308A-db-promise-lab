// Importing database functions. DO NOT MODIFY THIS LINE
import { central, db1, db2, db3, vault } from "./database.js";

/*
// central: database identifies which database the users are stored within
const val = await central(1);
console.log(val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(1)
console.log(val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(1);
console.log(val3);

central(10).then(db => console.log(db))
db3(10).then(userBasicInfo => console.log(userBasicInfo));
vault(10).then((userPersonalInfo) => console.log(userPersonalInfo));
*/

// Function to get user data
async function getUserData(id) {
    try {
        // creating a mapping of databases
        const dbs = {
            db1: db1, // key-value pairs
            db2: db2, 
            db3: db3
        }; 
    
        // getting the database name for the user
        const dbName = await central(id); 
        console.log("Database Name:", dbName);

        // validating if the database exists
        if (!dbs[dbName]) {
            throw new Error(`Invalid database: ${dbName}`);
        }

        // fetching data from database and vault in parallel using Promise.all()
        const results = await Promise.all([
            dbs[dbName](id), // fetching user info from db1, db2, and db3
            vault(id) // fetching personal info
        ]);

        // assigning results to variables
        const basicInfo = results[0]; // first promise result (database info)
        const personalInfo = results[1]; // the second promise result (vault info)

        console.log("Basic Info:", basicInfo);
        console.log("Personal Info:", personalInfo);
        

        // merge and return final object
        return {
            id: id,
            ...basicInfo,
            ...personalInfo,
        };
    } catch (error){
        return Promise.reject(`Error fetching user data for ID ${id}: ${error.message}`);
    }
}

// calling the function and handle errors
getUserData(1)
    .then((user) => console.log("User Data:", user))
    .catch((error) => console.log("Error:", error));

getUserData(11)
    .then((user) => console.log("User Data:", user))
    .catch((error) => console.log("Error:", error));

getUserData("abc")
    .then((user) => console.log("User Data:", user))
    .catch((error) => console.log("Error:", error));

getUserData(3)
    .then((user) => console.log("User Data:", user))
    .catch((error) => console.log("Error:", error));
