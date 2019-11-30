# Simple Project Coordinator

This project enables you to create your own task list for any project.

# In order to run application localy please follow below steps

1. Install [nvm](https://github.com/coreybutler/nvm-windows)
2. Install node 6 and tell nvm to use it
3. Your node and npm versions should look as below 
    ```
    $ npm -v
    3.10.10


    $ node -v
    v6.14.4
    ```
4. Clone repository to your local drive
5. Create ```constants.ts``` file in ```app/core/constant``` and ```app/shared/constant``` directories. The content of the file should look like below but with your own data, link and keys from Firebase.
    ```
    export const FIREBASE_CONFIG = {
        apiKey: "",
        authDomain: "",
        databaseURL: "https://",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    };
    ```
6. Run ```npm install```
7. Run ```npm start```