# Awesome Project Build with TypeORM with EXPRESS and Restful Routes

Steps to run this project:

1. Run `npm i` command

# After running steps adobe

1. setup database settings inside `data-source.ts` file
2. change synchronize to true on `data-source.ts` file
3. run `npm start` command
4. with begin done is going to synchronize database creating table with all columns
5. After that you should see the table with all columns from MYSQL database
6. go to POSTMAN and with http://localhost:3000/user you can do all CRUD
7. GET users (GET), http://localhost:3000/user will response with all users in json format
8. GET specific user (GET), http://localhost:3000/user will response with a specific user in json format
9. INSERT (POST), http://localhost:3000/user will response with rows that were inserted in json format
10. UPDATE (PUT), http://localhost:3000/user:id will response with rows that were updated in json format
11. DELETE (DELETE), http://localhost:3000/user:id will response with that were deleted
