# aishu's corner ✨

A personal blog website for documenting the fun things in life - music, art, thoughts, and everything in between!

## Website Structure

### Pages
- **Homepage** (`index.html`) - Main landing page with navigation to all sections
- **Monthly Blog** (`blog.html`) - Monthly entries about media and music
- **Albums Calendar** (`albums.html`) - Calendar view of albums you've listened to
- **Favorites** (`favorites.html`) - Your all-time favorite things
- **Things I Like** (`likes.html`) - Lists of things that bring you joy
- **Pictures** (`pictures.html`) - Photo gallery for moments and memories

## How to Use

### Viewing the Site
Open `index.html` in your browser to view your personal website!

### Adding Content

#### Monthly Blog Posts

Your blog is organized into two sections: **life** and **music**. Each has its own file:

**Adding a Life Post:**
1. Open `blog-life.html` in your code editor
2. Find the comment that says `ADD NEW POSTS ABOVE THIS LINE`
3. Copy the entire `<article>` block (from `<article class="blog-post">` to `</article>`)
4. Paste it at the TOP, right after the first comment block
5. Update:
   - `<h1 class="post-title">` - Change to your new month (e.g., "november 2025")
   - `<p class="post-date">` - Update the date
   - Content paragraphs - Write your new post
   - Images - Add new images to `images/your-month-folder/`
6. Save the file

**Adding a Music Playlist:**
1. Open `blog-music.html` in your code editor
2. Find the comment that says `ADD NEW PLAYLISTS ABOVE THIS LINE`
3. Copy the entire `<article>` block
4. Paste it at the TOP
5. Update:
   - Title and date
   - Each song's `<h3>` title and artist
   - YouTube embed iframe `src` URL for each song
6. Save the file

**Image Organization:**
- Create a new folder for each month: `images/november 2025/`, `images/december 2025/`, etc.
- Put all photos for that month in the folder
- Reference them in your HTML: `<img src="images/november 2025/photo.jpg">`

#### Albums Calendar
The albums page has an interactive form where you can add albums directly through the browser. Your data is stored locally in the browser.

To export your data:
1. Open the browser console (F12)
2. Type: `exportData()`
3. Save the downloaded `music.json` file to the `data/` folder

#### Pictures Gallery

**Adding new picture galleries:**
1. Create a new HTML file (e.g., `pictures-december-2025.html`)
2. Copy the structure from an existing pictures file (like `pictures-2024.html`)
3. Update the title and header
4. Add your images in the gallery grid:
```html
<div class="gallery-item">
    <img src="images/your-folder/photo.jpg" alt="Description">
</div>
```
5. Add a link to your new gallery in `pictures.html`:
```html
<a href="pictures-december-2025.html" class="gallery-year-link">December 2025</a>
```

**Image tips:**
- Store images in organized folders: `images/photos-2024/`, `images/iowa/`, etc.
- Use descriptive file names: `concert.jpg`, `beach-sunset.jpg`
- Compress large images to keep the site fast

#### Favorites Page

**Adding items to your favorites:**
1. Open `favorites.html` in your code editor
2. Find the section you want to add to (there are placeholder boxes)
3. Add items in the existing scrapbook layout or create new sections:

**To add an image box:**
```html
<div class="scrapbook-image-box">
    <img src="images/your-image.jpg" alt="Description">
</div>
<p class="scrapbook-label">Your Label</p>
```

**To add a text note:**
```html
<div class="scrapbook-text-box">
    Your text or quote here
</div>
```

**To add small icon items in a row:**
```html
<div class="scrapbook-row">
    <div class="scrapbook-small-item">
        <img src="images/icon1.jpg" alt="Description">
    </div>
    <div class="scrapbook-small-item">
        <img src="images/icon2.jpg" alt="Description">
    </div>
</div>
```

The favorites page has a scrapbook aesthetic, so feel free to arrange items creatively!

#### Email Newsletter
The newsletter signup form stores emails in localStorage. For a real implementation, you'll want to integrate with a service like:
- Mailchimp
- ConvertKit
- Substack
- Buttondown

### Customization

#### Colors
Edit `styles.css` to change colors:
- Main pink: `#ffb3d1`
- Accent pink: `#ff99cc`
- Highlight pink: `#ff1493`
- Black borders: `#000`

#### Content
- **Favorites**: Edit `favorites.html` to add your actual favorites
- **Things I Like**: Edit `likes.html` to update the lists with your preferences
- **Pictures**: Add images to an `images/` folder and update `pictures.html`

#### Title and Branding
Update "aishu's corner" throughout the HTML files to your preferred site name.

### Deploying Online

#### GitHub Pages
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select your main branch
4. Your site will be live at `https://yourusername.github.io/repository-name`

#### Other Hosting Options
- Netlify (drag and drop the folder)
- Vercel
- Neocities (great for indie web vibes!)

### Data Storage

The site currently uses localStorage for quick prototyping. Your data is stored in:
- `data/music.json` - Album entries
- `data/blog.json` - Blog entries
- Browser localStorage - Newsletter signups and temporary data

## Features

- ✨ Indie internet aesthetic
- 🎨 Pink/black/white color scheme
- 📱 Mobile responsive
- 🗓️ Interactive calendar for albums
- 📝 Monthly blog with sections for media and music
- 💕 Curated favorites and likes pages
- 📸 Photo gallery ready for your images
- 📬 Newsletter signup (ready for integration)

## Tips

- Regularly export your data from localStorage to JSON files
- Take screenshots of your site as it evolves!
- Customize the "things I like" page seasonally
- Add your personality through the sample content
- Share your site URL on your other social platforms

## Next Steps

1. Replace sample content with your own
2. Add actual photos to the pictures page
3. Customize colors if desired
4. Start adding albums and blog entries
5. Share your corner of the internet!

---

made with ♡ | powered by HTML, CSS, and JavaScript
