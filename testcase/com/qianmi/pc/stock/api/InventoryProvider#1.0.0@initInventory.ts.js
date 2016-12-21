var testSuit = function () {
    var log = Java.type("org.slf4j.LoggerFactory").getLogger("test-loader");
    var DubboExecutorUtil = Java.type("com.qianmi.tda.util.DubboExecutorUtil");

    var productId = new Date().getTime() + "";
    var goodsId = "g" + productId;
    var bn = "p" + productId;

    //初始化库存
    var initRequest = {
        "testServerURL": null,
        "dubboServiceURL": "dubbo://172.19.65.244:20880",
        "execOrder": 1,
        "intfName": "com.qianmi.pc.stock.api.InventoryProvider:1.0.0@initInventory",
        "params": [
            {
                "chainMasterId":"A123456",
                "addStockList":[
                    {
                        "productId":productId,
                        "goodsId":goodsId,
                        "stocks":100,
                        "billGoodsInfo":{
                            "productName":"库存初始化测试商品" + productId,
                            "bn":bn,
                            "unit":"件",
                            "specInfo":"天蓝色",
                            "price": 99.99,
                            "ownerId":"A123456"
                        }
                    }
                ]
            }
        ]
    };
    DubboExecutorUtil.exec(JSON.stringify(initRequest));

    return {
        "dubboServiceURL": "dubbo://172.19.65.244:20880",
        "execOrder": 1,
        "intfName": "com.qianmi.pc.stock.api.InventoryQueryProvider:1.0.0@listSkuInventory",
        "name" : "com.qianmi.pc.stock.api.InventoryProvider:1.0.0@initInventory",
        "testCases": [
            {
                "name": "初始化库存",
                "params": [
                    {
                        "chainMasterId":"A123456",
                        "goodsIds":[goodsId]
                    }
                ],
                "expects": [
                    {
                        "operator": "=",
                        "path": "$.dataList[0].saleStock",
                        "value": 100
                    },
                    {
                        "operator": "=",
                        "path": "$.dataList[0].holdings",
                        "value": 0
                    },
                    {
                        "operator": "=",
                        "path": "$.dataList[0].preHoldings",
                        "value": 0
                    },
                    {
                        "operator": "=",
                        "path": "$.dataList[0].warnStocks",
                        "value": 0
                    }
                ]
            }
        ],
        "testServerURL": null
    };
}();