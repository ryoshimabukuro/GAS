function WriteTestCase2() {

    //テスト観点表のスプレッドシートの値を全て取得する
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テスト観点表');
    var GetValue = sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).getValues();
    //Logger.log(GetValue);
    
    //最終行と列を取得する。
    var TestingPerspectiveNo = sheet.getLastRow();
    var testconditionsNo = sheet.getLastColumn();
    //Logger.log(TestingPerspectiveNo);
    //Logger.log(testconditionsNo);

    //テストケースのシート情報を初期化してから取得する
    var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テストケース');
    sheet2.clear()
  
    var GetValue2 = sheet2.getRange(1,1,sheet2.getMaxRows(),sheet2.getMaxColumns()).getValues();

    //3行目にチェックが入っている列の該当するデータを取得する。
    var DoTestCase = [];

    for(var i = 10;i < testconditionsNo;i++){
        if(GetValue[2][i]){

            GetValue2[DoTestCase.length+2][2] = GetValue[3][i];

            for (var j = 0; j < TestingPerspectiveNo; j++) {
                if (GetValue[j][i] == "◎" || GetValue[j][i] == "〇" ) {
                    DoTestCase.push(GetValue[j][4]);
                }
            }
        }
    }

    //GetValue2に格納していく
    for(var i = 0;i < DoTestCase.length;i++){
        GetValue2[i+2][3] = DoTestCase[i];
    }

    //テスト対象の情報を取得する
    var sheet3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('テスト端末設定');
    var GetValue3 = sheet3.getRange(1,1,sheet3.getMaxRows(),sheet3.getMaxColumns()).getValues();
    
    var TestDevice = [];
    var DeviceNo = sheet3.getRange(sheet3.getMaxRows(), 5).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
    for(var i = 2;i < DeviceNo;i++){
        TestDevice.push(GetValue3[i][4]);
    }

    //TestDeviceの後ろに備考とチケット作成欄を入れる
    if (GetValue3[2][5]) {
        for(i = 0;i < TestDevice.length;i++){
            GetValue2[1][i*3+4] = TestDevice[i]
        
            var ColorRange = sheet2.getRange(3,i*3+6,DoTestCase.length,2)
            ColorRange.setBackground("#f6d2d2");
        
            GetValue2[1][i*3+5] = "備考"
            GetValue2[1][i*3+6] = "チケット"
        }
            
    //罫線を引く
        var LineRange = sheet2.getRange(3, 5, DoTestCase.length ,TestDevice.length*3);
        LineRange.setBorder(true, true, true, true, true, true);
    
    }else{       
    
        for(i = 0;i < TestDevice.length;i++){
        GetValue2[1][i*2+4] = TestDevice[i]
    
        var ColorRange = sheet2.getRange(3,i*2+6,DoTestCase.length,1)
        ColorRange.setBackground("#f6d2d2");
    
        GetValue2[1][i*2+5] = "備考"
        }
    //罫線を引く
    var LineRange = sheet2.getRange(3, 5, DoTestCase.length ,TestDevice.length*2);
    LineRange.setBorder(true, true, true, true, true, true);
    }

    //テストケースのシートに書き込む。
    sheet2.getRange(1,1,sheet2.getMaxRows(),sheet2.getMaxColumns()).setValues(GetValue2);
}