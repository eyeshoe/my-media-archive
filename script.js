let musicData = { entries: [] };
let currentMonth = new Date();

async function loadData() {
    // Always load from JSON file
    try {
        const musicResponse = await fetch('data/music.json');
        const jsonData = await musicResponse.json();
        if (jsonData.entries && jsonData.entries.length > 0) {
            musicData = jsonData;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }

    renderCalendar();
}

function renderEntries() {
    const container = document.getElementById('entries-container');
    
    if (!musicData.entries || musicData.entries.length === 0) {
        container.innerHTML = '<div class="no-entries">No albums yet. Click "+ Add Album" to get started!</div>';
        return;
    }
    
    // Sort entries by date (newest first)
    const sortedEntries = [...musicData.entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let html = '';
    sortedEntries.forEach(entry => {
        html += `
            <div class="album-entry">
                <div class="album-header">
                    <div>
                        <div class="album-title">${entry.album}</div>
                        <div class="album-artist">by ${entry.artist}</div>
                        <div class="album-date">${formatDate(entry.date)}</div>
                    </div>
                </div>
                <div class="album-rating">${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}</div>
                ${entry.review ? `<div class="album-review">${entry.review}</div>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showAddForm() {
    const modal = document.getElementById('add-modal');
    modal.classList.add('show');
    
    // Set today's date as default
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

function hideAddForm() {
    const modal = document.getElementById('add-modal');
    modal.classList.remove('show');
    
    // Clear form
    document.getElementById('add-form').reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

async function handleSubmit(e) {
    e.preventDefault();

    const entry = {
        album: document.getElementById('album').value.trim(),
        artist: document.getElementById('artist').value.trim(),
        date: document.getElementById('date').value,
        rating: parseInt(document.getElementById('rating').value),
        review: document.getElementById('review').value.trim() || null
    };

    // Add to data
    musicData.entries.push(entry);
    musicData.entries.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Update display
    renderCalendar();
    hideAddForm();

    // Show success message
    showSuccessMessage(`Added "${entry.album}" by ${entry.artist}!`);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const container = document.getElementById('calendar-container');
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}


function renderCalendar() {
    const container = document.getElementById('calendar-container');
    const entriesByDate = groupEntriesByDate(musicData.entries);
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let html = `
        <div class="calendar-header">
            <h3 class="calendar-month-title">${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <div class="calendar-nav">
                <button onclick="changeMonth(-1)">← Prev</button>
                <button onclick="changeMonth(0)">Today</button>
                <button onclick="changeMonth(1)">Next →</button>
            </div>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>
    `;
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">
            <span class="calendar-day-number">${daysInPrevMonth - i}</span>
        </div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEntries = entriesByDate[dateStr] || [];
        
        const hasEntry = dayEntries.length > 0;
        const dayClass = hasEntry ? 'calendar-day has-entry' : 'calendar-day';
        
        let contentHtml = '';
        if (hasEntry) {
            dayEntries.forEach(entry => {
                contentHtml += `${entry.album}<br>`;
            });
        }
        
        html += `
            <div class="${dayClass}" onclick="${hasEntry ? `showDayEntries('${dateStr}')` : ''}">
                <span class="calendar-day-number">${day}</span>
                <div class="calendar-day-content">${contentHtml}</div>
            </div>
        `;
    }
    
    // Next month days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-day other-month">
            <span class="calendar-day-number">${day}</span>
        </div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function groupEntriesByDate(entries) {
    return entries.reduce((groups, entry) => {
        if (!groups[entry.date]) {
            groups[entry.date] = [];
        }
        groups[entry.date].push(entry);
        return groups;
    }, {});
}

function changeMonth(direction) {
    if (direction === 0) {
        currentMonth = new Date();
    } else {
        currentMonth.setMonth(currentMonth.getMonth() + direction);
    }
    renderCalendar();
}

function showDayEntries(date) {
    const entries = musicData.entries.filter(entry => entry.date === date);
    if (entries.length === 0) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    
    let entriesHtml = '';
    entries.forEach(entry => {
        entriesHtml += `
            <div class="album-entry" style="margin: 15px 0;">
                <div class="album-title">${entry.album}</div>
                <div class="album-artist">by ${entry.artist}</div>
                <div class="album-rating">${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}</div>
                ${entry.review ? `<div class="album-review">${entry.review}</div>` : ''}
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            ${entriesHtml}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}



// Export function to download JSON
function exportData() {
    const dataStr = JSON.stringify(musicData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'music.json';
    link.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    // Load data from JSON file
    loadData();

    // Set up form submission
    document.getElementById('add-form').addEventListener('submit', handleSubmit);

    // Set up modal click outside to close
    document.getElementById('add-modal').addEventListener('click', (e) => {
        if (e.target.id === 'add-modal') {
            hideAddForm();
        }
    });


    // Add keyboard shortcut to open form (Ctrl/Cmd + N)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            showAddForm();
        }
    });
});