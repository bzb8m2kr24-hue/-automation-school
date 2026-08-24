(function(){
  const style=document.createElement('style');style.textContent=`
  .as-visual{margin:18px 0;padding:18px;border:1px solid #e3dfff;border-radius:16px;background:linear-gradient(180deg,#faf9ff,#fff);overflow:auto}.as-flow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}.as-box{padding:12px 14px;border:1px solid #d8d2ff;background:#f1efff;border-radius:12px;font-weight:800;color:#5748c7}.as-arrow{font-size:20px;color:#7a6cf1}.as-caption{text-align:center;color:#707080;font-size:13px;margin-top:10px}.as-open-answer{margin-top:20px;padding:18px;border:1px solid #e8e8f0;border-radius:16px;background:#fff}.as-open-answer textarea{width:100%;min-height:130px;border:1px solid #dcdce8;border-radius:12px;padding:12px;resize:vertical}.as-correct-btn{margin-top:10px;border:0;border-radius:12px;background:#6d5dfc;color:#fff;padding:11px 15px;font-weight:800;cursor:pointer}.as-feedback{margin-top:12px;padding:12px;border-radius:12px;display:none;line-height:1.5}.as-feedback.good{display:block;background:#eaf9f2;color:#147b50}.as-feedback.warn{display:block;background:#fff7e5;color:#8a6514}
  `;document.head.appendChild(style);
  const visuals={
   'Automatisation : le principe':['Événement','Données','Traitement','Action','Résultat'],
   'Workflow, trigger et node':['Trigger','Node 1','Node 2','Résultat'],
   'Une API, simplement':['Ton outil','Requête','API','Réponse'],
   'Webhook':['Événement','→','Webhook','→','Workflow'],
   'Agent IA : comprendre avant de construire':['Objectif','Agent IA','Outils / API','Résultat'],
   'Prospect → CRM':['Prospect','Qualification','CRM','Commercial'],
   'Qualification automatique':['Message client','IA','Catégorie','Action'],
   'RAG':['Question','Recherche documents','Contexte','LLM','Réponse']
  };
  function visual(items){const d=document.createElement('div');d.className='as-visual';d.innerHTML='<div class="as-flow">'+items.map(x=>x==='→'?'<span class="as-arrow">→</span>':'<span class="as-box">'+x+'</span>').join('')+'</div><div class="as-caption">Schéma visuel : comment les éléments s’enchaînent.</div>';return d}
  function addVisuals(){document.querySelectorAll('h1,h2,h3').forEach(h=>{const t=h.textContent.trim();if(visuals[t]&&!h.parentElement.querySelector('.as-visual'))h.parentElement.insertBefore(visual(visuals[t]),h.nextElementSibling)});}
  const rubrics={
    'Automatisation : le principe':['automatisation','tâche','automatique','processus'],
    'Workflow, trigger et node':['workflow','trigger','node'],
    'Une API, simplement':['api','logiciel','communiquer','données'],
    'Webhook':['webhook','événement','url','requête'],
    'Agent IA : comprendre avant de construire':['agent','outil','objectif'],
    'Qualification automatique':['qualification','ia','prospect','critère']
  };
  function addOpenAnswers(){document.querySelectorAll('h1').forEach(h=>{const title=h.textContent.trim(),keys=rubrics[title];if(!keys||h.parentElement.querySelector('.as-open-answer'))return;const box=document.createElement('div');box.className='as-open-answer';box.innerHTML='<h3>À toi de répondre</h3><p>Écris l’explication avec tes propres mots. Le bouton compare ta réponse aux notions essentielles de cette leçon.</p><textarea placeholder="Écris ta réponse ici..."></textarea><button class="as-correct-btn">Corriger ma réponse</button><div class="as-feedback"></div>';const ta=box.querySelector('textarea'),fb=box.querySelector('.as-feedback');box.querySelector('button').onclick=()=>{const s=ta.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,' '),found=keys.filter(k=>s.includes(k)),ratio=found.length/keys.length;if(!ta.value.trim()){fb.className='as-feedback warn';fb.textContent='Écris d’abord ta réponse pour que je puisse la comparer aux notions attendues.';return}if(ratio>=.75){fb.className='as-feedback good';fb.textContent='Très bien : tu as mentionné '+found.length+' notions essentielles sur '+keys.length+'. Relis tout de même la leçon et vérifie que tu sais l’expliquer sans jargon.'}else{fb.className='as-feedback warn';fb.textContent='Il manque encore plusieurs notions importantes. Essaie d’expliquer le principe, puis utilise les mots-clés de la leçon comme aide. Ce correcteur est indicatif : il vérifie des notions-clés, pas la qualité complète du raisonnement.'}};h.parentElement.appendChild(box);});}
  function run(){setTimeout(()=>{addVisuals();addOpenAnswers()},150)}
  new MutationObserver(run).observe(document.body,{childList:true,subtree:true});run();
})();