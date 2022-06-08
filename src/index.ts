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

    //To Search specific colums
    const dataFind = await AppDataSource.manager.find(User, {
      select: { firstName: true, id: true },
      where: { age: 0, lastName: 'Saw' },
    });
    console.log(dataFind);

    // To insert data into table
    const dataInsert = await AppDataSource.manager.insert(User, {
      firstName: 'Alberto',
      lastName: 'Pedro',
      age: 55,
    });
    console.log(dataInsert);

    // DELETE registry from database
    const dataDelete = await AppDataSource.manager.delete(User, { id: '1' });
    console.log(dataDelete);

    // To update
    const updateData = await AppDataSource.manager
      .createQueryBuilder()
      .update(User)
      .set({ firstName: 'Prueba' })
      .where('id=:id', { id: 2 })
      .execute();
    console.log(updateData);

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    );
  })
  .catch((error) => console.log(error));
