var ISSUE_URL = 'https://neo-universe.atlassian.net/rest/api/2/issue/';

function get_issue() {
  var token = get_token();
  var key = "XY2020-1";
  var options = {
    contentType: "application/json",
    headers: {"Authorization": " Basic " + token}
  };
  var url = ISSUE_URL + key;
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response);
}

function get_token() {
  var id = "ryo.shimabukuro@neo-lab.co.jp";
  var api_token = "cBnnT5tLTHa3csZvakZn5819"; //testToken:cBnnT5tLTHa3csZvakZn5819
  var token = Utilities.base64Encode(id + ":" + api_token);
  return token;
}