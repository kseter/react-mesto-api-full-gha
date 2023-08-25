import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate} from "react-router-dom"
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import * as authorization from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
//popups states 
	const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
	const [isFullscreenCardOpen, setFullscreenCardOpen] = useState(false);
	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
//cards&user states
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
//login&registration states 
	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false)
	const [textInfoTooltip, setTextInfoTooltip] = useState('');
	const navigate = useNavigate();
	
//before page will be loaded 

//check the token
	const checkToken =(jwt)=> {
		return authorization.checkToken(jwt)
		.then((res) => {
			if(res){
				setLoggedIn(true); 
				setUserEmail(res.data.email); //put email data to the header on '/' page
			}
		})
		.catch((err) => {
			console.log(err);
		})
	};
//put updated data to user profile & load the cards
	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.requestUserInfo(), api.getInitialCards()])
				.then(([user, cards]) => {
					setCurrentUser(user) 
					setCards(cards);
				})
				.catch((err) => {
					console.log(err);
				})
			}
		},[loggedIn]);

	useEffect(() => {
		const jwt = localStorage.getItem('jwt'); //get the token from the storage 
		if(jwt) {
			checkToken(jwt);
		}
	}, []);

	useEffect(() => {
		if (loggedIn) {
			navigate('/')
		}
	}, [loggedIn]);
//finctions for to change popup states 
	function handleEditAvatarClick() {
		setAvatarPopupOpen(true);
    };

    function handleEditProfileClick(){
		setEditProfileOpen(true);
    };

   function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
    };

	function handleCardClick(card){
		setSelectedCard(card);
		setFullscreenCardOpen(true);
	};

	function openInfoTooltip() {
		setInfoTooltipOpen(true);
	};

	// function handleCardDeleteButton(){
	// 	setCardDeletePopupOpen(true)
	// }

	function closeAllPopups(){
		setAvatarPopupOpen(false);
		setEditProfileOpen(false);
		setAddPlacePopupOpen(false);
		setFullscreenCardOpen(false);
		setInfoTooltipOpen(false);
	}
//like&delete cards with btns
	function handleCardLike(card){
		const isLiked = card.likes.some(i => i._id === currentUser._id); //check likes from user on the card

		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function handleCardDelete(card){
		api.deleteCard(card)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== card._id)); 
		})
		.catch((err) => {
			console.log(err);
		})
	}
//update user info/avatar by popups
	function handleUpdateUser(user){
		api.setUserInfo(user)
		.then((data) => {
			setCurrentUser(data);
			closeAllPopups();
		})
		.catch((err) => {
			console.log(err);
		})
	};

	function handleUpdateAvatar(avatar){
		api.changeAvatar(avatar)
		.then((data) => {
			setCurrentUser(data);
			closeAllPopups();
		})
		.catch((err) => {
			console.log(err);
		})
		}
//add a new card with button 
	function handleAddPlaceSubmit(card){
		api.addNewCard(card)
		.then((newCard)=> {
			setCards([newCard, ...cards]); 
			closeAllPopups();
		})
		.catch((err) => {
			console.log(err);
		})
	}
//sign-in 
	const onLogin = ({email, password}) => {
		 return authorization.login(email, password)
		 .then((res) => {
			if (res.token) {
				setLoggedIn(true);
				localStorage.setItem('jwt', res.token);
				setUserEmail(email);
				navigate('/')
			}
		})	
		 .catch((err) => {
			console.log(err);
		})
	};
//sign-up
	const onRegister = ({email, password}) => {
		return authorization.register(email, password)
		.then(() => { 
			setIsSuccessInfoTooltipStatus(true)
			setTextInfoTooltip('Вы успешно зарегистрировались!'); //change state for infotooltip text type
			openInfoTooltip();
			navigate('/sign-in');
		}
		)
		.catch(() => {
			setIsSuccessInfoTooltipStatus(false)
			setTextInfoTooltip('Что-то пошло не так!Попробуйте ещё раз.'); //change state for infotooltip text type
			openInfoTooltip(); //open the infotooltip
		})
	};

	//sign out
	const handleSignOut = () => {
		localStorage.removeItem('jwt');
		setUserEmail('');
		navigate('/sign-in');
		setLoggedIn(false);
	}

	const navigateToSignIn =()=> {
		navigate('/sign-in');
	}

	const navigateToSignUp =() => {
		navigate('/sign-up');
	}


  return (
		<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
		<div className="page__container">
		<Header
		userEmail={userEmail} 
		handleSignOut={handleSignOut}
		navigateToSignIn={navigateToSignIn}
		navigateToSignUp={navigateToSignUp}
		/>
		<Routes>
			<Route element={<ProtectedRoute 
			loggedIn={loggedIn}/>}>
				<Route path='/' 
				element={<Main 
					cards={cards}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete} 
					/>} exact/>
			</Route>
			<Route 
				path="/sign-up" 
				element={
			<Register 
				onRegister={onRegister} 
				handleInfoTooltipOpen={openInfoTooltip}
		 />} />
			<Route path="/sign-in"  element={<Login onLogin={onLogin} />}/>
			<Route path="/*" element={ loggedIn ? <Navigate to="/"replace/> : <Navigate to="/sign-in" replace/>}/>
		</Routes>
		<EditProfilePopup 
		isOpen={isEditProfilePopupOpen} 
		onClose={closeAllPopups}
		onUpdateUser={handleUpdateUser}/>
		<AddPlacePopup
		isOpen={isAddPlacePopupOpen}
		onClose={closeAllPopups}
		onPlaceAdd={handleAddPlaceSubmit}/>
		<EditAvatarPopup 
		isOpen={isEditAvatarPopupOpen}
		onClose={closeAllPopups}
		onUpdateAvatar={handleUpdateAvatar}/>
		<ImagePopup 
		card={selectedCard}
		isOpen={isFullscreenCardOpen}
		onClose={closeAllPopups}/>
		<InfoTooltip 
		text={textInfoTooltip}
		isOpen={isInfoTooltipOpen}
		onClose={closeAllPopups}
		isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
		/>
		<Footer />
		</div>
		</div>
		</CurrentUserContext.Provider>
  );
}

export default App;
