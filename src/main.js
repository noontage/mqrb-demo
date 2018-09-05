import Module from './mqrb-core';
import Mqrb from './mqrb-wrap';

fetch('mqrb-core.wasm')
  .then(response => response.arrayBuffer())
  .then(buffer => new Uint8Array(buffer))
  .then(binary => {
    var moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: function () {
        const mqrb = Mqrb(module);
        mqrb.initialize();
        var mrb = mqrb.create_instance();
        mqrb.exec_script(mrb, "p (1..10).class")
        mqrb.delete_instance(mrb);
      }
    };
    var module = Module(moduleArgs);
  });