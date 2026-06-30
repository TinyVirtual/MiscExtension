(async()=>{
    let mo = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            mutation.target.innerText = mutation.target.innerText.replace(/\u{E0000}-\u{E007F}/g,l=>'<span class="inv">'+String.fromCodePoint(l.codePointAt(0)-0xE0000)+"</span>")
        }
    });

    let style = document.createElement('style')
    style.innerHTML = 'span.inv {\n  opacity: 0.556;\n  font-size: small;\n}'
    document.head.appendChild(style)
    mo.observe(document.body) //this will cause a dogdamn lot of lag
})()