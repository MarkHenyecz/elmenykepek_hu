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

  const [textSize, setTextSize] = useState<string>('normal')
  const possibleTextSizes: { [key: string]: number; } = {
    'small': 10,
    'normal': 12,
    'big': 14,
    'biggest': 16,
  }

  const [size, setSize] = useState<string>('normal')
  const possibleSizes: { [key: string]: string; } = {
    'small': 'Kicsi',
    'normal': 'Normál',
    'big': 'Nagy',
  }

  const handleLogChange = (data: string, removeDefault: boolean) => {
    setDefaultData(data)
    setFormattedText(currentEditor?.formatLog(data, removeDefault) ?? [])
  }

  useEffect(() => {
    handleLogChange(defaultData, removeDefault)
  }, [currentEditor, removeDefault])

  return (
    <div className={`log-editor ${size}`}>
      <div className='log-editor__leftSide'>
        <select onChange={(e) => setCurrentEditor(logEditorOptions.find(editor => editor.serverName == e.target.value))}>
          {logEditorOptions.map(item =>
            <option 
            key={item.serverName}
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
        <div className='settings'>
          <p>Szöveg szélesség:</p>
          <select onChange={e => setSize(e.target.value)}>
            {Object.keys(possibleSizes).map(key => 
              <option value={key} selected={key == size}>{possibleSizes[key].toString()}</option>
            )}
          </select>
          <p>Szöveg méret:</p>
          <select onChange={e => setTextSize(e.target.value)}>
            {Object.keys(possibleTextSizes).map(key => 
              <option value={key} selected={key == textSize}>{possibleTextSizes[key].toString()}px</option>
            )}
          </select>
        </div>
        <div className='text-area'>
          {formattedText.map((text, key) => 
            <p key={key} className={textSize} dangerouslySetInnerHTML={{__html: text}}></p>
          )}
        </div>
      </div>
    </div>
  )
}
