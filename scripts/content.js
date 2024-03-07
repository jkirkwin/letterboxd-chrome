const extensionLogPrefix = "letterboxd-chrome: "

function log(message) {
    console.log(extensionLogPrefix + message)
}

function debug(message) {
    console.debug(extensionLogPrefix + message)
}

function error(message) {
    console.error(extensionLogPrefix + message)
}

function tryAddFilmInfo() {
    const watchMovieDiv = document.querySelector('div[aria-label="Watch movie"]');
    if (watchMovieDiv) {
        log("Detected a film in search results");

        const filmTitle = document.querySelector('div[aria-level="2"][data-attrid="title"][role="heading"]')?.innerHTML
        if (!filmTitle) {
            error("Failed to find film title")
            return
        }

        const letterboxdLinkContainer = buildLetterboxdSearchSection(watchMovieDiv, filmTitle)
        watchMovieDiv.insertAdjacentElement('afterbegin', letterboxdLinkContainer);

    } else {
        log("Film panel not found");
    }
}

/*
 * Build and return an element holding a link to search for the film on letterboxd.
 * Takes the div holding the "watch movie" links to reuse the styling of its contents
 * and the title of the film to search.
 */
function buildLetterboxdSearchSection(watchMovieDiv, filmTitle) {
    // TODO Add horizontal divider between new section and "Watch movie"

    const contentContainer = document.createElement('div');

    // Pull the "Watch movie" heading from the page and copy it to get a consistently-styled heading
    // for the letterboxd section. They've just used div's everywhere (i.e. no h1/h2/etc.), so we'll do the same.
    const sampleHeading = watchMovieDiv.querySelector('div[aria-level="2"][role="heading"]');
    const sampleHeadingContainer = sampleHeading.parentElement
    const headingContainer = sampleHeadingContainer.cloneNode(true)
    headingContainer.firstChild.textContent = 'Letterboxd'
    contentContainer.appendChild(headingContainer)

    // Add a link to search for the film on letterboxd
    const linkContainer = document.createElement('a')
    linkContainer.href = `https://letterboxd.com/search/films/${filmTitle}/`
    linkContainer.style.color = 'inherit'
    linkContainer.style.display = 'flex'
    linkContainer.style.alignItems = 'center'
    linkContainer.style.gap = '10px'
    linkContainer.style.padding = '10px 5px'

    const logoImage = document.createElement('img')
    logoImage.src = chrome.runtime.getURL('assets/letterboxd_logo.png')
    logoImage.height = '45'
    logoImage.width = '45'
    linkContainer.appendChild(logoImage)

    const linkText = document.createElement('span')
    linkText.textContent = 'View on Letterboxd'
    linkContainer.appendChild(linkText)

    contentContainer.appendChild(linkContainer)

    return contentContainer
}

tryAddFilmInfo()
