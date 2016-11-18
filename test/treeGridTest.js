(function () {
    var app, deps;

    deps = ['treeGrid'];

    app = angular.module('treeGridTest', deps);

    app.controller('treeGridController', function ($scope, $timeout) {
        var tree;

        var rawTreeData = [
            {
                "Id": 1,
                "ParentId": null,
                "Name": "United States of America",
                "详情": "United States of America",
                "Area": 9826675,
                "Population": 918212000,
                "TimeZone": "UTC -5 to -10"
            },
            {
                "Id": 2,
                "ParentId": 1,
                "Name": "California",
                "详情": "The Tech State",
                "Area": 423970,
                "Population": 38340000,
                "TimeZone": "Pacific Time"
            },
            {
                "Id": 3,
                "ParentId": 2,
                "Name": "San Francisco",
                "详情": "The happening city",
                "Area": 231,
                "Population": 837442,
                "TimeZone": "PST"
            },
            {
                "Id": 4,
                "ParentId": 2,
                "Name": "Los Angeles",
                "详情": "Disco city",
                "Area": 503,
                "Population": 3904657,
                "TimeZone": "PST"
            },
            {
                "Id": 5,
                "ParentId": 1,
                "Name": "Illinois",
                "详情": "Not so cool",
                "Area": 57914,
                "Population": 12882135,
                "TimeZone": "Central Time Zone"
            },
            {
                "Id": 6,
                "ParentId": 5,
                "Name": "Chicago",
                "详情": "Financial City",
                "Area": 234,
                "Population": 2695598,
                "TimeZone": "CST"
            },
            {
                "Id": 7,
                "ParentId": 1,
                "Name": "Texas",
                "详情": "Rances, Oil & Gas",
                "Area": 268581,
                "Population": 26448193,
                "TimeZone": "Mountain"
            },
            {
                "Id": 8,
                "ParentId": 1,
                "Name": "New York",
                "详情": "The largest diverse city",
                "Area": 141300,
                "Population": 19651127,
                "TimeZone": "Eastern Time Zone"
            },
            {
                "Id": 14,
                "ParentId": 8,
                "Name": "Manhattan",
                "详情": "Time Square is the place",
                "Area": 269.403,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "Id": 15,
                "ParentId": 14,
                "Name": "Manhattan City",
                "详情": "Manhattan island",
                "Area": 33.77,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "Id": 16,
                "ParentId": 14,
                "Name": "Time Square",
                "详情": "Time Square for new year",
                "Area": 269.40,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "Id": 17,
                "ParentId": 8,
                "Name": "Niagra water fall",
                "详情": "Close to Canada",
                "Area": 65.7,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "Id": 18,
                "ParentId": 8,
                "Name": "Long Island",
                "详情": "Harbour to Atlantic",
                "Area": 362.9,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "Id": 51,
                "ParentId": 1,
                "Name": "All_Other",
                "详情": "All_Other demographics",
                "Area": 0,
                "Population": 0,
                "TimeZone": 0
            },
            {
                "Id": 201,
                "ParentId": null,
                "Name": "India",
                "详情": "Hydrabad tech city",
                "Area": 5566.9,
                "Population": 718212000,
                "TimeZone": "IST"
            },
            {
              
                "Name": "Bangladesh",
                "详情": "Country of love",
                "Area": 5566.78,
                "Population": 718212004,
                "TimeZone": "BST",
                  "Id": 301,
                "ParentId": null,
            }
        ];


        var myTreeData = getTree(rawTreeData, 'Id', 'ParentId');
     
        $scope.tree_data = myTreeData;

        $scope.my_tree = tree = {};
       console.dir($scope);

        // $scope.expanding_property = {
        //     field: "Name",
        //     displayName: "Demographic Name",
        //     sortable: true,
        //     filterable: true,
        //     cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        // };
        // $scope.col_defs = [
        //     {
        //         field: "详情",
        //         sortable: true,
        //         sortingType: "string"
        //     },
        //     {
        //         field: "Area",
        //         sortable: true,
        //         sortingType: "number",
        //         filterable: true
        //     },
        //     {
        //         field: "Population",
        //         sortable: true,
        //         sortingType: "number"
        //     },
        //     {
        //         field: "TimeZone",
        //         displayName: "Time Zone",
        //         cellTemplate: "<strong>{{row.branch[col.field]}}</strong>"
        //     }
        // ];
        // $scope.my_tree_handler = function (branch) {
        //     console.log('you clicked on', branch)
        // }

        function getTree(data, primaryIdName, parentIdName) {
            if (!data || data.length == 0 || !primaryIdName || !parentIdName)
                return [];

            var tree = [],
                rootIds = [],
                item = data[0],
                primaryKey = item[primaryIdName],
                treeObjs = {},
                parentId,
                parent,
                len = data.length,
                i = 0;

            while (i < len) {
                item = data[i++];
                item['children']=[];
                primaryKey = item[primaryIdName];
                treeObjs[primaryKey] = item;
                parentId = item[parentIdName];

                if (parentId) {
                    parent = treeObjs[parentId];

                    if (parent.children) {
                        parent.children.push(item);
                    } else {
                        parent.children = [item];
                    }
                     console.dir(parent);    
                } else {
                    rootIds.push(primaryKey);
                }
            }

            for (var i = 0; i < rootIds.length; i++) {
                tree.push(treeObjs[rootIds[i]]);
            }
            ;

            return tree;
        }

    });

}).call(this);
