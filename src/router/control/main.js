import { version } from '../../../package.json'
import { to } from '../../function/general'
import User from '../../modal/user/User'
import School from '../../modal/school/School'

var err, data
export const router = (app, db) =>{

  app.get('/', (req, res) => {
    return res.json({ version })
  })

  app.get('/init', async (req, res) => {
    [err, data] = await to(School.findOne({ name: 'Test School' }))
    if(data){ return res.json({ result: 'App already initialized, test school code: ' + data.code }) }
    [err] = await User.spawn({ id: 'developer', pw: 'abc123', type: 'developer' });
    [err, data] = await School.spawn({ name: 'Test School' })
    return res.json({ result: err? err: 'done, test school code: ' + data.code })
  })

}
