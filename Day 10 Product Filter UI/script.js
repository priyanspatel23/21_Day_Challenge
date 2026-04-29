
const products=[
  {id:1,name:"Stoneware Mug",cat:"kitchen",mat:"ceramic",price:89,rating:4.7,sale:true,emoji:"🫖",bg:"#fdebd0"},
  {id:2,name:"Linen Throw Pillow",cat:"textiles",mat:"linen",price:149,rating:4.5,sale:false,emoji:"🛋️",bg:"#e8f4e8"},
  {id:3,name:"Oak Serving Board",cat:"kitchen",mat:"wood",price:229,rating:4.8,sale:false,emoji:"🪵",bg:"#fef9e7"},
  {id:4,name:"Rattan Pendant",cat:"lighting",mat:"wood",price:319,rating:4.3,sale:true,emoji:"🏮",bg:"#fdebd0"},
  {id:5,name:"Terracotta Vase",cat:"decor",mat:"ceramic",price:129,rating:4.6,sale:false,emoji:"🏺",bg:"#fce4d6"},
  {id:6,name:"Brass Wall Hook",cat:"decor",mat:"metal",price:79,rating:4.4,sale:false,emoji:"🔩",bg:"#e8f0fe"},
  {id:7,name:"Wool Area Rug",cat:"textiles",mat:"linen",price:499,rating:4.9,sale:true,emoji:"🟫",bg:"#f3e5f5"},
  {id:8,name:"Glass Carafe",cat:"kitchen",mat:"glass",price:99,rating:4.2,sale:false,emoji:"🫙",bg:"#e3f2fd"},
  {id:9,name:"Walnut Side Table",cat:"furniture",mat:"wood",price:449,rating:4.8,sale:false,emoji:"🪑",bg:"#fff8e1"},
  {id:10,name:"Linen Napkins (set)",cat:"textiles",mat:"linen",price:69,rating:4.5,sale:true,emoji:"🍽️",bg:"#e8f5e9"},
  {id:11,name:"Copper Table Lamp",cat:"lighting",mat:"metal",price:289,rating:4.6,sale:false,emoji:"💡",bg:"#fff3e0"},
  {id:12,name:"Marble Bowl",cat:"decor",mat:"glass",price:179,rating:4.7,sale:true,emoji:"🥣",bg:"#f3e5f5"},
];

let state={cat:"all",mats:[],maxPrice:350,minRating:0,sort:"name",view:"grid",loved:new Set()};

function filterProducts(){
  return products.filter(p=>{
    if(state.cat!=="all"&&p.cat!==state.cat)return false;
    if(state.mats.length&&!state.mats.includes(p.mat))return false;
    if(p.price>state.maxPrice)return false;
    if(p.rating<state.minRating)return false;
    return true;
  }).sort((a,b)=>{
    if(state.sort==="price-asc")return a.price-b.price;
    if(state.sort==="price-desc")return b.price-a.price;
    if(state.sort==="rating")return b.rating-a.rating;
    return a.name.localeCompare(b.name);
  });
}

function stars(r){return "★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r))}

function renderGrid(){
  const grid=document.getElementById("product-grid");
  const filtered=filterProducts();
  document.getElementById("count").textContent=filtered.length;
  grid.className="grid"+(state.view==="list"?" list-view":"");
  if(!filtered.length){
    grid.innerHTML=`<div class="empty" style="grid-column:1/-1"><div class="e-icon">🔍</div><p>No products match your filters.</p></div>`;return;
  }
  grid.innerHTML=filtered.map(p=>`
    <div class="card">
      <div class="card-img" style="background:${p.bg}">
        ${p.sale?`<div class="card-badge">Sale</div>`:""}
        <div class="card-fav${state.loved.has(p.id)?" loved":""}" data-fav="${p.id}">
          ${state.loved.has(p.id)?"♥":"♡"}
        </div>
        <span>${p.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-info">
          <div class="card-cat">${p.cat}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-rating"><span>${stars(p.rating)}</span> ${p.rating}</div>
        </div>
        <div class="card-foot">
          <div><span class="card-price">₹${p.price}</span>${p.sale?`<span class="card-old">₹${Math.round(p.price*1.2)}</span>`:""}</div>
        </div>
      </div>
    </div>
  `).join("");
  grid.querySelectorAll("[data-fav]").forEach(el=>{
    el.addEventListener("click",e=>{
      e.stopPropagation();
      const id=+el.dataset.fav;
      if(state.loved.has(id))state.loved.delete(id);else state.loved.add(id);
      renderGrid();
    });
  });
}

function renderChips(){
  const c=document.getElementById("active-chips");
  const chips=[];
  if(state.cat!=="all")chips.push({label:`Cat: ${state.cat}`,rm:()=>{state.cat="all";syncCatUI()}});
  state.mats.forEach(m=>chips.push({label:`Mat: ${m}`,rm:()=>{state.mats=state.mats.filter(x=>x!==m);syncMatUI()}}));
  if(state.maxPrice<500)chips.push({label:`≤ ₹${state.maxPrice}`,rm:()=>{state.maxPrice=500;document.getElementById("price-slider").value=500;document.getElementById("price-val").textContent="₹500"}});
  if(state.minRating>0)chips.push({label:`${state.minRating}★+`,rm:()=>{state.minRating=0;syncRatUI()}});
  c.innerHTML=chips.map((ch,i)=>`<div class="chip" data-ci="${i}">${ch.label} <span class="x">✕</span></div>`).join("");
  c.querySelectorAll(".chip").forEach(el=>{
    el.addEventListener("click",()=>{chips[+el.dataset.ci].rm();render()});
  });
}

function syncCatUI(){
  document.querySelectorAll("[data-cat]").forEach(t=>{
    t.classList.toggle("active",t.dataset.cat===state.cat);
  });
}
function syncMatUI(){
  document.querySelectorAll("[data-mat]").forEach(t=>{
    t.classList.toggle("active",state.mats.includes(t.dataset.mat));
  });
}
function syncRatUI(){
  document.querySelectorAll("[data-rat]").forEach(t=>{
    t.classList.toggle("active",+t.dataset.rat===state.minRating);
  });
}

function render(){renderChips();renderGrid()}

document.querySelectorAll("[data-cat]").forEach(el=>{
  el.addEventListener("click",()=>{state.cat=el.dataset.cat;syncCatUI();render()});
});
document.querySelectorAll("[data-mat]").forEach(el=>{
  el.addEventListener("click",()=>{
    const m=el.dataset.mat;
    if(state.mats.includes(m))state.mats=state.mats.filter(x=>x!==m);else state.mats.push(m);
    syncMatUI();render();
  });
});
document.querySelectorAll("[data-rat]").forEach(el=>{
  el.addEventListener("click",()=>{state.minRating=+el.dataset.rat;syncRatUI();render()});
});

const slider=document.getElementById("price-slider");
slider.addEventListener("input",()=>{
  state.maxPrice=+slider.value;
  document.getElementById("price-val").textContent="₹"+slider.value;
  render();
});

document.getElementById("sort-sel").addEventListener("change",e=>{state.sort=e.target.value;renderGrid()});

document.getElementById("grid-btn").addEventListener("click",()=>{
  state.view="grid";
  document.getElementById("grid-btn").classList.add("active");
  document.getElementById("list-btn").classList.remove("active");
  renderGrid();
});
document.getElementById("list-btn").addEventListener("click",()=>{
  state.view="list";
  document.getElementById("list-btn").classList.add("active");
  document.getElementById("grid-btn").classList.remove("active");
  renderGrid();
});

document.getElementById("clear-btn").addEventListener("click",()=>{
  state.cat="all";state.mats=[];state.maxPrice=350;state.minRating=0;
  slider.value=350;document.getElementById("price-val").textContent="₹350";
  syncCatUI();syncMatUI();syncRatUI();render();
});

render();