import postgres from 'postgres';
import {
  MemberField,
  MembersTableType,
  LogForm,
  LogsTable,
  LatestLogRaw,
  Revenue,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// use SQL to only fetch the data you needed, instead of fetching everything and filtering in JavaScript
export async function fetchLatestLogs() {
  try {
    // tells TypeScript the result will be an array of LatestLogRaw objects
    const data = await sql<LatestLogRaw[]>` 
      SELECT members.name, members.image_url, members.email, logs.id
      FROM logs
      JOIN members ON logs.member_id = members.id
      ORDER BY logs.date DESC
      LIMIT 5`;

    const latestLogs = data.map((log) => ({
      ...log, 
    }));
    return latestLogs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest logs.');
  }
}

// Parallelize data fetching with JavaScript - where it made sense to do so
export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const logCountPromise = sql`SELECT COUNT(*) FROM logs`;
    const memberCountPromise = sql`SELECT COUNT(*) FROM members`;
    const logStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'happy' THEN 1 ELSE 0 END) AS "happy",
         SUM(CASE WHEN status = 'sad' THEN 1 ELSE 0 END) AS "sad"
         FROM logs`;

    const data = await Promise.all([
      logCountPromise,
      memberCountPromise,
      logStatusPromise,
    ]);

    const numberOfLogs = Number(data[0][0].count ?? '0');
    const numberOfMembers = Number(data[1][0].count ?? '0');
    const totalHappyLogs = data[2][0].happy ?? '0';
    const totalSadLogs = data[2][0].sad ?? '0';

    return {
      numberOfMembers,
      numberOfLogs,
      totalHappyLogs,
      totalSadLogs,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredLogs(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const logs = await sql<LogsTable[]>`
      SELECT
        logs.id,
        logs.date,
        logs.status,
        members.name,
        members.email,
        members.image_url
      FROM logs
      JOIN members ON logs.member_id = members.id
      WHERE
        members.name ILIKE ${`%${query}%`} OR
        members.email ILIKE ${`%${query}%`} OR
        logs.date::text ILIKE ${`%${query}%`} OR
        logs.status ILIKE ${`%${query}%`}
      ORDER BY logs.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return logs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch logs.');
  }
}

export async function fetchLogsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM logs
    JOIN members ON logs.member_id = members.id
    WHERE
      members.name ILIKE ${`%${query}%`} OR
      members.email ILIKE ${`%${query}%`} OR
      logs.date::text ILIKE ${`%${query}%`} OR
      logs.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of logs.');
  }
}

export async function fetchLogById(id: string) {
  try {
    const data = await sql<LogForm[]>`
      SELECT
        logs.id,
        logs.member_id,
        logs.status
      FROM logs
      WHERE logs.id = ${id};
    `;

    const log = data.map((log) => ({
      ...log,
    }));

    return log[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch log.');
  }
}

export async function fetchMembers() {
  try {
    const members = await sql<MemberField[]>`
      SELECT
        id,
        name
      FROM members
      ORDER BY name ASC
    `;

    return members;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all members.');
  }
}

export async function fetchFilteredMembers(query: string) {
  try {
    const data = await sql<MembersTableType[]>`
		SELECT
		  members.id,
		  members.name,
		  members.email,
		  members.image_url,
		  COUNT(logs.id) AS total_logs,
		  SUM(CASE WHEN logs.status = 'sad' THEN 1 ELSE 0 END) AS total_sad,
		  SUM(CASE WHEN logs.status = 'happy' THEN 1 ELSE 0 END) AS total_happy
		FROM members
		LEFT JOIN logs ON members.id = logs.member_id
		WHERE
		  members.name ILIKE ${`%${query}%`} OR
        members.email ILIKE ${`%${query}%`}
		GROUP BY members.id, members.name, members.email, members.image_url
		ORDER BY members.name ASC
	  `;

    const members = data.map((member) => ({
      ...member,
      total_sad: member.total_sad,
      total_happy: member.total_happy,
    }));

    return members;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch member table.');
  }
}
