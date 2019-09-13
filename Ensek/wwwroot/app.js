var app = angular.module('Ensek', ['ngFileUpload'])
app.controller('MainCtrl', function ($scope, $window) {
    $scope.SelectFile = function (file) {
        $scope.SelectedFile = file;
    };
    $scope.Upload = function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($scope.SelectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var accounts = new Array();
                    var rows = e.target.result.split("\r\n");
                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                            var account = {};
                            account.AccountId = cells[0];
                            account.FirstName = cells[1];
                            account.LastName = cells[2];
                            accounts.push(account);
                            $scope.$apply(function () {
                                $scope.Accounts = accounts;
                                $scope.IsVisible = true;
                            });
                        }
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

    //function postAccount () {
    //    $http({
    //        method: 'POST',
    //        url: 'api/account',
    //        data: $scope.Accounts,
    //        headers: { 'Content-Type': 'application/json' }
    //    }).then(function successCallback(response) {
    //        $scope.output_msg = response.data;
    //        alert("User has created Successfully")
    //    }, function errorCallback(response) {
    //        alert("Error while creating account. Try again!");

    //    });

    //};

    //var lines = e.target.result.split("\r\n");
    //var result = [];
    //var headers = lines[0].split(",");
    //for (var i = 1; i < lines.length; i++) {
    //    var obj = {};
    //    var currentline = lines[i].split(",");
    //    for (var j = 0; j < headers.length; j++) {
    //        obj[headers[j]] = currentline[j];
    //    }
    //    result.push(obj);
    //}
    //// do i need this as a json object??
    //$scope.Accounts = JSON.stringify(result); //JSON




