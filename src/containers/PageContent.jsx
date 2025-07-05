/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SuspenseContent from './SuspenseContent'
import Header from './Header'
import Error404 from '../pages/protected/Error404'
import routes from '../routes'


const PageContent = () => {
    return (
        <div className="drawer-content flex flex-col ">
            <Header />
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" >
                <Suspense fallback={<SuspenseContent />}>
                    <Routes>
                        {
                            routes.map((route, key) => {
                                return (
                                    <Route
                                        key={key}
                                        exact={true}
                                        path={`${route.path}`}
                                        element={<route.component />}
                                    />
                                )
                            })
                        }

                        {/* Redirecting unknown url to 404 page */}
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    )
}

export default PageContent