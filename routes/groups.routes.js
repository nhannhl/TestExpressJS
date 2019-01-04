import { Router } from 'express';
import Validate from 'express-validation';
import GroupController from '../controllers/groups.controller';
import GroupValidate from '../validators/group.validator';

const router = new Router();

// router.post('/groups', Validate(GroupValidate.newGroup), GroupController.newGroup);
// router.post('/groups/:id', [Validate(GroupValidate.checkId), Validate(GroupValidate.checkMembers)], GroupController.addMember);
// router.get('/groups', GroupController.getAll);
// router.delete('/groups/:id', Validate(GroupValidate.checkId), GroupController.deleteGroup);
// router.get('/groups/author/:id', Validate(GroupValidate.checkId), GroupController.updateAuthor);
router.get('/groups/test', GroupController.testPopulate);

export default router;