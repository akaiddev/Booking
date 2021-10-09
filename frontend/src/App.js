import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './Common/Footer'
import Header from './Common/Header'
import NotFound from './Common/NotFound'
import AddCart from './Screens/AddCart'
import Details from './Screens/Details'
import Home from './Screens/Home'
import Login from './Screens/Login'
import Order from './Screens/Order'
import OrderList from './Screens/OrderList'
import Payment from './Screens/Payment'
import PlaceOrder from './Screens/PlaceOrder'
import Profile from './Screens/Profile'
import Register from './Screens/Register'
import RoomEdit from './Screens/RoomEdit'
import RoomLists from './Screens/RoomLists'
import Rooms from './Screens/Rooms'
import Shipping from './Screens/Shipping'
import UserEdit from './Screens/UserEdit'
import UserList from './Screens/UserList'

function App() {
  return (
    <Router>
      <Header />
      <Container fluid>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Rooms' component={Rooms} />
          <Route exact path='/Search/:keyword' component={Rooms} />
          <Route exact path='/page/:pageNumber' component={Rooms} />
          <Route exact path='/search/:keyword/page/:pageNumber' component={Rooms} />
          <Route exact path='/Details/:id' component={Details} />
          <Route exact path='/Cart/:id?' component={AddCart} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Profile' component={Profile} />
          <Route exact path='/Shipping' component={Shipping} />
          <Route exact path='/Payment' component={Payment} />
          <Route exact path='/PlaceOrder' component={PlaceOrder} />
          <Route exact path='/Order/:id' component={Order} />
          <Route exact path='/admin/UserList' component={UserList} />
          <Route exact path='/admin/user/:id/edit' component={UserEdit} />
          <Route exact path='/admin/RoomLists' component={RoomLists} />
          <Route exact path='/admin/RoomLists/:pageNumber' component={RoomLists} />
          <Route exact path='/admin/room/:id/edit' component={RoomEdit} />
          <Route exact path='/admin/OrderList' component={OrderList} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
