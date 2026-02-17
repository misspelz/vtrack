const textInput = document.getElementById('textInput');

// Event listener for real-time updates
textInput.addEventListener('input', updateStats);

// Initialize stats on page load
updateStats();

function updateStats() {
    const text = textInput.value;

    // Count words
    const wordCount = countWords(text);
    document.getElementById('wordCount').textContent = wordCount;

    // Count characters
    const charCount = text.length;
    document.getElementById('charCount').textContent = charCount;

    // Count sentences
    const sentenceCount = countSentences(text);
    document.getElementById('sentenceCount').textContent = sentenceCount;

    // Calculate average words per sentence
    const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
    document.getElementById('avgWordsPerSentence').textContent = avgWordsPerSentence;

    // Calculate reading time (average 200 words per minute)
    const readingTime = calculateTime(wordCount, 200);
    document.getElementById('readingTime').textContent = readingTime;

    // Calculate speaking time (average 150 words per minute)
    const speakingTime = calculateTime(wordCount, 150);
    document.getElementById('speakingTime').textContent = speakingTime;
}

function countWords(text) {
    // Trim and split by whitespace, filter out empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
}

function countSentences(text) {
    // Match sentences ending with . ! or ?
    // Also handle common abbreviations
    const sentenceRegex = /[.!?]+(?=\s|$)/g;
    const sentences = text.match(sentenceRegex);
    return sentences ? sentences.length : 0;
}

function calculateTime(words, wordsPerMinute) {
    if (words === 0) return '0 min';

    const minutes = Math.ceil(words / wordsPerMinute);
    const seconds = Math.round((words % wordsPerMinute) / wordsPerMinute * 60);

    if (minutes === 0) {
        return `${seconds}s`;
    } else if (minutes === 1) {
        return `1 min`;
    } else {
        return `${minutes} min`;
    }
}

function clearText() {
    if (textInput.value && confirm('Are you sure you want to clear all text?')) {
        textInput.value = '';
        updateStats();
        textInput.focus();
    }
}
