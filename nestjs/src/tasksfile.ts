import { cli } from 'tasksfile';
import { wrapAppContext } from './tasksfile/wrapAppContext';
import { checkStatus } from './tasksfile/fa/checkStatus';
import { createApp } from './tasksfile/fa/createApp';
import { createEmailTemplates } from './tasksfile/fa/createEmailTemplates';
import { createTenant } from './tasksfile/fa/createTenant';
import { deleteEmailTemplates } from './tasksfile/fa/deleteEmailTemplates';
import { deleteTenant } from './tasksfile/fa/deleteTenant';
import { genesis } from './tasksfile/fa/genesis';
import { seedUsers } from './tasksfile/fa/seedUsers';

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
