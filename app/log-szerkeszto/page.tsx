"use client";
import { LogEditorOption, logEditorOptions } from '@/components/log-szerkeszto/editor.variables';
import '../../components/scss/log-editor.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import CheckBox from '@/components/checkbox';


export default function LogEditor() {
  const [currentEditor, setCurrentEditor] = useState<LogEditorOption | undefined>(logEditorOptions[0])
  const [formattedText, setFormattedText] = useState<string[]>([])
  const [defaultData, setDefaultData] = useState<string>('')
  const [removeDefault, setRemoveDefault] = useState<boolean>(true)

  const handleLogChange = (data: string, removeDefault: boolean) => {
    setDefaultData(data)
    setFormattedText(currentEditor?.formatLog(data, removeDefault) ?? [])
  }

  useEffect(() => {
    handleLogChange(defaultData, removeDefault)
  }, [removeDefault])

  return (
    <div className='log-editor'>
      <div className='log-editor__leftSide'>
        <select onChange={(e) => setCurrentEditor(logEditorOptions.find(editor => editor.serverName == e.target.value))}>
          {logEditorOptions.map(item =>
            <option 
            value={item.serverName} 
            selected={currentEditor?.serverName == item.serverName}>
              {item.serverName}
            </option>
          )}
        </select>
        <CheckBox 
          label='Játék által generált RP törlése'
          checked={removeDefault}
          onChange={() => setRemoveDefault(!removeDefault)}
        />
        <textarea  cols={30} rows={30} onChange={(e) => handleLogChange(e.target.value, removeDefault)} />
      </div>
      <div className='log-editor__rightSide'>
        <div className='text-area'>
          {formattedText.map(text => 
            <p dangerouslySetInnerHTML={{__html: text}}></p>
          )}
        </div>
      </div>
    </div>
  )
}
