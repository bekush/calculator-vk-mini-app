import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import SnackBar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Intro from './panels/Intro'

const ROUTES = {
  HOME: 'home',
  INTRO: 'intro',
}

const STORAGE_KEYS = {
  STATUS: 'status',
  STATE: 'state',
}

const App = () => {
  const [activePanel, setActivePanel] = useState(ROUTES.INTRO)
  const [fetchedUser, setUser] = useState(null)
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />)
  const [fetchedState, setFetchedState] = useState(false)
  const [userHasSeenIntro, setUserHasSeenIntro] = useState(false)
  const [snacbar, setSnackbar] = useState(false)

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      const storageData = await bridge.send('VKWebAppStorageGet', {
        keys: Object.values(STORAGE_KEYS),
      })
      const data = {}
      storageData.keys.forEach(({ key, value }) => {
        try {
          data[key] = value ? JSON.parse(value) : {}
          switch (key) {
            case STORAGE_KEYS.STATUS:
              if (data[key].hasSeenIntro) {
                setActivePanel(ROUTES.HOME)
                setUserHasSeenIntro(true)
              }
              break
            case STORAGE_KEYS.STATE:
              setFetchedState(data[key])
              break
            default:
              break
          }
        } catch (error) {
          setSnackbar(
            <SnackBar
              layout="vertical"
              onClose={() => {
                setSnackbar(null)
              }}
              before={<Avatar size={24} />}
              duration={900}
            >
              Возникли проблемы при получении данных из Storage
            </SnackBar>
          )
        }
      })
      setUser(user)
      setPopout(null)
    }
    fetchData()
  }, [])

  const go = (panel) => {
    setActivePanel(panel)
  }

  const viewIntro = async function () {
    try {
      await bridge.send('VKWebAppStorageSet', {
        key: STORAGE_KEYS.STATUS,
        value: JSON.stringify({
          hasSeenIntro: true,
        }),
      })
      go(ROUTES.HOME)
    } catch (error) {
      setSnackbar(
        <SnackBar
          layout="vertical"
          onClose={() => {
            setSnackbar(null)
          }}
          before={<Avatar size={24} />}
          duration={900}
        >
          Возникли проблемы при отправке данных из Storage
        </SnackBar>
      )
    }
  }

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home
        id={ROUTES.HOME}
        fetchedUser={fetchedUser}
        fetchedState={fetchedState}
        snackbarError={snacbar}
      />
      <Intro
        id={ROUTES.INTRO}
        fetchedUser={fetchedUser}
        userHasSeenIntro={userHasSeenIntro}
        go={viewIntro}
        snackbarError={snacbar}
      />
    </View>
  )
}

export default App
