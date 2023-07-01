import { formatSeeMTALog } from "./editor.seemta"

export interface LogEditorOption {
    serverName: string
    formatLog: (data: string, removeDefault: boolean) => string[]
}

export const logEditorOptions: LogEditorOption[] = [
    {
        serverName: 'SeeMTA',
        formatLog: formatSeeMTALog
    },
]