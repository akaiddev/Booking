import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('45683968', 10),
    isAdmin: true,
  },
  {
    name: 'Akaid',
    email: 'akaid.dev@gmail.com',
    password: bcrypt.hashSync('45683968', 10),
  },
  {
    name: 'User',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('123', 10),
  },
]

export default users
