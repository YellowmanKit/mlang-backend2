import mongoose from 'mongoose'
import { to, genstring } from '../../function/general.js'
var User = module.exports = mongoose.model('user', mongoose.Schema({
  id: { type: String },
  pw: { type: String },
  email: { type: String },
  type: { type: String },
  createdAt: { type: Date }
}))
import Profile from './Profile'
import School from '../school/School'

var err, data
const spawn = module.exports.spawn = async value => {
  [err, data] = await to(User.create({ ...value, createdAt: new Date() }));
  [err] = await to(Profile.create({ belongTo: data._id }))
  return [err, data]
}

module.exports.login = async ({ id, pw }) => {
  var user, profile
  [err, user] = await to(User.findOne({ id, pw }));
  if(err || !user){ return ['invalid login info']}
  [err, profile] = await to(Profile.findOne({ belongTo: user._id }))
  return [err, { user, profile }]
}

module.exports.acquire = async ({ code, type }) => {
  if(type === 'school'){ return newTeacher(code) }
  if(type === 'course'){ return newStudent(code) }
  return ['invalid type']
}

const newTeacher = async code => {
  var school
  [err, school] = await to(School.findOne({ code }))
  if(err || !data){ return ['invalid code'] }
  const pw = genstring();
  [err, data] = await spawn({ id: 'default', pw, type: 'teacher', createdAt: new Date() });
  [err] = await to(School.findOneAndUpdate({ code }, { $push: { joinedTeachers: data._id } }));
  [err] = await to(Profile.findOneAndUpdate({ belongTo: data._id }, { $push: { joinedSchools: school._id }}))
  return [err, data]
}
