// Initialize code editor
document.addEventListener('DOMContentLoaded', function() {
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  editor.setFontSize(14);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  });
  
  // Set initial code
  editor.setValue(`// Masukkan kode Anda di sini\nfunction contoh() {\n  console.log("Hello World");\n}\n\n// Klik tombol Analisis Kode untuk memulai`, 1);
  
  // Change mode based on language selection
  document.getElementById('language-selector').addEventListener('change', function() {
    const language = this.value;
    let mode;
    
    switch(language) {
      case 'python':
        mode = 'ace/mode/python';
        break;
      case 'java':
        mode = 'ace/mode/java';
        break;
      case 'c++':
        mode = 'ace/mode/c_cpp';
        break;
      case 'php':
        mode = 'ace/mode/php';
        break;
      default:
        mode = 'ace/mode/javascript';
    }
    
    editor.session.setMode(mode);
  });
  
  // Make editor available globally
  window.codeEditor = editor;
});