Step 1: Import database.sql to MySQL, rename database to emd

Step 2: Create an admin account in the account table from the database you just imported according to the following instructions:
    
        account_username: /*Your account username*/

        account_name: /*Your account name*/

        account_password: /*Your account password*/

        account_email: /*Your account email*/

        account_role: Admin

        is_admin: true

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

Step 5: Open command in Sever Folder, run 'npm start'

Step 6: Open command in Client Folder, run 'npm start'

Step 7: Run on https://localhost:3000
