import React, { ReactNode } from 'react'
import TopBar from '../TopBar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className='lg:mx-12 mx-6'>{children}</div>
    </div>
  )
}
export default Layout
