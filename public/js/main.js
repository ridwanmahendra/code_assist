document.addEventListener('DOMContentLoaded', function() {
  const runBtn = document.getElementById('run-btn');
  const loader = document.getElementById('loader');
  const analysisResult = document.getElementById('analysis-result');
  const taskInput = document.getElementById('task-input');
  
  runBtn.addEventListener('click', async function() {
    const code = window.codeEditor.getValue();
    const language = document.getElementById('language-selector').value;
    const task = taskInput.value;
    
    if (!code.trim()) {
      alert('Silakan masukkan kode terlebih dahulu');
      return;
    }
    
    // Show loading state
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menganalisis...';
    loader.style.display = 'flex';
    analysisResult.innerHTML = '';
    
    try {
      const response = await fetch('/analyze-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: language,
          task: task
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      analysisResult.innerHTML = data.analysis;
      
    } catch (error) {
      analysisResult.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>${error.message}</p>
        </div>
      `;
    } finally {
      // Reset button
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fas fa-play"></i> Analisis Kode';
      loader.style.display = 'none';
      
      // Scroll to result
      document.querySelector('.result-section').scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});