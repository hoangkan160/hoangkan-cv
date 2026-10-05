(() => {
  const data=window.HK_ARCHIVE||[];
  const grid=document.getElementById('archive-grid');
  if(!grid)return;
  const count=document.getElementById('archive-count');
  if(count)count.textContent=data.length;
  data.forEach(item=>{
    const fig=document.createElement('figure');
    fig.className='archive-item';
    fig.style.setProperty('--ratio',(item.width/item.height).toFixed(4));
    const img=document.createElement('img');
    img.src='archive/'+item.asset;
    img.alt='Hoangkan visual archive image '+String(item.id).padStart(3,'0');
    img.width=item.width; img.height=item.height;
    img.loading='lazy'; img.decoding='async';
    const cap=document.createElement('figcaption');
    cap.innerHTML='<span>ARCHIVE / '+String(item.id).padStart(3,'0')+'</span><span>'+item.width+' × '+item.height+'</span>';
    fig.append(img,cap); fig.addEventListener('click',()=>openViewer(item.id)); grid.appendChild(fig);
  });
  const viewer=document.createElement('div');
  viewer.className='archive-viewer'; viewer.setAttribute('role','dialog'); viewer.setAttribute('aria-modal','true');
  viewer.innerHTML='<button class="archive-viewer-close" aria-label="Close">×</button><button class="archive-viewer-prev" aria-label="Previous">←</button><img alt=""><button class="archive-viewer-next" aria-label="Next">→</button><div class="archive-viewer-meta"></div>';
  document.body.appendChild(viewer);
  const vImg=viewer.querySelector('img'),meta=viewer.querySelector('.archive-viewer-meta'); let current=0;
  function render(){const x=data[current];vImg.src='archive/'+x.asset;vImg.alt='Hoangkan visual archive image '+String(x.id).padStart(3,'0');meta.innerHTML='<strong>ARCHIVE / '+String(x.id).padStart(3,'0')+'</strong> · '+x.width+' × '+x.height+' · SOURCE IMAGE';}
  function openViewer(id){current=Math.max(0,data.findIndex(x=>x.id===id));render();viewer.classList.add('is-open');document.body.style.overflow='hidden';}
  function close(){viewer.classList.remove('is-open');document.body.style.overflow='';}
  function move(n){current=(current+n+data.length)%data.length;render();}
  viewer.querySelector('.archive-viewer-close').onclick=close;
  viewer.querySelector('.archive-viewer-prev').onclick=()=>move(-1);
  viewer.querySelector('.archive-viewer-next').onclick=()=>move(1);
  viewer.onclick=e=>{if(e.target===viewer)close();};
  window.addEventListener('keydown',e=>{if(!viewer.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);});
  document.getElementById('archive-expand')?.addEventListener('click',()=>openViewer(data[0]?.id||1));
})();