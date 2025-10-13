#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('\n📚 ADD NEW ENTRY TO YOUR ARCHIVE 📚\n');
    console.log('========================================\n');
    
    console.log('\nAdding new album entry...\n');
    
    const today = new Date().toISOString().split('T')[0];
    const dateInput = await question(`Date (YYYY-MM-DD) [default: ${today}]: `);
    const date = dateInput || today;
    
    let entry = { date };
    
    entry.album = await question('Album name: ');
    entry.artist = await question('Artist name: ');
    entry.cover = await question('Cover image path (optional, press Enter to skip): ');
    
    const ratingStr = await question('Rating (1-5): ');
    entry.rating = parseInt(ratingStr) || 3;
    
    console.log('\nWrite your review (press Enter twice when done):');
    let review = '';
    let emptyLines = 0;
    
    const reviewRl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    await new Promise((resolve) => {
        reviewRl.on('line', (line) => {
            if (line === '') {
                emptyLines++;
                if (emptyLines === 2) {
                    reviewRl.close();
                    resolve();
                } else {
                    review += '\n';
                }
            } else {
                emptyLines = 0;
                if (review) review += '\n';
                review += line;
            }
        });
    });
    
    entry.review = review.trim();
    
    if (!entry.cover) {
        delete entry.cover;
    }
    
    const dataFile = 'data/music.json';
    let data = { entries: [] };
    if (fs.existsSync(dataFile)) {
        const content = fs.readFileSync(dataFile, 'utf-8');
        data = JSON.parse(content);
    }
    
    data.entries.push(entry);
    data.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    
    console.log(`\n✅ Entry added successfully!\n`);
    console.log('Entry details:');
    console.log('==============');
    console.log(`Album: ${entry.album}`);
    console.log(`Artist: ${entry.artist}`);
    console.log(`Date: ${entry.date}`);
    console.log(`Rating: ${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}`);
    if (entry.review) {
        console.log(`\nReview:\n${entry.review}`);
    }
    
    console.log('\n🎉 Remember to commit and push when you\'re ready to update the site!');
    
    rl.close();
}

main().catch(console.error);