// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// used to be customer. changed to member
export type Member = {
  id: string;
  name: string;
  image_url: string;
};

// used to invoice. changed to log
export type Log = {
  id: string;
  member_id: string;
  date: string;
  // In TypeScript, this is called a string union type.
  status: 'very unhappy' | 'unhappy' | 'meh' | 'happy' | 'very happy';
  note: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestLog = {
  id: string;
  name: string;
  image_url: string;
  date: string;
  timestamp: string;
  status: 'very unhappy' | 'unhappy' | 'meh' | 'happy' | 'very happy';
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestLogRaw = Omit<LatestLog, 'amount'> & {
  amount: number;
};

export type LogsTable = {
  id: string;
  member_id: string;
  name: string;
  image_url: string;
  date: string;
  timestamp: string;
  amount: number;
  status: 'very unhappy' | 'unhappy' | 'meh' | 'happy' | 'very happy';
  note: string;
};

export type MembersTableType = {
  id: string;
  name: string;
  image_url: string;
  total_log: number;
  total_happy: number;
  total_unhappy: number;
};

export type FormattedMembersTable = {
  id: string;
  name: string;
  image_url: string;
  total_logs: number;
  total_unhappy: string;
  total_happy: string;
};

export type MemberField = {
  id: string;
  name: string;
};

export type LogForm = {
  id: string;
  member_id: string;
  amount: number;
  status: 'very unhappy' | 'unhappy' | 'meh' | 'happy' | 'very happy';
  note: string;
};
