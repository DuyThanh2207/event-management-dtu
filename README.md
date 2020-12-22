Step 1: Export database.sql to MySQL, rename database to emd

Step 2: Open command in Client Folder, run 'npm install'

Step 3: Open command in Sever Folder, run 'npm install'

Step 4: Go to sever/routers/index.js

Changes based on your database

const connection = mysql.createPool({
    host: "localhost", //your host
    user: "root", //your user
    password: "111111", //your password
    database: "emd",
});

Step 4: Open command in Sever Folder, run 'npm start'

Step 5: Open command in Client Folder, run 'npm start'
