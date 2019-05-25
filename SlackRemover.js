function getFileList() {
    var params = {
        'token': "",
        'channel': "",
        'count': ""
    }
    var options = {
        'method': 'GET',
        'payload': params
    }

    var url = "https://slack.com/api/files.list"
    UrlFetchApp.fetch(url, options)
}