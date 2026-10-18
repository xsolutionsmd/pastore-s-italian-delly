const header=document.querySelector('.masthead');
if(typeof ResizeObserver==='function')new ResizeObserver(()=>document.documentElement.style.setProperty('--masthead-height',`${header.getBoundingClientRect().height}px`)).observe(header);
const trigger=document.querySelector('.nav-toggle');
const dialog=document.querySelector('#site-navigation');
const close=document.querySelector('.nav-close');
if(typeof dialog.showModal==='function'){
 trigger.hidden=false;document.querySelector('.no-script-nav').hidden=true;
 trigger.addEventListener('click',()=>{dialog.showModal();trigger.setAttribute('aria-expanded','true');document.documentElement.classList.add('navigation-open');close.focus();});
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const items=[...dialog.querySelectorAll('a[href],button')].filter(e=>e.getBoundingClientRect().width);
  const first=items[0],last=items.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('navigation-open');trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});});
 addEventListener('pageshow',()=>{if(dialog.open)dialog.close();});
}
const controls=document.querySelector('.menu-controls');
if(controls){
 const panels=[...document.querySelectorAll('.menu-panel')],tabs=[...document.querySelectorAll('[role="tab"]')],select=document.querySelector('#menu-category');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function activate(id,{updateHistory=false,focus=false}={}){
  const current=panels.findIndex(p=>p.id===id);if(current<0)return;
  for(const[i,panel]of panels.entries()){
   panel.hidden=i!==current;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tabs[i].id);panel.setAttribute('tabindex','0');tabs[i].setAttribute('aria-selected',String(i===current));tabs[i].tabIndex=i===current?0:-1;
  }
  select.value=id;if(updateHistory){history.pushState(null,'',`#${id}`);panels[current].scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});}if(focus)tabs[current].focus({preventScroll:true});
  const scroller=document.querySelector('.category-tabs');
  const reveal=()=>{if(scroller.offsetWidth&&tabs[current].getAttribute('aria-selected')==='true')scroller.scrollTo({left:tabs[current].offsetLeft-scroller.offsetLeft-48,behavior:reduced.matches||focus?'instant':'smooth'});};
  reveal();
  // A quick selection can precede font completion and change the strip's widths.
  document.fonts.ready.then(()=>requestAnimationFrame(reveal));
 }
 controls.hidden=false;
 // Fade the strip's edges only while more categories are scrolled out of view.
 const strip=document.querySelector('.category-tabs');
 const edges=()=>{strip.classList.toggle('more-start',strip.scrollLeft>2);strip.classList.toggle('more-end',strip.scrollLeft+strip.clientWidth<strip.scrollWidth-2);};
 strip.addEventListener('scroll',edges,{passive:true});
 if(typeof ResizeObserver==='function')new ResizeObserver(edges).observe(strip);
 document.fonts.ready.then(edges);
 if(typeof ResizeObserver==='function')new ResizeObserver(()=>document.documentElement.style.setProperty('--menu-controls-height',`${controls.getBoundingClientRect().height}px`)).observe(controls);
 for(const[i,tab]of tabs.entries()){
  tab.addEventListener('click',()=>activate(panels[i].id,{updateHistory:true}));
  tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(panels[next].id,{updateHistory:true,focus:true});}});
 }
 select.addEventListener('change',()=>activate(select.value,{updateHistory:true}));
 const fromLocation=()=>{const id=location.hash.slice(1);activate(panels.some(p=>p.id===id)?id:panels[0].id);};
 addEventListener('popstate',fromLocation);addEventListener('hashchange',fromLocation);fromLocation();
}
