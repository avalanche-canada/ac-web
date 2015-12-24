# Building Geo DATA

Requires: 
 * GDAL (specifically the `ogr2ogr` utility)
 * Make


# Files


* Input: `cac-polygons.shp`
  
  Polygons for each of the forecast regions. Required for the generating the
  base map styles in mapbox and on the client for rendering the hover styles for
  regions on the map.

* Input: `cac-data.json`
  
  Extra data used by the `avalanche.ca` web client and the mobile apps.
  Contains all forecast data that is not geometry.

* Output: `cac-polygons-centroids.shp`

  Built by `make-centroids.sh`, contains the center points for each forecast
  region. Required by the client to place forecast icons on the map and used by
  the mapbox style to position the region name on the basemap.

* Output: `cac-polylines.sh`

  LineString geometry for the outline for each of the forecast regions.
  Required by mapbox to generate the style for the basemap.

* Static: `cac-polygons-regions.shp` / `cac-polygons-regions-centroids.shp`

  Larger general region polygons/centroids for display on lower zoom levels
  (eg. North Coast, Eastern Canada). *Centroids* are required by mapbox styles
  for name display on lower zoom levels.


# Process

1. Build centroids from initial polygon data.
2. Build polylines from initial polygon data.
3. Transform polygons to GeoJSON
4. Merge `cac-data.json` and centroids into Region GeoJson for consumption by
   web/mobile 
