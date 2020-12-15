import { cli } from 'tasksfile';
import { wrapAppContext } from './wrapAppContext';
import { checkStatus } from './tasks/fa/checkStatus';
import { createApp } from './tasks/fa/createApp';
import { createEmailTemplates } from './tasks/fa/createEmailTemplates';
import { createTenant } from './tasks/fa/createTenant';
import { deleteEmailTemplates } from './tasks/fa/deleteEmailTemplates';
import { deleteTenant } from './tasks/fa/deleteTenant';
import { genesis } from './tasks/fa/genesis';
import { seedUsers } from './tasks/fa/seedUsers';

cli({
  fa: {
    checkStatus: () => wrapAppContext(checkStatus),
    createApp: () => wrapAppContext(createApp),
    createEmailTemplates: () => wrapAppContext(createEmailTemplates),
    createTenant: () => wrapAppContext(createTenant),
    deleteEmailTemplates: () => wrapAppContext(deleteEmailTemplates),
    deleteTenant: () => wrapAppContext(deleteTenant),
    genesis: () => wrapAppContext(genesis),
    seedUsers: () => wrapAppContext(seedUsers),
  },
});
