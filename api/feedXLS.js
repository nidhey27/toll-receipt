const Excel = require('exceljs');

async function exTest(){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  
  
worksheet.columns = [
 {header: 'Id', key: 'id', width: 10},
 {header: 'Name', key: 'name', width: 32}, 
 {header: 'D.O.B.', key: 'dob', width: 15,}
];

worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
const row = worksheet.lastRow;
  console.log(row);
// save under export.xlsx
await workbook.xlsx.writeFile('export.xlsx');


console.log("File is written");

};

exTest();