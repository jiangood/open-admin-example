import React from 'react';
import {createRoot} from 'react-dom/client';
import routes from 'virtual:open-admin/routes';
import {registerRoutes,Layouts} from '@jiangood/open-admin';
registerRoutes(routes);
createRoot(document.getElementById('root')).render(<Layouts/>);
