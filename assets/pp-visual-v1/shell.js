(() => {
 const btn=document.getElementById('navToggle'),nav=document.getElementById('siteNav');
 function close(){if(!btn||!nav)return;nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}
 if(btn&&nav){btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));});nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){close();btn.focus();}});}
 const tocBtn=document.getElementById('tocToggle'),toc=document.getElementById('tocWrap');
 if(tocBtn&&toc){tocBtn.addEventListener('click',()=>{const open=toc.classList.toggle('open');tocBtn.setAttribute('aria-expanded',String(open));});toc.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toc.classList.remove('open');tocBtn.setAttribute('aria-expanded','false');}));}
})();
