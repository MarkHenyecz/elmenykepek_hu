import domtoimage from 'dom-to-image';


export const generateImageFromDomElement = (node) => {
    console.log(node);

    domtoimage.toPng(node, { quality: 1, bgcolor: 'transparent' })
        .then(function (blob) {
            var link = document.createElement('a');
            link.download = 'log.png';
            link.href = blob;
            link.click();
        });
}