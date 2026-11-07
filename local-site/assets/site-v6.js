/* V6: progressive enhancement only; all primary links work without JavaScript. */
(()=>{'use strict';
 const nav=document.querySelector('.site-nav');
 if(nav){const update=()=>nav.classList.toggle('v6-scrolled',window.scrollY>30);update();window.addEventListener('scroll',update,{passive:true});}
 // Add a visually informative marker when the demo image has loaded.
 for(const img of document.querySelectorAll('.v6-demo-screen img')){
  img.addEventListener('error',()=>{const host=img.closest('.v6-real-demo');if(host){host.classList.add('v6-demo-missing');const p=host.querySelector('.v6-demo-meta p');if(p)p.textContent='Pratinjau tidak tersedia di browser ini. Dashboard tetap dapat dibuka melalui tombol demo operasional.';}});
 }
})();
