import { Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobal } from '../../../core/contexts/Global'
import { useCurrent } from '../../../core/contexts/Current'
import { logout } from '../../../core/utils/storage'
import BtnLink from '../../atoms/BtnLink';


function NavBar() {
  const classes = useStyles()
  const { user, setUser } = useGlobal()
  const { setCurrent } = useCurrent()
  const history = useHistory()

  const links = [
    {
      path: '/',
      title: 'Home',
      condition: true
    },
    {
      path: '/login',
      title: 'Login',
      condition: !user?.id
    },
    {
      path: '/sign-up',
      title: 'Signup',
      condition: !user?.id
    },

    {
      path: '/dashboard',
      title: 'Enter/Exit',
      condition: !!user?.id
    },
    {
      path: '/dashboard/report',
      title: 'Reports',
      condition: !!user?.id
    },
  ]
  const handleLogout = () => {
    logout(window?.localStorage, user?.id)
    setUser({
      id: 0,
      name: '',
      phone: '',
      enterExits: []
    })
    setCurrent({
      id: 0,
      start: 0,
      end: 0,
      tasks: []
    })
    history.push('/')
  }


  return (
    <nav className={classes.nav}>
      <Container>
        <ul className={classes.navList}>

          {
            links?.map(link => link.condition && (
              <BtnLink key={link.path} link={link} />
            ))
          }

          {
            user?.id ? (
              <li>
                <Button variant="outlined" color="error" onClick={handleLogout} >
                  Logout
                </Button>
              </li>
            ) : null
          }
        </ul>
      </Container>
    </nav>
  )
}

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '1px 1px 5px 1px #ccc',
    backgroundColor: 'rgba(255, 255, 255, .7)',


    '&  button': {
      padding: '10px 15px',
    },
    '& li:first-child': {
      paddingLeft: 0
    },
    '& a': {
      color: '#008dff'
    },
    '& .active': {
      color: '#0dd1ff',
    }
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  }
})

export default NavBar
