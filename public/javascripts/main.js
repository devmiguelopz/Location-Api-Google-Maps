//Create a single global variable
const MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.pathName = window.location.pathname;

document.addEventListener("DOMContentLoaded", function () {
        Initialize();
        PopulateMarkers(MAPAPP.pathName);
});

function Initialize() {
    try {
        const center = new google.maps.LatLng(-8.1159900, -79.0299800);
        const mapOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
        };
        this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    } catch (error) {
        console.error("public/main.js Initialize=>", error)
    }
};

async function PopulateMarkers(dataType) {
    try {
        apiLoc = typeof apiLoc !== 'undefined' ? apiLoc : '/data/' + dataType + '.json';
        const responseLocation = await fetch(apiLoc);
        const listLocation = await responseLocation.json();
        listLocation.forEach(element => {
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(element.location.coordinates[0], element.location.coordinates[1]),
                shopname: element.shopname,
                details: element.details,
                website: element.website,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            const content = '<h1 class="mt0"><a href="' + marker.website + '" target="_blank" title="' + marker.shopname + '">' + marker.shopname + '</a></h1><p>' + marker.details + '</p>';
            marker.infowindow = new google.maps.InfoWindow({
                content: content,
                maxWidth: 400
            });
            google.maps.event.addListener(marker, 'click', function () {
                if (MAPAPP.currentInfoWindow) MAPAPP.currentInfoWindow.close();
                marker.infowindow.open(map, marker);
                MAPAPP.currentInfoWindow = marker.infowindow;
            });
            MAPAPP.markers.push(marker);
        });
    } catch (error) {
        console.error("public/main.js PopulateMarkers=>", error)
    }
};


