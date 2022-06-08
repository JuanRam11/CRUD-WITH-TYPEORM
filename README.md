# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file

# After running steps adobe

1. go to data-source file and replace with your own database settings
2. change synchronize to true on data-source file
3. comment out dataFind, dataDelete and updateDate from index.ts file
4. run `npm start` command
5. with begin done is going to synchronize database creating table with all columns
6. then you should commnet out dataInsert, dataDelete, dataUpdate
7. After that you should see what is on the table from the console
