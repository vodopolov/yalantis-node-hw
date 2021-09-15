// Current method doesn't handle recursive structures and constructors with params
// I found an implementation of Deep Clone of Lodash library and It handles that stuff, but I didn't want to copy-paste it for the HW 
// I would rather use it or v8.deserialize(v8.serialize(object))

export default function clone(object: any): object {
  if (Array.isArray(object)) {
    var array = []
    for (var i = 0; i < object.length; i++) {
      array[i] = clone(object[i])
    }
    return array
  }

  if (typeof (object) == "object") {
    var cloned = new object.constructor()
    for (let key in object) {
      cloned[key] = clone(object[key])
    }
    return cloned
  }
  return object
}
