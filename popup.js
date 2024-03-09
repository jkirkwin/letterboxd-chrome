const githubUrl = 'https://github.com/jkirkwin/letterboxd-chrome'
const githubIssuesUrl = `${githubUrl}/issues`

function createTab(url) {
    chrome.tabs.create({
        url: url
    })
}

document.getElementById('githubLink').addEventListener('click', () => createTab(githubUrl));
document.getElementById('githubIssuesLink').addEventListener('click', () => createTab(githubIssuesUrl));
