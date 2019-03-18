let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
let authController = require('../controllers/authController');
let articleController = require('../controllers/articleController');
let chatController = require('../controllers/chatController');
let searchController = require('../controllers/searchController');
let productController = require('../controllers/productController');
let cartController = require('../controllers/cartController');
let orderController = require('../controllers/orderController');
let userController = require('../controllers/userController');
let profileController = require('../controllers/profileController');
let pagesController = require('../controllers/pagesController');
let APIController = require('../controllers/APIController');
let isLoggedIn = require('../middlewares/isLoggedIn');
let isNotLoggedIn = require('../middlewares/isNotLoggedIn');
let isNotBlocked = require('../middlewares/isNotBlocked');

router.get('/', homeController.home);
router.get('/auth/logout', isLoggedIn, authController.logout);
router.get('/auth/register', isNotLoggedIn, authController.register);
router.post('/auth/register', isNotLoggedIn, authController.handleRegister);
router.get('/auth/login', isNotLoggedIn, authController.login);
router.post('/auth/login', isNotLoggedIn,  authController.handleLogin);
router.post('/profile/add/:userId', isLoggedIn, profileController.acceptFriendRequest);
router.post('/profile/remove/:userID',isLoggedIn, profileController.rejectFriendRequest);
router.get('/profile/show', isLoggedIn, profileController.show);
router.get('/profile/friends', isLoggedIn, profileController.friends);
router.get('/profile/invitations', isLoggedIn, profileController.invitations);
router.get('/profile/photos', isLoggedIn, profileController.photos);
router.get('/profile/more', isLoggedIn, profileController.more);
router.get('/profile/msgblock', isLoggedIn, profileController.msgblock);
router.get('/users/browse', userController.browse);
router.get('/users/show/:username', isLoggedIn, isNotBlocked, userController.show);
router.post('/users/follow/:userId', isLoggedIn, isNotBlocked, userController.followUser);
router.post('/users/send/:UserID', isLoggedIn, isNotBlocked, profileController.sendFriendRequest);
router.post('/users/ban/:userId', isLoggedIn, isNotBlocked, userController.banUser);
router.post('/users/block/:userId', isLoggedIn, isNotBlocked, userController.blockUser);
router.post('/users/unblocking/:userId', isLoggedIn, userController.unblockUser);
router.get('/users/photos/:username', isLoggedIn, isNotBlocked, userController.photos);
router.get('/users/messages/:username', isLoggedIn, isNotBlocked, userController.messages);
router.post('/users/messages', isLoggedIn, profileController.sendMessage);
router.get('/articles/publish', isLoggedIn, articleController.publish);
router.post('/articles/publish', isLoggedIn, articleController.handlePublish);
router.post('/articles/publishComment', isLoggedIn, articleController.handlePublishComment);
router.get('/articles/browse', articleController.browse);
router.get('/articles/delete/:articleId', articleController.delete);
router.get('/articles/show/:slug/:IdAndSlug', articleController.show);
router.get('/articles/comment/:commentId', isLoggedIn, articleController.likes);
router.get('/products/browse', productController.browse);
router.get('/cart/view', cartController.view);
router.get('/cart/checkout', cartController.checkout);
router.post('/cart/checkout', orderController.handleOrder);
router.post('/cart/add/:productId', cartController.add);
router.post('/cart/update/:productId', cartController.update);
router.get('/cart/delete/:productId', cartController.delete);
router.get('/chat/chatroom', isLoggedIn, chatController.showOnlineUsers);
router.post('/chat/send/:userId', isLoggedIn, chatController.sendMessage);
router.get('/pages/search', searchController.handleSearch);
router.get('/change/language/:lang', pagesController.changeLang);
router.get('/pages/contactUs', pagesController.contactUs);
router.get('/api/btcToUsd/last', APIController.btcToUsdLast);
router.get('/api/btcToUsd/high', APIController.btcToUsdHigh);
router.get('/api/btcToUsd/average', APIController.btcToUsdAverage);
router.get('/api/btcToUsd/low', APIController.btcToUsdLow);

module.exports = router;
