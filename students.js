const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // MongoDB 連接字串
const dbName = ""; // 請替換為你的資料庫名稱
const collectionName = "studentslist"; // 集合名稱

(async () => {
    const client = new MongoClient(uri);

    try {
        // 連接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 聚合查詢：統計各科系人數
        const result = await collection.aggregate([
            {
                $group: {
                    _id: "$院系", // 根據院系分組
                    人數: { $sum: 1 } // 計算每個分組的人數
                }
            },
            {
                $sort: { 人數: -1 } // 按人數降序排序 (可選)
            }
        ]).toArray();

        // 輸出結果
        console.log("各科系人數統計：");
        result.forEach(department => {
            console.log(`院系: ${department._id}, 人數: ${department.人數}`);
        });

    } catch (error) {
        console.error("發生錯誤：", error);
    } finally {
        // 關閉連接
        await client.close();
        console.log("已斷開 MongoDB 連接");
    }
})();
