import { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/audio';

const ASSETS = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures';

// الموارد القابلة للسحب
const RESOURCES = {
  // ===== المواد الأساسية =====
  wood: { id: 'wood', label: 'خشب', image: `${ASSETS}/block/oak_planks.png` },
  stick: { id: 'stick', label: 'عصا', image: `${ASSETS}/item/stick.png` },
  stone: { id: 'stone', label: 'حجر', image: `${ASSETS}/block/stone.png` },
  cobblestone: { id: 'cobblestone', label: 'حصى', image: `${ASSETS}/block/cobblestone.png` },
  iron: { id: 'iron', label: 'حديد', image: `${ASSETS}/item/iron_ingot.png` },
  gold: { id: 'gold', label: 'ذهب', image: `${ASSETS}/item/gold_ingot.png` },
  diamond: { id: 'diamond', label: 'دايموند', image: `${ASSETS}/item/diamond.png` },
  netherite: { id: 'netherite', label: 'نيثريت', image: `${ASSETS}/item/netherite_ingot.png` },
  emerald: { id: 'emerald', label: 'زمرّد', image: `${ASSETS}/item/emerald.png` },
  lapis: { id: 'lapis', label: 'لازورد', image: `${ASSETS}/item/lapis_lazuli.png` },
  redstone: { id: 'redstone', label: 'ريدستون', image: `${ASSETS}/item/redstone.png` },
  coal: { id: 'coal', label: 'فحم', image: `${ASSETS}/item/coal.png` },
  quartz: { id: 'quartz', label: 'كوارتز', image: `${ASSETS}/item/quartz.png` },
  copper: { id: 'copper', label: 'نحاس', image: `${ASSETS}/item/copper_ingot.png` },
  amethyst: { id: 'amethyst', label: 'جمشت', image: `${ASSETS}/item/amethyst_shard.png` },

  // ===== الكتل =====
  dirt: { id: 'dirt', label: 'تراب', image: `${ASSETS}/block/dirt.png` },
  grass: { id: 'grass', label: 'عشب', image: `${ASSETS}/block/grass_block.png` },
  sand: { id: 'sand', label: 'رمل', image: `${ASSETS}/block/sand.png` },
  gravel: { id: 'gravel', label: 'حصى صغير', image: `${ASSETS}/block/gravel.png` },
  clay: { id: 'clay', label: 'طين', image: `${ASSETS}/item/clay_ball.png` },
  brick: { id: 'brick', label: 'طوب', image: `${ASSETS}/item/brick.png` },
  netherrack: { id: 'netherrack', label: 'نتيراك', image: `${ASSETS}/block/netherrack.png` },
  end_stone: { id: 'end_stone', label: 'حجر النهاية', image: `${ASSETS}/block/end_stone.png` },
  obsidian: { id: 'obsidian', label: 'أبسيديان', image: `${ASSETS}/block/obsidian.png` },
  deepslate: { id: 'deepslate', label: 'سليت عميق', image: `${ASSETS}/block/deepslate.png` },

  // ===== المواد الخاصة =====
  leather: { id: 'leather', label: 'جلد', image: `${ASSETS}/item/leather.png` },
  feather: { id: 'feather', label: 'ريشة', image: `${ASSETS}/item/feather.png` },
  string: { id: 'string', label: 'خيط', image: `${ASSETS}/item/string.png` },
  bone: { id: 'bone', label: 'عظم', image: `${ASSETS}/item/bone.png` },
  slime: { id: 'slime', label: 'سلايم', image: `${ASSETS}/item/slime_ball.png` },
  blaze: { id: 'blaze', label: 'بلايز', image: `${ASSETS}/item/blaze_rod.png` },
  ghast: { id: 'ghast', label: 'دمعة غاست', image: `${ASSETS}/item/ghast_tear.png` },
  spider_eye: { id: 'spider_eye', label: 'عين عنكبوت', image: `${ASSETS}/item/spider_eye.png` },
  gunpowder: { id: 'gunpowder', label: 'بارود', image: `${ASSETS}/item/gunpowder.png` },
  magma: { id: 'magma', label: 'كريم ماغما', image: `${ASSETS}/item/magma_cream.png` },
  ender_pearl: { id: 'ender_pearl', label: 'لؤلؤة إندر', image: `${ASSETS}/item/ender_pearl.png` },
  eye_of_ender: { id: 'eye_of_ender', label: 'عين إندر', image: `${ASSETS}/item/ender_eye.png` },
  chorus_fruit: { id: 'chorus_fruit', label: 'فاكهة كورس', image: `${ASSETS}/item/chorus_fruit.png` },
  popped_chorus: { id: 'popped_chorus', label: 'كورس منتفخ', image: `${ASSETS}/item/popped_chorus_fruit.png` },
  prismarine_shard: { id: 'prismarine_shard', label: 'شظية بريزمارين', image: `${ASSETS}/item/prismarine_shard.png` },
  prismarine_crystal: { id: 'prismarine_crystal', label: 'بلورة بريزمارين', image: `${ASSETS}/item/prismarine_crystal.png` },
  nautilus_shell: { id: 'nautilus_shell', label: 'صدفة نوتيلوس', image: `${ASSETS}/item/nautilus_shell.png` },
  heart_of_sea: { id: 'heart_of_sea', label: 'قلب البحر', image: `${ASSETS}/item/heart_of_the_sea.png` },
  phantom_membrane: { id: 'phantom_membrane', label: 'غشاء فانتوم', image: `${ASSETS}/item/phantom_membrane.png` },
  shulker_shell: { id: 'shulker_shell', label: 'صدفة شولكر', image: `${ASSETS}/item/shulker_shell.png` },
  echo_shard: { id: 'echo_shard', label: 'شظية صدى', image: `${ASSETS}/item/echo_shard.png` },
  nether_star: { id: 'nether_star', label: 'نجم النيذر', image: `${ASSETS}/item/nether_star.png` },

  // ===== الطعام =====
  wheat: { id: 'wheat', label: 'قمح', image: `${ASSETS}/item/wheat.png` },
  bread: { id: 'bread', label: 'خبز', image: `${ASSETS}/item/bread.png` },
  apple: { id: 'apple', label: 'تفاح', image: `${ASSETS}/item/apple.png` },
  carrot: { id: 'carrot', label: 'جزر', image: `${ASSETS}/item/carrot.png` },
  potato: { id: 'potato', label: 'بطاطس', image: `${ASSETS}/item/potato.png` },
  beetroot: { id: 'beetroot', label: 'شمندر', image: `${ASSETS}/item/beetroot.png` },
  sugar: { id: 'sugar', label: 'سكر', image: `${ASSETS}/item/sugar.png` },
  egg: { id: 'egg', label: 'بيضة', image: `${ASSETS}/item/egg.png` },

  // ===== أخرى =====
  book: { id: 'book', label: 'كتاب', image: `${ASSETS}/item/book.png` },
  paper: { id: 'paper', label: 'ورق', image: `${ASSETS}/item/paper.png` },
  glass: { id: 'glass', label: 'زجاج', image: `${ASSETS}/block/glass.png` },
  wool: { id: 'wool', label: 'صوف', image: `${ASSETS}/block/white_wool.png` },
  dye: { id: 'dye', label: 'صبغة', image: `${ASSETS}/item/lapis_lazuli.png` },
  brick_block: { id: 'brick_block', label: 'طوب أحمر', image: `${ASSETS}/block/bricks.png` },
  iron_block: { id: 'iron_block', label: 'كتلة حديد', image: `${ASSETS}/block/iron_block.png` },
  gold_block: { id: 'gold_block', label: 'كتلة ذهب', image: `${ASSETS}/block/gold_block.png` },
  diamond_block: { id: 'diamond_block', label: 'كتلة دايموند', image: `${ASSETS}/block/diamond_block.png` },
  glowstone: { id: 'glowstone', label: 'حجر مضيء', image: `${ASSETS}/block/glowstone.png` },
  sculk: { id: 'sculk', label: 'سكالك', image: `${ASSETS}/block/sculk.png` },
};
// الوصفات (النمط 3x3: صف-عمود). null = خانة فارغة
const RECIPES = [
  // Swords
  {
    id: 'diamond-sword',
    name: 'سيف دايموند',
    result: `${ASSETS}/item/diamond_sword.png`,
    pattern: [null, 'diamond', null, null, 'diamond', null, null, 'stick', null],
  },
  {
    id: 'iron-sword',
    name: 'سيف حديد',
    result: `${ASSETS}/item/iron_sword.png`,
    pattern: [null, 'iron', null, null, 'iron', null, null, 'stick', null],
  },
  {
    id: 'stone-sword',
    name: 'سيف حجري',
    result: `${ASSETS}/item/stone_sword.png`,
    pattern: [null, 'stone', null, null, 'stone', null, null, 'stick', null],
  },
  {
    id: 'wooden-sword',
    name: 'سيف خشبي',
    result: `${ASSETS}/item/wooden_sword.png`,
    pattern: [null, 'wood', null, null, 'wood', null, null, 'stick', null],
  },
  {
    id: 'netherite-sword',
    name: 'سيف نتريت',
    result: `${ASSETS}/item/netherite_sword.png`,
    pattern: [null, 'netherite', null, null, 'netherite', null, null, 'stick', null],
  },

  // Pickaxes
  {
    id: 'diamond-pickaxe',
    name: 'بيكاكس دايموند',
    result: `${ASSETS}/item/diamond_pickaxe.png`,
    pattern: ['diamond', 'diamond', 'diamond', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'iron-pickaxe',
    name: 'بيكاكس حديد',
    result: `${ASSETS}/item/iron_pickaxe.png`,
    pattern: ['iron', 'iron', 'iron', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'stone-pickaxe',
    name: 'بيكاكس حجري',
    result: `${ASSETS}/item/stone_pickaxe.png`,
    pattern: ['stone', 'stone', 'stone', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'wooden-pickaxe',
    name: 'بيكاكس خشبي',
    result: `${ASSETS}/item/wooden_pickaxe.png`,
    pattern: ['wood', 'wood', 'wood', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'gold-pickaxe',
    name: 'بيكاكس ذهبي',
    result: `${ASSETS}/item/golden_pickaxe.png`,
    pattern: ['gold', 'gold', 'gold', null, 'stick', null, null, 'stick', null],
  },

  // Axes
  {
    id: 'diamond-axe',
    name: 'فأس دايموند',
    result: `${ASSETS}/item/diamond_axe.png`,
    pattern: ['diamond', 'diamond', null, 'diamond', 'stick', null, null, 'stick', null],
  },
  {
    id: 'iron-axe',
    name: 'فأس حديد',
    result: `${ASSETS}/item/iron_axe.png`,
    pattern: ['iron', 'iron', null, 'iron', 'stick', null, null, 'stick', null],
  },
  {
    id: 'stone-axe',
    name: 'فأس حجري',
    result: `${ASSETS}/item/stone_axe.png`,
    pattern: ['stone', 'stone', null, 'stone', 'stick', null, null, 'stick', null],
  },
  {
    id: 'wooden-axe',
    name: 'فأس خشبي',
    result: `${ASSETS}/item/wooden_axe.png`,
    pattern: ['wood', 'wood', null, 'wood', 'stick', null, null, 'stick', null],
  },
  {
    id: 'gold-axe',
    name: 'فأس ذهبي',
    result: `${ASSETS}/item/golden_axe.png`,
    pattern: ['gold', 'gold', null, 'gold', 'stick', null, null, 'stick', null],
  },

  // Shovels
  {
    id: 'diamond-shovel',
    name: 'مجرفة دايموند',
    result: `${ASSETS}/item/diamond_shovel.png`,
    pattern: [null, 'diamond', null, null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'iron-shovel',
    name: 'مجرفة حديد',
    result: `${ASSETS}/item/iron_shovel.png`,
    pattern: [null, 'iron', null, null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'stone-shovel',
    name: 'مجرفة حجرية',
    result: `${ASSETS}/item/stone_shovel.png`,
    pattern: [null, 'stone', null, null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'wooden-shovel',
    name: 'مجرفة خشبية',
    result: `${ASSETS}/item/wooden_shovel.png`,
    pattern: [null, 'wood', null, null, 'stick', null, null, 'stick', null],
  },

  // Armor (Helmets)
  {
    id: 'diamond-helmet',
    name: 'خوذة دايموند',
    result: `${ASSETS}/item/diamond_helmet.png`,
    pattern: ['diamond', 'diamond', 'diamond', 'diamond', null, 'diamond', null, null, null],
  },
  {
    id: 'iron-helmet',
    name: 'خوذة حديد',
    result: `${ASSETS}/item/iron_helmet.png`,
    pattern: ['iron', 'iron', 'iron', 'iron', null, 'iron', null, null, null],
  },
  {
    id: 'gold-helmet',
    name: 'خوذة ذهبية',
    result: `${ASSETS}/item/golden_helmet.png`,
    pattern: ['gold', 'gold', 'gold', 'gold', null, 'gold', null, null, null],
  },

  // Armor (Chestplates)
  {
    id: 'diamond-chestplate',
    name: 'صدرية دايموند',
    result: `${ASSETS}/item/diamond_chestplate.png`,
    pattern: ['diamond', null, 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond'],
  },
  {
    id: 'iron-chestplate',
    name: 'صدرية حديد',
    result: `${ASSETS}/item/iron_chestplate.png`,
    pattern: ['iron', null, 'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'iron'],
  },

  // Tools (Hoe)
  {
    id: 'diamond-hoe',
    name: 'معزقة دايموند',
    result: `${ASSETS}/item/diamond_hoe.png`,
    pattern: ['diamond', 'diamond', null, null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'iron-hoe',
    name: 'معزقة حديد',
    result: `${ASSETS}/item/iron_hoe.png`,
    pattern: ['iron', 'iron', null, null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'stone-hoe',
    name: 'معزقة حجرية',
    result: `${ASSETS}/item/stone_hoe.png`,
    pattern: ['stone', 'stone', null, null, 'stick', null, null, 'stick', null],
  },

  // Blocks
  {
    id: 'chest',
    name: 'صندوق',
    result: `${ASSETS}/block/chest_front.png`,
    pattern: ['wood', 'wood', 'wood', 'wood', null, 'wood', 'wood', 'wood', 'wood'],
  },
  {
    id: 'crafting-table',
    name: 'طاولة صنع',
    result: `${ASSETS}/block/crafting_table_front.png`,
    pattern: ['wood', 'wood', null, 'wood', 'wood', null, null, null, null],
  },
  {
    id: 'furnace',
    name: 'فرن',
    result: `${ASSETS}/block/furnace_front.png`,
    pattern: ['cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', null, 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone'],
  },
  {
    id: 'bookshelf',
    name: 'رف كتب',
    result: `${ASSETS}/block/bookshelf.png`,
    pattern: ['wood', 'wood', 'wood', 'book', 'book', 'book', 'wood', 'wood', 'wood'],
  },
  {
    id: 'bed',
    name: 'سرير',
    result: `${ASSETS}/block/bed.png`,
    pattern: ['wool', 'wool', 'wool', 'wool', 'wool', 'wool', 'wood', 'wood', 'wood'],
  },

  // Special
  {
    id: 'torch',
    name: 'شعلة',
    result: `${ASSETS}/block/torch.png`,
    pattern: [null, 'coal', null, null, 'stick', null, null, null, null],
  },
  {
    id: 'ladder',
    name: 'سلم',
    result: `${ASSETS}/block/ladder.png`,
    pattern: ['stick', null, 'stick', 'stick', 'stick', 'stick', 'stick', null, 'stick'],
  },
  {
    id: 'fence',
    name: 'سياج',
    result: `${ASSETS}/block/fence.png`,
    pattern: ['stick', 'stick', 'stick', 'stick', 'stick', 'stick', null, null, null],
  },
  {
    id: 'gate',
    name: 'بوابة',
    result: `${ASSETS}/block/fence_gate.png`,
    pattern: ['stick', null, 'stick', 'stick', null, 'stick', null, null, null],
  },
  {
    id: 'door',
    name: 'باب',
    result: `${ASSETS}/item/door.png`,
    pattern: ['wood', 'wood', null, 'wood', 'wood', null, 'wood', 'wood', null],
  },

  // More recipes
  {
    id: 'bow',
    name: 'قوس',
    result: `${ASSETS}/item/bow.png`,
    pattern: [null, 'string', 'stick', 'string', null, 'stick', null, 'string', 'stick'],
  },
  {
    id: 'arrow',
    name: 'سهم',
    result: `${ASSETS}/item/arrow.png`,
    pattern: [null, 'feather', null, null, 'stick', null, null, 'flint', null],
  },
  {
    id: 'shield',
    name: 'درع',
    result: `${ASSETS}/item/shield.png`,
    pattern: ['iron', 'iron', 'iron', 'iron', 'wood', 'iron', null, 'wood', null],
  },
  {
    id: 'fishing_rod',
    name: 'صنارة صيد',
    result: `${ASSETS}/item/fishing_rod.png`,
    pattern: [null, 'string', null, null, 'stick', null, 'stick', null, null],
  },
  {
    id: 'bucket',
    name: 'دلو',
    result: `${ASSETS}/item/bucket.png`,
    pattern: ['iron', null, 'iron', null, 'iron', null, null, null, null],
  },
  {
    id: 'compass',
    name: 'بوصلة',
    result: `${ASSETS}/item/compass.png`,
    pattern: [null, 'iron', null, 'iron', 'redstone', 'iron', null, 'iron', null],
  },
  {
    id: 'clock',
    name: 'ساعة',
    result: `${ASSETS}/item/clock.png`,
    pattern: [null, 'gold', null, 'gold', 'redstone', 'gold', null, 'gold', null],
  },
  {
    id: 'map',
    name: 'خريطة',
    result: `${ASSETS}/item/map.png`,
    pattern: ['paper', 'paper', 'paper', 'paper', 'paper', 'paper', null, 'paper', null],
  },
  {
    id: 'eye_of_ender',
    name: 'عين إندر',
    result: `${ASSETS}/item/ender_eye.png`,
    pattern: [null, 'blaze', null, null, 'ender_pearl', null, null, null, null],
  },
  {
    id: 'ender_chest',
    name: 'صندوق إندر',
    result: `${ASSETS}/block/ender_chest.png`,
    pattern: ['obsidian', 'obsidian', 'obsidian', 'obsidian', 'eye_of_ender', 'obsidian', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'anvil',
    name: 'سندان',
    result: `${ASSETS}/block/anvil.png`,
    pattern: ['iron_block', 'iron_block', 'iron_block', null, 'iron', null, 'iron', 'iron', 'iron'],
  },
  {
    id: 'enchanting_table',
    name: 'طاولة سحر',
    result: `${ASSETS}/block/enchanting_table.png`,
    pattern: [null, 'book', null, 'diamond', 'obsidian', 'diamond', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'brewing_stand',
    name: 'منضدة تخمير',
    result: `${ASSETS}/block/brewing_stand.png`,
    pattern: [null, 'blaze', null, 'cobblestone', null, 'cobblestone', null, 'cobblestone', null],
  },
  {
    id: 'cauldron',
    name: 'مرجل',
    result: `${ASSETS}/block/cauldron.png`,
    pattern: ['iron', null, 'iron', 'iron', 'iron', 'iron', null, 'iron', null],
  },
  {
    id: 'piston',
    name: 'مكبس',
    result: `${ASSETS}/block/piston.png`,
    pattern: ['cobblestone', 'cobblestone', 'cobblestone', 'iron', 'redstone', 'iron', 'cobblestone', 'cobblestone', 'cobblestone'],
  },
  {
    id: 'sticky_piston',
    name: 'مكبس لزج',
    result: `${ASSETS}/block/sticky_piston.png`,
    pattern: ['slime', 'piston', null, null, null, null, null, null, null],
  },
  {
    id: 'tnt',
    name: 'تي إن تي',
    result: `${ASSETS}/block/tnt.png`,
    pattern: ['gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder'],
  },
  {
    id: 'rail',
    name: 'سكة حديد',
    result: `${ASSETS}/block/rail.png`,
    pattern: ['iron', null, 'iron', 'stick', null, 'stick', 'iron', null, 'iron'],
  },
  {
    id: 'minecart',
    name: 'عربة منجم',
    result: `${ASSETS}/item/minecart.png`,
    pattern: ['iron', null, 'iron', 'iron', 'iron', 'iron', null, null, null],
  },
  {
    id: 'boat',
    name: 'قارب',
    result: `${ASSETS}/item/oak_boat.png`,
    pattern: ['wood', null, 'wood', 'wood', 'wood', 'wood', null, null, null],
  },
  {
    id: 'lead',
    name: 'رباط',
    result: `${ASSETS}/item/lead.png`,
    pattern: ['string', 'string', 'string', 'string', 'slime', 'string', null, 'string', null],
  },
  {
    id: 'netherite_sword',
    name: 'سيف نيثريت',
    result: `${ASSETS}/item/netherite_sword.png`,
    pattern: [null, 'netherite', null, null, 'netherite', null, null, 'blaze', null],
  },
  {
    id: 'netherite_pickaxe',
    name: 'بيكاكس نيثريت',
    result: `${ASSETS}/item/netherite_pickaxe.png`,
    pattern: ['netherite', 'netherite', 'netherite', null, 'blaze', null, null, 'blaze', null],
  },
  {
    id: 'netherite_axe',
    name: 'فأس نيثريت',
    result: `${ASSETS}/item/netherite_axe.png`,
    pattern: ['netherite', 'netherite', null, 'netherite', 'blaze', null, null, 'blaze', null],
  },
  {
    id: 'netherite_shovel',
    name: 'مجرفة نيثريت',
    result: `${ASSETS}/item/netherite_shovel.png`,
    pattern: [null, 'netherite', null, null, 'blaze', null, null, 'blaze', null],
  },
  {
    id: 'netherite_hoe',
    name: 'معزقة نيثريت',
    result: `${ASSETS}/item/netherite_hoe.png`,
    pattern: ['netherite', 'netherite', null, null, 'blaze', null, null, 'blaze', null],
  },

  // ===== دروع نيثريت =====
  {
    id: 'netherite_helmet',
    name: 'خوذة نيثريت',
    result: `${ASSETS}/item/netherite_helmet.png`,
    pattern: ['netherite', 'netherite', 'netherite', 'netherite', null, 'netherite', null, null, null],
  },
  {
    id: 'netherite_chestplate',
    name: 'صدرية نيثريت',
    result: `${ASSETS}/item/netherite_chestplate.png`,
    pattern: ['netherite', null, 'netherite', 'netherite', 'netherite', 'netherite', 'netherite', 'netherite', 'netherite'],
  },
  {
    id: 'netherite_leggings',
    name: 'بنطال نيثريت',
    result: `${ASSETS}/item/netherite_leggings.png`,
    pattern: ['netherite', 'netherite', 'netherite', 'netherite', null, 'netherite', 'netherite', null, 'netherite'],
  },
  {
    id: 'netherite_boots',
    name: 'حذاء نيثريت',
    result: `${ASSETS}/item/netherite_boots.png`,
    pattern: ['netherite', null, 'netherite', 'netherite', null, 'netherite', null, null, null],
  },

  // ===== أسلحة متقدمة =====
  {
    id: 'diamond_sword',
    name: 'سيف دايموند',
    result: `${ASSETS}/item/diamond_sword.png`,
    pattern: [null, 'diamond', null, null, 'diamond', null, null, 'stick', null],
  },
  {
    id: 'diamond_pickaxe',
    name: 'بيكاكس دايموند',
    result: `${ASSETS}/item/diamond_pickaxe.png`,
    pattern: ['diamond', 'diamond', 'diamond', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'diamond_axe',
    name: 'فأس دايموند',
    result: `${ASSETS}/item/diamond_axe.png`,
    pattern: ['diamond', 'diamond', null, 'diamond', 'stick', null, null, 'stick', null],
  },

  // ===== كتل نادرة =====
  {
    id: 'beacon',
    name: 'منارة',
    result: `${ASSETS}/block/beacon.png`,
    pattern: ['glass', 'glass', 'glass', 'glass', 'nether_star', 'glass', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'conduit',
    name: 'موصل',
    result: `${ASSETS}/block/conduit.png`,
    pattern: ['nautilus_shell', 'nautilus_shell', 'nautilus_shell', 'nautilus_shell', 'heart_of_sea', 'nautilus_shell', 'nautilus_shell', 'nautilus_shell', 'nautilus_shell'],
  },
  {
    id: 'respawn_anchor',
    name: 'مرساة الإحياء',
    result: `${ASSETS}/block/respawn_anchor.png`,
    pattern: ['obsidian', 'obsidian', 'obsidian', 'obsidian', 'glowstone', 'obsidian', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'ender_chest',
    name: 'صندوق إندر',
    result: `${ASSETS}/block/ender_chest.png`,
    pattern: ['obsidian', 'obsidian', 'obsidian', 'obsidian', 'eye_of_ender', 'obsidian', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'enchanting_table',
    name: 'طاولة سحر',
    result: `${ASSETS}/block/enchanting_table.png`,
    pattern: [null, 'book', null, 'diamond', 'obsidian', 'diamond', 'obsidian', 'obsidian', 'obsidian'],
  },
  {
    id: 'lodestone',
    name: 'حجر الجذب',
    result: `${ASSETS}/block/lodestone.png`,
    pattern: ['deepslate', 'deepslate', 'deepslate', 'deepslate', 'netherite', 'deepslate', 'deepslate', 'deepslate', 'deepslate'],
  },

  // ===== آليات معقدة =====
  {
    id: 'piston',
    name: 'مكبس',
    result: `${ASSETS}/block/piston.png`,
    pattern: ['cobblestone', 'cobblestone', 'cobblestone', 'iron', 'redstone', 'iron', 'cobblestone', 'cobblestone', 'cobblestone'],
  },
  {
    id: 'sticky_piston',
    name: 'مكبس لزج',
    result: `${ASSETS}/block/sticky_piston.png`,
    pattern: ['slime', 'piston', null, null, null, null, null, null, null],
  },
  {
    id: 'observer',
    name: 'مراقب',
    result: `${ASSETS}/block/observer.png`,
    pattern: ['cobblestone', 'redstone', 'cobblestone', 'cobblestone', 'quartz', 'cobblestone', 'cobblestone', 'redstone', 'cobblestone'],
  },
  {
    id: 'daylight_detector',
    name: 'كاشف ضوء النهار',
    result: `${ASSETS}/block/daylight_detector.png`,
    pattern: ['glass', 'glass', 'glass', 'glass', 'quartz', 'glass', 'glass', 'glass', 'glass'],
  },
  {
    id: 'note_block',
    name: 'قطعة نوتة',
    result: `${ASSETS}/block/note_block.png`,
    pattern: ['wood', 'wood', 'wood', 'wood', 'redstone', 'wood', 'wood', 'wood', 'wood'],
  },
  {
    id: 'jukebox',
    name: 'صندوق موسيقى',
    result: `${ASSETS}/block/jukebox.png`,
    pattern: ['wood', 'wood', 'wood', 'wood', 'diamond', 'wood', 'wood', 'wood', 'wood'],
  },

  // ===== عناصر نادرة جداً =====
  {
    id: 'shulker_box',
    name: 'صندوق شولكر',
    result: `${ASSETS}/block/shulker_box.png`,
    pattern: ['shulker_shell', null, 'shulker_shell', 'shulker_shell', 'chest', 'shulker_shell', null, null, null],
  },
  {
    id: 'end_rod',
    name: 'قضيب النهاية',
    result: `${ASSETS}/block/end_rod.png`,
    pattern: ['blaze', 'popped_chorus', null, null, null, null, null, null, null],
  },
  {
    id: 'purpur_block',
    name: 'كتلة بوربور',
    result: `${ASSETS}/block/purpur_block.png`,
    pattern: ['popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus', 'popped_chorus'],
  },
  {
    id: 'sculk_sensor',
    name: 'مستشعر سكالك',
    result: `${ASSETS}/block/sculk_sensor.png`,
    pattern: ['echo_shard', 'echo_shard', 'echo_shard', 'echo_shard', 'amethyst', 'echo_shard', 'echo_shard', 'echo_shard', 'echo_shard'],
  },
  {
    id: 'tnt',
    name: 'تي إن تي',
    result: `${ASSETS}/block/tnt.png`,
    pattern: ['gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder', 'sand', 'gunpowder'],
  },
  {
    id: 'anvil',
    name: 'سندان',
    result: `${ASSETS}/block/anvil.png`,
    pattern: ['iron_block', 'iron_block', 'iron_block', null, 'iron', null, 'iron', 'iron', 'iron'],
  },
  {
    id: 'brewing_stand',
    name: 'منضدة تخمير',
    result: `${ASSETS}/block/brewing_stand.png`,
    pattern: [null, 'blaze', null, 'cobblestone', null, 'cobblestone', null, 'cobblestone', null],
  },
  {
    id: 'cauldron',
    name: 'مرجل',
    result: `${ASSETS}/block/cauldron.png`,
    pattern: ['iron', null, 'iron', 'iron', 'iron', 'iron', null, 'iron', null],
  },
];



// انعكاس أفقي (يسمح بصنع الوصفة يمين أو يسار)
const mirror = (p) => [p[2], p[1], p[0], p[5], p[4], p[3], p[8], p[7], p[6]];
const matches = (grid, pattern) => grid.every((cell, i) => cell === pattern[i]);

export function CraftingScreen({ onBack, onAddPoint, playerOneName, playerTwoName, playerOneBlock, playerTwoBlock }) {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [turn, setTurn] = useState('player1');
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverCell, setHoverCell] = useState(-1);
  const [wrong, setWrong] = useState(false);
  const [celebrating, setCelebrating] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const justDropped = useRef(false);
  const progressPercent = ((recipeIndex + 1) / RECIPES.length) * 100;

  const recipe = RECIPES[recipeIndex];
  const currentName = turn === 'player1' ? playerOneName : playerTwoName;
  const currentBlock = turn === 'player1' ? playerOneBlock : playerTwoBlock;
  const turnColor = turn === 'player1' ? '#55ffff' : '#ff55ff';

  // البحث عن الخانة تحت المؤشر أثناء السحب
  const getCellIndex = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el?.closest?.('[data-cell]');
    return cell ? Number(cell.getAttribute('data-cell')) : -1;
  };

  const startDrag = (e, resource) => {
    e.preventDefault();
    setSelected(null);
    setDragging({ resource });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  // مستمعات السحب العامة (تعمل بالماوس واللمس)
  useEffect(() => {
    if (!dragging) return;

    const move = (e) => {
      e.preventDefault();
      setDragPos({ x: e.clientX, y: e.clientY });
      setHoverCell(getCellIndex(e));
    };

    const up = (e) => {
      const idx = getCellIndex(e);
      if (idx >= 0) {
        setGrid((g) => { const n = [...g]; n[idx] = dragging.resource; return n; });
        justDropped.current = true;
      } else {
        // ضغطة سريعة بدون سحب => اختيار المورد (نمط "اضغط ثم ضع")
        setSelected(dragging.resource);
      }
      setDragging(null);
      setHoverCell(-1);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging]);

  const handleCellTap = (index) => {
    if (justDropped.current) { justDropped.current = false; return; }
    if (selected) {
      setGrid((g) => { const n = [...g]; n[index] = selected; return n; });
      setSelected(null);
    } else if (grid[index]) {
      setGrid((g) => { const n = [...g]; n[index] = null; return n; });
    }
  };

  const handleCheck = () => {
    if (matches(grid, recipe.pattern) || matches(grid, mirror(recipe.pattern))) {
      onAddPoint(turn); // يضيف نقطة + صوت "نقطة" تلقائياً
      setCelebrating({ recipe, player: turn });
    } else {
      playSound('minus');
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
    }
  };

  // عند نجاح الصنع: احتفالية ثم الانتقال للوصفة التالية والدور الآخر
  useEffect(() => {
    if (!celebrating) return;
    const t = setTimeout(() => {
      setCelebrating(null);
      setGrid(Array(9).fill(null));
      setSelected(null);
      setRecipeIndex((i) => (i + 1) % RECIPES.length);
      setTurn((t) => (t === 'player1' ? 'player2' : 'player1'));
    }, 2000);
    return () => clearTimeout(t);
  }, [celebrating]);

  const handleClear = () => { setGrid(Array(9).fill(null)); setSelected(null); };
  const handleSkip = () => {
    setGrid(Array(9).fill(null));
    setSelected(null);
    setRecipeIndex((i) => (i + 1) % RECIPES.length);
    setTurn((t) => (t === 'player1' ? 'player2' : 'player1'));
  };

  const resourceList = Object.values(RESOURCES);

  return (
    <div className="minecraft-card" style={{ padding: '15px 12px', direction: 'rtl', userSelect: 'none' }}>
      <style>{`
        @keyframes craftPop { 0% { transform: scale(0); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }
        @keyframes floatUp { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-140px); opacity: 0; } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 8px rgba(85,255,85,.4); } 50% { box-shadow: 0 0 28px rgba(85,255,85,.95); } }
      `}</style>

      {/* الهيدر */}



      {/* شريط تقدم الأسئلة التفاعلي */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#222',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '12px',
        border: '1px solid #444'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: '#55ff55',
          transition: 'width 0.3s ease-in-out',
          boxShadow: '0 0 8px #55ff55'
        }} />
      </div>
      {/* الهيدر وزر العودة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ color: '#ffff', margin: 0, fontSize: '1.1rem' }}>
          تحدي الكرافتينج 🪨        </h2>
        <button
          className="minecraft-btn"
          onClick={onBack}
          style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 10px', fontSize: '0.8rem' }}
        >
          🏠 القائمة
        </button>
      </div>


      {/* مؤشر الدور - تصميم عصري */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1a1a1a',
        border: `2px solid ${turnColor}`,
        borderRadius: '14px',
        padding: '8px 16px',
        marginBottom: '14px',
        boxShadow: `0 0 15px ${turnColor}22`,
        position: 'relative',
      }}>
        {/* النقاط المتحركة */}
         <img
          src={currentBlock.image}
          alt=""
          style={{
            width: '34px',
            height: '34px',
            imageRendering: 'pixelated',
            border: `2px solid ${turnColor}`,
            borderRadius: '8px',
            padding: '2px',
            background: '#0a0a0a',
            boxShadow: `0 0 12px ${turnColor}44`
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>يلعب الأن:</span>
          <span style={{ color: turnColor, fontWeight: '900', fontSize: '1rem' }}>{currentName}</span>
        </div>

        <img
          src={currentBlock.image}
          alt=""
          style={{
            width: '34px',
            height: '34px',
            imageRendering: 'pixelated',
            border: `2px solid ${turnColor}`,
            borderRadius: '8px',
            padding: '2px',
            background: '#0a0a0a',
            boxShadow: `0 0 12px ${turnColor}44`
          }}
        />
      </div>

      {/* الوصفة المطلوبة */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '6px' }}>اصنع:</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src={recipe.result} alt={recipe.name} style={{ width: '48px', height: '48px', imageRendering: 'pixelated', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.6))' }} />
          <span style={{ color: '#ffaa00', fontWeight: '900', fontSize: '1.1rem' }}>{recipe.name}</span>
        </div>
        <button
          onClick={() => setShowHint((h) => !h)}
          style={{ marginTop: '8px', background: '#222', color: '#55ffff', border: '1px solid #333', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          {showHint ? '🙈 إخفاء التلميح' : '💡 تلميح'}
        </button>
        {showHint && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '120px', margin: '10px auto 0' }}>
            {recipe.pattern.map((r, i) => (
              <div key={i} style={{ width: '36px', height: '36px', background: '#141414', border: '1px solid #333', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {r ? <img src={RESOURCES[r].image} alt="" style={{ width: '28px', height: '28px', imageRendering: 'pixelated', opacity: 0.85 }} /> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* شبكة الصنع 3x3 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
        maxWidth: '300px', margin: '0 auto 16px',
        background: '#141414', padding: '14px', borderRadius: '16px',
        border: '3px solid #5b3d1e',
        animation: wrong ? 'shake 0.5s' : 'none'
      }}>
        {grid.map((res, i) => (
          <div
            key={i}
            data-cell={i}
            onClick={() => handleCellTap(i)}
            style={{
              aspectRatio: '1 / 1',
              background: hoverCell === i && dragging ? '#2a2a2a' : '#1e1e1e',
              border: hoverCell === i && dragging ? '2px dashed #55ff55' : '2px solid #333',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.1s',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,.5)'
            }}
          >
            {res ? <img src={RESOURCES[res].image} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', imageRendering: 'pixelated' }} /> : null}
          </div>
        ))}
      </div>

      {/* الموارد القابلة للسحب */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
        {resourceList.map((res) => (
          <button
            key={res.id}
            type="button"
            onPointerDown={(e) => startDrag(e, res.id)}
            style={{
              width: '56px', height: '56px',
              background: '#181818',
              border: selected === res.id ? '2px solid #55ff55' : '2px solid #282828',
              borderRadius: '10px', cursor: 'grab',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              touchAction: 'none', boxShadow: selected === res.id ? '0 0 10px rgba(85,255,85,.4)' : 'none'
            }}
          >
            <img src={res.image} alt={res.label} style={{ width: '34px', height: '34px', imageRendering: 'pixelated', pointerEvents: 'none' }} />
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: '#777', fontSize: '0.7rem', marginTop: '-10px', marginBottom: '14px' }}>
        اسحب الموارد وأفلتها في الشبكة — أو اضغط مورد ثم اضغط خانة
      </div>

      {/* أزرار التحكم */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button className="minecraft-btn" onClick={handleCheck} style={{ backgroundColor: '#55ff55', color: '#000', padding: '10px 20px', fontWeight: '900', fontSize: '1rem' }}>
          🔍 تحقق
        </button>
        <button className="minecraft-btn" onClick={handleClear} style={{ backgroundColor: '#ffaa00', color: '#000', padding: '10px 16px', fontWeight: '900' }}>
          🗑️ مسح
        </button>
        <button className="minecraft-btn" onClick={handleSkip} style={{ backgroundColor: '#444', color: '#fff', padding: '10px 16px', fontWeight: '900' }}>
          ⏭️ تخطي
        </button>
      </div>

      {/* شبح العنصر المسحوب */}
      {dragging && (
        <div style={{ position: 'fixed', left: dragPos.x, top: dragPos.y, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 3000 }}>
          <img src={RESOURCES[dragging.resource].image} alt="" style={{ width: '52px', height: '52px', imageRendering: 'pixelated', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.7))' }} />
        </div>
      )}

      {/* شاشة الاحتفال */}
      {celebrating && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000, direction: 'rtl', overflow: 'hidden'
        }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{ position: 'absolute', left: `${8 + Math.random() * 84}%`, top: '50%', fontSize: '1.5rem', animation: `floatUp ${1 + Math.random()}s ease-out ${Math.random() * 0.6}s forwards` }}>
              {['🟩', '✨', '💎', '⭐', '🟦'][i % 5]}
            </span>
          ))}
          <div style={{ textAlign: 'center', background: '#141414', border: '3px solid #55ff55', borderRadius: '20px', padding: '28px 26px', animation: 'glowPulse 1.2s infinite' }}>
            <img src={celebrating.recipe.result} alt="" style={{ width: '90px', height: '90px', imageRendering: 'pixelated', animation: 'craftPop 0.5s ease-out' }} />
            <h2 style={{ margin: '14px 0 6px', color: '#55ff55', fontWeight: '900', fontSize: '1.4rem' }}>🎉 صنعت {celebrating.recipe.name}!</h2>
            <p style={{ margin: 0, color: turnColor, fontWeight: '900', fontSize: '1.1rem' }}>
              +1 نقطة لـ {celebrating.player === 'player1' ? playerOneName : playerTwoName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
