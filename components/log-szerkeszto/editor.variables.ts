import { formatOctansLog } from "./editor.octans"
import { formatOneRPLog } from "./editor.onerp"
import { formatSeeMTALog } from "./editor.seemta"

export interface LogEditorOption {
    serverName: string
    formatLog: (data: string, removeDefault: boolean) => string[]
}

export const logEditorOptions: LogEditorOption[] = [
    {
        serverName: 'OctansV',
        formatLog: formatOctansLog
    },
    {
        serverName: 'SeeMTA',
        formatLog: formatSeeMTALog
    },
    {
        serverName: 'OneRP',
        formatLog: formatOneRPLog
    }
]