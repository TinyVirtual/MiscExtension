(async()=>{
    function processTextNode(node) {
        const text = node.nodeValue;

        if (!/[\u{E0000}-\u{E007F}]/u.test(text))
            return;

        const frag = document.createDocumentFragment();

        let last = 0;

        text.replace(/[\u{E0000}-\u{E007F}]+/gu, (match, offset) => {
            if (offset > last) {
                frag.appendChild(document.createTextNode(text.slice(last, offset)));
            }
            const span = document.createElement("span");
            span.className = "inv";

            span.textContent = [...match]
                .map(c => String.fromCodePoint(c.codePointAt(0) - 0xE0000))
                .join("")
                .replace(/\x1B\\u([a-fA-F0-9]{4})/gu,l=>String.fromCodePoint( '0x'+l.replace('\x1b\\u','') ));

            frag.appendChild(span);
            last = offset + match.length;
        });
        if (last < text.length) {
            frag.appendChild(document.createTextNode(text.slice(last)));
        }

        node.replaceWith(frag);
    }
    function processTree(root) {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        let node;
        const nodes = [];

        while (node = walker.nextNode()) {
            nodes.push(node);
        }

        for (const node of nodes) {
            processTextNode(node);
        }
    }


    const mo = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                processTextNode(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                processTree(node);
            }
        }
    }
});

    let style = document.createElement('style')
    style.textContent = 'span.inv {\n  opacity: 0.556;\n  font-size: small;\n}'
    let load = ()=>{
        processTree(document.body);
        mo.observe(document.body, {childList: true,subtree: true});
        document.head.appendChild(style)
    }
    await new Promise(async r=>{
        if(document.readyState == 'complete'){
            r()
        } else {
            while(document.readyState != 'complete'){
                await new Promise(p=>setTimeout(p,100))
            }
            r()
        }
    })
    load()
})()