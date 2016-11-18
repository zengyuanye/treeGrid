<?php
/*
原生数据要求
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
 */


class BuildTreeArray
{
    private $idKey = 'id'; //主键的键名
    private $fidKey = 'fid'; //父ID的键名
    private $root = 0; //最顶层fid
    private $data = array(); //源数据
    private $treeArray = array(); //属性数组

    function __construct($data,$idKey,$fidKey,$root) {
        if($idKey) $this->idKey = $idKey;
        if($fidKey) $this->fidKey = $fidKey;
        if($root) $this->root = $root;
        if($data) {
            $this->data = $data;
            $this->getChildren($this->root);
        }
    }
    public function service()
    {
        // TODO: Implement service() method.
    }

    /**
     * 获得一个带children的树形数组
     * @return multitype:
     */
    public function getTreeArray()
    {
        //去掉键名
        return array_values($this->treeArray);
    }

    /**
     * @param int $root 父id值
     * @return null or array
     */
    private function getChildren($root)
    {

        $children=[];
        foreach ($this->data as &$node){
            if($root == $node[$this->fidKey]){
                $node['children'] = $this->getChildren($node[$this->idKey]);
                $children[] = $node;
            }
            //只要一级节点
            if($this->root == $node[$this->fidKey]){
                $this->treeArray[$node[$this->idKey]] = $node;
            }
        }
        return $children;
    }
}

