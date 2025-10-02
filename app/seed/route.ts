import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { logs, members, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedLogs() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS logs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      member_id UUID NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedLogs = await Promise.all(
    logs.map(
      (log) => sql`
        INSERT INTO logs (member_id, status, date)
        VALUES (${log.member_id}, ${log.status}, ${log.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedLogs;
}

async function seedMembers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS members (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedMembers = await Promise.all(
    members.map(
      (member) => sql`
        INSERT INTO members (id, name, email, image_url)
        VALUES (${member.id}, ${member.name}, ${member.email}, ${member.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedMembers;
}


export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedMembers(),
      seedLogs(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
