const express = require('express')

const router = express.Router()

const {getMembers, getMember, postMember, patchMember, deleteMember} = require('../controller/UserController')

// router.get('/', getMembers);
// router.get('/:id', getMember);
// router.post('/', postMember);
// router.patch('/:id', patchMember);
// router.delete('/:id', deleteMember);

module.exports = router