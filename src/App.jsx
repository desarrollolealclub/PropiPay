import { useState } from "react";

const C = {
  green: "#3DD44A", greenDark: "#1A7A2A", greenMid: "#2ECC40", greenLight: "#7EF08A",
  coral: "#F2603D", blue: "#00B4D8",
  bg: "#0D1B2A", bgCard: "#132333", bgCard2: "#1A2F42",
  text: "#F0F4F8", textMuted: "#7A9BB5", border: "#1E3448",
  success: "#2ECC71", warning: "#F39C12",
};

const s = {
  app: { background: C.bg, minHeight: "100vh", fontFamily: "sans-serif", color: C.text },
  card: { background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 16 },
  card2: { background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 8 },
  inp: { width: "100%", padding: "10px 14px", background: "#1A2F42", border: `1px solid #1E3448`, borderRadius: 8, color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" },
  btnG: { padding: "11px 20px", background: C.green, color: C.greenDark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" },
  btnO: (c) => ({ padding: "11px 20px", background: "transparent", color: c || C.green, border: `1px solid ${c || C.green}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" }),
  btnSm: { padding: "7px 14px", background: C.green, color: C.greenDark, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  btnSmO: { padding: "7px 14px", background: "transparent", color: C.blue, border: `1px solid ${C.blue}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" },
  stat: { background: C.bgCard2, borderRadius: 10, padding: "14px 16px", flex: 1, border: `1px solid ${C.border}` },
  divider: { height: 1, background: C.border, margin: "14px 0" },
};

const pill = (a) => ({ padding: "7px 14px", borderRadius: 20, border: `1px solid ${a ? C.green : C.border}`, background: a ? "#0d2e12" : "transparent", color: a ? C.green : C.textMuted, fontSize: 13, cursor: "pointer" });
const badge = (t) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: t==="green"?"#1a3d2b":t==="blue"?"#0a2a3d":t==="warn"?"#3d2a0a":"#3d1a1a", color: t==="green"?C.success:t==="blue"?C.blue:t==="warn"?C.warning:"#ff6b6b" });
const bub = (w) => ({ maxWidth: "80%", padding: "10px 14px", borderRadius: 14, fontSize: 13, lineHeight: 1.6, alignSelf: w==="bot"?"flex-start":"flex-end", background: w==="bot"?C.bgCard2:C.green, color: w==="bot"?C.text:C.greenDark, border: w==="bot"?`1px solid ${C.border}`:"none", borderBottomLeftRadius: w==="bot"?4:14, borderBottomRightRadius: w==="bot"?14:4, fontWeight: w==="user"?600:"normal" });
const avc = ["#F2603D","#00B4D8","#9B59B6","#2ECC71","#F39C12"];
const ini = (n) => (n||"").trim().split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
const av = (i,sz=36) => ({ width:sz, height:sz, borderRadius:"50%", background:avc[i%5], display:"flex", alignItems:"center", justifyContent:"center", fontSize:sz*0.33, fontWeight:700, color:"#fff", flexShrink:0 });

function PPLogo({ size = 36 }) {
  const isLarge = size >= 60;
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ppbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F2E16"/>
          <stop offset="100%" stopColor="#071A0C"/>
        </linearGradient>
        <linearGradient id="ppbolt" x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="#8FFCA0"/>
          <stop offset="50%" stopColor="#3DD44A"/>
          <stop offset="100%" stopColor="#0E8C20"/>
        </linearGradient>
      </defs>
      <rect width="160" height="100" rx="28" fill="url(#ppbg)"/>
      <rect x="2" y="2" width="156" height="96" rx="26" fill="none" stroke="#3DD44A" strokeWidth="1.2" opacity="0.35"/>
      <polygon points="92,10 60,56 80,56 68,90 108,40 86,40" fill="url(#ppbolt)"/>
      <polygon points="88,16 70,52 82,52 74,76 96,46 82,46" fill="white" opacity="0.10"/>
      {isLarge && <><circle cx="22" cy="22" r="3" fill="#3DD44A" opacity="0.5"/><circle cx="138" cy="22" r="3" fill="#3DD44A" opacity="0.5"/><circle cx="22" cy="78" r="3" fill="#3DD44A" opacity="0.3"/><circle cx="138" cy="78" r="3" fill="#3DD44A" opacity="0.3"/></>}
      {!isLarge && <><circle cx="14" cy="14" r="2" fill="#3DD44A" opacity="0.5"/><circle cx="146" cy="14" r="2" fill="#3DD44A" opacity="0.5"/></>}
    </svg>
  );
}

// PIN Modal
function PinModal({ name, onSuccess, onCancel }) {
  const [pin, setPin] = useState(""), [err, setErr] = useState(false);
  const tap = (d) => {
    if (d==="⌫") { setPin(p=>p.slice(0,-1)); return; }
    if (!d) return;
    const np = pin+d; setPin(np);
    if (np.length===4) setTimeout(()=>{ if(np==="1234") onSuccess(); else { setErr(true); setPin(""); }}, 200);
  };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:16, padding:28, width:300, textAlign:"center" }}>
        <div style={{ fontSize:16, fontWeight:600, marginBottom:4 }}>{name}</div>
        <div style={{ fontSize:12, color:C.textMuted, marginBottom:20 }}>Código de 4 dígitos</div>
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:16 }}>
          {[0,1,2,3].map(i=><div key={i} style={{ width:44, height:44, borderRadius:8, border:`2px solid ${err?"#ff4444":pin.length>i?C.green:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, background:C.bgCard2, color:C.green }}>{pin.length>i?"●":""}</div>)}
        </div>
        {err && <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:8 }}>Código incorrecto.</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:10 }}>
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d,i)=>(
            <button key={i} onClick={()=>tap(d)} style={{ padding:"13px 0", borderRadius:8, border:`1px solid ${C.border}`, background:C.bgCard2, color:C.text, fontSize:16, fontWeight:600, cursor:d?"pointer":"default", opacity:d?1:0 }}>{d}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:C.textMuted, marginBottom:10 }}>Demo: usa 1234</div>
        <button onClick={onCancel} style={s.btnO()}> Cancelar</button>
      </div>
    </div>
  );
}

// BT Modal
function BTModal({ onClose }) {
  const [state, setState] = useState("scanning");
  const devices = ["POS Veritran-001","POS Bangente-X2","Terminal TDC-08"];
  const [connected, setConnected] = useState(null);
  const connect = (d) => { setState("connecting"); setTimeout(()=>{ setConnected(d); setState("connected"); }, 1500); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:16, padding:24, width:320 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:16, fontWeight:600 }}>Conectar POS por Bluetooth</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, fontSize:20, cursor:"pointer" }}>×</button>
        </div>
        {state==="scanning" && (
          <div>
            <div style={{ fontSize:13, color:C.textMuted, marginBottom:12 }}>Dispositivos encontrados:</div>
            {devices.map((d,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:C.bgCard2, borderRadius:8, marginBottom:8, cursor:"pointer" }} onClick={()=>connect(d)}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:C.blue, boxShadow:`0 0 6px ${C.blue}` }} />
                <span style={{ flex:1, fontSize:13 }}>{d}</span>
                <span style={{ fontSize:11, color:C.textMuted }}>Conectar</span>
              </div>
            ))}
          </div>
        )}
        {state==="connecting" && <div style={{ textAlign:"center", padding:"20px 0", color:C.textMuted }}>Conectando...</div>}
        {state==="connected" && (
          <div style={{ textAlign:"center", padding:"10px 0" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>✓</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.green, marginBottom:4 }}>Conectado</div>
            <div style={{ fontSize:13, color:C.textMuted, marginBottom:16 }}>{connected}</div>
            <button style={s.btnG} onClick={onClose}>Listo</button>
          </div>
        )}
      </div>
    </div>
  );
}

// AUTH Modal
function AuthModal({ onLogin, onClose }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ nombre:"", email:"", tel:"", pass:"" });
  const submit = () => { onLogin({ nombre: form.nombre||"Usuario", email: form.email, rol: "usuario" }); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:16, padding:28, width:320 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <PPLogo size={32} />
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setMode("login")} style={{ ...pill(mode==="login"), fontSize:12 }}>Iniciar sesión</button>
            <button onClick={()=>setMode("register")} style={{ ...pill(mode==="register"), fontSize:12 }}>Registrarse</button>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, fontSize:20, cursor:"pointer" }}>×</button>
        </div>
        {mode==="register" && (
          <div>
            <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Nombre completo</label>
            <input style={{ ...s.inp, marginBottom:10 }} placeholder="Tu nombre" value={form.nombre} onChange={e=>setForm(f=>({...f,nombre:e.target.value}))} />
          </div>
        )}
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Correo electrónico</label>
        <input style={{ ...s.inp, marginBottom:10 }} placeholder="correo@ejemplo.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
        {mode==="register" && (
          <div>
            <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Teléfono</label>
            <input style={{ ...s.inp, marginBottom:10 }} placeholder="+58 412 000 0000" value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))} />
          </div>
        )}
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Contraseña</label>
        <input type="password" style={{ ...s.inp, marginBottom:16 }} placeholder="••••••••" value={form.pass} onChange={e=>setForm(f=>({...f,pass:e.target.value}))} />
        <button style={s.btnG} onClick={submit}>{mode==="login"?"Iniciar sesión":"Crear cuenta"}</button>
        <div style={{ fontSize:11, color:C.textMuted, textAlign:"center", marginTop:10 }}>Demo: cualquier dato funciona</div>
      </div>
    </div>
  );
}

// SHIFT BUILDER
const shiftQs = [
  { key:"lugar", q:"¡Hola! Vamos a crear tu turno. ¿Cómo se llama el negocio?", type:"text", ph:"Ej: Restaurante El Palmar" },
  { key:"fecha", q:"¿Cuál es la fecha del turno?", type:"date" },
  { key:"inicio", q:"¿A qué hora comienza?", type:"opts", opts:["6:00 AM","7:00 AM","8:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM"] },
  { key:"fin", q:"¿A qué hora termina?", type:"opts", opts:["2:00 PM","3:00 PM","4:00 PM","6:00 PM","8:00 PM","10:00 PM","12:00 AM","2:00 AM"] },
  { key:"empleados", q:"Agrega los empleados con su código de 4 dígitos.", type:"emps" },
  { key:"roles", q:"¿Qué roles hay en este turno?", type:"multi", opts:["Meser@","Cocinero/a","Bartender","Cajero/a","Anfitrión/a","Limpieza"] },
  { key:"dist", q:"¿Cómo se distribuyen las propinas?", type:"opts", opts:["Porcentaje personalizado","Partes iguales","Cada mesero acumula las suyas","Solo meseros","Todos por igual"] },
  { key:"pcts", q:"Asigna porcentaje a cada empleado (debe sumar 100%).", type:"pct" },
  { key:"bono", q:"¿Habrá bono adicional?", type:"opts", opts:["No, solo propinas","Sí, bono fijo","Sí, bono por metas","Decidir después"] },
  { key:"done", q:"¡Listo! Revisa el resumen del turno.", type:"summary" },
];

function ShiftBuilder({ initial, onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial||{});
  const [msgs, setMsgs] = useState([{w:"bot",t:shiftQs[0].q}]);
  const [emps, setEmps] = useState(initial?.empList||[]);
  const [sel, setSel] = useState(new Set(initial?.roles?initial.roles.split(", "):[]));
  const [tmp, setTmp] = useState({nombre:"",codigo:""});
  const [txt, setTxt] = useState("");
  const [pcts, setPcts] = useState({});
  const [pctErr, setPctErr] = useState(false);

  const addMsg = (t,w)=>setMsgs(m=>[...m,{w,t}]);
  const advance = (key,val,display)=>{
    setData(d=>({...d,[key]:val}));
    addMsg(display||String(val),"user");
    const nxt=step+1;
    if(nxt<shiftQs.length) setTimeout(()=>{addMsg(shiftQs[nxt].q,"bot");setStep(nxt);},250);
  };
  const goBack = ()=>{ if(step===0)return; setMsgs(m=>m.slice(0,-2)); setStep(s=>s-1); };
  const cur=shiftQs[step];
  const autoDist=["Partes iguales","Cada mesero acumula las suyas","Solo meseros","Todos por igual"].includes(data.dist);

  const confirmPct=()=>{
    const total=emps.reduce((s,e)=>s+(parseInt(pcts[e.nombre]||0)),0);
    if(total!==100){setPctErr(true);return;}
    setPctErr(false);
    advance("pcts","ok","Porcentajes confirmados ✓");
  };

  return (
    <div style={s.card}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        {step>0 && <button onClick={goBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:20 }}>←</button>}
        <div style={{ flex:1, display:"flex", gap:3 }}>
          {shiftQs.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<step?C.green:i===step?C.greenLight:C.border }} />)}
        </div>
        <button onClick={onCancel} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer", fontSize:18 }}>×</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:12, maxHeight:200, overflowY:"auto" }}>
        {msgs.map((m,i)=><div key={i} style={bub(m.w)}>{m.t}</div>)}
      </div>
      {cur.type==="text" && <div style={{ display:"flex", gap:8 }}><input style={{ ...s.inp, flex:1 }} placeholder={cur.ph} value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&txt){advance(cur.key,txt);setTxt("");}}} /><button style={{ ...s.btnSm, padding:"10px 18px" }} onClick={()=>{if(txt){advance(cur.key,txt);setTxt("");}}}>→</button></div>}
      {cur.type==="date" && <div style={{ display:"flex", gap:8 }}><input type="date" style={{ ...s.inp, flex:1 }} value={txt} onChange={e=>setTxt(e.target.value)} /><button style={{ ...s.btnSm, padding:"10px 18px" }} onClick={()=>{if(txt){advance(cur.key,txt);setTxt("");}}}>→</button></div>}
      {cur.type==="opts" && <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>{cur.opts.map(o=><button key={o} style={pill(false)} onClick={()=>{advance(cur.key,o);if(cur.key==="dist"&&autoDist)setTimeout(()=>advance("pcts","auto","Distribución automática ✓"),400);}}>{o}</button>)}</div>}
      {cur.type==="multi" && <div><div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>{cur.opts.map(o=><button key={o} style={pill(sel.has(o))} onClick={()=>{const ns=new Set(sel);ns.has(o)?ns.delete(o):ns.add(o);setSel(ns);}}>{o}</button>)}</div><button style={s.btnSm} onClick={()=>{if(sel.size)advance(cur.key,[...sel].join(", "));}}>Continuar →</button></div>}
      {cur.type==="emps" && <div>
        {emps.map((e,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, background:C.bgCard2, padding:"8px 10px", borderRadius:8, marginBottom:6 }}><div style={av(i)}>{ini(e.nombre)}</div><div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600 }}>{e.nombre}</div><div style={{ fontSize:11, color:C.textMuted }}>Código: ****</div></div><button onClick={()=>setEmps(l=>l.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"#ff6b6b", cursor:"pointer", fontSize:16 }}>×</button></div>)}
        <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
          <input style={{ ...s.inp, flex:2, minWidth:110 }} placeholder="Nombre del empleado" value={tmp.nombre} onChange={e=>setTmp(t=>({...t,nombre:e.target.value}))} />
          <input style={{ ...s.inp, flex:1, minWidth:80 }} placeholder="Código 4 dígitos" maxLength={4} value={tmp.codigo} onChange={e=>setTmp(t=>({...t,codigo:e.target.value.replace(/\D/g,"")}))} />
          <button style={s.btnSm} onClick={()=>{if(tmp.nombre&&tmp.codigo.length===4){setEmps(l=>[...l,{...tmp}]);setTmp({nombre:"",codigo:""});}}}>+ Agregar</button>
        </div>
        {emps.length>0 && <button style={s.btnG} onClick={()=>advance("empleados",emps.map(e=>e.nombre).join(", "))}>Listo ({emps.length}) →</button>}
      </div>}
      {cur.type==="pct" && !autoDist && <div>
        {emps.map((e,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><div style={av(i)}>{ini(e.nombre)}</div><div style={{ flex:1, fontSize:13 }}>{e.nombre}</div><input type="number" min={0} max={100} style={{ ...s.inp, width:70, textAlign:"center" }} value={pcts[e.nombre]||""} onChange={ev=>setPcts(p=>({...p,[e.nombre]:ev.target.value}))} /><span style={{ fontSize:12, color:C.textMuted }}>%</span></div>)}
        {pctErr && <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:8 }}>Total: {emps.reduce((s,e)=>s+(parseInt(pcts[e.nombre]||0)),0)}% — debe ser 100%</div>}
        <button style={s.btnG} onClick={confirmPct}>Confirmar porcentajes</button>
      </div>}
      {cur.type==="summary" && <div>
        <div style={s.card2}>{[["Negocio",data.lugar],["Fecha",data.fecha],["Horario",`${data.inicio} — ${data.fin}`],["Empleados",emps.map(e=>e.nombre).join(", ")],["Roles",data.roles],["Distribución",data.dist],["Bono",data.bono]].map(([l,v])=><div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:13 }}><span style={{ color:C.textMuted }}>{l}</span><span style={{ maxWidth:"58%", textAlign:"right" }}>{v||"—"}</span></div>)}</div>
        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <button style={s.btnG} onClick={()=>onSave({...data,empList:emps})}>Guardar turno ✓</button>
          <button style={{ ...s.btnO(), width:"auto", padding:"11px 18px" }} onClick={onCancel}>Cancelar</button>
        </div>
      </div>}
    </div>
  );
}

// REPORTS PAGE
function ReportsPage({ user, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:16 }}>← Volver</button>
      <div style={s.card}>
        <div style={{ fontSize:18, fontWeight:600, marginBottom:4 }}>Mis reportes</div>
        <div style={{ fontSize:13, color:C.textMuted, marginBottom:16 }}>Bienvenido, {user.nombre}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
          {[{l:"Total propinas",v:"$235",c:C.green},{l:"Transacciones",v:"28",c:C.blue},{l:"Turno activo",v:"1",c:C.warning},{l:"Empleados",v:"8",c:C.coral}].map((st,i)=>(
            <div key={i} style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:st.c }}>{st.v}</div><div style={{ fontSize:11, color:C.textMuted }}>{st.l}</div></div>
          ))}
        </div>
      </div>
      <div style={s.card}>
        <div style={{ fontSize:13, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Propinas por fecha</div>
        {[{f:"20/04/26",n:"Restaurante El Palmar",m:35},{f:"19/04/26",n:"Restaurante El Palmar",m:28},{f:"18/04/26",n:"Restaurante El Palmar",m:42},{f:"17/04/26",n:"Restaurante El Palmar",m:19}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
            <div><div style={{ fontSize:13 }}>{r.n}</div><div style={{ fontSize:11, color:C.textMuted }}>{r.f}</div></div>
            <div style={{ fontSize:15, fontWeight:700, color:C.green }}>${r.m}</div>
          </div>
        ))}
      </div>
      <div style={s.card}>
        <div style={{ fontSize:13, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Actividad reciente</div>
        {[{e:"María López",m:12,h:"11:30 AM",d:"Hoy"},{e:"Juan Pérez",m:8,h:"12:15 PM",d:"Hoy"},{e:"Ana Gómez",m:15,h:"1:00 PM",d:"Hoy"},{e:"Luis Ramos",m:10,h:"3:20 PM",d:"Ayer"}].map((t,i)=>(
          <div key={i} style={{ display:"flex", gap:10, alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={av(i,32)}>{ini(t.e)}</div>
            <div style={{ flex:1 }}><div style={{ fontSize:13 }}>{t.e}</div><div style={{ fontSize:11, color:C.textMuted }}>{t.d} · {t.h}</div></div>
            <div style={{ color:C.green, fontWeight:700 }}>${t.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PAGES
function GerentePage({ onBack }) {
  const [view, setView] = useState("main");
  const [editT, setEditT] = useState(null);
  const [pinM, setPinM] = useState(null);
  const [pcb, setPcb] = useState(null);
  const [btOpen, setBtOpen] = useState(false);
  const [posConn, setPosConn] = useState(null);
  const [shifts, setShifts] = useState([{
    id:1, lugar:"Restaurante El Palmar", fecha:"2026-04-20", inicio:"10:00 AM", fin:"6:00 PM",
    empList:[{nombre:"María López"},{nombre:"Juan Pérez"},{nombre:"Ana Gómez"}],
    dist:"Porcentaje personalizado", bono:"No, solo propinas", status:"activo",
    tips:[{emp:"María López",monto:12,hora:"11:30 AM"},{emp:"Juan Pérez",monto:8,hora:"12:15 PM"},{emp:"Ana Gómez",monto:15,hora:"1:00 PM"}]
  }]);
  const askPin=(l,cb)=>{setPinM(l);setPcb(()=>cb);};
  const onPinOk=()=>{setPinM(null);pcb&&pcb();};

  if(view==="new") return <ShiftBuilder onSave={d=>{setShifts(ss=>[...ss,{...d,id:Date.now(),status:"pendiente",tips:[]}]);setView("main");}} onCancel={()=>setView("main")} />;
  if(view==="edit") return <ShiftBuilder initial={editT} onSave={d=>{setShifts(ss=>ss.map(x=>x.id===editT.id?{...x,...d}:x));setView("main");}} onCancel={()=>setView("main")} />;

  return (
    <div>
      {pinM && <PinModal name={pinM} onSuccess={onPinOk} onCancel={()=>setPinM(null)} />}
      {btOpen && <BTModal onClose={(dev)=>{if(dev) setPosConn(dev); setBtOpen(false);}} />}
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
      <div style={{ display:"flex", gap:8, marginBottom:14, alignItems:"center" }}>
        <div style={{ fontSize:16, fontWeight:600 }}>Panel Gerente / Dueño</div>
        <button style={{ ...s.btnSm, marginLeft:"auto" }} onClick={()=>setView("new")}>+ Nuevo turno</button>
      </div>
      <div style={{ ...s.card, display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600 }}>POS Bluetooth</div>
          <div style={{ fontSize:12, color: posConn ? C.green : C.textMuted }}>{posConn ? `Conectado: ${posConn}` : "Sin conexión"}</div>
        </div>
        <button style={{ ...s.btnSm, background: posConn ? C.bgCard2 : C.green, color: posConn ? C.textMuted : C.greenDark }} onClick={()=>setBtOpen(true)}>{posConn ? "Cambiar POS" : "Conectar POS"}</button>
      </div>
      {shifts.map(sh=>(
        <div key={sh.id} style={s.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div><div style={{ fontSize:15, fontWeight:600 }}>{sh.lugar}</div><div style={{ fontSize:12, color:C.textMuted }}>{sh.fecha} · {sh.inicio} — {sh.fin}</div></div>
            <span style={badge(sh.status==="activo"?"green":sh.status==="pagado"?"blue":"warn")}>{sh.status}</span>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
            {(sh.empList||[]).map((e,i)=><div key={i} style={{ textAlign:"center" }}><div style={{ ...av(i,30), margin:"0 auto 3px" }}>{ini(e.nombre)}</div><div style={{ fontSize:10, color:C.textMuted }}>{e.nombre.split(" ")[0]}</div></div>)}
          </div>
          <div style={s.divider} />
          {(sh.tips||[]).map((t,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:13, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}><span style={{ color:C.textMuted }}>{t.emp} · {t.hora}</span><span style={{ color:C.green, fontWeight:600 }}>${t.monto}</span></div>)}
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <button style={{ ...s.btnSm, flex:1 }} onClick={()=>askPin("Aprobar pagos",()=>setShifts(ss=>ss.map(x=>x.id===sh.id?{...x,status:"pagado"}:x)))}>Aprobar pagos</button>
            <button style={{ ...s.btnSmO, flex:1 }} onClick={()=>{setEditT(sh);setView("edit");}}>Editar turno</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmpleadoPage({ onBack }) {
  const [pinM, setPinM] = useState(null);
  const [pcb, setPcb] = useState(null);
  const [showC, setShowC] = useState(false);
  const [monto, setMonto] = useState(""), [mesa, setMesa] = useState("");
  const [charged, setCharged] = useState([{cliente:"Mesa 4",monto:12,hora:"11:30 AM"},{cliente:"Mesa 7",monto:8,hora:"12:15 PM"}]);
  const askPin=(l,cb)=>{setPinM(l);setPcb(()=>cb);};
  const onPinOk=()=>{setPinM(null);pcb&&pcb();};
  const total=charged.reduce((s,c)=>s+c.monto,0);
  return (
    <div>
      {pinM && <PinModal name={pinM} onSuccess={onPinOk} onCancel={()=>setPinM(null)} />}
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
      <div style={s.card}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={av(0)}>ML</div>
          <div style={{ flex:1 }}><div style={{ fontWeight:600 }}>María López</div><div style={{ fontSize:12, color:C.textMuted }}>Meser@ · Turno activo</div></div>
          <span style={badge("green")}>En turno</span>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.green }}>${total}</div><div style={{ fontSize:11, color:C.textMuted }}>Mis propinas</div></div>
          <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.blue }}>{charged.length}</div><div style={{ fontSize:11, color:C.textMuted }}>Servicios</div></div>
          <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.warning }}>40%</div><div style={{ fontSize:11, color:C.textMuted }}>Mi %</div></div>
        </div>
        <button style={s.btnG} onClick={()=>askPin("Cobrar propina",()=>setShowC(true))}>Cobrar propina al cliente</button>
      </div>
      {showC && <div style={s.card}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:12 }}>Nueva propina</div>
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Mesa / Cliente</label>
        <input style={{ ...s.inp, marginBottom:10 }} placeholder="Ej: Mesa 3" value={mesa} onChange={e=>setMesa(e.target.value)} />
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Monto</label>
        <input type="number" style={{ ...s.inp, marginBottom:14 }} placeholder="0.00" value={monto} onChange={e=>setMonto(e.target.value)} />
        <div style={{ display:"flex", gap:8 }}>
          <button style={s.btnG} onClick={()=>{if(monto&&mesa){setCharged(c=>[...c,{cliente:mesa,monto:parseFloat(monto),hora:new Date().toLocaleTimeString("es-VE",{hour:"2-digit",minute:"2-digit"})}]);setMonto("");setMesa("");setShowC(false);}}}>Registrar</button>
          <button style={{ ...s.btnO(), width:"auto", padding:"11px 18px" }} onClick={()=>setShowC(false)}>Cancelar</button>
        </div>
      </div>}
      <div style={s.card}>
        <div style={{ fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Propinas del turno</div>
        {charged.map((c,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}`, fontSize:13 }}><span style={{ color:C.textMuted }}>{c.cliente} · {c.hora}</span><span style={{ color:C.green, fontWeight:600 }}>${c.monto}</span></div>)}
        <button style={{ ...s.btnO(), marginTop:12 }} onClick={()=>askPin("Solicitar pago",()=>alert("Solicitud enviada al gerente ✓"))}>Solicitar pago al gerente</button>
      </div>
    </div>
  );
}

function IndividualPage({ onBack }) {
  const [pinM, setPinM] = useState(null);
  const [pcb, setPcb] = useState(null);
  const [showC, setShowC] = useState(false);
  const [btOpen, setBtOpen] = useState(false);
  const [posConn, setPosConn] = useState(null);
  const [monto, setMonto] = useState(""), [desc, setDesc] = useState("");
  const [txs, setTxs] = useState([{desc:"Servicio de plomería",monto:25,fecha:"19/04/26"},{desc:"Clases de música",monto:15,fecha:"18/04/26"}]);
  const askPin=(l,cb)=>{setPinM(l);setPcb(()=>cb);};
  const onPinOk=()=>{setPinM(null);pcb&&pcb();};
  const total=txs.reduce((s,t)=>s+t.monto,0);
  return (
    <div>
      {pinM && <PinModal name={pinM} onSuccess={onPinOk} onCancel={()=>setPinM(null)} />}
      {btOpen && <BTModal onClose={()=>setBtOpen(false)} />}
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
      <div style={s.card}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={{ ...av(1), background:C.blue }}>CP</div>
          <div style={{ flex:1 }}><div style={{ fontWeight:600 }}>Carlos Pérez</div><div style={{ fontSize:12, color:C.textMuted }}>Trabajador independiente</div></div>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.green }}>${total}</div><div style={{ fontSize:11, color:C.textMuted }}>Total cobrado</div></div>
          <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.blue }}>{txs.length}</div><div style={{ fontSize:11, color:C.textMuted }}>Servicios</div></div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:0 }}>
          <button style={{ ...s.btnG, flex:2 }} onClick={()=>askPin("Cobrar servicio",()=>setShowC(true))}>Cobrar por servicio</button>
          <button style={{ ...s.btnSm, background: posConn ? C.bgCard2 : C.bgCard2, color: posConn ? C.green : C.blue, border:`1px solid ${posConn?C.green:C.blue}`, flex:1 }} onClick={()=>setBtOpen(true)}>{posConn?"POS ✓":"POS BT"}</button>
        </div>
      </div>
      {showC && <div style={s.card}>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:12 }}>Cobrar servicio</div>
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Descripción</label>
        <input style={{ ...s.inp, marginBottom:10 }} placeholder="Ej: Corte de cabello" value={desc} onChange={e=>setDesc(e.target.value)} />
        <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Monto</label>
        <input type="number" style={{ ...s.inp, marginBottom:10 }} placeholder="0.00" value={monto} onChange={e=>setMonto(e.target.value)} />
        <div style={{ fontSize:12, color:C.textMuted, marginBottom:12 }}>Directo a tu cuenta bancaria · Todos los bancos venezolanos</div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={s.btnG} onClick={()=>{if(monto&&desc){setTxs(t=>[...t,{desc,monto:parseFloat(monto),fecha:new Date().toLocaleDateString("es-VE")}]);setMonto("");setDesc("");setShowC(false);}}}>Cobrar ahora</button>
          <button style={{ ...s.btnO(), width:"auto", padding:"11px 18px" }} onClick={()=>setShowC(false)}>Cancelar</button>
        </div>
      </div>}
      <div style={s.card}>
        <div style={{ fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Historial de cobros</div>
        {txs.map((t,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}`, fontSize:13 }}><span>{t.desc} <span style={{ color:C.textMuted, fontSize:11 }}>· {t.fecha}</span></span><span style={{ color:C.green, fontWeight:600 }}>${t.monto}</span></div>)}
      </div>
    </div>
  );
}

function ClientePage({ onBack }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState(""), [code, setCode] = useState("");
  const records=[{lugar:"Restaurante El Palmar",empleado:"María López",monto:12,fecha:"20/04/26",hora:"11:30 AM"},{lugar:"Café Central",empleado:"Luis Ramos",monto:5,fecha:"18/04/26",hora:"3:00 PM"},{lugar:"Restaurante El Palmar",empleado:"Juan Pérez",monto:8,fecha:"15/04/26",hora:"1:15 PM"}];
  if(step==="phone") return <div>
    <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
    <div style={s.card}>
      <div style={{ textAlign:"center", marginBottom:20 }}><div style={{ fontSize:36, marginBottom:8 }}>📱</div><div style={{ fontSize:18, fontWeight:600, marginBottom:6 }}>Bienvenido a Propipay</div><div style={{ fontSize:13, color:C.textMuted }}>Ingresa tu número para ver tus propinas</div></div>
      <label style={{ fontSize:12, color:C.textMuted, display:"block", marginBottom:4 }}>Número de teléfono</label>
      <input style={{ ...s.inp, marginBottom:14 }} placeholder="+58 412 000 0000" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button style={s.btnG} onClick={()=>{if(phone)setStep("code");}}>Enviar código</button>
    </div>
  </div>;
  if(step==="code") return <div>
    <button onClick={()=>setStep("phone")} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
    <div style={s.card}>
      <div style={{ textAlign:"center", marginBottom:20 }}><div style={{ fontSize:36, marginBottom:8 }}>🔐</div><div style={{ fontSize:18, fontWeight:600, marginBottom:6 }}>Verificación</div><div style={{ fontSize:13, color:C.textMuted }}>Enviamos un código a {phone}</div></div>
      <input style={{ ...s.inp, textAlign:"center", fontSize:24, letterSpacing:10, marginBottom:6 }} maxLength={6} placeholder="------" value={code} onChange={e=>setCode(e.target.value)} />
      <div style={{ fontSize:11, color:C.textMuted, textAlign:"center", marginBottom:14 }}>Demo: cualquier código</div>
      <button style={{ ...s.btnG, marginBottom:8 }} onClick={()=>{if(code.length>=4)setStep("records");}}>Verificar</button>
      <button style={s.btnO()} onClick={()=>setStep("phone")}>← Volver</button>
    </div>
  </div>;
  return <div>
    <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
    <div style={s.card}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <div style={{ ...av(3), background:"#9B59B6" }}>TU</div>
        <div style={{ flex:1 }}><div style={{ fontWeight:600 }}>{phone}</div><div style={{ fontSize:12, color:C.textMuted }}>Cliente verificado</div></div>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.green }}>{records.length}</div><div style={{ fontSize:11, color:C.textMuted }}>Propinas enviadas</div></div>
        <div style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:C.blue }}>${records.reduce((s,r)=>s+r.monto,0)}</div><div style={{ fontSize:11, color:C.textMuted }}>Total</div></div>
      </div>
    </div>
    <div style={s.card}>
      <div style={{ fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Historial</div>
      {records.map((r,i)=><div key={i} style={{ ...s.card2, marginBottom:8 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><div style={{ fontWeight:600, fontSize:14 }}>{r.lugar}</div><span style={{ color:C.green, fontWeight:700 }}>${r.monto}</span></div><div style={{ fontSize:12, color:C.textMuted }}>{r.empleado} · {r.fecha} · {r.hora}</div></div>)}
    </div>
  </div>;
}

function AdminPage({ onBack }) {
  const [pinM, setPinM] = useState(null);
  const [pcb, setPcb] = useState(null);
  const [auth, setAuth] = useState(false);
  const askPin=(l,cb)=>{setPinM(l);setPcb(()=>cb);};
  const onPinOk=()=>{setPinM(null);pcb&&pcb();};
  if(!auth) return <div>
    {pinM && <PinModal name={pinM} onSuccess={onPinOk} onCancel={()=>setPinM(null)} />}
    <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14, marginBottom:14 }}>← Volver</button>
    <div style={{ ...s.card, textAlign:"center" }}>
      <div style={{ fontSize:40, marginBottom:12 }}>🔐</div>
      <div style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Panel Administrador</div>
      <div style={{ fontSize:13, color:C.textMuted, marginBottom:20 }}>Acceso restringido. Solo personal autorizado de Propipay / Coral Pandas Network.</div>
      <button style={s.btnG} onClick={()=>askPin("Administrador",()=>setAuth(true))}>Ingresar con código autorizado</button>
    </div>
  </div>;
  const regs=[{r:"Caracas",txs:1820,m:22400},{r:"Maracaibo",txs:640,m:8100},{r:"Valencia",txs:512,m:6200},{r:"Barquisimeto",txs:289,m:4800},{r:"Mérida",txs:160,m:2300}];
  return <div>
    <div style={{ display:"flex", alignItems:"center", marginBottom:14 }}>
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:14 }}>← Volver</button>
      <span style={{ ...badge("green"), marginLeft:"auto" }}>Admin verificado</span>
      <button style={{ ...s.btnSmO, marginLeft:8 }} onClick={()=>setAuth(false)}>Salir</button>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
      {[{l:"Usuarios",v:"12,847",c:C.green},{l:"Transacciones hoy",v:"3,421",c:C.blue},{l:"Propinas",v:"$48,230",c:C.warning},{l:"Negocios activos",v:"342",c:C.coral}].map((st,i)=><div key={i} style={s.stat}><div style={{ fontSize:22, fontWeight:700, color:st.c }}>{st.v}</div><div style={{ fontSize:11, color:C.textMuted }}>{st.l}</div></div>)}
    </div>
    <div style={s.card}>
      <div style={{ fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Actividad por región</div>
      {regs.map((r,i)=><div key={i} style={{ marginBottom:10 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}><span>{r.r}</span><span style={{ color:C.textMuted }}>{r.txs} · ${r.m.toLocaleString()}</span></div><div style={{ height:6, borderRadius:3, background:C.border }}><div style={{ height:"100%", width:`${Math.round(r.txs/1820*100)}%`, background:`linear-gradient(90deg,${C.green},${C.blue})`, borderRadius:3 }} /></div></div>)}
    </div>
  </div>;
}

// LANDING
const roles = [
  { id:"empleado", icon:"👨‍🍳", title:"Soy Empleado / Mesero", desc:"Cobra propinas con tu código único. Ve tus ganancias en tiempo real y solicita tu pago.", color: C.green },
  { id:"individual", icon:"👤", title:"Soy Trabajador Individual", desc:"Cobra por tus servicios directamente a tu cuenta bancaria. Sin intermediarios.", color: C.blue },
  { id:"cliente", icon:"📱", title:"Soy Cliente", desc:"Accede a tu historial de propinas enviadas por fecha, lugar y empleado.", color: "#9B59B6" },
  { id:"gerente", icon:"🏢", title:"Soy Gerente / Dueño", desc:"Gestiona turnos, empleados y aprueba pagos. Conecta tu POS por Bluetooth.", color: C.warning },
  { id:"admin", icon:"🔐", title:"Administrador Propipay", desc:"Panel de estadísticas globales. Acceso exclusivo para el equipo Coral Pandas.", color: C.coral },
];

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const login = (u) => { setUser(u); setShowAuth(false); };

  if (showReports && user) return (
    <div style={s.app}>
      <div style={{ background:C.bgCard, borderBottom:`1px solid ${C.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <PPLogo size={32} />
        <div style={{ fontSize:18, fontWeight:700 }}>Propi<span style={{ color:C.green }}>pay</span></div>
      </div>
      <div style={{ padding:20, maxWidth:680, margin:"0 auto" }}>
        <ReportsPage user={user} onBack={()=>setShowReports(false)} />
      </div>
    </div>
  );

  if (page !== "landing") {
    return (
      <div style={s.app}>
        {showAuth && <AuthModal onLogin={login} onClose={()=>setShowAuth(false)} />}
        <div style={{ background:C.bgCard, borderBottom:`1px solid ${C.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={()=>setPage("landing")} style={{ background:"none", border:"none", cursor:"pointer" }}><PPLogo size={32} /></button>
          <div style={{ fontSize:18, fontWeight:700 }}>Propi<span style={{ color:C.green }}>pay</span></div>
          <div style={{ marginLeft:"auto" }}>
            {user ? <button style={{ ...s.btnSm, background:"transparent", color:C.green, border:`1px solid ${C.green}` }} onClick={()=>setShowReports(true)}>Mis reportes</button>
              : <button style={s.btnSm} onClick={()=>setShowAuth(true)}>Iniciar sesión</button>}
          </div>
        </div>
        <div style={{ padding:20, maxWidth:680, margin:"0 auto" }}>
          {page==="empleado" && <EmpleadoPage onBack={()=>setPage("landing")} />}
          {page==="individual" && <IndividualPage onBack={()=>setPage("landing")} />}
          {page==="cliente" && <ClientePage onBack={()=>setPage("landing")} />}
          {page==="gerente" && <GerentePage onBack={()=>setPage("landing")} />}
          {page==="admin" && <AdminPage onBack={()=>setPage("landing")} />}
        </div>
      </div>
    );
  }

  return (
    <div style={s.app}>
      {showAuth && <AuthModal onLogin={login} onClose={()=>setShowAuth(false)} />}
      {/* HEADER */}
      <div style={{ background:C.bgCard, borderBottom:`1px solid ${C.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <PPLogo size={32} />
        <div style={{ fontSize:18, fontWeight:700 }}>Propi<span style={{ color:C.green }}>pay</span></div>
        <div style={{ marginLeft:"auto" }}>
          {user
            ? <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, color:C.textMuted }}>Hola, {user.nombre}</span>
                <button style={s.btnSm} onClick={()=>setShowReports(true)}>Mis reportes</button>
              </div>
            : <div style={{ display:"flex", gap:8 }}>
                <button style={{ ...s.btnSm, background:"transparent", color:C.green, border:`1px solid ${C.green}` }} onClick={()=>setShowAuth(true)}>Iniciar sesión</button>
                <button style={s.btnSm} onClick={()=>setShowAuth(true)}>Registrarse</button>
              </div>
          }
        </div>
      </div>

      {/* HERO */}
      <div style={{ textAlign:"center", padding:"36px 20px 24px", background:`linear-gradient(180deg, #0f2235 0%, ${C.bg} 100%)` }}>
        <PPLogo size={72} />
        <div style={{ fontSize:28, fontWeight:800, marginTop:16, marginBottom:8 }}>Propi<span style={{ color:C.green }}>pay</span></div>
        <div style={{ fontSize:14, color:C.textMuted, maxWidth:340, margin:"0 auto 8px" }}>La plataforma de propinas digitales para Venezuela</div>
        <div style={{ fontSize:12, color:C.textMuted }}>by <span style={{ color:C.green }}>Coral Pandas Network</span> + <span style={{ color:C.blue }}>Bangente</span></div>
      </div>

      {/* ROLE CARDS */}
      <div style={{ padding:"0 20px 32px", maxWidth:680, margin:"0 auto" }}>
        <div style={{ fontSize:13, color:C.textMuted, textAlign:"center", marginBottom:20 }}>Selecciona tu rol para continuar</div>
        {roles.map((r,i)=>(
          <button key={r.id} onClick={()=>setPage(r.id)} style={{ display:"flex", alignItems:"center", gap:16, width:"100%", background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px", marginBottom:12, cursor:"pointer", textAlign:"left", transition:"border-color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=r.color}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{ width:52, height:52, borderRadius:14, background:C.bgCard2, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{r.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:4 }}>{r.title}</div>
              <div style={{ fontSize:13, color:C.textMuted, lineHeight:1.5 }}>{r.desc}</div>
            </div>
            <div style={{ color:r.color, fontSize:20, flexShrink:0 }}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
