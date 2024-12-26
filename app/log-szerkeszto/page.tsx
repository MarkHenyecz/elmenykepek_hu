"use client";
import { LogEditorOption, logEditorOptions } from '@/components/log-szerkeszto/editor.variables';
import '../../components/scss/log-editor.scss'
import { useEffect, useState, useRef } from 'react';
import CheckBox from '@/components/checkbox';
import { generateImageFromDomElement } from '@/components/log-szerkeszto/image-generator';


export default function LogEditor() {
  const [currentEditor, setCurrentEditor] = useState<LogEditorOption | undefined>(logEditorOptions[0])
  const [formattedText, setFormattedText] = useState<string[]>([])
  const [defaultData, setDefaultData] = useState<string>('')
  const [removeDefault, setRemoveDefault] = useState<boolean>(true)

  const [textSize, setTextSize] = useState<string>('12px')
  const possibleTextSizes: string[] = [
    '10px',
    '12px',
    '14px',
    '16px',
  ]

  const [size, setSize] = useState<string>('calc(1200px + 2vh)')
  const possibleSizes: { [key: string]: string; } = {
    'calc(1000px + 2vh)': 'Kicsi',
    'calc(1200px + 2vh)': 'Normál',
    'calc(1550px + 2vh)': 'Nagy',
  }

  const logRef = useRef<HTMLDivElement>(null);

  const handleLogChange = (data: string, removeDefault: boolean) => {
    setDefaultData(data)
    setFormattedText(currentEditor?.formatLog(data, removeDefault) ?? [])
  }

  useEffect(() => {
    handleLogChange(defaultData, removeDefault)
  }, [currentEditor, removeDefault])

  return (
    <div className='bg-secondary min-h-[80vh] p-4 log-editor' style={{width: size}}>
      <div className='flex flex-col items-center'>
        <select className='bg-primary p-2 text-2xl text-center' onChange={(e) => setCurrentEditor(logEditorOptions.find(editor => editor.serverName == e.target.value))}>
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
        <textarea className='bg-primary w-[100%]' cols={30} rows={30} onChange={(e) => handleLogChange(e.target.value, removeDefault)} />
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <p>Szöveg szélesség:</p>
          <select className='bg-primary p-2 text-center' onChange={e => setSize(e.target.value)}>
            {Object.keys(possibleSizes).map(key => 
              <option key={key} value={key} selected={key == size}>{possibleSizes[key].toString()}</option>
            )}
          </select>
          <p>Szöveg méret:</p>
          <select className='bg-primary p-2 text-center' onChange={e => setTextSize(e.target.value)}>
            {possibleTextSizes.map(key => 
              <option key={key} value={key} selected={key == textSize}>{key}</option>
            )}
          </select>
        </div>
        <div className='log-editor__text-area' ref={logRef}>
          {formattedText.map((text, key) => 
            <p key={key} style={{fontSize: textSize}} dangerouslySetInnerHTML={{__html: text}}></p>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center mt-4' style={{gridArea: '2 / 1 / 3 / 3'}}>
          <button className='bg-primary p-2 text-center' onClick={() => generateImageFromDomElement(logRef.current)}>
            Letöltés képként
          </button>
      </div>
    </div>
  )
}
