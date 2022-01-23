import { Pool } from 'pg';

const connectionString = 'postgres://evrcamfe:Rkqsv0TxU3EyotG3JW6N0h8Jz3-uNmPn@kesavan.db.elephantsql.com/evrcamfe';

const db = new Pool({ connectionString  });

export default db;