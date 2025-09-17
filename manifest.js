// read the retirejs json file
const fs = require('fs');
const path = require('path');

// read the retirejs json file
const retirejsFilePath = path.join(__dirname, 'retire.json');
const retirejsData = JSON.parse(fs.readFileSync(retirejsFilePath, 'utf8'))['data'];
const manifests = [];
const sha = process.env.GITHUB_SHA || 'not-an-sha';
const ref = process.env.GITHUB_REF || 'refs/heads/foo';
retirejsData.forEach(function(item) {
    let component = item.results[0].component;
    let version = item.results[0].version;
    manifests.push({
        ["pkg:npm/" + component + "@" + version]: {
            'package_url': "pkg:npm/" + component + "@" + version,
            'relationship': 'direct',
            'dependencies': [] }})
});
const submission = {
    sha: sha,
    ref: ref,
    version: 0,
    job: {
        "correlator": process.env.GITHUB_REPOSITORY || 'foo/bar',
        "id": process.env.GITHUB_RUN_ID || '123456789'
    },
    scanned: new Date().toISOString(),
    detector: {
        name: 'retirejs',
        version: '5.3.0',
        url: 'https://retirejs.github.io/retire.js/'
    },
    manifests: {"retirejs": {name: "retirejs", "resolved": manifests}}
};
console.log(JSON.stringify(submission));
