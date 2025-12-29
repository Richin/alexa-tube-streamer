const { getAudioStream } = require('./youtube_helper');

(async () => {
    try {
        console.log('Testing YouTube Audio Extraction...');
        const result = await getAudioStream('Despacito');
        console.log('Success!');
        console.log('Title:', result.title);
        console.log('URL:', result.url);
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
})();
