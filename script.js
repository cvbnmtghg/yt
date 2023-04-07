const qualitySelect = document.querySelector('#quality');
const urlInput = document.querySelector('#url');
const form = document.querySelector('form');

urlInput.addEventListener('input', () => {
    const url = urlInput.value;
    fetch(`/api/available-streams?url=${url}`)
        .then(response => response.json())
        .then(data => {
            qualitySelect.innerHTML = '';
            data.streams.forEach((stream, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = `${stream.resolution} (${stream.fps}fps)`;
                qualitySelect.add(option);
            });
        });
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const url = urlInput.value;
    const qualityIndex = qualitySelect.value;
    if (url && qualityIndex !== null) {
        fetch(`/api/download?url=${url}&qualityIndex=${qualityIndex}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${qualitySelect.options[qualityIndex].text} video.mp4`;
                a.click();
            });
    }
});
