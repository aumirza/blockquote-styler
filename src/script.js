
// Wrap an element with another element
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}


function copyText(text) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}


window.addEventListener('load', function () {


    // convert to plain es6 javascript
    // const blockquotes = document.querySelectorAll('article blockquote');
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(blockquote => {
        const p = document.createElement('p');
        p.classList.add('copy-content');

        const children = Array.from(blockquote.childNodes);


        children.forEach(child => {

            if (child.nodeType === 3) {
                let text = child.textContent;
                text = text.replace(/(\r\n|\n|\r)/gm, " ");
                const textNode = document.createTextNode(text);
                p.appendChild(textNode);
            }

            if (child.childNodes.length >= 1) {
                if (child.childNodes[0].nodeType !== 1) {
                    p.appendChild(child);
                }
            }
        });

        blockquote.innerHTML = '';
        blockquote.appendChild(p);

    });



    const copyContent = document.querySelectorAll('.copy-content');
    copyContent.forEach(content => {
        const blockquotesWrapper = document.createElement('div');
        blockquotesWrapper.classList.add('blockquotes');
        wrap(content, blockquotesWrapper);
    });

    const blockquotesInner = document.querySelectorAll('blockquote .blockquotes');
    blockquotesInner.forEach(blockquote => {

        const shareWrapper = document.createElement('div');
        shareWrapper.classList.add('share-wrapper');

        const ats = document.createElement('span');
        ats.classList.add('bq-share-text');
        ats.innerText = 'Share:';

        const atShareW = document.createElement('span');
        atShareW.classList.add('bq-share-whatsapp', 'bq-share');
        const faWhatsapp = document.createElement('i');
        faWhatsapp.classList.add('fab', 'fa-whatsapp');
        atShareW.appendChild(faWhatsapp);

        const atShareF = document.createElement('span');
        atShareF.classList.add('bq-share-facebook', 'bq-share');
        const faFacebook = document.createElement('i');
        faFacebook.classList.add('fab', 'fa-facebook-f');
        atShareF.appendChild(faFacebook);

        const atShareTw = document.createElement('span');
        atShareTw.classList.add('bq-share-twitter', 'bq-share');
        const faTwitter = document.createElement('i');
        faTwitter.classList.add('fab', 'fa-twitter');
        atShareTw.appendChild(faTwitter);

        const atCopy = document.createElement('span');
        atCopy.classList.add('bq-copy', 'bq-share');
        const faCopy = document.createElement('i');
        faCopy.classList.add('fa', 'fa-copy');
        atCopy.appendChild(faCopy);

        shareWrapper.appendChild(ats);
        shareWrapper.appendChild(atShareW);
        shareWrapper.appendChild(atShareF);
        shareWrapper.appendChild(atShareTw);
        shareWrapper.appendChild(atCopy);
        blockquote.parentNode.appendChild(shareWrapper);
    });


    const atCopy = document.querySelectorAll('.bq-copy');
    atCopy.forEach(copy => {
        copy.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.parentNode.parentNode.querySelector('.copy-content').innerText;
            copyText(text);
            const faCheck = document.createElement('i');
            faCheck.classList.add('fa', 'fa-check');
            this.innerHTML = '';
            this.appendChild(faCheck);
            this.classList.add('copied');

            setTimeout(() => {
                this.classList.remove('copied');
                this.innerHTML = '';
                const faCopy = document.createElement('i');
                faCopy.classList.add('fa', 'fa-copy');
                this.appendChild(faCopy);
            }, 1000);

        });
    });

    const atShareW = document.querySelectorAll('.bq-share-whatsapp');
    atShareW.forEach(share => {
        share.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.parentNode.parentNode.querySelector('.copy-content').innerText;
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%0A${location.href}`;
            window.open(url, '_blank');
        });
    });


    const atShareF = document.querySelectorAll('.bq-share-facebook');
    atShareF.forEach(share => {
        share.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.parentNode.parentNode.querySelector('.copy-content').innerText;
            const url = `https://www.facebook.com/sharer/sharer.php?u=${location.href}&quote=${encodeURIComponent(text)}`;

            window.open(url, '_blank');
        });
    });

    const atShareTw = document.querySelectorAll('.bq-share-twitter');
    atShareTw.forEach(share => {
        share.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.parentNode.parentNode.querySelector('.copy-content').innerText;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${location.href}`;

            window.open(url, '_blank');
        });
    });

});