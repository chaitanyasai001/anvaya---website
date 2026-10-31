const products = [
  {id:1,name:"Fresh Tomatoes",category:"Vegetables",price:"$1.80 / kg",seller:"Green Valley Growers",origin:"Community farm",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Premium Rice",category:"Grains",price:"$2.40 / kg",seller:"Harvest Collective",origin:"Farmer community",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Fresh Bananas",category:"Fruits",price:"$1.20 / kg",seller:"Sunrise Farms",origin:"Independent grower",image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Red Onions",category:"Vegetables",price:"$1.50 / kg",seller:"Unity Farmers Group",origin:"Community farm",image:"https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=700&q=80"}
];

let orders = JSON.parse(localStorage.getItem("anvayaOrders") || "[]");
let listings = JSON.parse(localStorage.getItem("anvayaListings") || "[]");
let requests = JSON.parse(localStorage.getItem("anvayaRequests") || "[]");
let projects = JSON.parse(localStorage.getItem("anvayaProjects") || "[]");

const $ = (id) => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

function renderProducts(){
  $("featuredProducts").innerHTML = products.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="product-meta">${p.seller}</div>
        <div class="product-bottom"><span class="product-price">${p.price}</span><button class="small-add" onclick="quickOrder(${p.id})">Request</button></div>
      </div>
    </article>`).join("");
}
renderProducts();

function showToast(message){
  const toast = $("toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(()=>toast.classList.remove("show"),2600);
}
function openModal(type){
  const modal = $("portalModal"), content = $("modalContent");
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
  const configs = {
    farmer:{kicker:"FARMER PORTAL",title:"Grow with your community.",desc:"Create a produce listing, request shared equipment or register your interest in a farmer community.",html:farmerForm()},
    investor:{kicker:"INVESTOR & SUPPORTER PORTAL",title:"Explore community projects.",desc:"Review example infrastructure projects and register interest in receiving further information. This prototype does not collect funds or offer investment products.",html:investorContent()},
    customer:{kicker:"CUSTOMER PORTAL",title:"Find produce from growers.",desc:"Send a sample purchase request for individual or bulk quantities. A real deployment would connect this to verified sellers and order fulfilment.",html:customerContent()},
    admin:{kicker:"ADMIN PORTAL · DEMO",title:"Platform overview.",desc:"A local demonstration dashboard showing activity created in this browser. Authentication and server-side permissions are not enabled in this prototype.",html:adminContent()}
  };
  const c = configs[type] || configs.customer;
  $("modalKicker").textContent=c.kicker; $("modalTitle").textContent=c.title; $("modalDescription").textContent=c.desc; content.innerHTML=c.html;
  content.querySelectorAll("form").forEach(form=>form.addEventListener("submit",handleForm));
}
function closeModal(){ $("portalModal").classList.remove("show"); $("portalModal").setAttribute("aria-hidden","true"); }
$("closeModal").addEventListener("click",closeModal);
$("portalModal").addEventListener("click",e=>{if(e.target===$("portalModal"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
document.querySelectorAll("[data-open]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openModal(el.dataset.open);}));
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
$("mainNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));

function farmerForm(){return `
<form data-kind="listing" class="form-grid">
  <div class="field"><label>Your name</label><input name="name" required placeholder="Full name"></div>
  <div class="field"><label>Email or phone</label><input name="contact" required placeholder="Contact details"></div>
  <div class="field"><label>Community / farm name</label><input name="community" placeholder="Your farm or group"></div>
  <div class="field"><label>What do you need?</label><select name="need"><option>Shared equipment access</option><option>Agricultural inputs</option><option>Community infrastructure</option><option>List my produce</option></select></div>
  <div class="field"><label>Produce or equipment details</label><input name="details" placeholder="e.g. rice, tractor, irrigation"></div>
  <div class="field"><label>Location</label><input name="location" placeholder="Town, region, country"></div>
  <div class="field full"><button class="btn btn-primary form-submit" type="submit">Submit farmer interest ↗</button></div>
</form><div class="notice">Demo only: your submission is saved in this browser using local storage. It is not sent to ANVAYA or a real community.</div>`;}
function investorContent(){return `
<div class="dashboard-grid">
  <div class="dash-tile"><strong>03</strong><span>Example community projects</span></div>
  <div class="dash-tile"><strong>Open</strong><span>Information status</span></div>
</div>
<div class="data-list">
  <div class="data-row"><b>Shared machinery hub</b><span>Equipment access</span></div>
  <div class="data-row"><b>Community storage facility</b><span>Post-harvest support</span></div>
  <div class="data-row"><b>Water & irrigation network</b><span>Farm infrastructure</span></div>
</div>
<form data-kind="project" class="form-grid">
  <div class="field"><label>Your name</label><input name="name" required></div>
  <div class="field"><label>Email</label><input name="contact" type="email" required></div>
  <div class="field full"><label>Area of interest</label><select name="interest"><option>Shared machinery</option><option>Storage and processing</option><option>Water and irrigation</option><option>General partnership</option></select></div>
  <div class="field full"><button class="btn btn-primary form-submit" type="submit">Register interest ↗</button></div>
</form>
<div class="notice">No money is collected, no securities are offered, and no returns are promised. Any future funding model requires independent legal, financial and regulatory review.</div>`;}
function customerContent(){return `
<form data-kind="order" class="form-grid">
  <div class="field full"><label>Select produce</label><select name="product">${products.map(p=>`<option>${p.name}</option>`).join("")}</select></div>
  <div class="field"><label>Quantity</label><input name="quantity" type="number" min="1" required placeholder="e.g. 10"></div>
  <div class="field"><label>Unit</label><select name="unit"><option>kg</option><option>tonnes</option><option>boxes</option><option>bags</option></select></div>
  <div class="field"><label>Order type</label><select name="type"><option>Individual</option><option>Bulk</option></select></div>
  <div class="field"><label>Your name</label><input name="name" required></div>
  <div class="field full"><label>Email or phone</label><input name="contact" required></div>
  <div class="field full"><label>Delivery location</label><input name="location" required placeholder="City, region, country"></div>
  <div class="field full"><button class="btn btn-primary form-submit" type="submit">Send purchase request ↗</button></div>
</form>
<div class="notice">This creates a sample request only. No payment or confirmed delivery is processed by this prototype.</div>`;}
function adminContent(){return `
<div class="dashboard-grid">
  <div class="dash-tile"><strong>${listings.length}</strong><span>Farmer submissions</span></div>
  <div class="dash-tile"><strong>${orders.length}</strong><span>Purchase requests</span></div>
  <div class="dash-tile"><strong>${projects.length}</strong><span>Supporter interests</span></div>
  <div class="dash-tile"><strong>${products.length}</strong><span>Demo products</span></div>
</div>
<h3 style="font:700 14px Manrope;margin:20px 0 8px">Recent activity</h3>
${activityRows()}
<div class="notice">Demo dashboard only. A production admin portal must use secure authentication, role-based authorization, a server database and audit logs. Do not use this local demo for real customer or financial data.</div>`;}
function activityRows(){
  const all=[...listings.map(x=>({...x,kind:"Farmer"})),...orders.map(x=>({...x,kind:"Order"})),...projects.map(x=>({...x,kind:"Supporter"}))].slice(-8).reverse();
  if(!all.length)return '<div class="empty-state">No submissions yet. Try a portal form to see demo activity here.</div>';
  return `<div class="data-list">${all.map(x=>`<div class="data-row"><b>${escapeHtml(x.name||x.product||"Submission")} · ${x.kind}</b><span>${escapeHtml(x.date||"Saved")}</span></div>`).join("")}</div>`;
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function handleForm(e){
  e.preventDefault(); const form=e.currentTarget, data=Object.fromEntries(new FormData(form).entries());
  data.date=new Date().toLocaleString();
  const kind=form.dataset.kind;
  if(kind==="listing")listings.push(data);
  if(kind==="order")orders.push(data);
  if(kind==="project")projects.push(data);
  localStorage.setItem("anvayaListings",JSON.stringify(listings));
  localStorage.setItem("anvayaOrders",JSON.stringify(orders));
  localStorage.setItem("anvayaProjects",JSON.stringify(projects));
  form.reset(); closeModal(); showToast("Your demo submission has been saved on this device.");
}
function quickOrder(id){
  openModal("customer");
  setTimeout(()=>{const select=$("modalContent").querySelector('select[name="product"]');if(select)select.value=products.find(p=>p.id===id).name;},0);
}
window.quickOrder=quickOrder;
