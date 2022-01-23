import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `
        SELECT uuid, username
        FROM app_user;
        `;

        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async findUsersByUuid(uuid: string): Promise<User> {
        try {
            const query = `
            SELECT uuid, username
            FROM app_user
            WHERE uuid = $1
            `;

            const values = [uuid];

            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            
            return user;
        } catch (error) {
            throw new DatabaseError('Id não encontrado', error)
        }
    }

    async createUser(user: User): Promise<string> {
        const query = `
        INSERT INTO app_user (username, password)
        VALUES ($1, crypt($2, $3))
        RETURNING uuid
        `;

        const values = [user.username, user.password, "my_salt"];

        const { rows } = await db.query<{ uuid: string }>(query, values);
        console.log(rows)
        const [newUser] = rows;

        return newUser.uuid;
    }

    async updateUser(user: User): Promise<void> {
        const query = `
        UPDATE app_user
        SET username = $1, password = crypt($2, 'my_salt')
        WHERE uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];

        await db.query(query, values);
    }

    async deleteUser(uuid: string): Promise<void> {
        const query = `
        DELETE FROM app_user
        WHERE uuid = $1
        `;

        const values = [uuid];

        await db.query(query, values);
    }
}

export default new UserRepository();