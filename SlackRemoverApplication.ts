class SlackRemoverApplication {
    private slackService : SlackService
    constructor(token) {
        this.slackService = new SlackService(token)
    }

    deleteExpiredFiles(){
        const files = this.slackService.getUploadedFiles()
        const now = new Date()
        now.setMonth(now.getMonth()-1)
        const lastWeekNow = now

        // TODO: どのくらいの期間の範囲内で削除するのか外部から入力する。
        const deleteTargetFiles =  files.filter(file => {
            const atCreated = new Date( file["created"] )
            const diffTime = lastWeekNow.getTime() - atCreated.getTime()
            return diffTime > 0
        });

        deleteTargetFiles.forEach(deleteingFile => {
            const fileId : number = deleteingFile["id"]
            this.slackService.deleteFile(fileId)
        });
    }
}

function triggerDeleteExpiredFiles() {
    // TODO: token,環境変数に入れてもいいと思う。
    const app = new SlackRemoverApplication(SecretConfig.token)
    app.deleteExpiredFiles()
}