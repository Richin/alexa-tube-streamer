console.log('Start');
try {
    const cp = require('child_process');
    console.log('child_process loaded');
    const path = require('path');
    console.log('path loaded');
    const helper = require('./youtube_helper');
    console.log('helper loaded');
    helper.getAudioStream('Despacito').then(res => {
        console.log('Result:', res);
    }).catch(err => {
        console.error('Caught error:', err);
    });
} catch (e) {
    console.error('Error:', e);
}
