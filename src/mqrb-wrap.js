export default function (module) {
  return ({
    initialize: module.cwrap('mqrb_initialize', 'number'),
    create_instance: module.cwrap('mqrb_create_instance', 'number'),
    delete_instance: module.cwrap('mqrb_delete_instance', 'number', ['number']),
    exec_script: module.cwrap('mqrb_exec_script', null, ['number', 'string'])
  });
}