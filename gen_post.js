const fs = require('fs');

const files = fs.readdirSync('sheets');

function content(title, imgUrl, fileUrl) {
    return `---
title: ${title}
date: 2022-11-26 22:25:50
tags:
---

![${title}](${imgUrl})

[下载 PDF](${fileUrl})
`
}

const missing = [];

(async () => {
    for (const file of files) {
        const basename = file.split('.')[0];
        if (fs.existsSync(`img/${basename}.png`)) {
            fs.writeFileSync(
                `../animenz/source/_posts/${basename}.md`,
                content(
                    basename,
                    `https://cdn.jsdelivr.net/gh/AnotiaWang/animenz@source/img/${basename}.png`,
                    `https://cdn.jsdelivr.net/gh/AnotiaWang/animenz@source/sheets/${file}`
                ),
                'utf8'
            )
        }
        else {
            missing.push(basename)
        }
    }
    for (const file of missing) {
        console.log(`Missing: ${file}`)
    }
})();
