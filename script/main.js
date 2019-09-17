var map;
        var markers = [];

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: {"lat": 57.6520352, "lng": 13.0202796 }});
        }
        
        function searchData(search) {
            $.getJSON("data/data.json", function( data ) {
                events = $.grep( $.parseJSON(JSON.stringify(data.items)), function( n, i ) { return n.description.match(new RegExp(search, 'gi')) || n.title.match(new RegExp(search, 'gi')); });
            })
            .done(function(data){
                printData(events);
            })
        }
        
        function readData() {
            var events;
            $.getJSON("data/data.json", function( data ) {
                events = jQuery.parseJSON(JSON.stringify(data.items));
            })
            .done(function(data){
                printData(events);
            })
        }

        function printData(data) {
            var results = "";
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
            
            $.each(data, function(key, value) {
                results += "<div class='card'>";
                results += "<img src='" + value.imagesrc + "' class='card-img-top' alt=''>";
                results += "<div class='card-body'>";
                results += "<h5 class='card-title'>" + value.title + "</h5>";
                results += "<p class='card-text'>" + value.description + "</p>";
                results += "<p class='card-text'>" + value.date + "</p>";
                results += "<p class='card-text'>" + value.locationdesc + "</p>";
                results += "<a href='#' class='btn btn-primary'>Open</a>";
                results += "</div>";
                results += "</div>";
                markers[key] = new google.maps.Marker({position: value.location[0], map: map, label: {text: value.title, color: "#000", fontWeight: "bold"}});
                //console.log(key);
            });

            $('#resultbox').html(results);

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }

            map.fitBounds(bounds);

            

            if (map.getZoom()>13) {
                map.setZoom(13);
            };

            //console.log(map.getZoom());
        }
        
        function initPage() {
            readData();
        }