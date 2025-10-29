let blogData = {
    entries: []
};
let currentMonth = new Date();

// Tab switching function
function switchTab(tabName) {
    // Remove active class from all tabs and content
    const tabs = document.querySelectorAll('.blog-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    const selectedTab = Array.from(tabs).find(tab =>
        tab.textContent.toLowerCase().includes(tabName)
    );
    const selectedContent = document.getElementById(`${tabName}-tab`);

    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

// Load blog data
async function loadBlogData() {
    try {
        const response = await fetch('data/blog.json');
        const jsonData = await response.json();
        if (jsonData.entries) {
            blogData = jsonData;
        }
    } catch (error) {
        console.log('No blog data yet, starting fresh');
    }
    renderEntries();
}

function renderEntries() {
    const mediaContainer = document.getElementById('media-entries');
    const musicContainer = document.getElementById('music-entries');

    const currentMonthStr = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('current-month-title').textContent = currentMonthStr;

    // Filter entries for current month
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();

    const monthEntries = blogData.entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === currentYear &&
               entryDate.getMonth() === currentMonthNum;
    });

    const mediaEntries = monthEntries.filter(e => e.type === 'media');
    const musicEntries = monthEntries.filter(e => e.type === 'music');

    // Render media entries
    if (mediaEntries.length === 0) {
        mediaContainer.innerHTML = '<p class="no-entries">No media entries yet for this month</p>';
    } else {
        mediaContainer.innerHTML = mediaEntries.map(entry => `
            <div class="blog-entry">
                <h3>${entry.title}</h3>
                <p class="entry-date">${formatDate(entry.date)}</p>
                <p class="entry-content">${entry.content}</p>
            </div>
        `).join('');
    }

    // Render music entries
    if (musicEntries.length === 0) {
        musicContainer.innerHTML = '<p class="no-entries">No music entries yet for this month</p>';
    } else {
        musicContainer.innerHTML = musicEntries.map(entry => `
            <div class="blog-entry">
                <h3>${entry.title}</h3>
                <p class="entry-date">${formatDate(entry.date)}</p>
                <p class="entry-content">${entry.content}</p>
            </div>
        `).join('');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function changeMonth(direction) {
    if (direction === 0) {
        currentMonth = new Date();
    } else {
        currentMonth.setMonth(currentMonth.getMonth() + direction);
    }
    renderEntries();
}

function showAddForm(type) {
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const entryType = document.getElementById('entry-type');

    modalTitle.textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)} Entry`;
    entryType.value = type;

    modal.classList.add('show');
    document.getElementById('entry-date').value = new Date().toISOString().split('T')[0];
}

function hideAddForm() {
    const modal = document.getElementById('blog-modal');
    modal.classList.remove('show');
    document.getElementById('blog-form').reset();
}

function handleSubmit(e) {
    e.preventDefault();

    const entry = {
        type: document.getElementById('entry-type').value,
        title: document.getElementById('entry-title').value.trim(),
        date: document.getElementById('entry-date').value,
        content: document.getElementById('entry-content').value.trim()
    };

    blogData.entries.push(entry);
    blogData.entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    renderEntries();
    hideAddForm();

    // Show success message
    alert(`Added "${entry.title}" to your ${entry.type} blog!`);
}

// Export function
function exportBlogData() {
    const dataStr = JSON.stringify(blogData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blog.json';
    link.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    loadBlogData();

    document.getElementById('blog-form').addEventListener('submit', handleSubmit);

    document.getElementById('blog-modal').addEventListener('click', (e) => {
        if (e.target.id === 'blog-modal') {
            hideAddForm();
        }
    });
});
