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
        }

        function removeChosenLocations(city) {
            for (i = 0; i < $scope.favourites.length; i++) {
                if (city == $scope.favourites[i].city) {
                    $scope.favourites.splice(i, 1);
                    return 0;
                }
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
            $scope.curCity = "";
            test.innerHTML = "";
        }

        $scope.changeCountry = function () {
            $scope.curCity = "";
            getWikiInfo($scope.curCountry);
        }

        $scope.changeFavCity = function (country) {
            $scope.curCountry = "";
            $scope.curCont = "";
            test.innerHTML = "";
        }

        var getWikiInfo = function(countryName) {
            $scope.url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=4&titles="+countryName+"&rvprop=content&callback=JSON_CALLBACK";
            $http({
                url: $scope.url,
                method: 'jsonp'
            }).success(function(response) {
                for (item in response.query.pages){
                    console.log(response.query.pages[item].extract);
                    $scope.info = response.query.pages[item].extract;
                    test.innerHTML = response.query.pages[item].extract;
                }
            });
        }

       // 'http://es.wikipedia.org/w/api.php?titles=' + countryName.toLowerCase() + '&rawcontinue=true&action=query&format=json&prop=extracts&callback=JSON_CALLBACK'

}]);