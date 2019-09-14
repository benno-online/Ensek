var app = angular.module('Ensek', ['ngFileUpload'])
app.controller('MainCtrl', function ($scope, $window, $http) {
    $scope.SelectFile = function (file) {
        $scope.SelectedFile = file;
    };

    $scope.AccountSuccessCount = 0;
    $scope.AccountFailCount = 0;
    $scope.MeterSuccessCount = 0;
    $scope.MeterFailCount = 0;
    $scope.MeterReadingId = 1;

    function AddAccount(currentline) {
        var data = {
            AccountId: currentline[0],
            FirstName: currentline[1],
            LastName: currentline[2]
        };

        $http.post('/api/account', JSON.stringify(data), ).then(function (response) {
        if (response.data)
            $scope.AccountSuccessCount++;
        }, function (response) {
            $scope.AccountFailCount++;
        });
    };

    function AddMeterReadings(currentline) {
        var data = {
            Id: $scope.MeterReadingId++,
            AccountId: currentline[0],
            MeterReadingDateTime: currentline[1],
            MeterReadValue: currentline[2]
        };

        $http.post('/api/meterreading', JSON.stringify(data)).then(function (response) {
        if (response.data)
            $scope.MeterSuccessCount++;
        }, function (response) {
            $scope.MeterFailCount++;
        });
    };

    $scope.UploadAccount = function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($scope.SelectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var lines = e.target.result.split("\r\n");
                    for (var i = 1; i < lines.length; i++) {
                        var currentline = lines[i].split(",");
                        AddAccount(currentline);
                    }
                }
                reader.readAsText($scope.SelectedFile);
            } else {
                $window.alert("This browser does not support HTML5.");
            }
        } else {
            $window.alert("Please upload a valid CSV file.");
        }
    };

    $scope.UploadMeterReadings = function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($scope.SelectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var lines = e.target.result.split("\r\n");
                    for (var i = 1; i < lines.length; i++) {
                        var currentline = lines[i].split(",");
                        AddMeterReadings(currentline);
                    }
                }
                reader.readAsText($scope.SelectedFile);
            } else {
                $window.alert("This browser does not support HTML5.");
            }
        } else {
            $window.alert("Please upload a valid CSV file.");
        }
    };

});








