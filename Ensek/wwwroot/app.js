var app = angular.module('Ensek', ['ngFileUpload'])
app.controller('MainCtrl', function ($scope, $window, $http) {
    $scope.SelectFile = function (file) {
        $scope.SelectedFile = file;
    };

    $scope.SuccessCount = 0;
    $scope.FailCount = 0;

    function AddAccount() {
        var data = {
            AccountId: $scope.AccountId,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName
        };
        $http.post('/api/account', JSON.stringify(data), ).then(function (response) {

        if (response.data)

            $scope.msg = "Post Data Submitted Successfully!";
            $scope.SuccessCount++;

        }, function (response) {

            $scope.msg = response.data;
            $scope.FailCount++;
        });
    };

    $scope.Upload = function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($scope.SelectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var lines = e.target.result.split("\r\n");
                    var result = [];
                    var headers = lines[0].split(",");
                    for (var i = 1; i < lines.length; i++) {
                        var currentline = lines[i].split(",");
                        $scope.AccountId = currentline[0];
                        $scope.FirstName = currentline[1];
                        $scope.LastName = currentline[2];
                        AddAccount();
                    }
                }
                reader.readAsText($scope.SelectedFile);
            } else {
                $window.alert("This browser does not support HTML5.");
            }
        } else {
            $window.alert("Please upload a valid CSV file.");
        }
    }
});








