var ISSUE_URL = 'https://neo-universe.atlassian.net/rest/api/2/issue/';

function get_issue_data(){
  var response = get_issue();
  var jobj = JSON.parse(response);
  var fields = jobj["fields"]
  var type = fields["issuetype"]["name"];
  var status = fields["status"]["name"];
  var description = fields["description"];
  var summary = fields["summary"];
  var custom1 = fields["customfield_10025"];
  Logger.log([type, status, description, summary]);
}

function get_issue() {
  var token = get_token();
  var key = "XY2020-1";
  var options = {
    contentType: "application/json",
    headers: {"Authorization": " Basic " + token}
  };
  var url = ISSUE_URL + key;
  var response = UrlFetchApp.fetch(url, options);
  return response;
}

function get_token() {
  var id = "ryo.shimabukuro@neo-lab.co.jp";
  var pw = "cBnnT5tLTHa3csZvakZn5819";
  var token = Utilities.base64Encode(id + ":" + pw);
  return token;
}