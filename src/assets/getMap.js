const fs = require('fs');
const path = require('path');

function extractMdContentByTag(dirPath, jsonFile) {
    let data = {};

    fs.readdirSync(dirPath).forEach(file => {
        if(path.extname(file) === '.md') {
            let content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
            let headerMatch = content.match(/---([\s\S]*?)---/);

            if(headerMatch){
                let tagsMatch = headerMatch[1].match(/tags: \[(.*?)\]/);
                let tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : [];

                let titleMatch = headerMatch[1].match(/title: "(.*?)"/);
                let title = titleMatch ? titleMatch[1] : '';

                tags.forEach(tag => {
                    if(!data[tag]) data[tag] = [];
                    data[tag].push({ title, tags, path: path.join(dirPath, file), content: content });
                });
            }
        }
    });

    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
}

function extractMdContentByTitle(dirPath, jsonFile) {
    let data = {};

    fs.readdirSync(dirPath).forEach(file => {
        if(path.extname(file) === '.md') {
            let content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
            let headerMatch = content.match(/---([\s\S]*?)---/);

            if(headerMatch){
                let tagsMatch = headerMatch[1].match(/tags: \[(.*?)\]/);
                let tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : [];

                let titleMatch = headerMatch[1].match(/title: "(.*?)"/);
                let title = titleMatch ? titleMatch[1] : '';

                if (title) {
                    if (!data[title]) data[title] = [];
                    data[title].push({ tags, path: path.join(dirPath, file), content: content});
                }
            }
        }
    });

    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
}

// Call the functions
extractMdContentByTag('./notes', 'tags.json');
extractMdContentByTitle('./notes', 'title.json');
