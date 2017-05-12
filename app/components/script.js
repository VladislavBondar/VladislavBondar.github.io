/**
 * Created by 11 on 01.06.2015.
 */
angular.module('tourism', [])
.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {

        $http.get('continents.json')
            .success(function(data, status, headers, config) {
                $scope.continents = data.results;
            })
            .error(function(data, status, headers, config) {

            });

        $http.get('countries.json')
            .success(function(data, status, headers, config) {
                $scope.countries = data.results;
            })
            .error(function(data, status, headers, config) {

            });

        $http.get('cities.json')
            .success(function(data, status, headers, config) {
                $scope.cities = data.results;
            })
            .error(function(data, status, headers, config) {

            });

        $http.get('photos.json')
            .success(function(data, status, headers, config) {
                $scope.photos = data.results;
            })
            .error(function(data, status, headers, config) {

            });

        $scope.favourites = [];

        $scope.curCont = "";
        $scope.curCountry = "";
        $scope.curCity = "";


        function getChosenLocations(city, country) {
            var obj =
            {country: country, city: city};
            $scope.favourites.push(obj);
            document.getElementById("favor").style.cssText = "opacity:1";
        }

        function removeChosenLocations(city) {
            for (var i = 0; i < $scope.favourites.length; i++) {
                if (city == $scope.favourites[i].city) {
                    $scope.favourites.splice(i, 1);
                    //return 0;
                }
            }

            if ($scope.favourites.length == 0) {
                document.getElementById("favor").style.cssText = "opacity:0";
            }
        }

        $scope.canAdd = function (curCity) {
            if (typeof(curCity) == "undefined") {
                return true;
            }
            var i;
            for (i = 0; i < $scope.favourites.length; i++) {

                if (curCity == $scope.favourites[i].city) {
                    return false;
                }
            }
            return true;
        }

        $scope.appearButton = function () {
            if ($scope.curCity == "") {
                return true;
            }
        }

        $scope.getChosenLocations = getChosenLocations;
        $scope.removeChosenLocations = removeChosenLocations;

        $scope.changeContinent = function () {
            $scope.curCountry = "";
            $scope.getBack();
            $scope.curCity = "";
            test.innerHTML = "";
        }

        $scope.changeCountry = function () {
            $scope.curCity = "";
            $scope.changeBack();
            getWikiInfo($scope.curCountry);
        }

        $scope.changeFavCity = function (country) {
            $scope.curCountry = "";
            $scope.curCont = "";
            test.innerHTML = "";
        }

        $scope.changeBack = function() {
          document.getElementById("backg").style.cssText = "background-image: url('" +
            "https://static1.squarespace.com/static/55069c3ce4b07d2891982afb/5506a236e4b01b33c9762096/560f44f5e4b0011a619e5a2c/1443841470675/Gray+Background+Image.jpg?format=2500w');";
          //https://avatanplus.com/files/resources/mid/581716c60a9291581a30f59b.jpg

        }

        $scope.getBack = function() {
          document.getElementById("backg").style.cssText = "background-image: url('" +
            "http://dingyue.nosdn.127.net/RgSSKqAeVgkjKmhc5h=dIgiedKqx6D34P2hKBrT9H8SuW1474191711912compressflag.jpg');";
          //https://avatanplus.com/files/resources/mid/581716c60a9291581a30f59b.jpg

        }

        var getWikiInfo = function(countryName) {
            $scope.url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=" +
              "json&exsentences=3&titles="+countryName+"&rvprop=content&callback=JSON_CALLBACK";

            $http({
                url: $scope.url,
                method: 'jsonp'
            }).success(function(response) {
                for (item in response.query.pages){
                  //  console.log(response.query.pages[item].extract);
                    $scope.info = response.query.pages[item].extract;

                    var reg = new RegExp('<p', 'g');
                    var regSec = new RegExp('.</p', 'g');

                    $scope.tempInfo = $scope.info.replace(reg, " ");
                    $scope.result = $scope.tempInfo.replace(regSec, " ");
                    console.log($scope.result);

                    test.innerHTML = $scope.result;
                }
            });
        }

       // 'http://es.wikipedia.org/w/api.php?titles=' + countryName.toLowerCase() + '&rawcontinue=true&action=query&format=json&prop=extracts&callback=JSON_CALLBACK'

}]);
