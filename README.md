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
Follow the prompts to add a new album or book entry.

#### Method 2: Manual JSON Edit
Edit `data/music.json` or `data/books.json` directly:
```json
{
  "date": "2024-01-20",
  "album": "Album Name",
  "artist": "Artist Name",
  "review": "Your thoughts here",
  "rating": 5
}
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