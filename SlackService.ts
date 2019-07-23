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

    deleteFile(fileId: number) {
        const url = `https://slack.com/api/files.delete?token=${this.token}&file=${fileId}`
        const json = JSON.parse(UrlFetchApp.fetch(url).getContentText())
        if(!json["ok"]){
            Logger.log("failed to delete specified file.")
        }
    }
}