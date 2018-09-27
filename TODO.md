Frontend

-   Remove querystring module dependency, DONE
-   Clean up the utils functions and modules, DONE
-   Map
    -   Mouse hover on features, HMMMMM, only work once! Should display tooltips
    -   Active id for forecast layers, DONE
    -   Test opening external forecasts, DONE
    -   Left and right drawers opening, DONE
    -   Test on remove map layer and source layer, now does not remove source, but call remove on map, DONE
    -   Add Forecast markers, DONE
    -   Zoom to forecast region, DONE
    -   Make sure layers state is saved, visible and filters, DONE
    -   Better caching for some containers, weather station, MIN, features on mapbox API, DONE
    -   Look at the layers order to make sure it remains the same after all these changes, DONE
    -   Test posting a MIN report, DONE
    -   Add to map MIN report directly accessed, DONE
    -   Zoom to MIN A & B does not work, DONE
-   Static page should not display other content when loading a page, DONE
-   Do more caching

# Map style

1.  Load style
2.  Add layers and sources manually
3.  Layer & Source components as accessor, or components do not remove when unmounting
4.  DataSet components fetch data and set it to the source

# React Router replacement

Testing all urls possibilities, DONE
Look at all <Link>s, DONE

# General

-   Glossary
    -   When there is filter, related link are visible, but the definition might not be. Need a way, so the user can still link to these definitions

# Upgrades

-   React 16.5
