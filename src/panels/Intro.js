import React, { Fragment } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout'
import Button from '@vkontakte/vkui/dist/components/Button/Button'

import './Intro.css'

const Intro = ({ id, snackbarError, fetchedUser, go, userHasSeenIntro }) => {
  return (
    <Panel id={id} centered={true}>
      <PanelHeader>Интро Калькулятора</PanelHeader>
      {fetchedUser && !userHasSeenIntro && (
        <Fragment>
          <Group>
            <Div className="User">
              {fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} />}
              <h2>Привет, {fetchedUser.first_name}!</h2>
              <h3>
                Я постарался написать простой калькулятор, без красивой верстки.
                Это мое первое приложение на ВК, надеюсь не будете строгими в
                оценке. Также хочу обратить ваше внимание на факт, что страницу
                "Интро" я переписал у сотрудника ВК, который показал на Ютубе,
                как создать вк мини апы, я же самостоятельно написал только
                калькулятор. В дальнейшем обещаю научиться и писать все сам!
              </h3>
            </Div>
          </Group>
          <FixedLayout vertical="bottom">
            <Div>
              <Button mode="commerce" size="xl" onClick={go}>
                Ok, все понятно!
              </Button>
            </Div>
          </FixedLayout>
        </Fragment>
      )}
      {snackbarError}
    </Panel>
  )
}

export default Intro
