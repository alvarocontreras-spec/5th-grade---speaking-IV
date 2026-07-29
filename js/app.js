<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harmonize 1 - Unit 3 Homework</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Harmonize 1 - Unit 3 Homework</h1>
        <p>Writing Activity: My Favorite Sport</p>
    </header>

    <main>
        <!-- Student Info -->
        <div class="card">
            <h2>Student Details</h2>
            <div class="form-group">
                <label for="course">Class:</label>
                <select id="course">
                    <option value="">Select your class</option>
                    <option value="5thA">5th Grade A</option>
                    <option value="5thB">5th Grade B</option>
                    <option value="5thC">5th Grade C</option>
                </select>
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label for="student">Student Name:</label>
                <select id="student">
                    <option value="">Select your name</option>
                </select>
            </div>
        </div>

        <!-- Step 1: Sport Selection -->
        <div class="card">
            <h2>① Select a Sport</h2>
            <div class="sports-grid">
                <div class="sport-card" data-sport="Football">
                    <h3>⚽ Football</h3>
                </div>
                <div class="sport-card" data-sport="Basketball">
                    <h3>🏀 Basketball</h3>
                </div>
                <div class="sport-card" data-sport="Swimming">
                    <h3>🏊 Swimming</h3>
                </div>
                <div class="sport-card" data-sport="Tennis">
                    <h3>🎾 Tennis</h3>
                </div>
                <div class="sport-card" data-sport="Volleyball">
                    <h3>🏐 Volleyball</h3>
                </div>
                <div class="sport-card" data-sport="Running">
                    <h3>🏃 Running</h3>
                </div>
            </div>
        </div>

        <!-- Step 2: Word Bank -->
        <div class="card">
            <h2>② Word Bank Helper</h2>
            <p style="margin-bottom: 15px; color: #666;">Click on words to build your reference list:</p>
            
            <div class="categories">
                <div class="category">
                    <h3>Adjectives</h3>
                    <button class="word">exciting</button>
                    <button class="word">healthy</button>
                    <button class="word">fast</button>
                    <button class="word">fun</button>
                    <button class="word">popular</button>
                    <button class="word">interesting</button>
                </div>

                <div class="category">
                    <h3>Connectors</h3>
                    <button class="word">and</button>
                    <button class="word">also</button>
                    <button class="word">in addition</button>
                    <button class="word">moreover</button>
                </div>
            </div>

            <h3 style="margin-top: 20px; margin-bottom: 10px;">Selected Helper Words:</h3>
            <div id="wordBank"></div>
        </div>

        <!-- A2 Example Card -->
        <div class="example-card">
            <div class="example-header">
                💡 <strong>Example (A2 Level)</strong>
            </div>
            <p class="example-meta"><strong>Sport:</strong> Basketball</p>
            <p class="example-text">
                "Basketball is my favorite sport because it is <span class="tag-adj">fun</span> <span class="tag-conn">and</span> <span class="tag-adj">popular</span>. I play with my friends at school every afternoon. <span class="tag-conn">Also</span>, it is very <span class="tag-adj">healthy</span> for my body. <span class="tag-conn">In addition</span>, I like to watch games on TV with my dad."
            </p>
            <div class="example-legend">
                <span><strong class="tag-adj">Green</strong> = Adjectives</span>
                <span><strong class="tag-conn">Yellow</strong> = Connectors</span>
            </div>
        </div>

        <!-- Step 3: Writing -->
        <div class="card">
            <h2>③ Write your paragraph</h2>

            <div class="progress-item">
                <span>Words count:</span>
                <strong id="wordCounter">0 / 40</strong>
            </div>
            <div class="progress-item">
                <span>Adjectives used:</span>
                <strong id="adjCounter">0 / 2</strong>
            </div>
            <div class="progress-item">
                <span>Connectors used:</span>
                <strong id="connectorCounter">0 / 2</strong>
            </div>

            <textarea id="writing" placeholder="Write your paragraph here using your selected words..."></textarea>
        </div>

        <!-- Step 4: Preview -->
        <div class="card">
            <h2>④ Live Preview</h2>
            <div id="preview">Your writing will appear here...</div>

            <div class="buttons">
                <button id="reviewButton">Check Details</button>
                <button id="downloadButton">Download TXT for Classroom</button>
            </div>
        </div>
    </main>

    <footer>
        <p>Harmonize 1 - English Department</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
