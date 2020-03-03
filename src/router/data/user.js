import { version } from '../../../package.json'
import User from '../../modal/user/User'

var err, data
export const router = (app, db) =>{

  app.get('/user', (req, res) => {
    return res.json({ status: 'ok' })
  })

  app.post('/user/login', async (req, res) => {
    [err, data] = await User.login(req.body.data)
    if(err){ return res.json({ err }) }
    return res.json(data)
  })

  app.post('/user/acquire', async (req, res) => {
    [err, data] = await User.acquire(req.body.data)
    if(err){ return res.json({ err })}
    return res.json(data)
  })

}
