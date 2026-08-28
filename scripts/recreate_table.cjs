const { Client } = require('pg');

const client = new Client({
  host: 'db.jvyudlqbzknossfcfrqd.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Thisismedical_form#22',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('Connecting to Supabase Postgres...');
  await client.connect();

  console.log('1. Dropping old table...');
  await client.query('DROP TABLE IF EXISTS public.counseling_responses CASCADE;');

  console.log('2. Creating new clean table schema...');
  await client.query(`
    CREATE TABLE public.counseling_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now(),
        device_id TEXT NOT NULL,
        counseling_type TEXT NOT NULL,
        college_authority_name TEXT NOT NULL,
        feedback_text TEXT NOT NULL
    );
  `);

  console.log('3. Enabling Row Level Security...');
  await client.query('ALTER TABLE public.counseling_responses ENABLE ROW LEVEL SECURITY;');

  console.log('4. Creating anonymous insert and select policies...');
  await client.query(`
    CREATE POLICY "Enable insert for all" 
    ON public.counseling_responses 
    FOR INSERT 
    TO anon, authenticated, public
    WITH CHECK (true);

    CREATE POLICY "Enable select for all" 
    ON public.counseling_responses 
    FOR SELECT 
    TO anon, authenticated, public
    USING (true);
  `);

  console.log('🎉 SUCCESS: Table public.counseling_responses recreated with perfect RLS permissions!');
  await client.end();
}

run().catch(err => {
  console.error('❌ Migration Error:', err);
  process.exit(1);
});
