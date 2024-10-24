function printMultiplicationTable() {
    // 外層迴圈控制乘數
    for (var i = 1; i <= 9; i++) {
        // 內層迴圈控制被乘數
        for (var j = 1; j <= 9; j++) {
            // 印出當前的乘法表運算結果
            console.log("".concat(i, " x ").concat(j, " = ").concat(i * j));
        }
    }
}
// 呼叫函數來列印九九乘法表
printMultiplicationTable();
