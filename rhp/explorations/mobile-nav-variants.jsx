// Mobile Nav Variants — three approaches for hidden destinations
// V1: Current (More tab) · V2: Avatar account drawer + Inbox slot · V3: Account as 5th tab
const { useState } = React;

// ─── ICONS ────────────────────────────────────────────────────────
const I = {
  bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  dash: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  search: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  folder: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  team: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  more: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>,
  inbox: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  cert: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  bill: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  chev: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  close: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  setg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  hamburger: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

// ─── REUSABLE BITS ────────────────────────────────────────────────
function TopBar({ avatarMode = 'plain', onAvatar, onBell, leading }) {
  return (
    <div className="phone-topbar">
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        {leading}
        <div className="brand"><span className="dot">R</span>RenoLogic</div>
      </div>
      <div className="right">
        <button className="bell-wrap" onClick={onBell} aria-label="Notifications">
          {I.bell}<span className="badge">2</span>
        </button>
        <button onClick={onAvatar} aria-label="Account" style={{background:'none',border:'none',padding:0,cursor:'pointer'}}>
          <div className={'avatar' + (avatarMode==='ringed'?' with-ring':'')}>MC</div>
        </button>
      </div>
    </div>
  );
}

function DashboardBody({ compact = false }) {
  return (
    <div className="phone-body">
      <p className="greeting">Mon, 28 Apr · Pacific Build Co</p>
      <h1 className="h1">Good morning, Mark</h1>
      <p className="body-line">You have <strong>3 items</strong> awaiting action and <strong>1 active project</strong>.</p>
      <div className="hero-actions">
        <button className="hero-btn">View Projects</button>
        <button className="hero-btn primary">{I.plus} Create Job</button>
      </div>
      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-lbl">Total Recorded</p>
          <p className="stat-val">$29,000</p>
          <p className="stat-sub">1 active project</p>
        </div>
        <div className="stat-card">
          <p className="stat-lbl">Recorded Paid</p>
          <p className="stat-val green">$7,700</p>
          <p className="stat-sub">26.5% of contract</p>
        </div>
        <div className="stat-card">
          <p className="stat-lbl">Outstanding</p>
          <p className="stat-val orange">$21,300</p>
          <p className="stat-sub">2 milestones</p>
        </div>
        <div className="stat-card">
          <p className="stat-lbl">Active Projects</p>
          <p className="stat-val">1</p>
          <p className="stat-sub">Surry Hills Reno</p>
        </div>
      </div>
      {!compact && (
        <div className="card" style={{marginTop:10}}>
          <p className="card-h">Project Financials</p>
          <p className="card-sub">Contract values · record-keeping only</p>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11}}>
            <div><div style={{color:'var(--muted)'}}>Contract</div><div style={{fontWeight:600,marginTop:2}}>$29,000</div></div>
            <div><div style={{color:'var(--muted)'}}>Paid</div><div style={{fontWeight:600,color:'#2E7D32',marginTop:2}}>$7,700</div></div>
            <div><div style={{color:'var(--muted)'}}>Outstanding</div><div style={{fontWeight:600,color:'var(--accent)',marginTop:2}}>$21,300</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ active, label, icon, dot }) {
  return (
    <button className={'nav-item' + (active?' active':'')}>
      <span className="nav-ico">{icon}</span>
      {label}
      {dot && <span className="nav-dot"/>}
    </button>
  );
}

// ─── V1: CURRENT (More tab opens centered modal) ──────────────────
function V1Phone() {
  const [open, setOpen] = useState(false);
  return (
    <div className="phone-bg">
      <TopBar/>
      <DashboardBody/>
      <nav className="bottom-nav">
        <NavItem active label="Dashboard" icon={I.dash}/>
        <NavItem label="Browse" icon={I.search}/>
        <NavItem label="Projects" icon={I.folder}/>
        <NavItem label="Team" icon={I.team}/>
        <button className={'nav-item' + (open?' active':'')} onClick={()=>setOpen(!open)}>
          <span className="nav-ico">{I.more}</span>More
        </button>
      </nav>
      {open && (
        <div className="sheet-overlay" onClick={()=>setOpen(false)}>
          <div className="sheet" onClick={(e)=>e.stopPropagation()} style={{maxHeight:'62%'}}>
            <div className="sheet-handle"/>
            <div className="sheet-head">
              <div><p className="sheet-title">More</p><p className="sheet-sub">Pacific Build Co · Mark Chen</p></div>
              <button className="sheet-close" onClick={()=>setOpen(false)}>{I.close}</button>
            </div>
            <div className="sheet-list">
              <button className="sheet-row"><span className="ic">{I.user}</span><span className="lbl">My Profile</span><span className="chev">{I.chev}</span></button>
              <button className="sheet-row"><span className="ic">{I.cert}</span><span className="lbl">Certificates &amp; Insurance</span><span className="chev">{I.chev}</span></button>
              <button className="sheet-row"><span className="ic">{I.bill}</span><span className="lbl">Subscription &amp; Billing</span><span className="chev">{I.chev}</span></button>
              <div className="sheet-divider"/>
              <button className="sheet-row danger"><span className="ic">{I.logout}</span><span className="lbl">Log Out</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── V2: AVATAR DRAWER + INBOX SLOT (RECOMMENDED) ─────────────────
function V2Phone() {
  const [open, setOpen] = useState(false);
  return (
    <div className="phone-bg">
      <TopBar avatarMode="ringed" onAvatar={()=>setOpen(true)}/>
      <DashboardBody/>
      <nav className="bottom-nav">
        <NavItem active label="Dashboard" icon={I.dash}/>
        <NavItem label="Browse" icon={I.search}/>
        <NavItem label="Projects" icon={I.folder}/>
        <NavItem label="Team" icon={I.team}/>
        <NavItem label="Inbox" icon={I.inbox} dot={true}/>
      </nav>
      {open && (
        <div className="sheet-overlay" onClick={()=>setOpen(false)}>
          <div className="sheet" onClick={(e)=>e.stopPropagation()} style={{maxHeight:'70%'}}>
            <div className="sheet-handle"/>
            <div className="sheet-account">
              <div className="avatar">MC</div>
              <div className="sheet-account-info">
                <p className="sheet-account-name">Mark Chen</p>
                <p className="sheet-account-role">Pacific Build Co · Contractor Owner</p>
              </div>
              <button className="sheet-close" onClick={()=>setOpen(false)}>{I.close}</button>
            </div>
            <div style={{height:'0.5px',background:'var(--border-light)',margin:'0 0 6px'}}/>
            <div className="sheet-list">
              <button className="sheet-row"><span className="ic">{I.user}</span><span className="lbl">My Profile<div className="lbl-sub">Personal &amp; firm details</div></span><span className="chev">{I.chev}</span></button>
              <button className="sheet-row"><span className="ic">{I.cert}</span><span className="lbl">Certificates &amp; Insurance<div className="lbl-sub">2 expiring soon</div></span><span className="chev">{I.chev}</span></button>
              <button className="sheet-row"><span className="ic">{I.bill}</span><span className="lbl">Subscription &amp; Billing<div className="lbl-sub">Active · renews 28 May</div></span><span className="chev">{I.chev}</span></button>
              <button className="sheet-row"><span className="ic">{I.setg}</span><span className="lbl">Settings &amp; Notifications</span><span className="chev">{I.chev}</span></button>
              <div className="sheet-divider"/>
              <button className="sheet-row danger"><span className="ic">{I.logout}</span><span className="lbl">Log Out</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── V3: ACCOUNT AS 5TH TAB (full route) ──────────────────────────
function V3Phone() {
  const [page, setPage] = useState('dash');
  return (
    <div className="phone-bg">
      <TopBar/>
      {page === 'dash' && <DashboardBody compact/>}
      {page === 'account' && (
        <div className="phone-body">
          <h1 className="h1" style={{marginBottom:12}}>Account</h1>
          <div className="account-tile">
            <div className="avatar">MC</div>
            <div className="account-tile-info">
              <p className="account-tile-name">Mark Chen</p>
              <p className="account-tile-role">Pacific Build Co · Contractor Owner</p>
            </div>
            <span className="chev" style={{color:'var(--muted-2)'}}>{I.chev}</span>
          </div>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:0.6,color:'var(--muted)',textTransform:'uppercase',margin:'14px 4px 6px'}}>Compliance</p>
          <div className="nav-list" style={{marginBottom:12}}>
            <div className="nav-list-row"><span className="ic">{I.cert}</span><span className="lbl">Certificates &amp; Insurance</span><span className="chev">{I.chev}</span></div>
          </div>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:0.6,color:'var(--muted)',textTransform:'uppercase',margin:'10px 4px 6px'}}>Account</p>
          <div className="nav-list" style={{marginBottom:12}}>
            <div className="nav-list-row"><span className="ic">{I.bill}</span><span className="lbl">Subscription &amp; Billing</span><span className="chev">{I.chev}</span></div>
            <div className="nav-list-row"><span className="ic">{I.setg}</span><span className="lbl">Settings &amp; Notifications</span><span className="chev">{I.chev}</span></div>
          </div>
          <div className="nav-list">
            <div className="nav-list-row" style={{color:'var(--danger)'}}><span className="ic" style={{background:'#FFEBEE',color:'var(--danger)'}}>{I.logout}</span><span className="lbl" style={{color:'var(--danger)'}}>Log Out</span></div>
          </div>
        </div>
      )}
      <nav className="bottom-nav">
        <button className={'nav-item' + (page==='dash'?' active':'')} onClick={()=>setPage('dash')}><span className="nav-ico">{I.dash}</span>Dashboard</button>
        <button className="nav-item"><span className="nav-ico">{I.search}</span>Browse</button>
        <button className="nav-item"><span className="nav-ico">{I.folder}</span>Projects</button>
        <button className="nav-item"><span className="nav-ico">{I.team}</span>Team</button>
        <button className={'nav-item' + (page==='account'?' active':'')} onClick={()=>setPage('account')}>
          <span className="nav-ico"><div className={'avatar' + (page==='account'?' with-ring':'')} style={{width:22,height:22,fontSize:9}}>MC</div></span>
          Account
        </button>
      </nav>
    </div>
  );
}

// ─── INBOX PREVIEW (companion to V2) ──────────────────────────────
function V2InboxPhone() {
  return (
    <div className="phone-bg">
      <TopBar avatarMode="ringed"/>
      <div className="phone-body" style={{paddingBottom:80}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8}}>
          <div>
            <h1 className="h1" style={{marginBottom:2}}>Inbox</h1>
            <p style={{fontSize:11,color:'var(--muted)',margin:0}}>5 new · everything that needs your attention</p>
          </div>
        </div>
        <div className="filter-chips">
          <button className="chip active">All (5)</button>
          <button className="chip">Quotes</button>
          <button className="chip">Milestones</button>
          <button className="chip">Messages</button>
          <button className="chip">Compliance</button>
        </div>
        <div>
          <div className="inbox-row">
            <span className="inbox-icon alert">!</span>
            <div className="inbox-text">
              <p className="inbox-title">Quote for Bondi job expires in 3 days</p>
              <p className="inbox-sub">Respond before 1 May to keep slot</p>
              <p className="inbox-time">2h ago</p>
            </div>
            <span className="inbox-unread-dot"/>
          </div>
          <div className="inbox-row">
            <span className="inbox-icon evidence">✓</span>
            <div className="inbox-text">
              <p className="inbox-title">Sarah acknowledged M2 evidence</p>
              <p className="inbox-sub">Surry Hills Kitchen Reno · $7,700 marked received</p>
              <p className="inbox-time">Yesterday</p>
            </div>
            <span className="inbox-unread-dot"/>
          </div>
          <div className="inbox-row">
            <span className="inbox-icon quote">$</span>
            <div className="inbox-text">
              <p className="inbox-title">3 contractors expressed interest</p>
              <p className="inbox-sub">Bondi Bathroom Refresh · view shortlist</p>
              <p className="inbox-time">Yesterday</p>
            </div>
            <span className="inbox-unread-dot"/>
          </div>
          <div className="inbox-row">
            <span className="inbox-icon message">M</span>
            <div className="inbox-text">
              <p className="inbox-title">Sarah Chen replied on M3</p>
              <p className="inbox-sub">"Looks good — Calacatta confirmed"</p>
              <p className="inbox-time">2 days ago</p>
            </div>
          </div>
          <div className="inbox-row">
            <span className="inbox-icon alert">!</span>
            <div className="inbox-text">
              <p className="inbox-title">Public Liability cert expires in 14 days</p>
              <p className="inbox-sub">Upload renewal to keep firm Verified</p>
              <p className="inbox-time">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="bottom-nav">
        <NavItem label="Dashboard" icon={I.dash}/>
        <NavItem label="Browse" icon={I.search}/>
        <NavItem label="Projects" icon={I.folder}/>
        <NavItem label="Team" icon={I.team}/>
        <NavItem active label="Inbox" icon={I.inbox}/>
      </nav>
    </div>
  );
}

// ─── V4: HAMBURGER DRAWER (all 7 destinations) ────────────────────
function V4Phone() {
  const [open, setOpen] = useState(false);
  const navItem = (icon, label, opts={}) => (
    <button style={{
      display:'flex',alignItems:'center',gap:14,width:'100%',padding:'13px 16px',
      background:opts.active?'#FFF4EC':'none',border:'none',
      color:opts.active?'var(--accent)':'#1E1E1E',
      fontFamily:'inherit',fontSize:14,fontWeight:opts.active?600:500,
      cursor:'pointer',textAlign:'left',borderRadius:0,position:'relative'
    }}>
      <span style={{display:'flex',color:opts.active?'var(--accent)':'#424242',width:22}}>{icon}</span>
      <span style={{flex:1}}>{label}</span>
      {opts.dot && <span style={{width:8,height:8,borderRadius:'50%',background:'var(--danger)'}}/>}
      {opts.badge && <span style={{background:'#FFEBEE',color:'var(--danger)',fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:8}}>{opts.badge}</span>}
      {opts.active && <span style={{position:'absolute',left:0,top:8,bottom:8,width:3,background:'var(--accent)',borderRadius:'0 2px 2px 0'}}/>}
    </button>
  );
  return (
    <div className="phone-bg">
      <TopBar leading={
        <button onClick={()=>setOpen(true)} aria-label="Menu" style={{background:'none',border:'none',padding:6,cursor:'pointer',display:'flex',color:'#1E1E1E',marginRight:2}}>
          {I.hamburger}
        </button>
      }/>
      <DashboardBody/>
      <nav className="bottom-nav">
        <NavItem active label="Dashboard" icon={I.dash}/>
        <NavItem label="Browse" icon={I.search}/>
        <NavItem label="Projects" icon={I.folder}/>
        <NavItem label="Team" icon={I.team}/>
        <NavItem label="Inbox" icon={I.inbox} dot={true}/>
      </nav>
      {open && (
        <div style={{position:'absolute',inset:0,zIndex:20}}>
          {/* scrim */}
          <div onClick={()=>setOpen(false)} style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.45)',animation:'fadeIn .2s ease-out'}}/>
          {/* drawer */}
          <div style={{
            position:'absolute',top:0,bottom:0,left:0,width:'82%',background:'#fff',
            boxShadow:'4px 0 24px rgba(0,0,0,0.12)',display:'flex',flexDirection:'column',
            animation:'slideRight .26s cubic-bezier(0.32,0.72,0.16,1)'
          }}>
            {/* drawer header */}
            <div style={{padding:'16px 16px 12px',borderBottom:'0.5px solid var(--border-light)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div className="brand"><span className="dot">R</span>RenoLogic</div>
              <button onClick={()=>setOpen(false)} aria-label="Close" style={{background:'none',border:'none',padding:6,color:'var(--muted)',cursor:'pointer',display:'flex'}}>{I.close}</button>
            </div>
            {/* drawer nav */}
            <div style={{flex:1,overflowY:'auto',padding:'8px 0'}}>
              {navItem(I.dash, 'Dashboard', {active:true})}
              {navItem(I.search, 'Browse Jobs')}
              {navItem(I.folder, 'My Projects')}
              {navItem(I.team, 'Team')}
              {navItem(I.inbox, 'Inbox', {dot:true})}
              <div style={{height:0.5,background:'var(--border-light)',margin:'8px 16px'}}/>
              <p style={{fontSize:10,fontWeight:700,letterSpacing:0.6,color:'var(--muted)',textTransform:'uppercase',margin:'8px 16px 4px'}}>Account</p>
              {navItem(I.cert, 'Certificates & Insurance', {badge:'2 expiring'})}
              {navItem(I.bill, 'Subscription & Billing')}
              {navItem(I.user, 'My Profile')}
              {navItem(I.setg, 'Settings & Notifications')}
            </div>
            {/* drawer footer */}
            <div style={{borderTop:'0.5px solid var(--border-light)',padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
              <div className="avatar">MC</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:0,fontSize:13,fontWeight:600}}>Mark Chen</p>
                <p style={{margin:'1px 0 0',fontSize:11,color:'var(--muted)'}}>Pacific Build Co</p>
              </div>
              <button aria-label="Log out" style={{background:'#FFEBEE',color:'var(--danger)',border:'none',width:36,height:36,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{I.logout}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PHONE WRAPPER (use raw frame, no IOSDevice nav chrome) ───────
function Phone({ children, w = 360, h = 720 }) {
  return (
    <div style={{
      width: w, height: h, background: '#000', borderRadius: 36, padding: 9,
      boxShadow: '0 18px 50px -10px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)'
    }}>
      <div style={{width:'100%',height:'100%',background:'#fff',borderRadius:28,overflow:'hidden',position:'relative'}}>
        {/* status bar */}
        <div style={{height:30,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',fontSize:12,fontWeight:600,color:'#000',position:'relative',zIndex:5}}>
          <span>9:41</span>
          <div style={{display:'flex',alignItems:'center',gap:5}}>
            {/* signal */}
            <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="4" y="6" width="3" height="6" rx="0.5"/><rect x="8" y="3" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
            <svg width="14" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 5 Q8 0 14 5"/><path d="M4 7 Q8 3 12 7"/><circle cx="8" cy="9.5" r="1" fill="currentColor"/></svg>
            {/* battery */}
            <svg width="22" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" opacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="1.2" fill="currentColor"/><rect x="22" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.4"/></svg>
          </div>
        </div>
        <div style={{height:`calc(100% - 30px)`,position:'relative',overflow:'hidden'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── CAPTIONS ─────────────────────────────────────────────────────
function Caption({ children }) {
  return <div className="ab-caption">{children}</div>;
}

// ─── MAIN ─────────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas>
      <DCSection id="overview" title="Mobile Nav — four approaches" subtitle="The CO has 7 destinations. Bottom nav fits 5. Where do the other 2–3 (Profile · Certs · Subscription) go? Plus where do notifications live?">
        {/* V1 — Current */}
        <DCArtboard id="v1" label="V1 · Current — More sheet" width={760} height={760}>
          <div style={{display:'flex',gap:24,padding:'24px',background:'#FAFAFA',width:'100%',height:'100%',alignItems:'center'}}>
            <Phone><V1Phone/></Phone>
            <Caption>
              <span className="badge-cur">Current</span>
              <h3>"More" tab → centred modal</h3>
              <p>The 5th bottom-nav slot is "More". Tapping it opens a centered modal listing Profile, Certs, Subscription, Log Out.</p>
              <div className="label pros">Pros</div>
              <ul><li>Industry-standard pattern (Instagram, LinkedIn use it)</li><li>Keeps Profile/Billing out of nav noise</li></ul>
              <div className="label cons">Cons</div>
              <ul>
                <li><b>No place for notifications</b> — bell shows count, but no Inbox screen for the audit trail</li>
                <li>Centred modal feels desktop-like, not iOS/Android-native</li>
                <li>Avatar in topbar is decorative — does nothing</li>
                <li>Certs &amp; Insurance is buried; contractors update licences often</li>
              </ul>
            </Caption>
          </div>
        </DCArtboard>

        {/* V2 — Avatar drawer + Inbox tab */}
        <DCArtboard id="v2" label="V2 · Avatar menu + Inbox tab (recommended)" width={1180} height={760}>
          <div style={{display:'flex',gap:24,padding:'24px',background:'#FAFAFA',width:'100%',height:'100%',alignItems:'center'}}>
            <Phone><V2Phone/></Phone>
            <Phone><V2InboxPhone/></Phone>
            <Caption>
              <span className="badge-rec">Recommended</span>
              <h3>Avatar drawer + Inbox tab</h3>
              <p>Topbar avatar opens a bottom-sheet account drawer (Profile, Certs, Subscription, Log Out). The freed 5th nav slot becomes <b>Inbox</b> — a unified feed of milestone acks, quote replies, expiring quotes, cert renewals.</p>
              <div className="label pros">Pros</div>
              <ul>
                <li>Native pattern (Gmail, LinkedIn, Slack)</li>
                <li>Notifications get a real home — bell + tappable Inbox</li>
                <li>Avatar earns its place; ringed when sheet open</li>
                <li>Bottom-sheet is platform-native (drag handle, slides up)</li>
                <li>Sub-labels show state ("2 expiring soon", "Renews 28 May")</li>
              </ul>
              <div className="label cons">Cons</div>
              <ul><li>Avatar-as-menu is learned behaviour — first-time users may not discover it (mitigated by ring + the bell still being visible)</li></ul>
            </Caption>
          </div>
        </DCArtboard>

        {/* V3 — Account as 5th tab */}
        <DCArtboard id="v3" label="V3 · Account as 5th tab" width={760} height={760}>
          <div style={{display:'flex',gap:24,padding:'24px',background:'#FAFAFA',width:'100%',height:'100%',alignItems:'center'}}>
            <Phone><V3Phone/></Phone>
            <Caption>
              <h3>Account as a real route</h3>
              <p>The 5th tab is "Account" with the user's avatar as the icon. Tapping it navigates to a dedicated Account page (not a sheet) with sectioned lists.</p>
              <div className="label pros">Pros</div>
              <ul>
                <li>Most discoverable — destination is in the nav</li>
                <li>Account screen can grow (settings, billing history, audit log) without crowding a sheet</li>
                <li>Avatar-as-tab is a familiar Twitter/X/Threads pattern</li>
              </ul>
              <div className="label cons">Cons</div>
              <ul>
                <li><b>Still no Inbox</b> — same blind spot as V1</li>
                <li>Account is low-frequency — wastes a permanent nav slot</li>
                <li>Full-page route for what's essentially a list of links is heavy</li>
              </ul>
            </Caption>
          </div>
        </DCArtboard>
        {/* V4 — Hamburger drawer */}
        <DCArtboard id="v4" label="V4 · Hamburger drawer (all 7 visible)" width={760} height={760}>
          <div style={{display:'flex',gap:24,padding:'24px',background:'#FAFAFA',width:'100%',height:'100%',alignItems:'center'}}>
            <Phone><V4Phone/></Phone>
            <Caption>
              <span className="badge-rec">Best for "all options visible"</span>
              <h3>Hamburger drawer</h3>
              <p>Hamburger icon on the topbar opens a full-height drawer from the left listing <b>all 7 destinations</b> as a vertical list — same hierarchy as the desktop sidebar. Bottom-nav still keeps the 5 most-frequent (Dashboard, Browse, Projects, Team, Inbox) for thumb reach.</p>
              <div className="label pros">Pros</div>
              <ul>
                <li><b>Every destination one tap away from anywhere</b></li>
                <li>1:1 with desktop sidebar — same mental model across form factors</li>
                <li>Drawer can show state on every item (cert expiry badges, billing renewal)</li>
                <li>Profile + log out sit at the bottom of the drawer (matches desktop)</li>
                <li>Used by Gmail, YouTube, Asana, ClickUp</li>
              </ul>
              <div className="label cons">Cons</div>
              <ul>
                <li>Hamburger is a "less iOS-native" pattern (still universal on Android)</li>
                <li>Top-left corner is a long thumb stretch on tall phones</li>
                <li>Drawer + bottom-nav duplicate the 5 main destinations (intentional, but more surface)</li>
              </ul>
            </Caption>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="reco" title="Recommendation" subtitle="">
        <DCArtboard id="reco-card" label="V2 vs V4" width={1180} height={360}>
          <div style={{padding:32,background:'#fff',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <h2 style={{margin:'0 0 14px',fontSize:22,fontWeight:700}}>Pick by goal: V2 or V4</h2>
            <p style={{margin:'0 0 16px',fontSize:14,color:'#444',lineHeight:1.55,maxWidth:980}}>Both V2 and V4 promote <b>Inbox</b> to the bottom-nav so the audit trail (milestone acks, quote replies, expiring quotes, cert renewals) gets a real screen. The difference is where account-level destinations live.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              <div style={{border:'1.5px solid var(--accent)',borderRadius:12,padding:18,background:'#FFFAF6'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <span className="badge-rec">RECOMMENDED — V2</span>
                  <h3 style={{margin:0,fontSize:16}}>Avatar drawer</h3>
                </div>
                <p style={{margin:'0 0 8px',fontSize:13,color:'#444',lineHeight:1.5}}>Native iOS/Android pattern. Topbar avatar opens a bottom-sheet with Profile, Certs, Subscription, Log Out. Cleaner home screen, less chrome.</p>
                <p style={{margin:0,fontSize:12,color:'#666'}}><b>Pick if:</b> users are mostly on iOS, you want a polished native feel, and account screens are visited rarely.</p>
              </div>
              <div style={{border:'1.5px solid #1E1E1E',borderRadius:12,padding:18}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <span style={{display:'inline-block',background:'#1E1E1E',color:'#fff',fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:10,letterSpacing:0.3}}>ALTERNATIVE — V4</span>
                  <h3 style={{margin:0,fontSize:16}}>Hamburger drawer</h3>
                </div>
                <p style={{margin:'0 0 8px',fontSize:13,color:'#444',lineHeight:1.5}}>All 7 destinations always one tap away. Drawer mirrors the desktop sidebar 1:1 — same mental model across mobile + desktop. Best discoverability.</p>
                <p style={{margin:0,fontSize:12,color:'#666'}}><b>Pick if:</b> client wants <i>"all options visible"</i>, contractors update certs/billing often, or you want max consistency with desktop.</p>
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
