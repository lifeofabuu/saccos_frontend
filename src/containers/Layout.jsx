/* eslint-disable no-unused-vars */
import React from 'react'
import PageContent from './PageContent'
import LeftSidebar from './LeftSidebar'


const Layout = () => {

    return (
        <>
            <div className='drawer  lg:drawer-open'>
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <PageContent />
                <LeftSidebar />
            </div>
        </>
    )
}

export default Layout