import { Router } from 'express';

import { ensureAuthenticate } from '@shared/infra/middlewares/ensureAuthenticate';
import { CreateCustomerController } from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import { UpdateCustomerController } from '@modules/customers/useCases/updateCustomer/UpdateCustomerController';
import { ListCustomerController } from '@modules/customers/useCases/listCustomers/ListCustomersController';
import { DeleteCustomerController } from '@modules/customers/useCases/deleteCustomer/DeleteCustomerController';
import { FindCustomerController } from '@modules/customers/useCases/findCustomer/FindCustomerController';

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();
const listCustomerController = new ListCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const findCustmerController = new FindCustomerController();

customerRouter.post('/', ensureAuthenticate, createCustomerController.handle);
customerRouter.put('/', ensureAuthenticate, updateCustomerController.handle);
customerRouter.get('/', ensureAuthenticate, listCustomerController.handle);
customerRouter.delete('/:id', ensureAuthenticate, deleteCustomerController.handle);
customerRouter.post('/search', ensureAuthenticate, findCustmerController.handle);

export { customerRouter };
