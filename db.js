var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hunger"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("db Connected");
});

function NullCheckChar(field) {
    if (field == undefined)
        return "NULL";
    else
        return "'" + field + "'";
}

function NullCheckDate(day, month, year) {
    if (day == undefined || month == undefined || year == undefined)
        return "NULL";
    else
        return "'" + year + '-' + month + '-' + day + "'";
}

function NullCheckNum(num) {
    if (num == undefined)
        return 0;
    else
        return num;
}
module.exports = {
    mycon: con,
    NullCheckChar,
    NullCheckNum,
    NullCheckDate,
}