[] - Add latest News and Events to the menu in navbar
[-] - Reduce the number of call to get Prismic refs/metadata. One call if enough.
[] - Improve performance
[] - Fix: unloading the page and leaving the map route before map is fully loaded cause an error
[] - Show error when a page (from Prismic) does not load and add a retry button
[-] - Remove the Markdown slice type (Prismic + Components)
[] - Prismic store > investigate if we can use normilzr
[-] - Prismic store > Should store per type...will not have to create a new map everytime...new object means selector start fresh every time :(
[] - Remove !important in CSS
[] - Providers and courses page > tab set anchor should take all the room. onClick outside the anchor does not trigger a change to the location
[] - Add latest featured news and events posts to the menu
[] - Replace replaceQuery functions with the one from utils/router
[-] - Check dates in HotZoneReportMetadata, it should not render if no report in available.

# Prismic

[] - Remove bookmarks from Static Pages
[] - Make sure sponsor has a title. See proptypes for sponsor
[] - Remove http://avalanche.ca/assets/images/weather/*

# Map
[] - Remove forecast region centroids, could be computed
[] - Remove toJSON in selectors. Have to look at mergeDeep > have to keep plain objects.
