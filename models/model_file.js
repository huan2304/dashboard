const fs = require('fs');
module.exports = {
    read: async(file) => {
        let result;
        let obj = {};
        result = fs.readFileSync(path_base + '\\upload\\' + file, 'utf8')
        .toString()
        .split('\n')
        .map(e => e.trim())
        .map(e => e.split(','));
        result.forEach((index, data)=>{
           console.log(data); 
        })
        return result;
    },
    csvToJSON: (file, col1, col2)=>{
        let str;
        let row = [];
        let result = [];
        let obj = {};
        str = fs.readFileSync('upload\\' + file);
        str = str.toString();
        str = str.replace(/\r/g,'');
        row = str.split('\n');
        for (let i=1; i<row.length; i++){
            if (((row[i].split(','))[0] == '')||((row[i].split(','))[0] == undefined))
            if (((row[i].split(','))[1] == '')||((row[i].split(','))[1] == undefined))
            break;
            obj = {};
            obj[col1] = (row[i].split(','))[0];
            obj[col2] = (row[i].split(','))[1];
            result.push(obj);
        }
        return result;
    },
    csvToJSON: (file, col1, col2, col3, col4, col5, col6)=>{
        let str;
        let row = [];
        let result = [];
        let obj = {};
        str = fs.readFileSync('upload\\' + file);
        str = str.toString();
        str = str.replace(/\r/g,'');
        row = str.split('\n');
        let arrrow;
        for (let i=1; i<row.length; i++){
            arrrow = row[i].split(',');
            if ((arrrow[0] == '')||(arrrow[0] == undefined))
            if ((arrrow[1] == '')||(arrrow[1] == undefined))
            if ((arrrow[2] == '')||(arrrow[2] == undefined))
            if ((arrrow[3] == '')||(arrrow[3] == undefined))
            if ((arrrow[4] == '')||(arrrow[4] == undefined))
            if ((arrrow[5] == '')||(arrrow[5] == undefined))
            break;
            obj = {};
            obj[col1] = arrrow[0];
            obj[col2] = arrrow[1];
            obj[col3] = arrrow[2];
            obj[col4] = arrrow[3];
            obj[col5] = arrrow[4];
            obj[col6] = arrrow[5];
            result.push(obj);
        }
        return result;
    }
 

 }