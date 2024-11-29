const db = require('./db/connection');

const fetchValidData = async () => {
  const { rows } = await db.query('SELECT * FROM validData ORDER BY created_at DESC');
  return rows;
};

const fetchInvalidData = async () => {
  const { rows } = await db.query('SELECT * FROM invalidData ORDER BY created_at DESC');
  return rows;
};

const insertValidData = async ({ full_name, email }) => {
  const { rows } = await db.query(
    'INSERT INTO validData (full_name, email) VALUES ($1, $2) RETURNING *',
    [full_name, email]
  );
  return rows[0];
};

const insertInvalidData = async ({ full_name, email, error_reason }) => {
  const { rows } = await db.query(
    'INSERT INTO invalidData (full_name, email, error_reason) VALUES ($1, $2, $3) RETURNING *',
    [full_name, email, error_reason]
  );
  return rows[0];
};

const updateValidDataById = async (id, updates) => {
  const { rows } = await db.query(
    'UPDATE validData SET full_name = $1, email = $2 WHERE id = $3 RETURNING *',
    [updates.full_name, updates.email, id]
  );
  return rows[0];
};

const updateInvalidDataById = async (id, updates) => {
  const { rows } = await db.query(
    'UPDATE invalidData SET full_name = $1, email = $2, error_reason = $3 WHERE id = $4 RETURNING *',
    [updates.full_name, updates.email, updates.error_reason, id]
  );
  return rows[0];
};

const deleteValidDataById = async (id) => {
  await db.query('DELETE FROM validData WHERE id = $1', [id]);
};

const deleteInvalidDataById = async (id) => {
  await db.query('DELETE FROM invalidData WHERE id = $1', [id]);
};

module.exports = {
  fetchValidData,
  fetchInvalidData,
  insertValidData,
  insertInvalidData,
  updateValidDataById,
  updateInvalidDataById,
  deleteValidDataById,
  deleteInvalidDataById,
};