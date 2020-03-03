export const to = promise => promise.then(data => [null, data] ).catch(err => [err])
import randomstring from 'randomstring'
export const genstring = () => randomstring.generate({ length: 5, charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890' })
export const gencode = async Modal => {
  const code = genstring()
  var err, data
  [err, data] = await to(Modal.find({ code }))
  if(data.length > 0 || err){ return await gencode(Modal) }else{ return code }
}
