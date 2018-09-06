import Module from './mqrb-core';
import Mqrb from './mqrb-wrap';
import * as monaco from 'monaco-editor'

var el_progress;
var el_contents;
var el_playButton;
var module;
let mqrb;

var status = {
  loaded: false
}

function showDisplayLoading() {
  status.loaded = false;
  setTimeout(() => {
    if (!status.loaded) {
      el_progress.style.display = "block";
    }
  }, 1500);
}

function HideDisplayLoading() {
  status.loaded = true;
  el_progress.style.display = "none";
  el_contents.style.display = "block";
}

function execRubyScript(script) {
  HideDisplayLoading();

  var mrb = mqrb.create_instance();
  mqrb.exec_script(mrb, script)
  //  mqrb.delete_instance(mrb);
}

//
// windows.onload
//
window.onload = () => {

  // dom elements
  el_progress = document.getElementById("progress");
  el_contents = document.getElementById("main-contents")
  el_playButton = document.getElementById("play-button")

  // loading
  showDisplayLoading();

  // editor-control
  el_playButton.addEventListener("click", () => {
    execRubyScript(editor.getValue());
  });

  // editor
  monaco.editor.defineTheme('mqrbTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: 'EDF9FA' }],
    colors: {
      // 'editor.foreground': '#111',
      // 'editor.background': '#333',
      // 'editorCursor.foreground': '#8B0000',
      // 'editor.lineHighlightBackground': '#AA000020',
      // 'editorLineNumber.foreground': '#008800',
      // 'editor.selectionBackground': '#88000030',
      // 'editor.inactiveSelectionBackground': '#88000015'
    }
  });
  monaco.editor.setTheme('mqrbTheme');
  var editor = monaco.editor.create(
    document.getElementById('editor'), {
      value: [].join('\n'),
      language: 'ruby',
      automaticLayout: true,
      roundedSelection: false,
      minimap: {
        enabled: false
      },
      fontFamily: "Arial",
      fontSize: 14,
    });
  editor.addCommand(monaco.KeyCode.F5, function () { });

  // fetch ruby script(text)
  fetch("demo.rb").then(function (response) {
    return response.text().then(function (text) {
      fetch('mqrb-core.wasm')
        .then(response => response.arrayBuffer())
        .then(buffer => new Uint8Array(buffer))
        .then(binary => {
          var moduleArgs = {
            wasmBinary: binary,
            onRuntimeInitialized: () => {
              mqrb = Mqrb(module);
              editor.setValue(text);
              execRubyScript(text);
            }
          };
          module = Module(moduleArgs);
        });
    });
  });

}