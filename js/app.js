document.addEventListener('DOMContentLoaded', () => {
    // Nómina oficial de estudiantes
    const students = {
        "5thA": ["ARANEDA SEPÚLVEDA MATÍAS SANTIAGO", "AYALA OLIVARES MÁXIMO ALONSO", "CAMPUSANO PÉREZ ISIDORA MONTSERRAT", "CANESSA VEGA BERNARDO FRANCISCO", "CARRASCO RAMÍREZ JAVIERA PAZ", "CHAMORRO SAN MARTÍN SEBASTIÁN FRANCISCO", "CORREA LEAL SANTIAGO LEÓN", "CUKIC LUENGO BRUNO EDUARDO", "ESPINOZA OLIVARES LUCAS ALEJANDRO", "FERNÁNDEZ ESCOBAR MARTÍN FELIPE", "FERNÁNDEZ RODRIGUEZ FERNANDA NICOLE", "GARNIER VELÁSQUEZ MAXIMILIANO LORENZO", "GARZON MACUER AMANDA SOFÍA", "GONZÁLEZ ARRIAGADA SOFÍA ISIDORA", "IBARRA BARRAZA DOMINGA PAZ", "JARAMILLO CANALES JULIETA ANTONIA", "JIMÉNEZ MONSALVES FERNANDA PAZ", "MACUADA GONZÁLEZ TOMÁS ALONSO", "MEZA MISTO FRANCISCA IGNACIA", "MUÑOZ OLIVOS SOFÍA ANTONIA", "NECULQUEO MURA JAVIER MATIAS", "OSORIO MUÑOZ LUCIANO", "PARRA ALIAGA AGUSTÍN CLEMENTE LEÓN", "RIQUELME CONTRERAS JULIETA ISADORA", "SALINAS SAAVEDRA EMILIANO IGNACIO", "SÁNCHEZ MORAGA NICOLÁS ARTURO", "SEISDEDOS CARVAJAL ANGELA GUADALUPE", "SEREY VALDES RENATO CLEMENTE", "SEYMOUR REYES TRINIDAD EMILIA", "VALLEJOS NAVARRO JOSEFA AGUSTINA", "VELOSO MUÑOZ ISABELLA AMARAL", "VERGARA FUENZALIDA JOAQUÍN IGNACIO", "VERGARA MARÍN DAMIÁN ALONSO", "VINES ZÚÑIGA DAMIÁN ALBERTO", "ZURITA BUSTOS ANTONIA INÉS"],
        "5thB": ["ACUÑA ALARCÓN DOMINGO", "AGUILAR MENARES VALENTÍN IGNACIO", "ALLENDE GARAY ALFONSO ERNESTO", "ARA CAMPUSANO VALENTINA ANTONIA", "ARAYA ESCALONA JOSE MANUEL", "ÁVILA RAMÍREZ AMANDA", "BOBADILLA PONCE VICENTE IGNACIO", "CASTILLO CARVAJAL TRINIDAD PAZ", "CONTRERAS RAMOS AMANDA BELÉN", "DÍAZ CORTÉS NICOLÁS IGNACIO", "DURÁN FREZ FLORENCIA CATALINA", "FARÍAS VALENZUELA REBECCA ESPERANZA", "GARRIDO DONOSO AMANDA", "GÓMEZ BURGOS ROSARIO BELÉN", "GONZÁLEZ ESPINOZA ARANTZA MICAELA", "HOLZMANN CÁRCAMO ANTONIA IGNACIA", "LAZO DÍAZ RENATA ANDREA", "LÓPEZ OJEDA AGUSTÍN SANTIAGO", "MENESES MADARIAGA GASPAR BAUTISTA", "MORAGA MARTINEZ VICTORIA ESPERANZA", "MOSQUEIRA VALDIVIA CAMILO ANDRÉS", "ORMEÑO LACHR PEDRO JOAQUIN", "OSORNO ARRIAGADA AMANDA MARIANNE", "PARRA PIMENTEL CONSUELO EMILIA", "REYES MARCHANT EMILIANO BAUTISTA", "RIVERA SAAVEDRA DIEGO ANDRÉS", "ROMÁN PEÑA GUSTAVO EMILIO", "RUIZ GARCÍA SANTIAGO ALONSO", "RUZ REYES MATÍAS ALEJANDRO", "SARRIA ASTUDILLO EVA MAGDALENA", "TRUJILLO BURGOS SANTIAGO ALONSO", "URQUEJO CHACANO RAFAELA", "VALENZUELA GONZÁLEZ JOSÉ MIGUEL", "VÁSQUEZ TAPIA SOFÍA ANTONIA", "VILLANUEVA SIMON GASPAR ALBERTO", "ZAMORA TORRES FACUNDO AGUSTÍN"],
        "5thC": ["ABURTO FUENTEALBA IGNACIO ANDRÉS", "ÁGUILA MOSCOSO LÍA ISABELLA", "ALBORNOZ IBARRA LAURA ALEJANDRA", "ALEGRÍA RAMÍREZ JAVIERA IGNACIA", "APIOLAZA SCACCHI DIEGO ALEJANDRO", "BRANTE CATAFAU RAFAEL BAUTISTA", "BRUNAUD GALLARDO MARIA FERNANDA", "CADIU MELLA MAXIMILIANO IGNACIO", "CANTO MORAGA FELIPE", "CASTILLO MORALES VICENTE SALVADOR", "CASTRO CEPEDA RENATO", "CAVIERES PASMIÑO ROSARIO ISABEL", "CEPEDA PEDREROS CAMILO IGNACIO", "CONTRERAS CÁRDENAS JOSEFA IGNACIA", "CERDA OSSES RAFAEL ORLANDO", "CORTÉS JARA EMMA VALENTINA", "FECCI DUARTE GASPAR OLIVER", "FERNÁNDEZ SALINAS RAFAELA ANHAIS", "GARCÍA ANDRADE MAITE CELESTE", "GONZÁLEZ HERNÁNDEZ AGUSTINA PAZ", "GONZÁLEZ YÁÑEZ LUCIANO ALONSO", "HENRÍQUEZ LÓPEZ ANTONIO MIGUEL", "MORALES MORIS BERNARDO LEON", "MUÑOZ LEÓN MATILDE IGNACIA", "PAVEZ KNUST PEDRO ENRIQUE", "PIZARRO PAREDES ALONSO GABRIEL", "QUINTEROS MONDIGLIO LEONOR IGNACIA", "QUIROZ PÉREZ RAMIRO AGUSTÍN", "REYES BICHARA FRANCO FARID", "REYES CAÑAS JOAQUÍN ALEJANDRO", "RIQUELME ZÚÑIGA ISIDORA PAZ", "SALAZAR BELMAR AGUSTÍN ALONSO", "SANTOS ALVAREZ MIA SOPHIA", "TOBAR GONZÁLEZ FLORENCIA AYLIN", "VALENZUELA GONZÁLEZ GABRIEL IGNACIO", "VALLE FUENTES ELISA"]
    };

    // Palabras para validación
    const adjectivesList = ['exciting', 'healthy', 'fast', 'fun', 'popular', 'interesting'];
    const connectorsList = ['and', 'also', 'in addition', 'moreover'];

    // Referencias del DOM
    const courseSelect = document.getElementById('course');
    const studentSelect = document.getElementById('student');
    const sportCards = document.querySelectorAll('.sport-card');
    const wordButtons = document.querySelectorAll('.category .word');
    const wordBankContainer = document.getElementById('wordBank');
    const textarea = document.getElementById('writing');
    const preview = document.getElementById('preview');

    // Contadores
    const wordCounter = document.getElementById('wordCounter');
    const adjCounter = document.getElementById('adjCounter');
    const connectorCounter = document.getElementById('connectorCounter');

    // Botones
    const reviewButton = document.getElementById('reviewButton');
    // Mantenemos la referencia del botón (puedes mantener id="sendButton" o cambiarlo a "downloadButton" en tu HTML)
    const downloadButton = document.getElementById('downloadButton') || document.getElementById('sendButton');

    let selectedSport = '';

    // Sanitización HTML para vista previa
    const escapeHTML = (str) => str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));

    // Cargar alumnos dinámicamente
    courseSelect.addEventListener('change', () => {
        const selectedClass = courseSelect.value;
        studentSelect.innerHTML = '<option value="">Select your name</option>';

        if (selectedClass && students[selectedClass]) {
            students[selectedClass].forEach(studentName => {
                const option = document.createElement('option');
                option.value = studentName;
                option.textContent = studentName;
                studentSelect.appendChild(option);
            });
        }
        updatePreview();
    });

    studentSelect.addEventListener('change', updatePreview);

    // Selección de deporte
    sportCards.forEach(card => {
        card.addEventListener('click', () => {
            sportCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedSport = card.getAttribute('data-sport');
            updatePreview();
        });
    });

    // Añadir palabras al Word Bank (como referencia visual)
    wordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wordText = button.textContent.trim();
            const existingWords = Array.from(wordBankContainer.children).map(el => el.dataset.word);

            if (!existingWords.includes(wordText)) {
                const newWordBtn = document.createElement('button');
                newWordBtn.classList.add('word-chip');
                newWordBtn.dataset.word = wordText;
                newWordBtn.textContent = `${wordText} ✕`;
                newWordBtn.title = "Click to remove";

                newWordBtn.addEventListener('click', () => {
                    newWordBtn.remove();
                });

                wordBankContainer.appendChild(newWordBtn);
            }
        });
    });

    // Actualización de contadores
    function updateProgressAndPreview() {
        const text = textarea.value.trim();
        const words = text ? text.split(/\s+/) : [];
        const lowerText = text.toLowerCase();

        // Conteo de palabras
        const totalWords = words.length;
        wordCounter.textContent = `${totalWords} / 40`;
        wordCounter.style.color = totalWords >= 40 ? '#2e7d32' : '#000';

        // Conteo de adjetivos
        const usedAdjectives = adjectivesList.filter(adj =>
            new RegExp(`\\b${adj}\\b`, 'i').test(lowerText)
        );
        adjCounter.textContent = `${usedAdjectives.length} / 2`;
        adjCounter.style.color = usedAdjectives.length >= 2 ? '#2e7d32' : '#000';

        // Conteo de conectores
        const usedConnectors = connectorsList.filter(conn =>
            new RegExp(`\\b${conn}\\b`, 'i').test(lowerText)
        );
        connectorCounter.textContent = `${usedConnectors.length} / 2`;
        connectorCounter.style.color = usedConnectors.length >= 2 ? '#2e7d32' : '#000';

        updatePreview();
    }

    // Actualizar vista previa
    function updatePreview() {
        const text = textarea.value.trim();
        const studentName = studentSelect.value;
        const courseName = courseSelect.value;

        if (!text && !selectedSport && !studentName) {
            preview.textContent = 'Your writing will appear here...';
            return;
        }

        preview.innerHTML = '';

        if (studentName || courseName) {
            const infoP = document.createElement('p');
            infoP.innerHTML = `<strong>Student:</strong> ${escapeHTML(studentName || '___')}<br><strong>Class:</strong> ${escapeHTML(courseName || '___')}`;
            preview.appendChild(infoP);
        }

        if (selectedSport) {
            const sportP = document.createElement('p');
            sportP.innerHTML = `<strong>Sport:</strong> ${escapeHTML(selectedSport)}`;
            preview.appendChild(sportP);
        }

        if (text) {
            preview.appendChild(document.createElement('hr'));
            const textP = document.createElement('p');
            textP.style.whiteSpace = 'pre-wrap';
            textP.textContent = text;
            preview.appendChild(textP);
        }
    }

    textarea.addEventListener('input', updateProgressAndPreview);

    // Botón de revisión rápida
    reviewButton.addEventListener('click', () => {
        const student = studentSelect.value || 'Not selected';
        const course = courseSelect.value || 'Not selected';
        const wordsCount = textarea.value.trim().split(/\s+/).filter(Boolean).length;

        alert(`Check details:\n\n• Student: ${student}\n• Class: ${course}\n• Sport: ${selectedSport || 'None'}\n• Word Count: ${wordsCount}/40`);
    });

    // Botón de Descarga TXT para Google Classroom
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const course = courseSelect.value;
            const student = studentSelect.value;
            const text = textarea.value.trim();

            if (!course || !student) {
                alert('Please select your class and name before downloading.');
                return;
            }
            if (!text) {
                alert('Please write your paragraph before downloading!');
                return;
            }

            const wordsCount = text.split(/\s+/).filter(Boolean).length;

            // Formato ordenado para el archivo .txt
            const fileContent = `ENGLISH WRITING TASK
----------------------------------
Student: ${student}
Class: ${course}
Sport Chosen: ${selectedSport || 'Not specified'}
Word Count: ${wordsCount} words
----------------------------------

${text}
`;

            // Crear el nombre del archivo estilizado: Homework_5thA_NAME.txt
            const safeStudentName = student.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = `Homework_${course}_${safeStudentName}.txt`;

            // Generar y activar la descarga
            const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(link.href);

            alert('Your file has been downloaded! Now you can attach it in Google Classroom.');
        });
    }
});
