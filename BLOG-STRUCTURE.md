# Blog Structure Documentation

## File Organization

Your blog is now organized into separate files for easier management:

```
/blog.html           → Main blog landing page (choose life or music)
/blog-life.html      → All life blog posts (newest at top)
/blog-music.html     → All music playlists (newest at top)
/images/october 2025/ → Folder for October 2025 images
```

## How to Add New Posts

### Adding a Life Post

1. Open `blog-life.html`
2. Find the comment that says "ADD NEW POSTS ABOVE THIS LINE"
3. Copy the entire `<article>` block from the October 2025 post
4. Paste it at the TOP of the file (right after the first comment)
5. Update:
   - Title (e.g., "november 2025")
   - Date (e.g., "November 30, 2025")
   - Content paragraphs
   - Images (create a new folder like `images/november 2025/`)
6. Save the file

### Adding a Music Post

1. Open `blog-music.html`
2. Find the comment that says "ADD NEW PLAYLISTS ABOVE THIS LINE"
3. Copy the entire `<article>` block from the October 2025 playlist
4. Paste it at the TOP of the file
5. Update:
   - Title (e.g., "november 2025 playlist")
   - Date
   - Songs and YouTube embed codes
6. Save the file

## Image Organization

Create a new folder for each month's images:
- `/images/october 2025/` - October 2025 images
- `/images/november 2025/` - November 2025 images (future)
- etc.

## Tips

- **Always add new posts at the TOP** - This keeps the newest content first
- **Use descriptive alt text** for images (helps accessibility)
- **Test locally** before pushing to make sure images and videos load
- The barbed wire divider (`images/barb.png`) appears automatically at the end of each post

## Navigation Flow

1. User clicks "monthly blog" from homepage
2. They see `blog.html` with two boxes: "life" and "music"
3. Clicking a box takes them to the respective page with all posts
4. "← back to blog" link returns to main blog page
5. "← home" link returns to homepage
