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

        log("Adding letterboxd search link");
        const contentContainer = document.createElement('div');

        // Pull the "Watch movie" heading from the page and copy it to get a consistently-styled heading
        // for the letterboxd section. They've just used div's everywhere (i.e. no h1/h2/etc.), so we'll do the same.
        const sampleHeading = watchMovieDiv.querySelector('div[aria-level="2"][role="heading"]');
        const sampleHeadingContainer = sampleHeading.parentElement
        const headingContainer = sampleHeadingContainer.cloneNode(true)
        headingContainer.firstChild.textContent = 'Letterboxd'

        contentContainer.appendChild(headingContainer)

        // Add a link to search for the film on letterboxd
        // TODO Make this pretty
        const link = document.createElement('a')
        link.href = `https://letterboxd.com/search/films/${filmTitle}/`;
        link.textContent = 'Search on letterboxd'
        contentContainer.appendChild(link)

        watchMovieDiv.insertAdjacentElement('afterbegin', contentContainer);

    } else {
        log("Film panel not found");
    }
}

tryAddFilmInfo()
