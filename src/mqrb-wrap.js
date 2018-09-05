export default function (module) {
  var mqrb_initialize = module.cwrap('mqrb_initialize', 'number');
  mqrb_initialize();

  return ({
    create_instance: module.cwrap('mqrb_create_instance', 'number'),
    delete_instance: module.cwrap('mqrb_delete_instance', 'number', ['number']),
    exec_script: module.cwrap('mqrb_exec_script', null, ['number', 'string']),
    exec_irep: module.cwrap('mqrb_exec_irep', null, ['number', 'array'])
  });
}