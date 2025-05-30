# My Media Archive

A personal media archive website to track books, music, TV shows, films, and pictures. Built with HTML, JavaScript, and Supabase.

## Setup Instructions

1. Create a Supabase project:
   - Go to [Supabase](https://supabase.com) and create a new project
   - Note down your project URL and anon/public key

2. Set up the database:
   - Go to the SQL editor in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Run the SQL commands to create the tables and policies

3. Configure authentication:
   - Enable Email auth provider in Authentication > Providers
   - Create your admin user account through the Auth section

4. Set up storage:
   - Create a new bucket called 'media-images' in the Storage section
   - Make sure the bucket is private (not public)

5. Update configuration:
   - Copy `js/supabase.js.example` to `js/supabase.js`
   - Update `supabaseUrl` and `supabaseKey` with your project credentials

6. Install dependencies:
   ```bash
   npm install
   ```

7. Run the development server:
   ```bash
   python3 -m http.server 8080
   ```

8. Visit `http://localhost:8080` in your browser

## Features

- Track different types of media (books, music, TV/films, pictures)
- Rate and review items
- Add completion dates and notes
- Upload images
- Archive view for each media type
- Secure authentication
- Data persistence with Supabase

## Security

- Row Level Security (RLS) ensures users can only access their own data
- Secure image storage with private bucket
- Authentication handled by Supabase
- Environment variables for sensitive data

## Development

The project uses:
- HTML/CSS for the frontend
- Vanilla JavaScript for interactivity
- Supabase for backend (database, auth, storage)
- Python's HTTP server for local development 