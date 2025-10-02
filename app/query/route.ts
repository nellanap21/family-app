import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listLogs() {
	const data = await sql`
    SELECT members.name
    FROM logs
    JOIN members ON logs.member_id = members.id
  `;

	return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listLogs());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
