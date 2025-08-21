const dotenv = require('dotenv');
const {Pool}= require('pg');
dotenv.config();

const client =new Pool({
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    databse : process.env.PGDATABASE,
    password : process.env.PGPASSWORD,
    port : process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false // required for Azure PostgreSQL
    }
});

client.connect()
.then(()=>{
    console.log("Connected to the database successfully");
})
.catch((err)=>{
    console.error("Error connecting to the database:", err);
});

const createTableQuery = `create table if not exists mockmate_users
    (id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null
    );`
;    

client.query(createTableQuery)
.then(() => {
    console.log("Table 'mockmate_users' created successfully or already exists.");
})
.catch((err)=>{
    console.error("Error creating table:", err);
});

module .exports =client;