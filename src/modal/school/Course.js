import mongoose from 'mongoose'
import { to, gencode } from '../../function/general.js'
var ObjectId = mongoose.Schema.Types.ObjectId
var Course = module.exports = mongoose.model('course', mongoose.Schema({
  teacher: { type: ObjectId },
  icon: { type: String },
  title: { type: String },
  createdAt: { type: Date },
  endDate: { type: Date },
  code: { type: String },
  joinedStudents: [ ObjectId ],
  subjects: [ ObjectId ]
}))

var err, data
module.exports.spawn = async value => {
  const code = await gencode(Course);
  [err, data] = await to(Course.create({ ...value, createdAt: new Date(), code }))
  return [err, data]
}
