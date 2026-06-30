


chrome.commands.onCommand.addListener(async (command) => {
  if (command == "run-code") {

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) return;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          let cmd = prompt("Instert Command")

          ////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////
          /*////////////////////////////////////////////////////////////////////////////////////////


          Giant block start


          //*/////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////

          let custom_commands = {
            pitch : {
              name: "Toggle Pitch Normalization",
              desc: "Make speed changes pitch too",
              com: function(){
                document.querySelectorAll("audio,video").forEach(v=>v.preservesPitch=!v.preservesPitch)
              }
            },
            sans: {
              name: "Sans",
              desc: "er er er\nim trans\nsans*",
              com: function(){
                window.a = document.createElement("style");  
                a.textContent = `
                    * {
                      font-family: "Comic Sans MS", cursive !important;    
                      }  `;
                document.head.appendChild(a);
              }
            },
            papyrus: {
              name: "Papyrus",
              desc: "NYEH HEH HEH!",
              com: function(){
                window.a = document.createElement("style");  
                a.textContent = `
                    * {
                      font-family: "Papyrus", cursive !important;    
                      }  `;
                document.head.appendChild(a);
              }
            },
            papyrus: {
              name: "Papyrus",
              desc: "NYEH HEH HEH!",
              com: function(){
                window.a = document.createElement("style");  
                a.textContent = `
                    * {
                      font-family: "Papyrus", cursive !important;    
                      }  `;
                document.head.appendChild(a);
              }
            },
            password: {
              name: "Show Password",
              desc: "For those websites that doesn't show",
              com: function(){
                if(typeof window.__pswdIsShown==='undefined'){
                  window.__pswdIsShown=false
                }
                window.__pswdIsShown=!window.__pswdIsShown;
                var n=document.getElementById('___notif_pswd');
                if(n){
                  n.remove()
                }
                var d=document.createElement('div');
                d.id='___notif_pswd';
                d.style='background:#1144aa;position:fixed;top:20px;left:50%;transform:translateX(-50%);width:80%;height:60px;text-align:center;border-radius:20px;color:white;line-height:60px;font-family:sans-serif;z-index:9999;cursor:pointer;transition:opacity 0.3s;';
                d.innerHTML='ℹ Passwords are now <b>'+ (window.__pswdIsShown?'Visible':'Hidden') +'</b>.';
                document.body.appendChild(d);
                d.onclick=()=>{
                  d.style.opacity='0';
                  setTimeout(()=>d.remove(),300)
                };
                setTimeout(()=>{
                  d.click()
                },3000);
                var a=document.querySelectorAll('input[type="password"],input[data-original-type="password"]');
                for(let i of a){ 
                  let bg=i.style.backgroundColor  ;
                  if(window.__pswdIsShown){
                    i.setAttribute('data-original-type',i.type);
                    i.type='text';
                  }
                  else if(i.getAttribute('data-original-type')){
                    i.type=i.getAttribute('data-original-type');
                  }
                  setTimeout(()=>{
                    if (bg != '#88ff88'){
                      i.style.backgroundColor=bg
                    }
                  },3000);
                }
              }
            },
            edit: {
              name: "Edit page",
              desc: "Allows you to manipulate text",
              com: ()=>{document.body.contentEditable = !document.body.contentEditable}
            },
            blur: {
              name: "Blur Screen",
              desc: "Blurs entire screen",
              com: ()=>{
                window.__isBlurred = !window.__isBlurred
                if(window.__blurStyle){
                  window.__blurStyle.textContent = ``
                } else {
                  if(!window.__blurStyle){
                    window.__blurStyle = document.createElement("style")
                    document.head.appendChild(window.__blurStyle)
                  }
                  window.__blurStyle.textContent = `
                  html, * {
                    filter: blur(3px) !important;
                  }
                  `
                }
              }
            } 
          }

          ////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////
          /*////////////////////////////////////////////////////////////////////////////////////////


          Giant block end


          //*////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////////


          custom_commands[cmd].com()


        }
      });
    } catch (err) {
      console.error("Failed to execute script:", err);
    }
  }
});

