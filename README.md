# letterboxd-chrome
A simple chrome extension to add functionality to google's film search results.

## How it works
When a user searches for a film, google provides extra panels with links to watch the movie on different streaming services, to mark the film as watched, add it to the user's watchlist, etc. The extension monitors the page structure, detects when these panels are present, and inserts utilities into the page.

The extension also adds some quality of life features to the letterboxd website.

## Features
- Google search results for films include a link to the film on letterboxd
- Letterboxd navbar includes a direct link to the user's watchlist

## API Access

In the future I would like to add support for marking a film as watched, rating a film, and adding/removing a film from the user's watchlist. Google's existing features for this are not very useful: users can't access a list of the movies they've marked as watched, and the watchlist as capped at 96 films, after which it stops displaying the older entries.

 Implementing this would require access to the [letterboxd API](https://letterboxd.com/api-beta/) which is still in closed beta at the time of writing. I've requested access to the API via email, but haven't heard back. If you'd like to see this feature, please feel free to send them an email asking for this project to get access to the API.