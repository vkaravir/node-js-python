var Sk = require('./skulpt');
/* Executes the given code and returns the values of variables in
array variables. */
function exec(code, variables) {
  var output = "",
    mainmod,
    result = {'output': output, 'variables': {}},
    varname;
  Sk.configure( { output: function(str) { output += str; } } );
  try {
    mainmod = Sk.importMainWithBody("<stdin>", false, code);
  } catch (e) {
    return {"output": output, "_error": e.args.v[0].v};
  }
  for (var i = 0; i < variables.length; i++) {
    varname = variables[i];
    result.variables[varname] = mainmod.tp$getattr(varname);
  }
  return result;
}
exports.exec = exec;

/* Executes the given code, compares the values of variables with
those given in expected object. Returns a boolean value for each variable
name indicating whether the values match. If loose is true, types of the
variables don't have to match (that is, 3 is equal to "3"). By default, 
loose is false and a strict type equal check is done. */
exports.check = function(code, expected, loose) {
  var strick_check = !loose,
    variables = [],
    assert_result = {},
    exec_result;
  for (varname in expected) {
    variables.push(varname);
  }
  exec_result = exec(code, variables);
  if ("_error" in exec_result) {
    return exec_result;
  }
  exec_result = exec_result.variables
  for (varname in expected) {
    assert_result[varname] = strick_check?expected[varname]===exec_result[varname]:expected[varname]==exec_result[varname];
  }
  return assert_result;
};