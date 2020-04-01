function test(col) {
  
  //該当のシートを取得する
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テスト内容');

  //指定の列を二次元配列に格納する※シート全体の最終行までとする
  //var ColValues = sheet.getRange(1, 1, sheet.getLastRow(), 10).getValues();
  //Logger.log(ColValues);// [[列2], [2], [2], [2], [2], [], []]
  
  //②列の最終行から上方向に取得する：https://moripro.net/gas-get-specified-lastcol-lastrow/
  var lastRow2 = sheet.getRange(sheet.getMaxRows(), 5).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
  Logger.log(lastRow2); //11
  
  //テスト対象のデータを取得する：getvalues
  
  
  //テスト対象のデータをF列から右に並べる：setvalues
  
  
  //テスト対象の列数＋項目数分のセルに罫線を引く：https://spreadsheet.blue/google-apps-script/range/setborder/200/
}