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

debug("Content script running");

const watchMovieDiv = document.querySelector('div[aria-label="Watch movie"]');
if (watchMovieDiv) {
    log("Detected a film in search results");

    const title = document.querySelector('div[aria-level="2"][data-attrid="title"][role="heading"]')?.innerHTML
    if (!title) {
        error("Failed to find film title")
    }

    const directorName = document.querySelector('div[data-attrid="kc:/film/film:director"] a')?.innerHTML
    if (!directorName) {
        log("Unable to find director")
    }

    log(`'${title}' by ${directorName}`)

} else {
    log("Film panels not found");
}
