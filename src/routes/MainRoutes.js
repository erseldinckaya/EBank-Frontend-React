import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - debit
const DebitDefault = Loadable(lazy(() => import('pages/debit')));
const DebitAdd = Loadable(lazy(() => import('pages/debit/add')));
const DebitUse = Loadable(lazy(() => import('pages/debit/use')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - profile
const ProfileDefault = Loadable(lazy(() => import('pages/profile')));
const ProfileEdit = Loadable(lazy(() => import('pages/profile/edit')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'profile',
            element: <ProfileDefault />
        },
        {
            path: 'editprofile',
            element: <ProfileEdit />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'debit',
            children: [
                {
                    path: 'main',
                    element: <DebitDefault />
                },
                {
                    path: 'appeal',
                    element: <DebitAdd />
                },
                {
                    path: 'use',
                    element: <DebitUse />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
