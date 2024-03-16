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
    // TODO This won't work for obscure movies that don't have any watch options, or new movies that aren't available to stream yet.
    // E.g. https://www.google.com/search?q=chaos+DeFalco, https://www.google.com/search?q=four+lions
    // Find a backup option to use to get formatting and detect that the user did in fact search a movie.
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
    const contentContainer = document.createElement('div');
    contentContainer.style.padding = '0 0 10px 0'

    // Pull the "Watch movie" heading from the page and copy it to get a consistently-styled heading
    // for the letterboxd section. They've just used div's everywhere (i.e. no h1/h2/etc.), so we'll do the same.
    const sampleHeading = watchMovieDiv.querySelector('div[aria-level="2"][role="heading"]');
    const sampleHeadingContainer = sampleHeading.parentElement
    const headingContainer = sampleHeadingContainer.cloneNode(true)
    headingContainer.style.padding = '0 0 10px 0'
    headingContainer.firstChild.textContent = 'Letterboxd'
    contentContainer.appendChild(headingContainer)

    // Add a link to search for the film on letterboxd
    const linkContainer = document.createElement('a')
    // TODO May be able to link directly to the letterboxd film page. 
    // In most cases the url is just the film name with spaces subbed for hyphens, and in others they include the year.
    // It seems like we could add the year every time and let their redirects handle it.
    // If there are a few edge cases where this won't work, can try sending an https request to the film url we want to try,
    // and fall back to using this search link if it fails.
    linkContainer.href = `https://letterboxd.com/search/films/${filmTitle}/`
    linkContainer.style.color = 'inherit'
    linkContainer.style.display = 'flex'
    linkContainer.style.alignItems = 'center'
    linkContainer.style.gap = '10px'

    const logoImage = document.createElement('img')
    logoImage.src = chrome.runtime.getURL('assets/letterboxd_logo.png')
    logoImage.height = '45'
    logoImage.width = '45'
    linkContainer.appendChild(logoImage)

    const linkText = document.createElement('span')
    linkText.textContent = 'View on Letterboxd'
    linkContainer.appendChild(linkText)

    contentContainer.appendChild(linkContainer)

    // Add a horizontal rule below the new content
    const separator = watchMovieDiv.querySelector('[role="separator"]')?.cloneNode() ?? document.createElement('hr')
    contentContainer.appendChild(separator)

    return contentContainer
}

// TODO When on a page like https://www.google.com/search?sa=X&sca_esv=eab7f0f30e16ba03&biw=1032&bih=738&sxsrf=ACQVn0_7ZiyZ8GWMzOP0CiSwAM5WzLRugA:1709789662998&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXheAX-kHFU4c0bex6eNeXQ3iMkESrR-67uRmjGFFyrLdv_w9jpayDPg1ABrWxypVf4IngX5g3x7JDvW-5CunMxL5RJrp8xtX21LUmFr4PScuFW2f5I3DsvCBRUfAbU31bsoXfaEYYDbznqcvbUhIdIyBOaNJX7_T9pH8QLb5Tb_gVw7XatNWykV5MM0CY5QNkXLVn287HADS5x3HxlLsAkHxP8Nn0l_Qb52csV7OK2G3s6y79A%3D%3D&q=Once+Upon+a+Time+in+America&lei=5FHpZYb4CoK80PEPofmMgAk
// where the user can switch between movies, we need to redo the link generation process. Likely we can just detect changes
// to the search query and/or url.

tryAddFilmInfo()
