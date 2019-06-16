// @flow
import React from 'react'
import Avatar from 'antd/lib/avatar'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import styles from './RightNav.scss'

function RightNav (props) {
  const { options, render } = props

  const overlay = (
    <Menu>
      {options.map(option => <Menu.Item key={option.label} onClick={option.onClick}>{option.label}</Menu.Item>)}
    </Menu>
  )

  return (
    <div
      className={styles.root}
    >
      {/*render()*/}
      <Dropdown overlay={overlay}>
        <Avatar className={styles.avatar} src={`https://avatar.tobi.sh/1234`} />
      </Dropdown>
    </div>
  )
}

export default RightNav
