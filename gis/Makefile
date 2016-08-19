
REGION_IN= $(shell ls regions/*.shp)

MERGED=    build/merged.shp

CENTROID=  build/centroids.geojson
LINES=     build/lines.geojson
POLY=      build/polys.geojson
DATA=      region-data.json
#REGIONS=   "../server/api/forecasts/forecast-regions.json"
REGIONS=   build/forecast-regions.json

FORMAT='GeoJSON'

all: $(REGIONS) $(CENTROID) $(LINES) $(POLY)

clean:
	rm build/*
.PHONEY: all clean


$(MERGED): $(REGION_IN)
	@echo 'Merging Regions...'
	@./merge_shapefiles.sh $@ $?

$(REGIONS): $(DATA) $(CENTROID) $(POLY)
	@echo 'Updating Region json: $@'
	@node ./fxutil.js $@ $?

$(CENTROID): $(MERGED)
	@echo "Building Centroids: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr \
	   -f $(FORMAT) \
	   $@ \
	   $< \
	   -dialect sqlite \
	   -sql "SELECT id, display, ST_Centroid(GEOMETRY) FROM 'merged'"

$(LINES): $(MERGED)
	@echo "Building Lines: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr \
	-f $(FORMAT) \
	$@ \
	$< \
	-dialect sqlite \
	-sql "SELECT id, display, ST_ExteriorRing(GEOMETRY) FROM 'merged'"

$(POLY): $(MERGED)
	@echo "Building Polygon json: $@"
	@if [ -f $@ ]; then rm $@; fi
	@ogr2ogr -f $(FORMAT)  $@  $<

