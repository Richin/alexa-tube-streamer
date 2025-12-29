const { exec } = require('child_process');

/**
 * Searches for a video on YouTube and returns the audio stream URL.
 * @param {string} query The search query.
 * @returns {Promise<{url: string, title: string}>} The audio URL and video title.
 */
function getAudioStream(query) {
    return new Promise((resolve, reject) => {
        console.log(`Searching for: ${query}`);
        // Use 'yt-dlp' from PATH by default (works for Docker/Linux if installed)
        // For local Windows with the downloaded binary, we can keep the explicit check or just rely on PATH if the user adds it.
        // Let's use a simple heuristic: if just "yt-dlp" works, great. If not, and we are on windows, try the local file.

        let command = '';
        if (process.platform === 'win32') {
            const path = require('path');
            const localBinary = path.join(__dirname, 'yt-dlp.exe');
            // We use the local binary if on Windows
            command = `"${localBinary}"`;
        } else {
            // On Linux/Docker, we expect it in the PATH
            command = 'yt-dlp';
        }

        command += ` "ytsearch1:${query}" --dump-single-json --no-warnings --no-call-home -f "bestaudio/best" --skip-download`;

        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing yt-dlp: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                // yt-dlp writes some info to stderr sometimes, but we should be careful if it's an error
                console.warn(`yt-dlp stderr: ${stderr}`);
            }

            try {
                const output = JSON.parse(stdout);
                if (!output || !output.url) {
                    return reject(new Error('No audio URL found.'));
                }

                console.log(`Found video: ${output.title}`);
                resolve({
                    url: output.url,
                    title: output.title
                });
            } catch (parseError) {
                console.error('Error parsing yt-dlp output:', parseError);
                reject(parseError);
            }
        });
    });
}

module.exports = { getAudioStream };
