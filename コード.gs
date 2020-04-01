function maketest() {

  //観点表のスプレッドシートの値を全て取得する。
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テスト内容');
  var GetValue = sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).getValues();
  //Logger.log(SetValue);
  
  //最終行を取得する。
  var CaseNo = sheet.getRange(sheet.getMaxRows(), 3).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
  //Logger.log(CaseNo);

  //J列に〇が入っている行と対応する項目名をTestCaseに格納していく。
  var TestCase = [];
  for(var i = 0;i < CaseNo;i++){
    if(GetValue[i][3] == "〇"){
       TestCase.push(GetValue[i][2]); 
    }
  }
  //Logger.log(TestCase);

  //テスト対象の情報を取得する
  var TestDevice = [];
  var DeviceNo = sheet.getRange(sheet.getMaxRows(), 5).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
  for(var i = 2;i < DeviceNo;i++){
    TestDevice.push(GetValue[i][4]);
  }
  //Logger.log(DeviceNo)
  //Logger.log(TestDevice)

  //テストケースのシート情報を初期化してから取得する
  var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テストケース');
  sheet2.clear()
  
  var GetValue2 = sheet2.getRange(1,1,sheet2.getMaxRows(),sheet2.getMaxColumns()).getValues();
  
  //TestDeviceとTestCaseの値に
  for(i = 0;i < TestDevice.length;i++){
    GetValue2[1][i*2+4] = TestDevice[i]
    
    var ColorRange = sheet2.getRange(3,i*2+6,TestCase.length,1)
    ColorRange.setBackground("#f6d2d2");
    
    GetValue2[1][i*2+5] = "備考"
  }
  
  for(i = 0;i < TestCase.length;i++){
    GetValue2[i+2][3] = TestCase[i]
  }  

  //テストケースのシートに書き込む
  sheet2.getRange(1,1,sheet2.getMaxRows(),sheet2.getMaxColumns()).setValues(GetValue2);
  
  //罫線を引く
  var LineRange = sheet2.getRange(3, 5, TestCase.length ,TestDevice.length*2);
  LineRange.setBorder(true, true, true, true, true, true);


}