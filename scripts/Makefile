
INPUT=     data/cac-polygons.shp

CENTROID=  data/region-centroids.geojson
LINES=     data/region-lines.geojson
POLY=      data/region-polys.geojson
DATA=      data/cac-data.json
REGIONS=   "../server/api/forecasts/forecast-regions.json"

MAPBOX_REPO="../../ac-mapbox"

MB_POLY     = $(MAPBOX_REPO)/sources/features/cac-polygons.geojson
MB_CENTROID = $(MAPBOX_REPO)/sources/features/cac-polygons-centroids.geojson
MB_LINES    = $(MAPBOX_REPO)/sources/features/cac-polylines.geojson



FORMAT='GeoJSON'

#if [ -f $CENTROID ]; then rm $CENTROID; fi
#if [ -f $LINES ]; then rm $LINES; fi
#if [ -f $POLY ]; then rm $POLY; fi

all: $(REGIONS) $(CENTROID) $(LINES) $(POLY) $(MB_POLY) $(MB_CENTROID) $(MB_LINES)

clean:
	rm $(CENTROID) $(LINES) $(POLY)
.PHONY: all clean


$(REGIONS): $(DATA) $(CENTROID) $(POLY)
	@echo 'Updating Region json: $@'
	@node ./fxutil.js $@ $?

$(CENTROID): $(INPUT)
	@echo "Building Centroids: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr \
	-f $(FORMAT) \
	$@ \
	$< \
	-dialect sqlite \
	-sql "SELECT id, display, ST_Centroid(GEOMETRY) FROM 'cac-polygons'"

$(LINES): $(INPUT)
	@echo "Building Lines: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr \
	-f $(FORMAT) \
	$@ \
	$< \
	-dialect sqlite \
	-sql "SELECT id, display, ST_ExteriorRing(GEOMETRY) FROM 'cac-polygons'"

$(POLY): $(INPUT)
	@echo "Building Polygon json: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr -f $(FORMAT)  $@  $<


$(MB_POLY): $(POLY)
	cp $< $@

$(MB_CENTROID): $(CENTROID)
	cp $< $@

$(MB_LINES): $(LINES)
	cp $< $@
