import { createConnection } from 'mysql2/promise';

// For serverless, create connection per request
async function getConnection() {
  return await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 16606,
    ssl: {
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
  });
}

// Query helper
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(sql, params);
    return rows as T;
  } finally {
    await conn.end();
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (connection: any) => Promise<T>
): Promise<T> {
  const conn = await getConnection();
  await conn.beginTransaction();
  try {
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    await conn.end();
  }
}