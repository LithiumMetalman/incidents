  require([
      "esri/Map",
      "esri/views/MapView",
	  "esri/layers/FeatureLayer",
	  "esri/PopupTemplate",
      "esri/widgets/Expand",
      "esri/widgets/BasemapGallery",
      "esri/layers/KMLLayer",
      "esri/widgets/LayerList",
      "esri/widgets/Search",
	  "esri/widgets/Locate",
      "dojo/domReady!"
  ], function(
      Map,
      MapView,
	  FeatureLayer,
	  PopupTemplate,
      Expand,
      BasemapGallery,
      KMLLayer,
      LayerList,
      Search,
	  Locate
  ) {
	  
	  //Create Template for popupEnabled
	  var template = new PopupTemplate({
		  title:"Fire Name: {IncidentName}",
          content: "{*}"  
      });
	 	  
      //Load Layers
      var layer1 = new KMLLayer({
          url: "http://quickmap.dot.ca.gov/data/lcs.kml" // lane closures from California Dept of Transportation
      });
      var layer2 = new KMLLayer({
          url: "http://quickmap.dot.ca.gov/data/cctv.kml" // CCTV
      });
      var layer3 = new KMLLayer({
          url: "http://quickmap.dot.ca.gov/data/cms.kml" // CMS
      });
      var layer4 = new KMLLayer({
          url: "http://quickmap.dot.ca.gov/data/chp.kml" // CHP
      });
      var layer5 = new KMLLayer({
          url: "https://www.arb.ca.gov/smp/met/kml/calfire.kml" // CalFire
      });
	  var layer6 =  new FeatureLayer({
		  url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USA_Wildfires_v1/FeatureServer/0",
		  //url: "https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/Active_Fires/FeatureServer/0",
		  popupEnabled: true,
		  popupTemplate: template  
	  })
	  var layer7 =  new FeatureLayer({
		  url: "https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0",
		  //url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/1",
		  popupEnabled: true,
		  popupTemplate: template  
	  })
	  
	  var layer8 =  new FeatureLayer({
		  url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/MODIS_Thermal_v1/FeatureServer/0",
		  popupEnabled: true,
		  popupTemplate: template 
	  })
	  
	  var layer9 =  new FeatureLayer({
		  url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/Satellite_VIIRS_Thermal_Hotspots_and_Fire_Activity/FeatureServer/0",
		  popupEnabled: true,
		  popupTemplate: template,
		  visible:false
	  })
	  
	  

      var map = new Map({
          basemap: "streets-navigation-vector",
          //basemap: "osm",
          layers: [layer1, layer2, layer3, layer4, layer6, layer7, layer8, layer9]
      });
	  
	  //reorder layers
	  map.layers.reorder(layer1,8);
	  map.layers.reorder(layer2,7);
	  map.layers.reorder(layer3,6);
	  map.layers.reorder(layer4,5);
	  map.layers.reorder(layer5,4);
	  map.layers.reorder(layer6,3);
	  map.layers.reorder(layer7,0);
	  map.layers.reorder(layer8,1);
	  map.layers.reorder(layer9,2);
	  
	  //Set layer visibility



      var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [-122.148669, 37.940553],
          zoom: 10
      });

      /*
        var view = new SceneView({
          map: map,
          container: "viewDiv",
		  center: [-120, 38],
          zoom: 10
        });
	  */

      // Add LayerList
      var layerList = new LayerList({
          view: view
      });

      /*//Add Widget to the top right corner of view
      view.ui.add(layerList, "top-right");*/

      //Add basemaps to choose from
      var basemapGallery = new BasemapGallery({
          view: view
              //container: document.createElement("div")
      });

      /*// Add the widget to the top-right corner of the view
      view.ui.add(basemapGallery, {
        position: "top-right"
      });*/

      //Add Search function to be set at new
      var searchWidget = new Search({
          view: view
      });

      /*// Add the search widget to the top right left of the view
      view.ui.add(searchWidget, {
        position: "top-left"
      });*/


      // Create an Expand instance and set the content
      // property to the DOM node of the basemap gallery widget
      // Use an Esri icon font to represent the content inside
      // of the Expand widget
      var bgExpand = new Expand({
          view: view,
          content: basemapGallery
      });

      var sgExpand = new Expand({
          view: view,
          content: layerList
      });

      var srExpand = new Expand({
          view: view,
          content: searchWidget
      });


      // Add the expand instance to the ui
      view.ui.add(srExpand, "top-right");
      view.ui.add(sgExpand, "top-right");
      view.ui.add(bgExpand, "top-right");
	  
	  //add locate button
	  var locateBtn = new Locate({
		  view: view
	  });
	  
	  // Add the locate widget to the top left corner of the view
        view.ui.add(locateBtn, {
          position: "top-right"
      });

  });
