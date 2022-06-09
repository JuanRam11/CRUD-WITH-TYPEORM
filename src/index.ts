import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { User } from './entity/User';
import 'reflect-metadata';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    //TO SEARCH ALL USERS //To Search specific colums
    app.get('/user', async (req: Request, res: Response) => {
      const dataFind = await AppDataSource.manager.find(
        User /* , {
        select: { firstName: true, id: true },
     /*    where: { age: 0, lastName: 'Saw' }, 
      } */
      );
      res.json(dataFind);
    });

    //To find specific users using id on the URL
    app.get('/user:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      const dataFind = await AppDataSource.manager.find(User, {
        /*         select: { firstName: true, id: true }, */
        where: { id: id },
      });
      res.json(dataFind);
    });

    // To insert data into table
    app.post('/user', async (req: Request, res: Response) => {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const age = req.body.age;
      const dataInsert = await AppDataSource.manager.insert(User, {
        firstName: firstName,
        lastName: lastName,
        age: age,
      });
      res.json({ affetedRows: dataInsert.raw.affectedRows });
    });

    // DELETE registry from database
    app.delete('/user:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      const dataDelete = await AppDataSource.manager.delete(User, { id: id });
      res.json({ Delete: dataDelete });
    });

    // To update
    app.put('/user:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      const firstName = req.params.firstName;
      const updateData = await AppDataSource.manager
        .createQueryBuilder()
        .update(User)
        .set({ firstName: firstName })
        .where('id=:id', { id: id })
        .execute();
      res.json({ affected: updateData });
    });

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    );
  })
  .catch((error) => console.log(error));
