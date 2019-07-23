class SlackService {
    private token: string
    constructor(token) {
        this.token = token
    }

    getUploadedFiles() {
        const url: string = `https://slack.com/api/files.list?token=${this.token}`
        const response = UrlFetchApp.fetch(url)
        const json = JSON.parse(response.getContentText())
        if (!json["ok"]) {
            Logger.log("failed to get file list in work space.")
        }
        return json["files"]
    }

}