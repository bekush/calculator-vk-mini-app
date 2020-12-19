import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'

const Home = ({ id, snackbarError }) => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState('')

  return (
    <Panel id={id}>
      <PanelHeader>Калкулятор</PanelHeader>
      <p>
        Число1
        <input
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
        />
      </p>
      <p>
        Число2
        <input
          value={value2}
          onChange={(event) => setValue2(event.target.value)}
        />
      </p>
      <button type="button" onClick={() => setResult(+value1 + +value2)}>
        Сложить
      </button>
      <button type="button" onClick={() => setResult(+value1 - +value2)}>
        Вычесть
      </button>
      <button type="button" onClick={() => setResult(+value1 * +value2)}>
        Умножить
      </button>
      <button type="button" onClick={() => setResult(+value1 / +value2)}>
        Разделить
      </button>
      <hr></hr>
      <p>Результать: {result}</p>
      {snackbarError}
    </Panel>
  )
}

export default Home
