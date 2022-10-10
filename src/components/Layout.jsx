import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Header from './Header'
import Sidenav from './side_nav/SideNav'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../store/slices/authSlice'
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { } from '../store/slices/authSlice'

const Layout = () => {
  const dispatch = useDispatch()
  // const { username, role_name, acces_token, auth, isLoading } = useSelector(
  //   state => state.authSlice.dataSignIn
  // )
  let boolAuth = Boolean(sessionStorage.getItem('auth'))
  const [isAuth, setIsAuth] = useState(boolAuth)
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation()
  const sideNavRef = useRef(null)
  const mainRef = useRef(null)
  const loadingRef = useRef(null)
  const [isOpenNav, setIsOpenNav] = useState(false)
  const [screenMd, setScreenMd] = useState(null)

  const startLoading = () => {
    loadingRef.current.continuousStart()
  }

  const logOut = () => {
    setIsAuth(false)
    dispatch(setAuth(false))
    sessionStorage.clear()
  }

  const showNavHandler = () => {
    const elSideNav = sideNavRef.current
    const elMain = mainRef.current

    setIsOpenNav(!isOpenNav)
    if (screenMd < 768) {
      if (isOpenNav) {
        elSideNav.style.transform = 'translate(-256px)'
        elMain.childNodes[2].style.visibility = 'hidden'
        elMain.childNodes[2].style.opacity = 0
      } else {
        elSideNav.style.transform = 'translate(0px)'
        elMain.childNodes[2].style.visibility = 'visible'
        elMain.childNodes[2].style.opacity = 0.5
      }
    } else {
      if (!isOpenNav) {
        elSideNav.style.transform = 'translate(-256px)'
        elMain.style.marginLeft = '0px'
        elMain.childNodes[0].style.left = '-256px'
      } else {
        elSideNav.style.transform = 'translate(0px)'
        elMain.style.marginLeft = '256px'
        elMain.childNodes[0].style.left = '0px'
      }
    }
  }

  useEffect(() => {
    if (sideNavRef.current !== null) {
      setScreenMd(window.innerWidth)
      window.addEventListener('resize', () => {
        setScreenMd(window.innerWidth)
        setIsOpenNav(false)
        sideNavRef.current.style.transform = null
        mainRef.current.childNodes[0].style.left = null
        mainRef.current.style.marginLeft = null
      })
    }
  }, [])

  useEffect(() => {
    if (loadingRef.current !== null) {
      loadingRef.current.complete()
    }
  }, [location])

  useEffect(() => {
    console.log('================token====================');
    console.log(sessionStorage.getItem('token'));
    console.log('===================token=================');
  }, [isAuth])

  useEffect(() => {
    setInterval(() => {
      if (sessionStorage.getItem('token') !== null) {
        let decodedToken = jwt_decode(sessionStorage.getItem('token'));
        console.log(decodedToken.exp < Date.now() / 1000);
        if (decodedToken.exp < Date.now() / 1000) {
          console.log('====================================');
          console.log('expires');
          console.log('====================================');
          setIsAuth(false)
          dispatch(setAuth(false))
          sessionStorage.clear()
          navigate("/login", { replace: true })
        }
        
      }
    }, 10000)
  }, [isAuth])



  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return (
    <>
      <LoadingBar color='rgb(239 68 68)' ref={loadingRef} shadow={false} />
      <Sidenav innerRef={sideNavRef} startLoading={startLoading} />
      <div
        ref={mainRef}
        className={`md:tw-ml-64 tw-transition-all tw-duration-500 tw-ease-in-out`}
      >
        <Header showNavHandler={showNavHandler} isOpenNav={isOpenNav} logOut={logOut} />
        <span
          onClick={showNavHandler}
          className='tw-block md:tw-hidden tw-fixed tw-bg-black tw-w-screen tw-h-full tw-z-10 tw-ransition-all tw-duration-150 tw-ease-in-out'
          style={{ visibility: 'hidden', opacity: 0 }}
        ></span>
        <div className='tw-p-3'>
          <div className='tw-mt-20 md:tw-mt-14'>
            <Outlet />
            <ToastContainer 
            autoClose={5000} 
            collapseDuration={300}
            draggable={false}
            hideProgressBar={true}
            theme={'colored'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
