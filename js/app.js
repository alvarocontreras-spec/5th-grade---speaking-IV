document.addEventListener('DOMContentLoaded', () => {
    // Listas de palabras clave para validación
    const adjectivesList = ['exciting', 'healthy', 'fast', 'fun', 'popular', 'interesting'];
    const connectorsList = ['and', 'also', 'in addition', 'moreover'];

    // Elementos del DOM
    const sportCards = document.querySelectorAll('.sport-card');
    const wordButtons = document.querySelectorAll('.category .word');
    const wordBankContainer = document.getElementById('wordBank');
    const textarea = document.getElementById('writing');
    const preview = document.getElementById('preview');
    
    // Contadores de progreso
    const wordCounter = document.getElementById('wordCounter');
    const adjCounter = document.getElementById('adjCounter');
    const connectorCounter = document.getElementById('connectorCounter');
    
    // Botones de acción
    const reviewButton = document.getElementById('reviewButton');
    const sendButton = document.getElementById('sendButton');

    let selectedSport = '';

    // 1. Selección de deporte
    sportCards.forEach(card => {
        card.addEventListener('click', () => {
            sportCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedSport = card.getAttribute('data-sport');
            updatePreview();
        });
    });

    // 2. Mover palabras de categorías al Word Bank
    wordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wordText = button.textContent.trim();
            
            // Evitar duplicados en el Word Bank
            const existingWords = Array.from(wordBankContainer.children).map(el => el.textContent.trim());
            if (!existingWords.includes(wordText)) {
                const newWordBtn = document.createElement('button');
                newWordBtn.classList.add('word-chip');
                newWordBtn.textContent = wordText;

                // Al hacer clic en el Word Bank, la inserta en el área de texto
                newWordBtn.addEventListener('click', () => {
                    insertWordAtCursor(textarea, wordText);
                    updateProgressAndPreview();
                });

                wordBankContainer.appendChild(newWordBtn);
            }
        });
    });

    // 3. Función para insertar texto en la posición actual del cursor
    function insertWordAtCursor(input, text) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const currentText = input.value;
        
        input.value = currentText.substring(0, start) + ' ' + text + ' ' + currentText.substring(end);
        input.focus();
        input.selectionStart = input.selectionEnd = start + text.length + 2;
    }

    // 4. Actualizar contadores y vista previa
    function updateProgressAndPreview() {
        const text = textarea.value.trim();
        const words = text ? text.split(/\s+/) : [];
        const lowerText = text.toLowerCase();

        // Conteo de palabras
        const totalWords = words.length;
        wordCounter.textContent = `${totalWords} / 40`;
        wordCounter.style.color = totalWords >= 40 ? '#2e7d32' : '#000';

        // Conteo de adjetivos detectados
        const usedAdjectives = adjectivesList.filter(adj => 
            new RegExp(`\\b${adj}\\b`, 'i').test(lowerText)
        );
        adjCounter.textContent = `${usedAdjectives.length} / 2`;
        adjCounter.style.color = usedAdjectives.length >= 2 ? '#2e7d32' : '#000';

        // Conteo de conectores detectados
        const usedConnectors = connectorsList.filter(conn => 
            new RegExp(`\\b${conn}\\b`, 'i').test(lowerText)
        );
        connectorCounter.textContent = `${usedConnectors.length} / 2`;
        connectorCounter.style.color = usedConnectors.length >= 2 ? '#2e7d32' : '#000';

        // Vista previa en vivo
        updatePreview();
    }

    function updatePreview() {
        const text = textarea.value.trim();
        if (!text && !selectedSport) {
            preview.textContent = 'Your writing will appear here...';
            return;
        }

        let content = '';
        if (selectedSport) {
            content += `<strong>Sport:</strong> ${selectedSport}<br><br>`;
        }
        content += text ? text.replace(/\n/g, '<br>') : '<em>(Write your paragraph above...)</em>';
        preview.innerHTML = content;
    }

    // Listener para escribir en tiempo real
    textarea.addEventListener('input', updateProgressAndPreview);

    // 5. Botones de acción
    reviewButton.addEventListener('click', () => {
        alert(`Status Check:\n- Words: ${textarea.value.trim().split(/\s+/).filter(Boolean).length}/40\n- Sport selected: ${selectedSport || 'None'}`);
    });

    sendButton.addEventListener('click', () => {
        if (!textarea.value.trim()) {
            alert('Please write your paragraph before sending!');
            return;
        }
        alert('Your homework has been sent to your teacher!');
    });
});
