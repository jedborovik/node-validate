/**
 * Module dependencies.
 */

var validator = require('validator');

/**
 * Validate prototype.
 */

var validate = Validate.prototype;

/**
 * Expose 'Validate'.
 */

module.exports = Validate;

/*
 * Initaliaze a new Validate instance.
 */

function Validate() {
  if (!(this instanceof Validate)) return new Validate; 
  this.errors = [];
}

/**
 * Assign validator methods to Validate prototype.
 */

Object.keys(validator).forEach(function(method) {
  if (!(method.slice(0,2) === 'is')) return;
  validate[method] = create(method);  
});

/**
 * Change validator method to take an error message.
 */

function create(method) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var message = args.splice(-1)[0];
    var m = validator[method];

    if (!m.apply(validator, args)) this.errors.push(message);

    return this;
  }
}
