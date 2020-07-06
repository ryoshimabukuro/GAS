var ISSUE_URL = 'https://nextinnovation-inc.atlassian.net/rest/api/2/issue/';

function get_issue_data(){
  var response = get_issue();
  var jobj = JSON.parse(response);
  var fields = jobj["fields"]
  var type = fields["issuetype"]["name"];
  var status = fields["status"]["name"];
  var description = fields["description"];
  var summary = fields["summary"];
  var custom1 = fields["customfield_10025"];
  var text = type + status + description + summary + custom1
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Jira連携');
  sheet.getRange(1,1).setValue(text);
  console.log(jobj);
}

function get_issue() {
  var token = get_token(); //get_token()からtokenを取得
  var key = "SV1D-1"; //Keyを指定（プロジェクトの一覧画面で確認できる。）
  var options = {
    contentType: "application/json", //json形式でデータを取得
    headers: {"Authorization": " Basic " + token} //ヘッダーでtoken情報をBasicで送信
  };
  var url = ISSUE_URL + key; //urlにISSUE_URLとKeyをくっつけて入れて
  var response = UrlFetchApp.fetch(url, options); //optionの内容でデータを取得するよう設定
  return response;
}

function get_token() {
  var id = "ryo.shimabukuro@neo-lab.co.jp";
  var pw = "cBnnT5tLTHa3csZvakZn5819";
  var token = Utilities.base64Encode(id + ":" + pw);
  return token;
}