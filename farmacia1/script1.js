document.getElementById('formAtendimento').addEventListener('submit', function(event) {
    event.preventDefault();
    const medicamento = document.getElementById('medicamento').value;
    fetch('/dispensar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicamento })
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          // Atualizar tabela de estoque aqui
      });
});
