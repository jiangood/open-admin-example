import React from 'react';
import {createRoot} from 'react-dom/client';
import routes from 'virtual:open-admin/routes';
import {registerRoutes, PageLoading} from '@jiangood/open-admin';
import Layouts from './layouts';

registerRoutes(routes);
createRoot(document.getElementById('root')).render(
    <React.Suspense fallback={<PageLoading/>}>
        <Layouts/>
    </React.Suspense>
);
