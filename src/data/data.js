// menu items, reviews, offers, loyalty tiers, etc.
// prices and descriptions — update these to match what's actually on the menu

// ── MENU ────────────────────────────────────────────────────────────────────
export const DEFAULT_MENU = [
  { id:'w1', cat:'wraps',   name:'Chicken Shawarma Wrap', desc:'24h marinated chicken in 11 heritage spices, carved fresh to order. Garlic sauce, house pickles, tomatoes, herbs in warm saj bread.', price:12.99, cal:520, tags:['Best Seller','Halal','Staff Pick'], veg:false, spicy:false, available:true, featured:true,  prepTime:'5–7 min' },
  { id:'w2', cat:'wraps',   name:'Beef & Lamb Wrap',      desc:'Slow-roasted beef and lamb shoulder with caramelised onions, tahini drizzle, and fresh parsley in warm saj bread.', price:14.99, cal:580, tags:['Halal','Fan Favourite'], veg:false, spicy:false, available:true, featured:true,  prepTime:'5–7 min' },
  { id:'w3', cat:'wraps',   name:'Mixed Shawarma Wrap',   desc:'Chicken and beef shawarma together — double the flavour in one wrap. House garlic sauce, full garnish.', price:15.99, cal:600, tags:['Halal','Best Value'], veg:false, spicy:false, available:true, featured:false, prepTime:'5–7 min' },
  { id:'w4', cat:'wraps',   name:'Spicy Chicken Wrap',    desc:'Harissa, pickled jalapeños, spicy garlic sauce, extra chili flakes. For heat seekers only.', price:13.99, cal:535, tags:['Halal','Spicy','New'], veg:false, spicy:true,  available:true, featured:false, prepTime:'5–7 min' },
  { id:'w5', cat:'wraps',   name:'Falafel Wrap',          desc:'Crispy golden falafel, house-made hummus, fresh herbs, lemon. 100% plant-based.', price:10.99, cal:440, tags:['Vegetarian','Vegan'], veg:true, spicy:false, available:true, featured:false, prepTime:'4–6 min' },
  { id:'w6', cat:'wraps',   name:'Kofta Wrap',            desc:'Seasoned beef and lamb kofta skewers, roasted peppers, tahini, parsley in saj bread.', price:14.49, cal:560, tags:['Halal'], veg:false, spicy:false, available:true, featured:false, prepTime:'7–9 min' },
  { id:'p1', cat:'plates',  name:'Chicken Shawarma Plate', desc:'Carved chicken over saffron rice, house salad, three sauces, and warm pita.', price:16.99, cal:780, tags:['Halal'], veg:false, spicy:false, available:true, featured:true,  prepTime:'8–10 min' },
  { id:'p2', cat:'plates',  name:'Mixed Shawarma Plate',  desc:'Chicken and beef over saffron rice, hummus, fattoush, grilled tomato, three sauces. Our most-ordered dish.', price:18.99, cal:860, tags:['Halal','Most Ordered'], veg:false, spicy:false, available:true, featured:true,  prepTime:'8–10 min' },
  { id:'p3', cat:'plates',  name:'Beef & Lamb Plate',     desc:'Slow-roasted beef and lamb over saffron rice, grilled veg, hummus, tahini.', price:19.99, cal:900, tags:['Halal'], veg:false, spicy:false, available:true, featured:false, prepTime:'8–10 min' },
  { id:'p4', cat:'plates',  name:'Kofta Plate',           desc:'Two kofta skewers over saffron rice, grilled peppers, tahini, warm pita.', price:17.99, cal:820, tags:['Halal'], veg:false, spicy:false, available:true, featured:false, prepTime:'10–12 min' },
  { id:'p5', cat:'plates',  name:'Falafel Plate',         desc:'Eight golden falafel, hummus, fattoush, pickled turnips, warm pita. A vegetarian feast.', price:13.99, cal:640, tags:['Vegetarian'], veg:true, spicy:false, available:true, featured:false, prepTime:'6–8 min' },
  { id:'p6', cat:'plates',  name:'Heritage Grand Platter', desc:'For two — all meats, saffron rice, hummus, fattoush, grilled veg, and all four house sauces.', price:34.99, cal:1800, tags:['Halal','For Two','Heritage Special'], veg:false, spicy:false, available:true, featured:true,  prepTime:'12–15 min' },
  { id:'s1', cat:'sides',   name:'Hummus & Pita',         desc:'House-made hummus, olive oil, paprika, warm freshly baked pita.', price:5.99, cal:280, tags:['Vegetarian'], veg:true, spicy:false, available:true, featured:false, prepTime:'2 min' },
  { id:'s2', cat:'sides',   name:'Garlic Fries',          desc:'Crispy fries tossed in signature garlic sauce and fresh parsley.', price:5.99, cal:420, tags:['Vegetarian'], veg:true, spicy:false, available:true, featured:false, prepTime:'5 min' },
  { id:'s3', cat:'sides',   name:'Fattoush Salad',        desc:'Crispy pita chips, radish, cucumber, heirloom tomatoes, sumac vinaigrette.', price:6.99, cal:180, tags:['Vegetarian','Healthy'], veg:true, spicy:false, available:true, featured:false, prepTime:'3 min' },
  { id:'s4', cat:'sides',   name:'Tabbouleh',             desc:'Fresh flat-leaf parsley, bulgur wheat, tomatoes, green onion, lemon, olive oil.', price:6.49, cal:150, tags:['Vegetarian','Healthy'], veg:true, spicy:false, available:true, featured:false, prepTime:'2 min' },
  { id:'s5', cat:'sides',   name:'Pickled Turnips',       desc:'Traditional pink pickled turnips — house-pickled daily. Tangy and crunchy.', price:2.49, cal:30,  tags:['Vegan'], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
  { id:'s6', cat:'sides',   name:'Extra Sauce',           desc:'Signature Garlic, Tahini, Spicy Harissa, or Sweet Chili. 4oz cup.', price:0.99, cal:80,  tags:['Vegetarian'], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
  { id:'d1', cat:'drinks',  name:'Fresh Mint Lemonade',   desc:'House-squeezed lemons, garden mint, cane sugar, crushed ice. Made to order, every time.', price:3.99, cal:120, tags:['Fresh','Signature'], veg:true, spicy:false, available:true, featured:true,  prepTime:'3 min' },
  { id:'d2', cat:'drinks',  name:'Jallab Juice',          desc:'Grape juice, rose water, pomegranate molasses, pine nuts, raisins.', price:4.49, cal:160, tags:['Traditional'], veg:true, spicy:false, available:true, featured:false, prepTime:'2 min' },
  { id:'d3', cat:'drinks',  name:'Ayran',                 desc:'Traditional chilled yogurt drink. Refreshing and pairs perfectly with shawarma.', price:2.99, cal:90,  tags:['Traditional'], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
  { id:'d4', cat:'drinks',  name:'Turkish Tea',           desc:'Served hot in a traditional tulip glass. Strong and aromatic.', price:2.49, cal:5,   tags:['Hot'], veg:true, spicy:false, available:true, featured:false, prepTime:'3 min' },
  { id:'d5', cat:'drinks',  name:'Soft Drink',            desc:'Coke, Diet Coke, Sprite, or Ginger Ale — 355ml, ice cold.', price:1.99, cal:140, tags:[], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
  { id:'ds1',cat:'desserts',name:'Baklava (3pc)',          desc:'Hand-rolled phyllo pastry, crushed pistachios and walnuts, orange blossom honey syrup.', price:5.99, cal:320, tags:['Vegetarian','Sweet'], veg:true, spicy:false, available:true, featured:true,  prepTime:'1 min' },
  { id:'ds2',cat:'desserts',name:'Knafeh',                desc:'Warm shredded wheat pastry, sweet akkawi cheese, rose water syrup, crushed pistachios. Served warm.', price:7.49, cal:480, tags:['Vegetarian','Chef Special'], veg:true, spicy:false, available:true, featured:true,  prepTime:'3 min' },
  { id:'ds3',cat:'desserts',name:'Halva',                 desc:'Traditional tahini-based confection with pistachios. Dense and authentically sweet.', price:3.99, cal:260, tags:['Vegetarian'], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
  { id:'ds4',cat:'desserts',name:'Maamoul (2pc)',          desc:'Shortbread cookies filled with dates and walnuts, dusted with powdered sugar. Baked fresh daily.', price:4.49, cal:290, tags:['Vegetarian','Baked Fresh'], veg:true, spicy:false, available:true, featured:false, prepTime:'1 min' },
]

// ── CATEGORIES ───────────────────────────────────────────────────────────────
export const CATS = [
  { id:'all',      l:'All Items',  icon:'✦' },
  { id:'wraps',    l:'Wraps',      icon:'🫔' },
  { id:'plates',   l:'Plates',     icon:'🍽' },
  { id:'sides',    l:'Sides',      icon:'🥙' },
  { id:'drinks',   l:'Drinks',     icon:'🍋' },
  { id:'desserts', l:'Desserts',   icon:'🍯' },
]

// ── STATS ────────────────────────────────────────────────────────────────────
export const STATS = [
  { v:8400, s:'+', l:'Orders Served',   note:'and counting' },
  { v:10,   s:'+', l:'Years in Oshawa', note:'since 2015' },
  { v:127,  s:'',  l:'5-Star Reviews',  note:'on Google' },
  { v:200,  s:'+', l:'Events Catered',  note:'15 to 300 guests' },
]

// ── REVIEWS ──────────────────────────────────────────────────────────────────
export const REVIEWS = [
  { name:'Ahmad K.',    stars:5, text:'Absolutely the best shawarma in Oshawa. The chicken is so tender and the garlic sauce is incredible. Been coming every week for months!', date:'2 weeks ago',   initials:'AK', platform:'Google'   },
  { name:'Sarah M.',    stars:5, text:'The Mixed Shawarma Plate is unreal. Huge portions, amazing flavours, staff is so friendly. My whole family loves this place.',            date:'1 month ago',  initials:'SM', platform:'Google'   },
  { name:'Omar H.',     stars:5, text:'Authentic taste that reminds me of home. The knafeh is to die for. Heritage Shawarma is the real deal — highly recommend.',              date:'3 weeks ago',  initials:'OH', platform:'Yelp'     },
  { name:'Jennifer L.', stars:4, text:'Great food, fast service. The falafel wrap was fresh and crispy. Will definitely be back to try the beef plate next time.',               date:'5 days ago',   initials:'JL', platform:'Google'   },
  { name:'Mohammed A.', stars:5, text:'100% halal, amazing quality. The Grand Platter fed our whole family. Best value in town. Absolutely recommended!',                       date:'2 months ago', initials:'MA', platform:'Facebook' },
  { name:'Priya S.',    stars:5, text:'Discovered this gem by accident — now it\'s our go-to spot. Fresh mint lemonade and chicken shawarma is perfection.',                    date:'1 week ago',   initials:'PS', platform:'Google'   },
  { name:'Tariq B.',    stars:5, text:'Grand Platter for two is insane value. Everything fresh, everything delicious. The garlic fries alone are worth the trip.',              date:'3 days ago',   initials:'TB', platform:'Google'   },
  { name:'Yusuf A.',    stars:5, text:'As someone from Lebanon, I can say this is genuinely authentic. The flavours, the spices, the technique — it\'s the real thing.',       date:'1 month ago',  initials:'YA', platform:'Google'   },
]

// ── OFFERS ───────────────────────────────────────────────────────────────────
export const OFFERS = [
  { id:'o1', badge:'Daily Deal',       title:'Lunch Combo',    desc:'Any wrap + garlic fries + soft drink', price:16.99, orig:20.97, valid:'11AM–3PM Daily',  grad:'linear-gradient(135deg,#FF5C1A,#E8830A)' },
  { id:'o2', badge:'Family Favourite', title:'Family Feast',   desc:'Grand Platter + 4 drinks + 2 desserts', price:49.99, orig:62.42, valid:'All Day',         grad:'linear-gradient(135deg,#D4A020,#E8C040)' },
  { id:'o3', badge:'Evening Special',  title:'Date Night',     desc:'2 Mixed Plates + 2 Mint Lemonades',    price:35.99, orig:41.96, valid:'After 5PM',       grad:'linear-gradient(135deg,#C8621A,#D4962A)' },
]

// ── AWARDS ───────────────────────────────────────────────────────────────────
export const AWARDS = [
  { icon:'🏆', title:'Best Halal Restaurant',     org:'Durham Region Food Awards',       year:'2022' },
  { icon:'⭐', title:'4.5★ Google Rating',         org:'127+ Verified Reviews',            year:'2025' },
  { icon:'🥇', title:'Top 10 Shawarma Ontario',   org:'Ontario Foodie Guide',             year:'2023' },
  { icon:'❤️', title:'Community Choice Award',    org:'Oshawa Chamber of Commerce',       year:'2024' },
]

// ── CATERING PACKAGES ────────────────────────────────────────────────────────
export const CATERING_PACKAGES = [
  { id:'c1', name:'Heritage Starter', serves:'15–25', price:299, pph:12, color:'#C9943A', includes:['50 chicken shawarma wraps','2 large hummus platters','2 fattoush salads','Pita bread basket','Full sauce & condiment tray','Disposable plates & napkins'] },
  { id:'c2', name:'Heritage Classic', serves:'25–50', price:549, pph:11, color:'#E8943A', featured:true, includes:['Mixed shawarma platter (100pc)','Kofta skewers (50pc)','3 large hummus platters','3 fattoush salads','Saffron rice (serves 50)','Full sauce tray'] },
  { id:'c3', name:'Heritage Grand',   serves:'50–100',price:999, pph:10, color:'#FFD060', includes:['Full shawarma station (all meats)','Kofta & falafel platters','5 hummus platters','4 assorted salads','Saffron rice (serves 100)','Baklava dessert tray','Professional setup & service','Dedicated coordinator'] },
]

// ── LOYALTY TIERS ────────────────────────────────────────────────────────────
export const LOYALTY_TIERS = [
  { name:'Flame Starter',   min:0,    max:199,  color:'#A0522D', disc:'5%',  badge:'🔶', perks:['5% off every order','Birthday free drink','Member-only deals'] },
  { name:'Fire Keeper',     min:200,  max:499,  color:'#C8621A', disc:'8%',  badge:'🔥', perks:['8% off every order','Free side on 5th visit','Priority catering'] },
  { name:'Gold Flame',      min:500,  max:999,  color:'#D4962A', disc:'12%', badge:'⭐', perks:['12% off every order','Free dessert monthly','VIP catering pricing'] },
  { name:'Heritage Legend', min:1000, max:99999,color:'#FFD060', disc:'15%', badge:'👑', perks:['15% off everything','Free birthday meal','Wall of Fame listing','Personal consultant'] },
]

// ── TEAM ─────────────────────────────────────────────────────────────────────
export const TEAM = [
  { initials:'AK', name:'Ahmed Khan',       role:'Founder & Head Chef',   bio:'20 years culinary experience. Founded Heritage Shawarma to bring authentic Lebanese flavours to Oshawa.', since:'2015' },
  { initials:'FA', name:'Fatima Al-Hassan', role:'Operations Manager',    bio:'Ensures every shift runs perfectly. Background in hospitality management, every customer leaves satisfied.', since:'2016' },
  { initials:'YM', name:'Yusuf Mustafa',    role:'Master Shawarma Carver',bio:'15 years at the spit. There is an art to carving shawarma — Yusuf has mastered it completely.', since:'2015' },
  { initials:'SR', name:'Sara Rahman',      role:'Catering Director',     bio:'Coordinated 200+ events from intimate dinners to 200-person corporate functions. She makes every event effortless.', since:'2019' },
  { initials:'KA', name:'Khalid Aoun',      role:'Pastry & Desserts Chef', bio:'His baklava and knafeh are why customers drive across the city. Three generations of Lebanese bakery knowledge.', since:'2020' },
]

// ── TIMELINE ─────────────────────────────────────────────────────────────────
export const TIMELINE = [
  { year:'2015', title:'Heritage Opens',          desc:'Ahmed Khan opens with three menu items, two staff, and one dream: bring authentic halal Lebanese flavours to Oshawa.' },
  { year:'2016', title:'First 1,000 Customers',   desc:'Word spreads through Oshawa. Heritage hits 1,000 customers within 8 months of opening.' },
  { year:'2017', title:'Mixed Plate Launches',     desc:'The Mixed Shawarma Plate debuts and quickly becomes our most-ordered dish — a position it holds to this day.' },
  { year:'2019', title:'Catering Program',         desc:'Heritage begins catering weddings and corporate events. Sara Rahman joins to lead the catering division.' },
  { year:'2020', title:'Online Ordering',          desc:'Heritage launches on SkipTheDishes and Uber Eats for delivery across Oshawa and Durham Region.' },
  { year:'2021', title:'Flame Loyalty Program',    desc:'The Flame Loyalty Program launches, rewarding Heritage\'s most dedicated regulars.' },
  { year:'2023', title:'Grand Platter Launch',     desc:'The Heritage Grand Platter for Two debuts — an instant bestseller.' },
  { year:'2025', title:'Digital Experience',       desc:'Full digital platform launches with online ordering, HAI assistant, and Flame Loyalty Dashboard.' },
]

// ── FAQs ─────────────────────────────────────────────────────────────────────
export const FAQS = [
  { q:'Is all your food halal certified?',        a:'Yes, 100%. Every protein, every ingredient is sourced from certified halal suppliers. This is a non-negotiable commitment established on Day 1.' },
  { q:'What are your opening hours?',              a:'Mon–Thu 11:00 AM – 10:00 PM. Fri–Sat 11:00 AM – 11:00 PM. Sunday 12:00 PM – 9:00 PM.' },
  { q:'Do you offer delivery?',                   a:'Yes! SkipTheDishes, Uber Eats, and DoorDash — or order directly here for pickup with full loyalty points.' },
  { q:'How far in advance for catering?',         a:'72 hours minimum for small events (under 50), 1–2 weeks for large events. Call (289) 980-0149.' },
  { q:'Do you have vegetarian options?',          a:'Yes. Falafel Wrap ($10.99) and Falafel Plate ($13.99) are fully vegetarian. Tabbouleh, fattoush, and pickled turnips are vegan.' },
  { q:'Can I customise my order?',                a:'Absolutely — no garlic sauce, extra spice, sauce on the side, no onions. Just let us know when ordering.' },
  { q:'How does the Loyalty Program work?',       a:'Earn 10 flame points per dollar spent. Four tiers: Flame Starter (5% off) up to Heritage Legend (15% off + free birthday meal).' },
  { q:'Is there parking at your location?',       a:'Yes, free plaza parking directly in front at 2620 Simcoe St N, Unit 6, Oshawa.' },
]

// ── DELIVERY PLATFORMS ───────────────────────────────────────────────────────
export const PLATFORMS = [
  { name:'SkipTheDishes', icon:'🛵', color:'#F77F00', url:'https://www.skipthedishes.com/heritage-shawarma' },
  { name:'Uber Eats',     icon:'🟢', color:'#06C167', url:'https://ubereats.com' },
  { name:'DoorDash',      icon:'🔴', color:'#FF3008', url:'https://doordash.com' },
]

// ── EMPTY ITEM ───────────────────────────────────────────────────────────────
export const EMPTY_ITEM = {
  id:'', cat:'wraps', name:'', desc:'', price:'', cal:'',
  tags:'', veg:false, spicy:false, available:true, featured:false, prepTime:'5–7 min',
}
