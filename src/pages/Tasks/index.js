import React from 'react'

import Page from 'components/Page'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import { Filters, Filter } from './Filters'
import Tasks from './Tasks'

import { AddTask } from './AddTask'

export default function TasksPage () {
  return (
    <Page>
      <Header />
      <Content>
        <h1>Tasks</h1>
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
