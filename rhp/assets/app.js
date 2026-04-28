function toggleProtoNav(){
  const nav = document.getElementById('ll-proto-nav');
  const btn = document.getElementById('ll-proto-nav-reopen');
  const collapsed = nav.classList.toggle('collapsed');
  if(btn) btn.classList.toggle('show', collapsed);
  try{ localStorage.setItem('ll-proto-nav-collapsed', collapsed?'1':'0'); }catch(e){}
}
function toggleMobileMenu(){
  const m = document.getElementById('ll-mobile-menu');
  if(m) m.classList.toggle('open');
}
(function(){
  try{
    if(localStorage.getItem('ll-proto-nav-collapsed')==='1'){
      const nav = document.getElementById('ll-proto-nav');
      const btn = document.getElementById('ll-proto-nav-reopen');
      if(nav) nav.classList.add('collapsed');
      if(btn) btn.classList.add('show');
    }
  }catch(e){}
})();

/* ---- block separator ---- */

function goTo(id){if(!id)return;var t=document.getElementById(id);if(t&&t.classList.contains('screen')){document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});t.classList.add('active');window.scrollTo(0,0);return;}window.location.href=id+'.html';}
function viewQuoteReadOnly(formRootId, state){try{sessionStorage.setItem('quoteState_'+formRootId,state||'accepted');}catch(e){}window.location.href=formRootId+'.html';}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('visible');
  setTimeout(()=>t.classList.remove('visible'),2800);
}
function openModal(id){document.getElementById(id).classList.add('open');document.body.style.overflow='hidden';}
function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow='';}
// Registration
let selectedRole='homeowner';
function selectRole(r){
  selectedRole=r;
  document.getElementById('role-homeowner').classList.toggle('selected',r==='homeowner');
  document.getElementById('role-contractor').classList.toggle('selected',r==='contractor');
  document.getElementById('role-homeowner').setAttribute('aria-checked',r==='homeowner');
  document.getElementById('role-contractor').setAttribute('aria-checked',r==='contractor');
}
function togglePassword(id){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password';}
function submitRegistration(){
  const email=document.getElementById('reg-email').value||'sarah.chen@example.com';
  const terms=document.getElementById('reg-terms').checked;
  if(!terms){showToast('Please agree to the Terms of Service');return;}
  document.getElementById('sent-email').textContent=email;
  document.getElementById('reg-form').style.display='none';
  document.getElementById('reg-email-sent').style.display='block';
  console.log('[AUDIT] USER_REGISTRATION | '+new Date().toISOString()+' | userID:sarah_chen | role:homeowner');
}
function completeOnboarding(){
  console.log('[AUDIT] ONBOARDING_COMPLETE | '+new Date().toISOString()+' | userID:sarah_chen');
  goTo('s11');
}
function saveJobDraft(){
  console.log('[AUDIT] JOB_STATE_CHANGE | '+new Date().toISOString()+' | userID:sarah_chen | transition:→Draft');
  showToast('Job saved as Draft (#JB-NEW)');
  setTimeout(()=>goTo('s12'),1200);
}
function publishJob(){
  console.log('[AUDIT] JOB_STATE_CHANGE | '+new Date().toISOString()+' | userID:sarah_chen | transition:Draft→Open');
  showToast('Job published — contractors can now see it');
  setTimeout(()=>goTo('s12'),1200);
}
function confirmContractorSelection(){
  closeModal('modal-select');
  console.log('[AUDIT] CONTRACTOR_SELECTION | '+new Date().toISOString()+' | homeownerID:sarah_chen | contractorID:pacific_build_co | jobID:JB-0042');
  console.log('[AUDIT] JOB_STATE_CHANGE | '+new Date().toISOString()+' | Open→Contractor Selected');
  showToast('Contractor selected. Pacific Build Co notified.');
  setTimeout(()=>goTo('s15'),1200);
}
function confirmAcceptQuote(){
  closeModal('modal-accept-quote');
  console.log('[AUDIT] QUOTE_STATE_CHANGE | '+new Date().toISOString()+' | quoteID:QT-2026-0094 | Submitted→Accepted | userID:sarah_chen');
  document.getElementById('quote-action-section').style.display='none';
  document.getElementById('quote-accepted-msg').style.display='block';
  showToast('Quote accepted. Pacific Build Co notified.');
}
function confirmDeclineQuote(){
  closeModal('modal-decline-quote');
  console.log('[AUDIT] QUOTE_STATE_CHANGE | '+new Date().toISOString()+' | quoteID:QT-2026-0094 | Submitted→Declined | userID:sarah_chen');
  document.getElementById('quote-action-section').style.display='none';
  document.getElementById('quote-declined-msg').style.display='block';
  showToast('Quote declined. Record retained.');
}
function confirmAcknowledge(){
  closeModal('modal-ack');
  console.log('[AUDIT] MILESTONE_ACKNOWLEDGED | '+new Date().toISOString()+' | milestoneID:M2 | userID:sarah_chen | non-binding | non-blocking');
  const badge=document.getElementById('m2-badge');
  if(badge){badge.textContent='Acknowledged';badge.className='badge badge-success';}
  const btn=document.getElementById('m2-ack-btn');
  if(btn)btn.style.display='none';
  const row=document.getElementById('m2-row');
  if(row)row.style.borderColor='';
  showToast('Milestone acknowledged. Contractor notified.');
}
function confirmMarkPaid(){
  closeModal('modal-mark-paid');
  console.log('[AUDIT] MILESTONE_MARKED_PAID | '+new Date().toISOString()+' | milestoneID:M3 | amount:10500 | userID:sarah_chen | record-only');
  // Update dashboard stat cards
  const dPaid=document.getElementById('dash-paid');
  if(dPaid)dPaid.textContent='$32,100';
  const dOut=document.getElementById('dash-outstanding');
  if(dOut)dOut.textContent='$2,700';
  const dPct=document.getElementById('dash-pct');
  if(dPct)dPct.textContent='92% recorded as paid';
  const dProg=document.getElementById('dash-prog');
  if(dProg)dProg.style.width='92%';
  // Update dashboard project card
  const dpPaid=document.getElementById('dash-proj-paid');
  if(dpPaid)dpPaid.textContent='$32,100';
  const dpOut=document.getElementById('dash-proj-out');
  if(dpOut)dpOut.textContent='$2,700';
  const dm3pill=document.getElementById('dash-m3-pill');
  if(dm3pill){dm3pill.textContent='Marked Paid';dm3pill.className='pill-paid';}
  const dm3btn=document.getElementById('dash-m3-btn');
  if(dm3btn)dm3btn.remove();
  // Update S17 milestone list
  const m3pill=document.getElementById('m3-pay-pill');
  if(m3pill){m3pill.textContent='Marked Paid';m3pill.className='pill-paid';}
  const m3btn=document.getElementById('m3-pay-btn');
  if(m3btn)m3btn.remove();
  // Update S19 allocation table
  const allocPaid=document.getElementById('alloc-paid');
  if(allocPaid)allocPaid.textContent='$32,100';
  const allocOut=document.getElementById('alloc-out');
  if(allocOut)allocOut.textContent='$2,700';
  const allocPaidRow=document.getElementById('alloc-paid-row');
  if(allocPaidRow)allocPaidRow.textContent='$32,100';
  const allocOutRow=document.getElementById('alloc-out-row');
  if(allocOutRow)allocOutRow.textContent='$2,700';
  const allocM3pay=document.getElementById('alloc-m3-pay');
  if(allocM3pay){allocM3pay.textContent='Marked Paid';allocM3pay.className='pill-paid';}
  showToast('Payment recorded for M3 — Joinery & Cabinetry');
}
function acknowledgeVariation(){
  console.log('[AUDIT] VARIATION_ACKNOWLEDGED | '+new Date().toISOString()+' | variationID:VAR-001 | userID:sarah_chen');
  const row=document.getElementById('var-1');
  row.classList.add('locked');
  const badge=document.getElementById('var-1-badge');
  badge.textContent='🔒 Locked';badge.className='badge badge-success';
  const btn=document.getElementById('var-1-ack-btn');
  if(btn)btn.remove();
  const note=document.createElement('p');
  note.className='muted small';
  note.textContent='Acknowledged by both parties on '+new Date().toLocaleDateString('en-AU')+'. Permanently locked.';
  row.appendChild(note);
  showToast('Variation acknowledged and locked.');
}
function postComment(){
  const text=document.getElementById('new-comment').value.trim();
  if(!text){showToast('Please enter a comment');return;}
  console.log('[AUDIT] COMMENT_POSTED | '+new Date().toISOString()+' | userID:sarah_chen | jobID:JB-0038');
  const now=new Date();
  const ts=now.toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})+' · '+now.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'});
  const thread=document.getElementById('comment-thread');
  const d=document.createElement('div');
  d.className='comment-item';
  d.innerHTML=`<div class="comment-avatar" style="background:#5c6bc0">SC</div><div class="comment-bubble alt"><div class="comment-header"><span class="comment-author">Sarah Chen</span><span class="badge badge-accent small">Homeowner</span><span class="comment-time">${ts}</span></div><p class="comment-text">${text.replace(/</g,'&lt;')}</p><div class="immutable-note">🔒 Immutable — cannot be edited or deleted</div></div>`;
  thread.appendChild(d);
  document.getElementById('new-comment').value='';
  showToast('Comment posted');
  d.scrollIntoView({behavior:'smooth',block:'end'});
}
function filterJobs(el){
  document.querySelectorAll('.filter-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false');});
  el.classList.add('active');el.setAttribute('aria-selected','true');
}
function filterEvidence(btn, type){
  btn.closest('#ev-filter-tabs').querySelectorAll('.ev-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ev-card').forEach(c=>{
    c.style.display=(type==='all'||c.dataset.type===type)?'':'none';
  });
}
function setActivePill(el){
  el.closest('.evidence-filters').querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
}
// Keyboard for role cards
document.querySelectorAll('.role-card').forEach(c=>{
  c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();c.click();}});
});

function toggleProfileEdit(){
  const view=document.getElementById('profile-view');
  const edit=document.getElementById('profile-edit');
  if(view.style.display==='none'){view.style.display='';edit.style.display='none';}
  else{view.style.display='none';edit.style.display='';}
}
function saveProfileEdit(){
  toggleProfileEdit();
  showToast('Profile updated successfully');
  console.log('[AUDIT] PROFILE_UPDATED | '+new Date().toISOString()+' | userID:sarah_chen');
}
function toggle2FA(){
  const status=document.getElementById('tfa-status');
  if(status){
    status.innerHTML='<span class="badge badge-success">Enabled</span>';
    showToast('Two-factor authentication enabled');
  }
}

// ── NOTIFICATION PANEL ────────────────────────────────────────────────────
let unreadCount = 3;
function openNotifPanel(){
  document.getElementById('notif-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeNotifPanelBtn(){
  document.getElementById('notif-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function closeNotifPanel(e){
  if(e.target===document.getElementById('notif-overlay')) closeNotifPanelBtn();
}
function updateBadges(){
  document.querySelectorAll('.notif-badge').forEach(b=>{
    if(b.closest('.notif-drawer'))return;
    if(unreadCount>0){b.textContent=unreadCount;b.style.display='';}
    else{b.style.display='none';}
  });
  const panelBadge=document.getElementById('notif-panel-badge');
  if(panelBadge){
    if(unreadCount>0){panelBadge.textContent=unreadCount;panelBadge.style.display='';}
    else{panelBadge.style.display='none';}
  }
}
function readNotif(el, dest){
  if(el.classList.contains('unread')){
    el.classList.remove('unread');
    const dot=el.querySelector('.notif-unread-dot');
    if(dot){dot.className='notif-read-dot';}
    unreadCount=Math.max(0,unreadCount-1);
    updateBadges();
  }
  closeNotifPanelBtn();
  if(dest) goTo(dest);
}
function markAllRead(){
  document.querySelectorAll('.notif-item.unread').forEach(el=>{
    el.classList.remove('unread');
    const dot=el.querySelector('.notif-unread-dot');
    if(dot){dot.className='notif-read-dot';}
  });
  unreadCount=0;
  updateBadges();
  showToast('All notifications marked as read');
}
function filterNotifs(btn, cat){
  document.querySelectorAll('.notif-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.notif-item').forEach(item=>{
    const itemCat=item.dataset.cat;
    if(cat==='all') item.style.display='';
    else if(cat==='unread') item.style.display=item.classList.contains('unread')?'':'none';
    else item.style.display=(itemCat===cat)?'':'none';
  });
}

// ── CO STATE ──────────────────────────────────────────────────────────────
const coState = {
  paid: 7700, outstanding: 21300, total: 29000,
  m3Complete: false, m3Paid: false
};
function coSubscribeSuccess(){
  document.getElementById('sub-success-msg').style.display='block';
  showToast('Subscription activated — you can continue!');
  console.log('[AUDIT] SUBSCRIPTION_ACTIVATED | '+new Date().toISOString()+' | userID:mark_chen | plan:contractor_50');
}
function expressInterest(btn){
  btn.textContent='✓ Interest Expressed';
  btn.classList.remove('btn-accent');
  btn.classList.add('btn-outline');
  btn.disabled=true;
  showToast('Interest expressed. Waiting for homeowner selection.');
  console.log('[AUDIT] INTEREST_EXPRESSED | '+new Date().toISOString()+' | userID:mark_chen | jobID:JB-NEW');
}
function saveDraftQuote(){
  showToast('Quote saved as Draft');
  console.log('[AUDIT] QUOTE_SAVED_DRAFT | '+new Date().toISOString()+' | userID:mark_chen');
}
function confirmSubmitQuote(){
  closeModal('modal-co-submit-quote');
  document.getElementById('quote-state-badge').textContent='Submitted';
  document.getElementById('quote-state-badge').className='badge badge-warning';
  showToast('Quote submitted — Sarah Chen has been notified.');
  console.log('[AUDIT] QUOTE_SUBMITTED | '+new Date().toISOString()+' | userID:mark_chen | quoteID:QT-2026-0101');
}
function addMilestone(){
  const list = document.getElementById('milestone-list-builder');
  const idx = list.querySelectorAll('.ms-row').length + 1;
  const div = document.createElement('div');
  div.className = 'ms-row';
  div.id = 'ms-b-'+idx;
  div.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><span style="font-size:13px;font-weight:600;color:var(--color-muted)">MILESTONE ${idx}</span><button class="btn btn-sm" style="color:var(--color-error);border-color:var(--color-error);min-height:36px" onclick="removeMilestone('ms-b-${idx}')">× Remove</button></div><div class="form-row form-row-2"><div class="input-group"><label>Milestone Name *</label><input type="text" placeholder="e.g. Tiling" oninput="recalcTotal()"></div><div class="input-group"><label>Value ($AUD) *</label><input type="number" placeholder="0.00" oninput="recalcTotal()" class="ms-val"></div></div><div class="input-group mt-8"><label>Description</label><textarea placeholder="Scope..." style="min-height:60px"></textarea></div><div style="display:flex;gap:16px;margin-top:10px;flex-wrap:wrap"><label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;min-height:36px"><input type="checkbox"> Retention applied</label><label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;min-height:36px"><input type="checkbox" checked> Evidence required</label></div>`;
  list.appendChild(div);
}
function removeMilestone(id){
  const el=document.getElementById(id);
  if(el)el.remove();
  recalcTotal();
}
function recalcTotal(){
  let t=0;
  document.querySelectorAll('.ms-val').forEach(i=>{t+=parseFloat(i.value)||0;});
  const el=document.getElementById('q-total');
  if(el)el.textContent='$'+t.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function coMarkPaid(){
  closeModal('modal-co-mark-paid');
  coState.paid += 12800;
  coState.outstanding -= 12800;
  const pct = Math.round((coState.paid/coState.total)*100);
  // Update CS12 dashboard
  const coTotalPaid=document.getElementById('co-total-paid');
  if(coTotalPaid)coTotalPaid.textContent='$'+coState.paid.toLocaleString();
  const coTotalOut=document.getElementById('co-total-out');
  if(coTotalOut)coTotalOut.textContent='$'+coState.outstanding.toLocaleString();
  const coProjPaid=document.getElementById('co-proj1-paid');
  if(coProjPaid)coProjPaid.textContent='$'+coState.paid.toLocaleString();
  const coProjOut=document.getElementById('co-proj1-out');
  if(coProjOut)coProjOut.textContent='$'+coState.outstanding.toLocaleString();
  const coBar=document.getElementById('co-proj1-bar');
  if(coBar)coBar.style.width=pct+'%';
  const dashBar=document.getElementById('dash-proj-bar');
  if(dashBar)dashBar.style.width=pct+'%';
  const dashChip=document.getElementById('dash-pay-chip');
  if(dashChip)dashChip.textContent='$'+coState.paid.toLocaleString()+' paid / $'+coState.outstanding.toLocaleString()+' outstanding';
  // Update CS12 M3 row
  const dm3p=document.getElementById('dash-m3-pill2');
  if(dm3p){dm3p.textContent='Marked Paid';dm3p.className='pill-paid';}
  const dm3b=document.getElementById('dash-m3-btn2');
  if(dm3b)dm3b.remove();
  // Update CS16
  const s16paid=document.getElementById('cs16-paid');
  if(s16paid)s16paid.textContent='$'+coState.paid.toLocaleString();
  const s16out=document.getElementById('cs16-out');
  if(s16out)s16out.textContent='$'+coState.outstanding.toLocaleString();
  const s16bar=document.getElementById('cs16-bar');
  if(s16bar)s16bar.style.width=pct+'%';
  const m3pay=document.getElementById('cs16-m3-pay');
  if(m3pay){m3pay.textContent='Marked Paid $12,800';m3pay.className='pay-chip-paid';}
  const m3paybtn=document.getElementById('cs16-m3-pay-btn');
  if(m3paybtn)m3paybtn.remove();
  // Update CS17
  const ms17pv=document.getElementById('ms17-pay-val');
  if(ms17pv){ms17pv.textContent='Marked Paid';ms17pv.className='fin-primary-val paid';}
  const ms17ps=document.getElementById('ms17-pay-sub');
  if(ms17ps)ms17ps.textContent='$12,800 recorded as paid · 28 Apr 2026 · by Owner';
  const ms17pb=document.getElementById('ms17-pay-btn');
  if(ms17pb)ms17pb.remove();
  // Update allocation CS21
  const acPaid=document.getElementById('alloc-co-paid');
  if(acPaid)acPaid.textContent='$'+coState.paid.toLocaleString();
  const acOut=document.getElementById('alloc-co-out');
  if(acOut)acOut.textContent='$'+coState.outstanding.toLocaleString();
  const acBar=document.getElementById('alloc-co-bar');
  if(acBar)acBar.style.width=pct+'%';
  const acM3=document.getElementById('alloc-m3-chip');
  if(acM3){acM3.textContent='Marked Paid · 28 Apr';acM3.className='pay-chip-paid';}
  const acPRow=document.getElementById('alloc-paid-co-row');
  if(acPRow)acPRow.textContent='$'+coState.paid.toLocaleString();
  const acORow=document.getElementById('alloc-out-co-row');
  if(acORow)acORow.textContent='$'+coState.outstanding.toLocaleString();
  showToast('Payment recorded for M3 — Cabinetry');
  console.log('[AUDIT] MILESTONE_MARKED_PAID | '+new Date().toISOString()+' | milestoneID:M3 | amount:12800 | userID:mark_chen | record-only');
}
function confirmCoMarkComplete(){
  closeModal('modal-co-mark-complete');
  const badge=document.getElementById('cs16-m3-status');
  if(badge){badge.textContent='Marked Complete';badge.className='badge badge-success';}
  const btn=document.getElementById('cs16-m3-complete-btn');
  if(btn)btn.remove();
  showToast('M3 Cabinetry marked as complete. Sarah Chen notified.');
  console.log('[AUDIT] MILESTONE_MARKED_COMPLETE | '+new Date().toISOString()+' | milestoneID:M3 | userID:mark_chen');
}
function coPostComment(){
  const text=document.getElementById('co-new-comment').value.trim();
  if(!text){showToast('Please enter a comment');return;}
  const now=new Date();
  const ts=now.toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})+' · '+now.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'});
  const thread=document.getElementById('co-comment-thread');
  const d=document.createElement('div');
  d.className='comment-item';
  d.innerHTML=`<div class="comment-avatar" style="background:var(--color-accent)">MC</div><div class="comment-bubble"><div class="comment-header"><span class="comment-author">Mark Chen</span><span class="badge badge-muted small">Contractor Owner</span><span class="comment-time">${ts}</span></div><p class="comment-text">${text.replace(/</g,'&lt;')}</p><div class="immutable-note">🔒 Immutable — cannot be edited or deleted</div></div>`;
  thread.appendChild(d);
  document.getElementById('co-new-comment').value='';
  showToast('Comment posted');
  d.scrollIntoView({behavior:'smooth',block:'end'});
  console.log('[AUDIT] COMMENT_POSTED | '+new Date().toISOString()+' | userID:mark_chen | jobID:JB-0042');
}
function coTab(btn,panelId){
  const tabGroup=btn.closest('.co-tabs');
  if(!tabGroup)return;
  tabGroup.querySelectorAll('.co-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const contentArea=tabGroup.nextElementSibling;
  if(!contentArea)return;
  let el=contentArea;
  while(el){
    if(el.classList && el.classList.contains('co-tab-panel')){el.classList.remove('active');}
    el=el.nextElementSibling;
  }
  const target=document.getElementById(panelId);
  if(target)target.classList.add('active');
}
function toggleCoVariationForm(){
  const f=document.getElementById('co-variation-form');
  if(f)f.style.display=f.style.display==='none'?'block':'none';
}
function submitCoVariation(){
  const desc=document.getElementById('var-desc');
  if(!desc||!desc.value.trim()){showToast('Please describe the variation');return;}
  document.getElementById('co-variation-form').style.display='none';
  showToast('Variation recorded. Sarah Chen notified for acknowledgement.');
  desc.value='';
  console.log('[AUDIT] VARIATION_RECORDED | '+new Date().toISOString()+' | userID:mark_chen | jobID:JB-0042');
}
// Evidence upload flow
let evSelectedType='';
let evFileSelected=false;
function selectEvType(btn, type){
  document.querySelectorAll('#ev-type-grid button').forEach(b=>{b.style.borderColor='var(--color-border)';b.style.background='';});
  btn.style.borderColor='var(--color-accent)';btn.style.background='#fff5ef';
  evSelectedType=type;
  const certTypes=['Compliance Certificate','Insurance Document','Warranty Document'];
  document.getElementById('ev-next-1').disabled=false;
  document.getElementById('ev-cert-fields').style.display=certTypes.includes(type)?'block':'none';
  const confirm=document.getElementById('ev-type-confirm');
  if(confirm)confirm.textContent=type;
}
function evGoStep(n){
  for(let i=1;i<=4;i++){
    const p=document.getElementById('ev-panel-'+i);
    if(p)p.style.display=i===n?'block':'none';
    const s=document.getElementById('ev-s'+i);
    if(s){
      s.classList.remove('active','done');
      if(i<n)s.classList.add('done');
      else if(i===n)s.classList.add('active');
    }
  }
}
function simulateFileSelect(){
  evFileSelected=true;
  document.getElementById('file-chip-area').style.display='block';
  document.getElementById('ev-next-2').disabled=false;
}
function removeFile(){
  evFileSelected=false;
  document.getElementById('file-chip-area').style.display='none';
  document.getElementById('ev-next-2').disabled=true;
}
function submitEvidence(){
  document.getElementById('ev-submit-area').style.display='none';
  document.getElementById('ev-back-4').style.display='none';
  document.getElementById('ev-success').style.display='block';
  const hash='sha256-'+Math.random().toString(36).substr(2,16);
  console.log('[AUDIT] EVIDENCE_UPLOADED | '+new Date().toISOString()+' | userID:mark_chen | type:'+evSelectedType+' | hash:'+hash+' | S3_WORM_APPLIED');
  showToast('Evidence submitted and locked.');
}
function evReset(){
  evSelectedType='';evFileSelected=false;
  document.getElementById('ev-submit-area').style.display='block';
  document.getElementById('ev-back-4').style.display='block';
  document.getElementById('ev-success').style.display='none';
  evGoStep(1);
  document.querySelectorAll('#ev-type-grid button').forEach(b=>{b.style.borderColor='var(--color-border)';b.style.background='';});
  document.getElementById('ev-next-1').disabled=true;
  removeFile();
}
function generateInvite(){
  const proj=document.getElementById('inv-project').value;
  if(!proj){showToast('Please select a project');return;}
  document.getElementById('invite-result').style.display='block';
  showToast('Invite link generated — valid for 7 days');
  console.log('[AUDIT] INVITE_GENERATED | '+new Date().toISOString()+' | userID:mark_chen | projectID:'+proj);
}
function sendTeamInvite(){
  const name=document.getElementById('inv-name').value;
  const email=document.getElementById('inv-email').value;
  const role=document.getElementById('inv-role').value;
  if(!name||!email||!role){showToast('Please fill in all fields');return;}
  closeModal('modal-co-invite-team');
  showToast('Invitation sent to '+email);
  document.getElementById('inv-name').value='';
  document.getElementById('inv-email').value='';
  document.getElementById('inv-role').value='';
  console.log('[AUDIT] TEAM_INVITE_SENT | '+new Date().toISOString()+' | userID:mark_chen | invitee:'+email+' | role:'+role);
}
function coSubscribeSuccess(){
  const msg=document.getElementById('sub-success-msg');
  if(msg)msg.style.display='block';
  showToast('Subscription activated!');
  console.log('[AUDIT] SUBSCRIPTION_ACTIVATED | '+new Date().toISOString()+' | userID:mark_chen');
}
function flipToggle(btn){
  btn.classList.toggle('on');btn.classList.toggle('off');
  showToast('Preference saved');
}
function toggleCoProfileEdit(){
  const v=document.getElementById('co-profile-view');
  const e=document.getElementById('co-profile-edit');
  if(v.style.display==='none'){v.style.display='';e.style.display='none';}
  else{v.style.display='none';e.style.display='';}
}
function saveCoProfile(){
  toggleCoProfileEdit();
  showToast('Profile updated successfully');
  console.log('[AUDIT] PROFILE_UPDATED | '+new Date().toISOString()+' | userID:mark_chen');
}
function enableCoTFA(){
  const s=document.getElementById('co-tfa-status');
  if(s){s.innerHTML='<span class="badge badge-success">Enabled</span>';}
  showToast('Two-factor authentication enabled');
}

// ── CO ONBOARDING STATE + LOGIC ───────────────────────────────────────────
const coState2 = {
  step: 1,
  complete: false,
  subscriptionActive: false,
  cs03Scrolled: false,
  welcomeDismissed: false
};

function coNavBack(targetId) {
  goTo(targetId);
}

function coStep(completedStep) {
  // Map: argument (screen number completed) → next screen to show
  const nextMap = {
    4: 'cs05',   // CS04 done → go to CS05
    5: 'cs06',   // CS05 done → go to CS06
    6: 'cs07',   // CS06 done → go to CS07
    7: 'cs08',   // CS07 done → go to CS08
    8: 'cs09',   // CS08 done → go to CS09
    9: 'cs10',   // CS09 done → go to CS10
    10: 'cs11',  // CS10 done → go to CS11
  };
  // Guard: steps after subscription require it to be active
  if (completedStep >= 7 && !coState2.subscriptionActive) {
    showToast('Please activate your subscription first.');
    goTo('cs06'); return;
  }
  const nextId = nextMap[completedStep];
  if (!nextId) { console.error('coStep: no mapping for', completedStep); return; }
  coState2.step = completedStep - 2;
  console.log('[AUDIT] CO_ONBOARDING_STEP_COMPLETE | '+new Date().toISOString()+' | userID:mark_chen | step:'+(completedStep-2));
  goTo(nextId);
}

// CS03 — scroll gate
function cs03Init() {
  if (coState2.cs03Scrolled) return;
  const el = document.getElementById('cs03-scrollable');
  const cta = document.getElementById('cs03-cta');
  const hint = document.getElementById('cs03-hint');
  if (!el || !cta) return;
  function checkScroll() {
    if (el.scrollTop + el.clientHeight + 40 >= el.scrollHeight) {
      coState2.cs03Scrolled = true;
      if (cta) { cta.disabled = false; cta.style.opacity = '1'; }
      if (hint) hint.style.opacity = '0';
    }
  }
  el.addEventListener('scroll', checkScroll);
  // Also check if content fits without scrolling
  setTimeout(() => {
    if (el.scrollHeight <= el.clientHeight + 10) {
      coState2.cs03Scrolled = true;
      if (cta) { cta.disabled = false; cta.style.opacity = '1'; }
      if (hint) hint.style.opacity = '0';
    }
  }, 100);
}

function cs03Continue() {
  if (!coState2.cs03Scrolled) return;
  console.log('[AUDIT] CO_ROLE_CONFIRMED | '+new Date().toISOString()+' | userID:mark_chen');
  goTo('cs04');
}

// CS06 — subscription
function cs06Subscribe() {
  const payCard = document.getElementById('cs06-payment-section');
  const errCard = document.getElementById('cs06-error-card');
  const sucCard = document.getElementById('cs06-success-card');
  const cta = document.getElementById('cs06-cta');
  if (payCard) payCard.style.display = 'none';
  if (errCard) errCard.style.display = 'none';
  if (sucCard) sucCard.style.display = 'block';
  coState2.subscriptionActive = true;
  if (cta) { cta.disabled = false; cta.style.opacity = '1'; }
  const d = new Date(); d.setDate(d.getDate()+30);
  const dateStr = d.toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
  const dateEl = document.getElementById('cs06-renewal-date');
  if (dateEl) dateEl.textContent = 'Next renewal: '+dateStr;
  showToast('Subscription activated!');
  console.log('[AUDIT] CO_SUBSCRIPTION_ACTIVATED | '+new Date().toISOString()+' | userID:mark_chen | amount:50');
}

function cs06Fail() {
  const payCard = document.getElementById('cs06-payment-section');
  const errCard = document.getElementById('cs06-error-card');
  if (payCard) payCard.style.display = 'none';
  if (errCard) errCard.style.display = 'block';
}

function cs06RetryShow() {
  const payCard = document.getElementById('cs06-payment-section');
  const errCard = document.getElementById('cs06-error-card');
  if (payCard) payCard.style.display = 'block';
  if (errCard) errCard.style.display = 'none';
}

function coOnboardingComplete() {
  coState2.complete = true;
  // Set CS11 renewal date
  const d = new Date(); d.setDate(d.getDate()+30);
  const dateStr = d.toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
  const renEl = document.getElementById('cs11-renewal');
  if (renEl) renEl.textContent = dateStr;
  console.log('[AUDIT] CO_ONBOARDING_COMPLETE | '+new Date().toISOString()+' | userID:mark_chen');
  console.log('[AUDIT] CO_DASHBOARD_FIRST_VISIT | '+new Date().toISOString()+' | userID:mark_chen');
  goTo('cs12');
  showWelcomeBanner();
}

function showWelcomeBanner() {
  if (coState2.welcomeDismissed) return;
  const banner = document.getElementById('co-welcome-banner');
  if (banner) banner.style.display = 'flex';
}

function dismissWelcomeBanner() {
  coState2.welcomeDismissed = true;
  const banner = document.getElementById('co-welcome-banner');
  if (banner) banner.style.display = 'none';
}

// Run CS03 scroll detection when it becomes active
// Override goTo to add CO hooks
// Base goTo already defined — CO, Admin, SM hooks merged below

function devGoToCoDash(){
  coState2.complete = true;
  coState2.subscriptionActive = true;
  goTo('cs12');
}




// ── SITE MANAGER ROLE ─────────────────────────────────────────────────────
const smState = {
  preselectedMilestone: null,
  preselectedJob: null,
  selectedType: '',
  fileName: '',
  milestones: {
    'M1': { name: 'Strip Out & Demolition', job: 'JB-0042', jobName: 'Surry Hills Kitchen Reno', status: 'evidenceSubmitted', evidenceCount: 2, evidenceRequired: true },
    'M2': { name: 'Plumbing & Waterproofing', job: 'JB-0042', jobName: 'Surry Hills Kitchen Reno', status: 'inProgress', evidenceCount: 0, evidenceRequired: true },
    'M3': { name: 'Tiling & Fit-Out', job: 'JB-0042', jobName: 'Surry Hills Kitchen Reno', status: 'inProgress', evidenceCount: 0, evidenceRequired: true },
    'M1B': { name: 'Demolition', job: 'JB-0051', jobName: 'Bondi Bathroom Reno', status: 'inProgress', evidenceCount: 0, evidenceRequired: true },
  }
};

function smOpenUpload(milestoneId, jobId) {
  smState.preselectedMilestone = milestoneId;
  smState.preselectedJob = jobId;
  sm04Reset(false);
  goTo('sm04');
  setTimeout(() => {
    const ms = smState.milestones[milestoneId];
    if (ms) {
      const ctxEl = document.getElementById('sm04-context');
      if (ctxEl) ctxEl.textContent = ms.jobName + ' · ' + ms.name;
      const jobEl = document.getElementById('sm04-job');
      if (jobEl) jobEl.textContent = '#' + ms.job + ' — ' + ms.jobName;
      const msEl = document.getElementById('sm04-milestone');
      if (msEl) msEl.innerHTML = milestoneId + ' — ' + ms.name;
      const s4ms = document.getElementById('sm04-s4-ms');
      if (s4ms) s4ms.textContent = milestoneId + ' — ' + ms.name;
      const s4job = document.getElementById('sm04-s4-job');
      if (s4job) s4job.textContent = '#' + ms.job + ' · ' + ms.jobName;
    }
  }, 50);
}

function smToggleMs(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function sm04SelectType(el, type) {
  document.querySelectorAll('.sm-type-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  smState.selectedType = type;
  const cont = document.getElementById('sm04-cont1');
  if (cont) { cont.disabled = false; cont.style.opacity = '1'; }
  const s3type = document.getElementById('sm04-type-s3');
  if (s3type) s3type.textContent = type;
  const s4badge = document.getElementById('sm04-s4-typebadge');
  if (s4badge) { s4badge.textContent = type; s4badge.className = 'badge ' + (type.includes('Photo') ? 'badge-info' : type === 'Invoice' ? 'badge-warning' : type.includes('Cert') ? 'badge-success' : 'badge-muted'); }
  const certFields = document.getElementById('sm04-cert-fields');
  if (certFields) certFields.style.display = (type === 'Compliance Certificate' || type === 'Insurance Document') ? 'block' : 'none';
}

function sm04Next(dir) {
  const steps = ['sm04-step1','sm04-step2','sm04-step3','sm04-step4'];
  const dots = ['sm04-s1','sm04-s2','sm04-s3','sm04-s4'];
  let cur = 0;
  steps.forEach((s,i) => { const el = document.getElementById(s); if (el && el.style.display !== 'none') cur = i; });
  if (dir === 1) {
    if (cur === 0 && !smState.selectedType) { showToast('Please select an evidence type.'); return; }
    if (cur === 1 && !smState.fileName) { showToast('Please select a file first.'); return; }
    if (cur === 2) {
      const ts = document.getElementById('sm04-ts');
      const s4ts = document.getElementById('sm04-s4-ts');
      const nowStr = new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney',dateStyle:'short',timeStyle:'short'})+' AEST';
      if (ts) ts.textContent = nowStr;
      if (s4ts) s4ts.textContent = nowStr;
      const fname = document.getElementById('sm04-s4-fname');
      if (fname) fname.textContent = smState.fileName;
    }
  }
  const next = dir === 0 ? cur - 1 : cur + 1;
  if (next < 0 || next >= steps.length) return;
  steps.forEach(s => { const el = document.getElementById(s); if (el) el.style.display = 'none'; });
  const nEl = document.getElementById(steps[next]); if (nEl) nEl.style.display = 'block';
  dots.forEach((d,i) => { const el = document.getElementById(d); if (!el) return; if (i < next) el.className='sm-dot done'; else if (i===next) el.className='sm-dot current'; else el.className='sm-dot upcoming'; });
  if (next === 2) {
    const ts = document.getElementById('sm04-ts');
    if (ts) ts.textContent = new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney',dateStyle:'short',timeStyle:'short'})+' AEST';
  }
}

function sm04SimFile() {
  const names = ['SitePhoto_'+Date.now()+'.jpg','Plumbing_Progress.jpg','Waterproof_Inspect.jpg','Invoice_M2.pdf','Cert_Plumbing.pdf'];
  const name = names[Math.floor(Math.random()*3)];
  smState.fileName = name;
  const list = document.getElementById('sm04-file-list');
  if (list) list.innerHTML = `<div style="display:flex;align-items:center;gap:10px;background:var(--color-muted-bg);border-radius:var(--r-sm);padding:10px 12px;margin-top:8px"><span style="font-size:20px">📎</span><span style="font-size:14px;flex:1">${name}</span><button onclick="document.getElementById('sm04-file-list').innerHTML='';smState.fileName='';const c=document.getElementById('sm04-cont2');if(c){c.disabled=true;c.style.opacity='.4'}" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--color-muted);min-height:40px;min-width:40px">×</button></div>`;
  const cont = document.getElementById('sm04-cont2');
  if (cont) { cont.disabled = false; cont.style.opacity = '1'; }
}

function sm04Submit() {
  const msId = smState.preselectedMilestone || 'M2';
  const ms = smState.milestones[msId];
  const fileId = 'FILE-' + Math.random().toString(36).substr(2,8).toUpperCase();
  const hash = 'sha256-simulated-' + Date.now();
  const jobId = ms ? ms.job : 'JB-0042';
  
  console.log('S3 path: /raw/contractors/pacific-build-co/jobs/'+jobId+'/milestones/'+msId+'/evidence/'+fileId);
  console.log('SHA-256 Hash: ['+hash+']');
  console.log('S3 WORM lock applied');
  console.log('[AUDIT] EVIDENCE_UPLOADED | '+new Date().toISOString()+' | role:siteManager | userID:dan_wu | fileID:'+fileId+' | milestoneID:'+msId+' | jobID:'+jobId+' | evidenceType:'+smState.selectedType);

  // Milestone state transition
  if (ms) {
    if (ms.status === 'inProgress' && ms.evidenceCount === 0) {
      ms.status = 'evidenceSubmitted';
    }
    ms.evidenceCount += 1;
    // Update SM02/SM03 UI reactively
    smUpdateMilestoneUI(msId, ms);
    // Update PM views shared state
    pmUpdateFromSMUpload(msId, ms);
  }

  // Show success
  ['sm04-step1','sm04-step2','sm04-step3','sm04-step4'].forEach(s => { const el=document.getElementById(s); if(el)el.style.display='none'; });
  ['sm04-s1','sm04-s2','sm04-s3','sm04-s4'].forEach(d => { const el=document.getElementById(d); if(el)el.className='sm-dot done'; });
  const suc = document.getElementById('sm04-success'); if (suc) suc.style.display = 'block';
  const sucMs = document.getElementById('sm04-suc-ms'); if (sucMs && ms) sucMs.textContent = ms.name;
  const sucLink = document.getElementById('sm04-suc-link'); if (sucLink && ms) sucLink.textContent = 'Linked to: '+ms.name+' · '+ms.jobName;
  const sucTs = document.getElementById('sm04-suc-ts'); if (sucTs) sucTs.textContent = 'Submitted '+new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney',timeStyle:'short'})+' AEST';
  showToast('PM and Owner notified — evidence uploaded for '+(ms?ms.name:'milestone')+'.');
}

function smUpdateMilestoneUI(msId, ms) {
  // SM02 milestone row
  const statusEl = document.getElementById('sm02-m2-status');
  const countEl = document.getElementById('sm02-m2-evcount');
  const btnEl = document.getElementById('sm02-m2-btn');
  if (msId === 'M2' && statusEl) { statusEl.className = 'badge badge-info'; statusEl.textContent = 'Evidence Submitted'; }
  if (msId === 'M2' && countEl) { countEl.className = 'badge badge-accent'; countEl.textContent = '📎 '+ms.evidenceCount+' files'; }
  if (msId === 'M2' && btnEl) { btnEl.className = 'btn btn-outline btn-sm'; btnEl.textContent = 'Add More Evidence'; }
  // SM03 milestone row
  const sm3status = document.getElementById('sm03-m2-status');
  const sm3count = document.getElementById('sm03-m2-count');
  const sm3btn = document.getElementById('sm03-m2-btn');
  if (msId === 'M2' && sm3status) { sm3status.className = 'badge badge-info'; sm3status.textContent = 'Evidence Submitted'; }
  if (msId === 'M2' && sm3count) { sm3count.className = 'badge badge-accent'; sm3count.textContent = '📎 '+ms.evidenceCount; }
  if (msId === 'M2' && sm3btn) { sm3btn.className = 'btn btn-outline btn-sm'; sm3btn.textContent = 'Add More Evidence'; }
  // SM01 awaiting panel — if evidence count > 0, could remove from list (simplified: just update count)
  const sm02evcount = document.getElementById('sm02-ev-count');
  if (sm02evcount && msId === 'M2') { const totalFiles = (smState.milestones['M1']?.evidenceCount||2) + ms.evidenceCount; sm02evcount.textContent = totalFiles+' files'; }
}

function pmUpdateFromSMUpload(msId, ms) {
  // Update PM02/PM03 milestone rows — shared state
  if (msId !== 'M2') return;
  const pmBadges = document.querySelectorAll('.pm-ms-row .badge-info, .pm-ms-row .badge-muted');
  // Find PM milestone rows for M2 by checking text content
  document.querySelectorAll('.pm-ms-row').forEach(row => {
    const nameEl = row.querySelector('.pm-ms-name');
    if (nameEl && nameEl.textContent.includes('Plumbing')) {
      const chips = row.querySelector('.pm-ms-chips');
      if (chips) {
        // Update status badge
        const sb = chips.querySelector('.badge');
        if (sb && (sb.textContent === 'In Progress' || sb.textContent.includes('Progress'))) {
          sb.className = 'badge badge-info'; sb.textContent = 'Evidence Submitted';
        }
        // Update ev count
        const evb = chips.querySelectorAll('.badge')[1];
        if (evb) { evb.textContent = '📎 '+ms.evidenceCount; evb.className = 'badge badge-accent'; }
      }
      // Update action buttons
      const acts = row.querySelector('.pm-ms-actions');
      if (acts) {
        const uploadBtn = acts.querySelector('.btn-outline');
        const markBtn = acts.querySelector('button');
        if (markBtn && markBtn.textContent.includes('Upload')) {
          markBtn.className = 'btn btn-accent btn-sm';
          markBtn.textContent = 'Mark Complete';
          markBtn.onclick = function(e) { e.stopPropagation(); openModal('modal-pm-complete'); };
        }
      }
    }
  });
}

function sm04Reset(keepPreselection) {
  const suc = document.getElementById('sm04-success'); if (suc) suc.style.display = 'none';
  ['sm04-step2','sm04-step3','sm04-step4'].forEach(s => { const el=document.getElementById(s); if(el)el.style.display='none'; });
  const s1 = document.getElementById('sm04-step1'); if (s1) s1.style.display = 'block';
  ['sm04-s1','sm04-s2','sm04-s3','sm04-s4'].forEach((d,i) => { const el=document.getElementById(d); if(el)el.className=i===0?'sm-dot current':'sm-dot upcoming'; });
  document.querySelectorAll('.sm-type-card').forEach(c => c.classList.remove('selected'));
  smState.selectedType = '';
  smState.fileName = '';
  const cont1 = document.getElementById('sm04-cont1'); if (cont1) { cont1.disabled=true; cont1.style.opacity='.4'; }
  const cont2 = document.getElementById('sm04-cont2'); if (cont2) { cont2.disabled=true; cont2.style.opacity='.4'; }
  const fl = document.getElementById('sm04-file-list'); if (fl) fl.innerHTML = '';
  if (!keepPreselection) { smState.preselectedMilestone=null; smState.preselectedJob=null; }
}

// SM06 cert chips — reuse Admin's adGetStatus
function smRenderCerts() {
  if (typeof adGetStatus !== 'function') return;
  const pliStatus = adGetStatus('2026-03-31');
  const piiStatus = adGetStatus('2026-05-31');
  const wcStatus  = adGetStatus('2026-06-30');
  const chips = {'sm06-pli-chip':{s:pliStatus,cls:'exp-'},'sm06-pii-chip':{s:piiStatus,cls:'exp-'},'sm06-wc-chip':{s:wcStatus,cls:'exp-'}};
  Object.entries(chips).forEach(([id,{s}]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (s.status==='expired') { el.className='badge badge-error'; el.textContent='Expired'; }
    else if (s.status==='expiring') { el.className='badge badge-warning'; el.textContent=s.label; }
    else { el.className='badge badge-success'; el.textContent='Valid'; }
  });
}

// SM cert chips rendered via unified goTo hook below

function devGoToSmDash() { goTo('sm01'); }

// ── UNIFIED goTo HOOK — CO + Admin + Site Manager ───────────────────────
(function() {
  var _baseGoTo = window.goTo;
  window.goTo = function(id) {
    _baseGoTo(id);
    // CO hooks
    if (id === 'cs03') setTimeout(cs03Init, 50);
    if (id === 'cs11') {
      var d = new Date(); d.setDate(d.getDate()+30);
      var dateStr = d.toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
      var renEl = document.getElementById('cs11-renewal');
      if (renEl) renEl.textContent = dateStr;
    }
    // Admin hooks
    if (id.startsWith('ad')) setTimeout(adRenderStats, 10);
    // SM hooks
    if (id === 'sm06') setTimeout(smRenderCerts, 10);
  };
  // Initial admin stats render on page load
  setTimeout(adRenderStats, 200);
})();

// ── ADMIN ROLE ────────────────────────────────────────────────────────────
const adDocs = [
  {name:'Public Liability Insurance', expiry:'2026-03-31', authority:'QBE Insurance Australia', policy:'QBE-2025-77324'},
  {name:'Professional Indemnity Insurance', expiry:'2026-05-31', authority:'Vero Insurance', policy:'VERO-PI-2025-44112'},
  {name:"Builder's Licence (NSW)", expiry:'2027-01-14', authority:'NSW Fair Trading', policy:'BLD-NSW-190442'},
  {name:'Workers Compensation', expiry:'2026-06-30', authority:'iCare NSW', policy:'WC-2025-33921'},
];

function adGetStatus(expiryStr){
  const today=new Date(); today.setHours(0,0,0,0);
  const exp=new Date(expiryStr);
  const diff=Math.ceil((exp-today)/(1000*60*60*24));
  if(diff<0) return {status:'expired',label:'Expired',cls:'badge-error',days:diff};
  if(diff<=30) return {status:'expiring',label:'Expiring in '+diff+' days',cls:'badge-warning',days:diff};
  return {status:'valid',label:'Valid',cls:'badge-success',days:diff};
}

function adRenderStats(){
  let valid=0,expiring=0,expired=0;
  adDocs.forEach(d=>{
    const s=adGetStatus(d.expiry);
    if(s.status==='valid') valid++;
    else if(s.status==='expiring') expiring++;
    else expired++;
  });
  const sv=document.getElementById('stat-valid');
  const se=document.getElementById('stat-expiring');
  const sx=document.getElementById('stat-expired');
  if(sv) sv.textContent=valid;
  if(se) se.textContent=expiring;
  if(sx) sx.textContent=expired;

  // Update PII chip dynamically
  const piiStatus=adGetStatus('2026-05-31');
  const piiChips=document.querySelectorAll('#ad02-pii-chip,#ad-pii-chip,#ad01-pii-chip2');
  piiChips.forEach(el=>{ if(el){ el.className='badge '+piiStatus.cls; el.textContent=piiStatus.label; }});
  const piiExp=document.getElementById('ad02-pii-exp');
  if(piiExp) piiExp.style.color=piiStatus.status==='expiring'?'var(--color-warning)':'inherit';

  // Workers Comp
  const wcStatus=adGetStatus('2026-06-30');
  const wcChips=document.querySelectorAll('#ad02-wc-chip,#ad01-wc-chip');
  wcChips.forEach(el=>{ if(el){ el.className='badge '+wcStatus.cls; el.textContent=wcStatus.label; }});
}

// Admin stats rendered via unified goTo hook below

// AD03 Upload flow
let adState={selectedType:'',fileName:''};

function adOpenUpload(type){
  adState.selectedType=type;
  adState.fileName='';
  // Reset to step 1
  ad03Reset();
  if(type){
    setTimeout(()=>{
      document.querySelectorAll('.ad-type-card').forEach(card=>{
        card.classList.toggle('selected',card.textContent.trim().startsWith(type.replace("'s","'")));
      });
    },50);
  }
  goTo('ad03');
}

function ad03SelectType(el,type){
  document.querySelectorAll('.ad-type-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  adState.selectedType=type;
  const meta=document.getElementById('ad03-meta-type');
  if(meta) meta.textContent=type;
}

function ad03Next(dir){
  const steps=['ad03-step1','ad03-step2','ad03-step3','ad03-step4'];
  const dots=['ad03-s1','ad03-s2','ad03-s3','ad03-s4'];
  let cur=0;
  steps.forEach((s,i)=>{ const el=document.getElementById(s); if(el&&el.style.display!=='none') cur=i; });
  
  if(dir===1){
    // Validation
    if(cur===0&&!adState.selectedType){ showToast('Please select a document type.'); return; }
    if(cur===1&&!adState.fileName){ showToast('Please select a file.'); return; }
    if(cur===2){
      const auth=document.getElementById('ad03-authority');
      const exp=document.getElementById('ad03-expiry-date');
      const iss=document.getElementById('ad03-issue-date');
      if(!auth||!auth.value){ showToast('Issuing authority is required.'); if(auth)auth.style.borderColor='var(--color-error)'; return; }
      if(!exp||!exp.value){ showToast('Expiry date is required.'); if(exp){exp.style.borderColor='var(--color-error)';}; return; }
      if(iss&&exp&&iss.value&&exp.value&&exp.value<=iss.value){ showToast('Expiry date must be after issue date.'); return; }
      // Populate step 4
      const typeIcons={'Public Liability Insurance':'🛡️','Professional Indemnity Insurance':'📋','Workers Compensation Insurance':'🏥',"Builder's Licence":'🏗️','Contractor Licence':'📄','Other':'📦'};
      const icon=typeIcons[adState.selectedType]||'📄';
      const s4i=document.getElementById('ad03-s4-icon'); if(s4i)s4i.textContent=icon;
      const s4n=document.getElementById('ad03-s4-name'); if(s4n)s4n.textContent=adState.selectedType+' — '+(auth?auth.value:'');
      const s4a=document.getElementById('ad03-s4-auth'); if(s4a)s4a.textContent=auth?auth.value:'';
      const s4is=document.getElementById('ad03-s4-issue'); if(s4is)s4is.textContent=iss?iss.value:'';
      const s4ex=document.getElementById('ad03-s4-expiry'); if(s4ex)s4ex.textContent=exp?exp.value:'';
      const pol=document.getElementById('ad03-policy-num');
      const s4pw=document.getElementById('ad03-s4-pol-wrap');
      const s4p=document.getElementById('ad03-s4-policy');
      if(pol&&pol.value&&s4pw&&s4p){ s4pw.style.display='inline'; s4p.textContent=pol.value; } else if(s4pw){ s4pw.style.display='none'; }
      const s4f=document.getElementById('ad03-s4-file'); if(s4f)s4f.textContent=adState.fileName||'document.pdf';
    }
  }
  
  const next=dir===0?cur-1:cur+1;
  if(next<0||next>=steps.length) return;
  steps.forEach(s=>{ const el=document.getElementById(s); if(el)el.style.display='none'; });
  const nEl=document.getElementById(steps[next]); if(nEl)nEl.style.display='block';
  dots.forEach((d,i)=>{ const el=document.getElementById(d); if(!el)return; if(i<next)el.className='eu-step-dot done'; else if(i===next)el.className='eu-step-dot current'; else el.className='eu-step-dot upcoming'; });
  const ts=document.getElementById('ad03-ts'); if(ts)ts.textContent=new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney'});
  const fid=document.getElementById('ad03-file-id'); if(fid)fid.textContent='CERT-2026-'+Math.floor(1000+Math.random()*9000);
}

function ad03SimFile(){
  const names=['PublicLiability_2026.pdf','ProfIndemnity_2026.pdf','BuildersLicence_NSW.pdf','WorkersComp_2026.pdf'];
  const name=names[Math.floor(Math.random()*names.length)];
  adState.fileName=name;
  const list=document.getElementById('ad03-file-list');
  if(list) list.innerHTML=`<div style="display:flex;align-items:center;gap:10px;background:var(--color-muted-bg);border-radius:var(--r-sm);padding:10px 12px;margin-top:8px"><span style="font-size:20px">📎</span><span style="font-size:14px;flex:1">${name}</span><button onclick="document.getElementById('ad03-file-list').innerHTML='';adState.fileName=''" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--color-muted)">×</button></div>`;
}

function ad03Submit(){
  const auth=document.getElementById('ad03-authority');
  const exp=document.getElementById('ad03-expiry-date');
  const certId='CERT-'+Math.random().toString(36).substr(2,8).toUpperCase();
  const hash=Array.from({length:64},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
  console.log('S3 path: /raw/contractors/pacific-build-co/certificates/'+certId);
  console.log('SHA-256 Hash: '+hash);
  console.log('S3 WORM lock applied');
  console.log('[AUDIT] CERT_DOCUMENT_UPLOADED | '+new Date().toISOString()+' | role:admin | userID:priya_sharma | docType:'+adState.selectedType+' | firmID:pacific-build-co | expiryDate:'+(exp?exp.value:''));
  ['ad03-step1','ad03-step2','ad03-step3','ad03-step4'].forEach(s=>{ const el=document.getElementById(s); if(el)el.style.display='none'; });
  ['ad03-s1','ad03-s2','ad03-s3','ad03-s4'].forEach(d=>{ const el=document.getElementById(d); if(el)el.className='eu-step-dot done'; });
  const suc=document.getElementById('ad03-success'); if(suc)suc.style.display='block';
  const det=document.getElementById('ad03-suc-detail');
  if(det)det.innerHTML=adState.selectedType+'<br>Expires: '+(exp?exp.value:'');
  showToast('Owner notified — '+adState.selectedType+' uploaded.');
}

function ad03Reset(){
  const suc=document.getElementById('ad03-success'); if(suc)suc.style.display='none';
  ['ad03-step2','ad03-step3','ad03-step4'].forEach(s=>{ const el=document.getElementById(s); if(el)el.style.display='none'; });
  const s1=document.getElementById('ad03-step1'); if(s1)s1.style.display='block';
  ['ad03-s1','ad03-s2','ad03-s3','ad03-s4'].forEach((d,i)=>{ const el=document.getElementById(d); if(el)el.className=i===0?'eu-step-dot current':'eu-step-dot upcoming'; });
  document.querySelectorAll('.ad-type-card').forEach(c=>c.classList.remove('selected'));
  adState={selectedType:'',fileName:''};
}

function devGoToAdminDash(){ goTo('ad01'); }

// ── PROJECT MANAGER ROLE ─────────────────────────────────────────────────
let pmState = { currentMilestone: 'M2', step: 1, selectedType: '', fileName: 'SitePhoto_28Apr.jpg' };

function confirmPmMarkComplete(){
  closeModal('modal-pm-complete');
  // Update milestone row in PM02/PM03 immediately
  showToast('Homeowner notified — acknowledgement requested.');
  setTimeout(()=>showToast('Owner notified.'),900);
  console.log('[AUDIT] MILESTONE_MARKED_COMPLETE | '+new Date().toISOString()+' | role:projectManager | userID:jenna_park | milestoneID:M2_JB0042 | jobID:JB-0042');
  // Simulate state change
  document.querySelectorAll('.pm-ms-row').forEach(row=>{
    const nameEl = row.querySelector('.pm-ms-name');
    if(nameEl && nameEl.textContent.includes('Plumbing')){
      const badges = row.querySelector('.pm-ms-chips');
      if(badges){
        const sb = badges.querySelector('.badge-info');
        if(sb){ sb.className='badge badge-warning'; sb.textContent='Awaiting Homeowner'; }
      }
      const acts = row.querySelector('.pm-ms-actions');
      if(acts){ acts.innerHTML='<span class="muted small" style="font-size:13px">Awaiting Homeowner</span>'; }
    }
  });
}

// PM05 Upload flow
function pm05SelectType(el, type){
  document.querySelectorAll('.eu-type-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  pmState.selectedType = type;
  document.getElementById('pm05-type-confirm').textContent = type;
  document.getElementById('pm05-type-s4').textContent = type;
  const certFields = document.getElementById('pm05-cert-fields');
  if(certFields){ certFields.style.display = (type==='Compliance Certificate'||type==='Insurance Document') ? 'block' : 'none'; }
}

function pm05SimFile(){
  const names=['SitePhoto_28Apr.jpg','Plumbing_Complete.jpg','Invoice_M2.pdf'];
  const name = names[Math.floor(Math.random()*names.length)];
  pmState.fileName = name;
  document.getElementById('pm05-fname').textContent = name;
  const list = document.getElementById('pm05-file-list');
  if(list) list.innerHTML = `<div style="display:flex;align-items:center;gap:10px;background:var(--color-muted-bg);border-radius:var(--r-sm);padding:10px 12px;margin-top:8px"><span style="font-size:20px">📎</span><span style="font-size:14px;flex:1">${name}</span><button onclick="document.getElementById('pm05-file-list').innerHTML=''" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--color-muted)">×</button></div>`;
}

function pm05Next(dir){
  const steps=['pm05-step1','pm05-step2','pm05-step3','pm05-step4'];
  const dots=['pm05-s1','pm05-s2','pm05-s3','pm05-s4'];
  let cur=0;
  steps.forEach((s,i)=>{ if(document.getElementById(s)&&document.getElementById(s).style.display!=='none') cur=i; });
  const next = cur + (dir===0 ? -1 : 1);
  if(next<0||next>=steps.length) return;
  steps.forEach(s=>{ if(document.getElementById(s)) document.getElementById(s).style.display='none'; });
  if(document.getElementById(steps[next])) document.getElementById(steps[next]).style.display='block';
  dots.forEach((d,i)=>{
    const el=document.getElementById(d);
    if(!el) return;
    if(i<next) el.className='eu-step-dot done';
    else if(i===next) el.className='eu-step-dot current';
    else el.className='eu-step-dot upcoming';
  });
  document.getElementById('pm05-ts').textContent = new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney',dateStyle:'short',timeStyle:'short'}) + ' AEST';
}

function pm05Submit(){
  const fileId='FILE-'+Math.random().toString(36).substr(2,8).toUpperCase();
  const hash=Array.from({length:64},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
  console.log('[AUDIT] EVIDENCE_UPLOADED | '+new Date().toISOString()+' | role:projectManager | userID:jenna_park | fileID:'+fileId+' | milestoneID:M2_JB0042 | jobID:JB-0042');
  console.log('Hash: '+hash);
  console.log('WORM lock applied');
  ['pm05-step1','pm05-step2','pm05-step3','pm05-step4'].forEach(s=>{ const el=document.getElementById(s); if(el) el.style.display='none'; });
  ['pm05-s1','pm05-s2','pm05-s3','pm05-s4'].forEach(d=>{ const el=document.getElementById(d); if(el) el.className='eu-step-dot done'; });
  const suc=document.getElementById('pm05-success'); if(suc) suc.style.display='block';
  showToast('Evidence submitted and locked.');
}

function pm05Reset(){
  const suc=document.getElementById('pm05-success'); if(suc) suc.style.display='none';
  ['pm05-step2','pm05-step3','pm05-step4'].forEach(s=>{ const el=document.getElementById(s); if(el) el.style.display='none'; });
  const s1=document.getElementById('pm05-step1'); if(s1) s1.style.display='block';
  ['pm05-s1','pm05-s2','pm05-s3','pm05-s4'].forEach((d,i)=>{ const el=document.getElementById(d); if(el) el.className=i===0?'eu-step-dot current':'eu-step-dot upcoming'; });
  document.querySelectorAll('.eu-type-card').forEach(c=>c.classList.remove('selected'));
  pmState.selectedType='';
}

// Tab switcher for PM02
function switchPmTab(screenId, tab){
  const tabs=['overview','evidence','comments','variations'];
  tabs.forEach(t=>{ const el=document.getElementById(screenId+'-'+t); if(el) el.style.display=t===tab?'block':'none'; });
  const bar=document.getElementById(screenId+'-tabs');
  if(bar){ bar.querySelectorAll('.pm-tab').forEach((btn,i)=>{ btn.classList.toggle('active', ['overview','evidence','comments','variations'][i]===tab); }); }
}

// Dev nav
function devGoToPmDash(){ goTo('pm01'); }

// ── ESTIMATOR ROLE ────────────────────────────────────────────────────────
const esState = { quoteSubmitted: false, totalVal: 14800 };

function toggleMs(cardId){
  const body = document.getElementById('ms-body-' + cardId.replace('ms-card-',''));
  const chev = document.getElementById('chev-' + cardId.replace('ms-card-',''));
  // simpler: toggle all children
  const card = document.getElementById(cardId);
  if(!card) return;
  const b = card.querySelector('.ms-body');
  const ch = card.querySelector('.ms-chevron');
  if(b){ const open = b.classList.contains('open'); b.classList.toggle('open',!open); if(ch) ch.classList.toggle('open',!open); }
}

function recalcEstimatorTotal(){
  const vals = document.querySelectorAll('#ms-list-es03 input[type=number], #ms-list-es03b input[type=number]');
  let total = 0;
  vals.forEach(v => { total += parseFloat(v.value)||0; });
  const el = document.getElementById('qb-total-es03');
  if(el){ el.textContent = '$' + total.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2}); }
}

function saveEstimatorDraft(){
  showToast('Draft saved.');
  console.log('[AUDIT] QUOTE_DRAFT_SAVED | '+new Date().toISOString()+' | role:estimator | userID:tom_nguyen | quoteID:QT-2026-0094');
}

function confirmEstimatorSubmit(){
  closeModal('modal-es-submit');
  esState.quoteSubmitted = true;
  showToast('Homeowner notified.');
  setTimeout(()=>showToast("Your firm's Owner has been notified."),1000);
  console.log('[AUDIT] QUOTE_SUBMITTED | '+new Date().toISOString()+' | role:estimator | userID:tom_nguyen | quoteID:QT-2026-0094 | jobID:JB-0042 | amount:14800');
  goTo('es04');
}

function addEstimatorMilestone(){
  const list = document.getElementById('ms-list-es03');
  if(!list) return;
  const idx = list.querySelectorAll('.ms-builder-card').length + 1;
  const div = document.createElement('div');
  div.className = 'ms-builder-card';
  div.id = 'ms-card-es03-' + idx;
  div.innerHTML = `<div class="ms-builder-header" onclick="toggleMs('ms-card-es03-${idx}')">
    <span class="ms-drag-handle">⠿</span>
    <div class="ms-num-badge">${idx}</div>
    <div class="ms-header-name">New Milestone</div>
    <div class="ms-header-right"><span class="ms-header-val">$0</span><span class="ms-chevron open">▾</span>
    <button class="btn btn-sm" style="color:var(--color-error);border-color:var(--color-error);min-height:32px" onclick="event.stopPropagation();this.closest('.ms-builder-card').remove();recalcEstimatorTotal()">×</button></div>
  </div>
  <div class="ms-body open" id="ms-body-es03-${idx}">
    <div class="form-stack">
      <div class="input-group"><label>Name *</label><input type="text" placeholder="e.g. Site Preparation" style="min-height:44px"></div>
      <div class="input-group"><label>Description *</label><textarea placeholder="Describe the work..." style="min-height:72px"></textarea></div>
      <div class="input-group"><label>Value ($AUD) *</label><input type="number" placeholder="0.00" style="min-height:44px" oninput="recalcEstimatorTotal()" class="ms-val"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;min-height:44px">
        <span style="font-size:14px;font-weight:500">Evidence required</span>
        <div class="toggle-switch on" onclick="flipToggle(this)"><div class="toggle-knob"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;min-height:44px">
        <span style="font-size:14px;font-weight:500">Retention applied</span>
        <div class="toggle-switch off" onclick="flipToggle(this)"><div class="toggle-knob"></div></div>
      </div>
      <p class="muted small">Position ${idx} · drag handle to reorder</p>
    </div>
  </div>`;
  list.appendChild(div);
  console.log('[AUDIT] MILESTONE_CREATED | '+new Date().toISOString()+' | role:estimator | userID:tom_nguyen');
}

// Update dev nav with Estimator entry
function devGoToEstimatorDash(){
  goTo('es01');
}

/* ---- block separator ---- */

function filterTeam(q){
  q=(q||'').toLowerCase();
  document.querySelectorAll('#team-list-co .team-card').forEach(c=>{
    c.style.display = c.dataset.name.toLowerCase().includes(q) ? '' : 'none';
  });
}

/* ---- block separator ---- */

(function(){
  const lo = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
  function inject(){
    document.querySelectorAll('.sidebar-footer').forEach(f=>{
      if(f.querySelector('.sidebar-logout-btn')) return;
      const b=document.createElement('button');
      b.className='sidebar-logout-btn';
      b.type='button';
      b.innerHTML=lo+'<span>Log Out</span>';
      b.onclick=function(e){e.stopPropagation();if(typeof goTo==='function')goTo('s01');};
      f.appendChild(b);
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',inject);}else{inject();}
  // Re-run on screen change
  const orig=window.goTo;
  if(typeof orig==='function'){
    window.goTo=function(){const r=orig.apply(this,arguments);setTimeout(inject,30);return r;};
  }
})();

/* ---- block separator ---- */

(function(){
  // ──────────────────────────────────────────────────────────────
  // Quote builder configurations: 3 forms across the platform
  // ──────────────────────────────────────────────────────────────
  const QB_CONFIGS = [
    {
      key: 'cs15',
      formRoot: 'cs15',                      // section id
      mileListId: 'milestone-list-builder',
      mileSelector: '.ms-row',
      totalDisplay: 'q-total',
      gstSubLabel: null,                     // cs15 has no separate sub-label
      gstRadioName: 'gst',
      scopeId: 'q-scope',
      expiryId: 'q-expiry',
      submitSelector: 'button[onclick*="modal-co-submit-quote"]',
      addBtnSelector: 'button[onclick*="addMilestone"]'
    },
    {
      key: 'es03',
      formRoot: 'es03',
      mileListId: 'ms-list-es03',
      mileSelector: '.ms-builder-card',
      totalDisplay: 'qb-total-es03',
      gstSubLabel: 'qb-gst-es03',
      gstRadioName: 'gst-es03',
      scopeId: 'scope-es03',
      expiryId: 'expiry-es03',
      submitSelector: 'button[onclick*="modal-es-submit"]',
      addBtnSelector: 'button[onclick*="addEstimatorMilestone"]'
    },
    {
      key: 'es03b',
      formRoot: 'es03b',
      mileListId: 'ms-list-es03b',
      mileSelector: '.ms-builder-card',
      totalDisplay: 'qb-total-es03b',
      gstSubLabel: 'qb-gst-es03b',
      gstRadioName: 'gst-es03b',
      scopeId: 'scope-es03b',
      expiryId: 'expiry-es03b',
      submitSelector: 'button[onclick*="modal-es-submit"]',
      addBtnSelector: 'button[onclick*="addEstimatorMilestone"]'
    }
  ];

  function fmtCurrency(n){
    return '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Find every milestone value input across a config's mileList,
  // independent of legacy class attribute.
  function getValueInputs(cfg){
    const list = document.getElementById(cfg.mileListId);
    if (!list) return [];
    // Tag inputs labelled "Value ($AUD)" — find them via type=number inside .input-group whose label includes "Value"
    const inputs = [];
    list.querySelectorAll('input[type="number"]').forEach(inp => {
      // Skip if not in a milestone-value role: heuristic — must have placeholder like "0.00" OR a value number,
      // and be inside an input-group whose label says "Value"
      const ig = inp.closest('.input-group');
      if (!ig) return;
      const lbl = ig.querySelector('label');
      const txt = (lbl && lbl.textContent || '').toLowerCase();
      if (txt.indexOf('value') === -1) return;
      inputs.push(inp);
      // Mark for delegation
      inp.setAttribute('data-milestone-value', '1');
      inp.setAttribute('min', '0');
      inp.setAttribute('step', '0.01');
    });
    return inputs;
  }

  // Wrap a value input with a "$" prefix div if not already wrapped
  function wrapValueInput(inp){
    if (inp.parentElement && inp.parentElement.classList.contains('qb-val-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'qb-val-wrap';
    inp.parentNode.insertBefore(wrap, inp);
    wrap.appendChild(inp);
  }

  // Get/create the % label for a given milestone card / row
  function getOrCreatePctLabel(cfg, valInput){
    const card = valInput.closest(cfg.mileSelector);
    if (!card) return null;
    let lbl = card.querySelector('.qb-pct-label');
    if (lbl) return lbl;

    // Try to repurpose an existing "X% of total" sibling div
    const ig = valInput.closest('.input-group');
    if (ig) {
      const sibling = ig.parentElement && ig.parentElement.querySelector('.muted.small');
      if (sibling && /%\s*of\s*total/i.test(sibling.textContent)) {
        sibling.classList.add('qb-pct-label');
        sibling.classList.remove('muted','small');
        return sibling;
      }
    }
    // Otherwise create one inside the value's input-group
    lbl = document.createElement('span');
    lbl.className = 'qb-pct-label';
    lbl.textContent = '— of total quote';
    if (ig) ig.appendChild(lbl);
    else valInput.parentElement.appendChild(lbl);
    return lbl;
  }

  // Recalculate totals + per-milestone percentages + GST sub-label + submit validation
  function recalcConfig(cfg){
    const vals = getValueInputs(cfg);
    let total = 0;
    vals.forEach(v => { total += parseFloat(v.value) || 0; });

    // Update total display
    const totalEl = document.getElementById(cfg.totalDisplay);
    if (totalEl) totalEl.textContent = fmtCurrency(total);

    // Update per-milestone % labels
    vals.forEach(v => {
      const lbl = getOrCreatePctLabel(cfg, v);
      if (!lbl) return;
      const v_num = parseFloat(v.value) || 0;
      if (total <= 0) {
        lbl.textContent = '— of total quote';
      } else {
        const pct = (v_num / total * 100).toFixed(1);
        lbl.textContent = pct + '% of total quote';
      }
      // Also update the header pct/val on .ms-builder-card if present
      const card = v.closest('.ms-builder-card');
      if (card) {
        const hVal = card.querySelector('.ms-header-val');
        const hPct = card.querySelector('.ms-header-pct');
        if (hVal) hVal.textContent = '$' + (v_num).toLocaleString('en-AU');
        if (hPct) hPct.textContent = total > 0 ? ((v_num/total*100).toFixed(1) + '%') : '—';
      }
    });

    // Update GST sub-label based on radio state
    if (cfg.gstSubLabel) {
      const sub = document.getElementById(cfg.gstSubLabel);
      const radio = document.querySelector('input[name="' + cfg.gstRadioName + '"]:checked');
      if (sub && radio) {
        sub.textContent = (radio.value === 'inc') ? 'Inclusive of GST' : 'Exclusive of GST';
      }
    }

    // Validate submit button
    const root = document.getElementById(cfg.formRoot);
    if (!root) return;
    const submitBtn = root.querySelector(cfg.submitSelector);
    if (submitBtn) {
      const expiry = cfg.expiryId ? (document.getElementById(cfg.expiryId)||{}).value : '1';
      const scope = cfg.scopeId ? ((document.getElementById(cfg.scopeId)||{}).value||'').trim() : 'x';
      const valid = total > 0 && !!expiry && !!scope;
      if (valid) {
        submitBtn.classList.remove('qb-submit-disabled');
        submitBtn.removeAttribute('aria-disabled');
      } else {
        submitBtn.classList.add('qb-submit-disabled');
        submitBtn.setAttribute('aria-disabled', 'true');
      }
    }
  }

  // Format value to 2dp on blur
  function attachBlurFormat(inp){
    if (inp._qbBlurAttached) return;
    inp._qbBlurAttached = true;
    inp.addEventListener('blur', function(){
      const n = parseFloat(this.value);
      if (!isNaN(n) && this.value !== '') {
        this.value = n.toFixed(2);
      }
    });
  }

  // Initialize a single config: wrap inputs, attach delegation
  function initConfig(cfg){
    const root = document.getElementById(cfg.formRoot);
    if (!root) return;
    const list = document.getElementById(cfg.mileListId);
    if (!list) return;

    // Mark root so locking CSS can find it later
    root.setAttribute('data-qb-config', cfg.key);

    // Wrap existing value inputs + add %-labels
    const initialVals = getValueInputs(cfg);
    initialVals.forEach(v => {
      wrapValueInput(v);
      attachBlurFormat(v);
      getOrCreatePctLabel(cfg, v);
    });

    // Event delegation on the milestone list (input + click for remove)
    if (!list._qbDelegated) {
      list._qbDelegated = true;
      list.addEventListener('input', function(e){
        const t = e.target;
        if (t.matches && t.matches('input[type="number"]')) {
          // Late-wrap newly-added inputs
          const ig = t.closest('.input-group');
          const lbl = ig && ig.querySelector('label');
          if (lbl && /value/i.test(lbl.textContent)) {
            t.setAttribute('data-milestone-value','1');
            t.setAttribute('min','0');
            t.setAttribute('step','0.01');
            wrapValueInput(t);
            attachBlurFormat(t);
            recalcConfig(cfg);
          }
        }
      });
      // Watch for removed milestones via MutationObserver
      const mo = new MutationObserver(function(muts){
        let needsRecalc = false;
        muts.forEach(m => {
          if (m.removedNodes && m.removedNodes.length) needsRecalc = true;
          if (m.addedNodes && m.addedNodes.length) {
            m.addedNodes.forEach(n => {
              if (n.nodeType === 1) {
                n.querySelectorAll && n.querySelectorAll('input[type="number"]').forEach(inp => {
                  const ig = inp.closest('.input-group');
                  const lbl = ig && ig.querySelector('label');
                  if (lbl && /value/i.test(lbl.textContent)) {
                    inp.setAttribute('data-milestone-value','1');
                    inp.setAttribute('min','0');
                    inp.setAttribute('step','0.01');
                    wrapValueInput(inp);
                    attachBlurFormat(inp);
                    needsRecalc = true;
                  }
                });
              }
            });
          }
        });
        if (needsRecalc) recalcConfig(cfg);
      });
      mo.observe(list, { childList:true, subtree:true });
    }

    // GST radio listeners
    document.querySelectorAll('input[name="' + cfg.gstRadioName + '"]').forEach(r => {
      r.addEventListener('change', () => recalcConfig(cfg));
    });

    // Scope + expiry listeners for validation
    const scope = cfg.scopeId && document.getElementById(cfg.scopeId);
    if (scope) scope.addEventListener('input', () => recalcConfig(cfg));
    const exp = cfg.expiryId && document.getElementById(cfg.expiryId);
    if (exp) exp.addEventListener('input', () => recalcConfig(cfg));

    // Initial calc
    recalcConfig(cfg);
  }

  // Lock helper — call setQuoteState('cs15','submitted') etc.
  window.setQuoteState = function(formRootId, state){
    const root = document.getElementById(formRootId);
    if (!root) return;
    const cfg = QB_CONFIGS.find(c => c.formRoot === formRootId);
    if (state === 'draft') {
      root.classList.remove('qb-locked');
      const banner = root.querySelector('.qb-status-banner');
      if (banner) banner.remove();
      if (cfg) recalcConfig(cfg);
      return;
    }
    root.classList.add('qb-locked');
    // Disable inputs
    root.querySelectorAll('input,textarea,select').forEach(el => {
      if (!el.hasAttribute('data-qb-orig-disabled')) {
        el.setAttribute('data-qb-orig-disabled', el.disabled ? '1' : '0');
      }
      el.disabled = true;
      el.readOnly = true;
    });
    // Insert / refresh banner at top of form
    let banner = root.querySelector('.qb-status-banner');
    const msg = state === 'accepted' ? 'This quote has been accepted by the homeowner. It can no longer be edited.'
              : state === 'declined' ? 'This quote was declined. It can no longer be edited.'
              : 'This quote has been submitted and cannot be edited.';
    const cls = (state === 'accepted' || state === 'declined') ? state : 'submitted';
    const iconCheck = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>';
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'qb-status-banner ' + cls;
      banner.innerHTML = iconCheck + '<span>' + msg + '</span>';
      const main = root.querySelector('.app-content');
      if (main) main.insertBefore(banner, main.firstChild);
    } else {
      banner.className = 'qb-status-banner ' + cls;
      banner.innerHTML = iconCheck + '<span>' + msg + '</span>';
    }
  };

  // Init all configs once DOM is ready
  function initAll(){
    QB_CONFIGS.forEach(initConfig);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Re-init when user navigates to a quote-builder screen (in case dynamic content was added)
  const _origGoTo = window.goTo;
  if (typeof _origGoTo === 'function') {
    window.goTo = function(id){
      const r = _origGoTo.apply(this, arguments);
      const cfg = QB_CONFIGS.find(c => c.formRoot === id);
      if (cfg) setTimeout(() => recalcConfig(cfg), 30);
      return r;
    };
  }
})();

/* === SPLIT-SITE BOOTSTRAP (rehydrate per-screen state) === */
(function(){
  function rehydrate(){
    var s=document.querySelector('.screen');
    if(!s)return;
    var id=s.id;
    try{
      var qs=sessionStorage.getItem('quoteState_'+id);
      if(qs && typeof window.setQuoteState==='function'){
        window.setQuoteState(id,qs);
        sessionStorage.removeItem('quoteState_'+id);
      }
    }catch(e){}
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',rehydrate);
  }else{
    rehydrate();
  }
})();
