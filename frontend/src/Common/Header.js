import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../Redux/Actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <i className='fab fa-stack-exchange'></i> Booking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='ms-auto' navbarScroll>
            <Nav.Link as={Link} to='/Rooms'>
              Room
            </Nav.Link>

            <Nav.Link as={Link} to='/Cart'>
              Cart
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='userName'>
                <NavDropdown.Item as={Link} to='/Profile'>
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to='/Login'>
                Sign-In
              </Nav.Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminMenu'>
                <NavDropdown.Item as={Link} to='/admin/UserList'>
                  Users
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to='/admin/RoomLists'>
                  Rooms
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to='/admin/OrderList'>
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
