document.getElementById('calculate-btn').addEventListener('click', function() {
  const height = parseFloat(document.getElementById('height').value) || 0;
  const width = parseFloat(document.getElementById('width').value) || 0;
  const depth = parseFloat(document.getElementById('depth').value) || 0;
  
  const resultBox = document.getElementById('result-box');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  
  resultBox.classList.remove('hidden', 'result-ideal', 'result-minimum', 'result-small');
  
  if (height === 0 || width === 0 || depth === 0) {
    resultBox.classList.add('result-small');
    resultTitle.textContent = "Error";
    resultDesc.textContent = "Please enter all dimensions.";
    return;
  }
  
  // Logic based on standard golf simulator requirements
  // Ideal: H >= 10, W >= 15, D >= 20
  // Minimum: H >= 9, W >= 12, D >= 16
  // Too small: anything less
  
  if (height >= 10 && width >= 15 && depth >= 20) {
    resultBox.classList.add('result-ideal');
    resultTitle.textContent = "Ideal Space! 🏌️‍♂️";
    resultDesc.textContent = "Your room is perfect for a premium golf simulator setup with no swing restrictions.";
  } else if (height >= 9 && width >= 12 && depth >= 16) {
    resultBox.classList.add('result-minimum');
    resultTitle.textContent = "Good to Go 👍";
    resultDesc.textContent = "You meet the minimum requirements! Be careful with taller players and driver swings.";
  } else {
    resultBox.classList.add('result-small');
    resultTitle.textContent = "Too Small ⚠️";
    resultDesc.textContent = "This space is too tight for a full swing. Consider a practice net without a full simulator.";
  }
});
