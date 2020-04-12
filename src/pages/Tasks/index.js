import { Typography } from 'antd'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Page from 'components/Page'
import React from 'react'
import { AddTask } from './AddTask'
import { Filter, Filters } from './Filters'
import Tasks from './Tasks'

const { Title } = Typography

export default function TasksPage () {
  return (
    <Page>
      <Header />
      <Content>
        <Title level={1}>Tasks</Title>
        <AddTask />
        <Filters>
          <Filter value='all'>All</Filter>
          <Filter value='checked'>Done</Filter>
          <Filter value='todo'>Todo</Filter>
        </Filters>
        <Tasks />
      </Content>
      <Footer />
    </Page>
  )
}
