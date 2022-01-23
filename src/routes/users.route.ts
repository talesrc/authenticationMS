import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

//Informar todos os usuários
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
})

//Informar um usuário pelo seu uuid
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {const uuid = req.params.uuid;
    const users = await userRepository.findUsersByUuid(uuid);
    res.status(StatusCodes.OK).send(users);
    } catch(error) {
        next(error);
    }
})

//Adicionar um usuário
usersRoute.post('/users', async (req: Request<{ user: User}>, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const user = await userRepository.createUser(newUser);

    res.status(StatusCodes.CREATED).send({uuid: user});
})

//Alterar um usuário
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid

    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.updateUser(modifiedUser);

    res.status(StatusCodes.OK).send({ modifiedUser })
})

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    await userRepository.deleteUser(uuid)

    res.status(StatusCodes.OK).send(`O seguinte perfil foi deletado: ${uuid}`)
})

export default usersRoute;