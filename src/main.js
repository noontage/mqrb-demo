import Module from './mqrb-core';
import Mqrb from './mqrb-wrap';
window.onload = () => 
{

  var status = {
    loaded: false
  }
  var el_progress = document.getElementById("progress");
  var el_contents = document.getElementById("contents")

  setTimeout(() => {
    if (!status.loaded) {
      el_progress.style.display = "block";
    }
  }, 1500);

  function setStatusVmLoaded() {
    status.loaded = true;
    el_progress.style.display = "none";
    el_contents.style.display = "block";
  }

  fetch('mqrb-core.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => new Uint8Array(buffer))
    .then(binary => {
      var moduleArgs = {
        wasmBinary: binary,
        onRuntimeInitialized: () => {
          setStatusVmLoaded();

          // Ruby VM Instance
          const mqrb = Mqrb(module);
          var mrb = mqrb.create_instance();
          mqrb.exec_script(mrb, "a = 0 ;p (1..10).class; p a")
          mqrb.delete_instance(mrb);

          var mrb = mqrb.create_instance();
          console.log(mrb);
          mqrb.exec_script(mrb, "p a")
          mqrb.delete_instance(mrb);
        }
      };
      var module = Module(moduleArgs);
    });

}