import mongoose from 'mongoose';
import { to } from '../../function/general.js'
var ObjectId = mongoose.Schema.Types.ObjectId
var Profile = module.exports = mongoose.model('profile', mongoose.Schema({
  belongTo: { type: ObjectId },
  icon: { type: String },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  joinedSchools: [ ObjectId ],
  joinedCourses: [ ObjectId ],
  cardCount: { type: Number, default: 0 },
  featuredCount: { type: Number, default: 0 },
  lastLogin: { type: Date }
}))

var err, data
