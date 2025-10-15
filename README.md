# aishu's archive

A personal media tracking website for documenting daily albums and books.

## How to Use

### Viewing the Site
Open `index.html` in your browser to view your archive.

### Adding New Entries

#### Method 1: Command Line (Recommended)
```bash
node add-entry.js
```
Follow the prompts to add a new album entry. The script will ask for:
- Date (YYYY-MM-DD format, defaults to today)
- Album name
- Artist name  
- Album cover path (optional)
- Rating (1-5)
- Review (optional)

#### Method 2: Manual JSON Edit
Edit `data/music.json` directly. Add your entry to the "entries" array:
```json
{
  "date": "2025-10-14",
  "album": "Album Name",
  "artist": "Artist Name",
  "cover": "images/album-covers/filename.jpg",
  "rating": 5,
  "review": "Your thoughts here"
}
```

#### Quick Command Example
To add an entry manually via command line:
```bash
# Edit the JSON file directly
nano data/music.json
# or
vim data/music.json
# or
code data/music.json
```

### Deploying to GitHub Pages

1. Commit your changes:
```bash
git add .
git commit -m "Add new album/book entries"
git push
```

2. Enable GitHub Pages in your repository settings

### Workflow Tips

- Add entries daily using `node add-entry.js`
- Push to GitHub weekly or monthly
- The site updates automatically after pushing

### Adding Cover Images

1. Place images in `images/album-covers/` or `images/book-covers/`
2. Reference them in the JSON as: `"cover": "images/album-covers/filename.jpg"`

### Features

- Calendar view showing days with entries
- List view with all entries sorted by date
- Click any entry to see full details and review
- Retro pink/black aesthetic
- Mobile responsive