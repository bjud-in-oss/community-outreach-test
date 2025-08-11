# Supabase Next.js Quickstart

Learn how to create a Supabase project, add some sample data, and query from a Next.js app.

## 1. Create a Supabase project

Go to [database.new](https://database.new/) and create a new Supabase project.

Alternatively, you can create a project using the Management API:

```bash
# First, get your access token from https://supabase.com/dashboard/account/tokens
export SUPABASE_ACCESS_TOKEN="your-access-token"

# List your organizations to get the organization ID
curl -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  https://api.supabase.com/v1/organizations

# Create a new project (replace <org-id> with your organization ID)
curl -X POST https://api.supabase.com/v1/projects \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "organization_id": "<org-id>",
    "name": "My Project",
    "region": "us-east-1",
    "db_pass": "<your-secure-password>"
  }'
```

When your project is up and running, go to the [Table Editor](https://supabase.com/dashboard/project/_/editor), create a new table and insert some data.

Alternatively, you can run the following snippet in your project's [SQL Editor](https://supabase.com/dashboard/project/_/sql/new). This will create a `instruments` table with some sample data.

```sql
-- Create the table
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert some sample data into the table
insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello');

alter table instruments enable row level security;
```

Make the data in your table publicly readable by adding an RLS policy:

```sql
create policy "public can read instruments"
on public.instruments
for select to anon
using (true);
```

## 2. Create a Next.js app

```bash
npx create-next-app -e with-supabase
```

## 3. Declare Supabase Environment Variables

Rename `.env.example` to `.env.local` and populate with your Supabase connection variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
```

## 4. Query Supabase data from Next.js

Create a new file at `app/instruments/page.tsx` and populate with the following.

This will select all the rows from the `instruments` table in Supabase and render them on the page.

```typescript
import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}
```

## 5. Start the app

```bash
npm run dev
```

## Next steps

* Set up [Auth](/docs/guides/auth) for your app
* [Insert more data](/docs/guides/database/import-data) into your database
* Upload and serve static files using [Storage](/docs/guides/storage)