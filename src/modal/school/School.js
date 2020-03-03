import mongoose from 'mongoose'
import { to, gencode } from '../../function/general.js'
var ObjectId = mongoose.Schema.Types.ObjectId
var School = module.exports = mongoose.model('school', mongoose.Schema({
  admin: { type: ObjectId },
  icon: { type: String },
  name: { type: String },
  description: { type: String, default: '' },
  createdAt: { type: Date },
  code: { type: String },
  joinedTeachers: [ ObjectId ],
  joinedStudents: [ ObjectId ]
}))

var err, data
module.exports.spawn = async value => {
  const code = await gencode(School);
  [err, data] = await to(School.create({ ...value, createdAt: new Date(), code }))
  return [err, data]
}
