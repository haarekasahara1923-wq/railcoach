import 'dotenv/config'
import { db } from './lib/db/index'
import { users, categories, dishes, restaurantInfo, orders, orderItems, inventoryItems, purchaseOrders, stockMovements } from './lib/db/schema'
import bcrypt from 'bcryptjs'

/**
 * ⚠️  FULL DATABASE RESET + SEED SCRIPT
 * Ye script naye database ke liye hai.
 * Pehle saara data delete karta hai, fir fresh seed karta hai.
 */
async function resetAndSeed() {
  console.log('🔥 Starting full database reset...')

  // --- Step 1: Clear all data in correct order (foreign keys) ---
  console.log('🗑️  Clearing existing data...')
  try {
    await db.delete(stockMovements)
    await db.delete(purchaseOrders)
    await db.delete(orderItems)
    await db.delete(orders)
    await db.delete(dishes)
    await db.delete(categories)
    await db.delete(restaurantInfo)
    await db.delete(users)
    console.log('✅ All tables cleared.')
  } catch (err) {
    console.log('ℹ️  Some tables may not exist yet, continuing...')
  }

  // --- Step 2: Hash passwords ---
  const adminPassword = await bcrypt.hash('Admin@123', 10)
  const staffPassword = await bcrypt.hash('Staff@123', 10)

  // --- Step 3: Insert Users ---
  console.log('👤 Inserting users...')
  await db.insert(users).values([
    { name: 'Admin User', email: 'admin@expressaryanrailcoach.com', passwordHash: adminPassword, role: 'admin' },
    { name: 'Reception User', email: 'reception@expressaryanrailcoach.com', passwordHash: staffPassword, role: 'reception' },
    { name: 'Kitchen User', email: 'kitchen@expressaryanrailcoach.com', passwordHash: staffPassword, role: 'kitchen' },
  ])

  // --- Step 4: Insert Restaurant Info ---
  console.log('🏠 Inserting restaurant info...')
  await db.insert(restaurantInfo).values({
    name: 'EXPRESS ARYAN RAIL COACH RESTAURANT',
    address: 'Gole ka Mandir, Gwalior',
    themeColor: '#B5451B',
    accentColor: '#F4A261',
    slug: 'express-aryan-rail-coach',
  })

  // --- Step 5: Insert Sample Categories & Dishes ---
  console.log('🥘 Seeding categories and dishes...')
  const [breakfast] = await db.insert(categories).values({ name: '🌅 Breakfast', displayOrder: 1, isActive: true }).returning({ id: categories.id })
  const [starters] = await db.insert(categories).values({ name: '🥗 Starters', displayOrder: 2, isActive: true }).returning({ id: categories.id })
  const [mainCourse] = await db.insert(categories).values({ name: '🍛 Main Course', displayOrder: 3, isActive: true }).returning({ id: categories.id })
  const [beverages] = await db.insert(categories).values({ name: '🥤 Beverages', displayOrder: 4, isActive: true }).returning({ id: categories.id })

  await db.insert(dishes).values([
    { categoryId: breakfast.id, name: 'Masala Dosa', description: 'Crispy rice pancake with potato filling', isVeg: true, sizes: [{ label: 'Standard', price: 120 }], images: ['https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop'] },
    { categoryId: breakfast.id, name: 'Poha Jalebi', description: 'Indori special beaten rice with sweet jalebi', isVeg: true, sizes: [{ label: 'Standard', price: 60 }], images: ['https://images.unsplash.com/photo-1599307767316-776533da941c?q=80&w=800&auto=format&fit=crop'] },
    { categoryId: starters.id, name: 'Crispy Corn', description: 'Deep fried corn tossed with spices', isVeg: true, sizes: [{ label: 'Plate', price: 140 }], images: ['https://images.unsplash.com/photo-1517093157656-b99917c6471c?q=80&w=800&auto=format&fit=crop'] },
    { categoryId: mainCourse.id, name: 'Paneer Butter Masala', description: 'Creamy tomato based paneer curry', isVeg: true, sizes: [{ label: 'Half', price: 180 }, { label: 'Full', price: 320 }], images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop'] },
    { categoryId: mainCourse.id, name: 'Dal Makhani', description: 'Slow cooked black lentils with butter', isVeg: true, sizes: [{ label: 'Bowl', price: 150 }], images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop'] },
  ])

  console.log('')
  console.log('🎉 Database reset complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📋 Login Credentials:')
  console.log('  Admin:     admin@expressaryanrailcoach.com / Admin@123')
  console.log('  Reception: reception@expressaryanrailcoach.com / Staff@123')
  console.log('  Kitchen:   kitchen@expressaryanrailcoach.com / Staff@123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  process.exit(0)
}

resetAndSeed().catch((err) => {
  console.error('❌ Reset failed:', err)
  process.exit(1)
})
