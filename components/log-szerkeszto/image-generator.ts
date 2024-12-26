import domtoimage from 'dom-to-image';

export const generateImageFromDomElement = (node?: Element | null) => {
    if(!node)
        return;

    domtoimage.toPng(node, { quality: 1, bgcolor: 'transparent' })
        .then(function (blob) {
            var link = document.createElement('a');
            link.download = 'log.png';
            link.href = blob;
            link.click();
        });
}