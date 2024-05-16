function tryAddWatchlistToNav() {
    // Find the main navbar
    const navbar = document.querySelector('nav.main-nav')
    const navItems = navbar?.querySelector('ul.navitems')

    if (!navItems) {
        console.warn("Failed to find letterboxd navbar")
    }

    // Copy the "films" list item and update the relevant fields
    const filmsNavItem = navItems.querySelector("li.main-nav-films")
    const watchlistNavItem = filmsNavItem.cloneNode(true)
    watchlistNavItem.querySelector('a').href = '/watchlist'
    watchlistNavItem.querySelector('span.label').innerHTML = 'Watchlist'

    // Add the watchlist item to the nav
    navItems.insertBefore(watchlistNavItem, filmsNavItem)
}

// TODO May want to add a feature flag for this in case folks don't want to add more width to the navbar.
// Need to implement some kind of settings feature for this.
tryAddWatchlistToNav()
