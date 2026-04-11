# 🏆 Sports Week Live Tournament Management System

A complete live sports tournament management system designed for seamless bracket management, real-time result updates, and spectator viewing.

---

## 📋 Quick Start Guide

### For Spectators (Public View)
1. **No login required** - Just open the website
2. **View live tournaments** - Select sports from category tabs (Boys Chess, Girls Carrom, etc.)
3. **Live updates** - See results update in real-time as matches complete

### For Admins (Tournament Management)

#### Step 1: Admin Login
- Click **"Admin Login"** button (top right)
- **ID:** `211624`
- **Password:** `kabbo`

#### Step 2: Create Tournament Draw
1. Select game category (Boys Chess, Girls Carrom, etc.)
2. Paste player names in the textarea (one per line)
   ```
   Player 1
   Player 2
   Player 3
   Player 4
   ```
3. Click **"Generate Bracket"** button
4. System automatically creates matches with randomized pairings

#### Step 3: Select Match Winners
1. In the bracket view, click on a player name to mark them as winner
2. The next round automatically updates based on winners
3. Previous round results clear if you change a winner
4. 🏆 Trophy emoji shows the current winner

#### Step 4: Publish to Dashboard
1. Once bracket is ready, click **"Publish to Dashboard"** 
2. **Status indicator** shows "Currently Published Live"
3. Spectators immediately see it on their public view

#### Step 5: Manage Live Results
- Click any player name to change match result
- Changes instantly appear on public dashboard for live viewing
- Use **"Remove from Dashboard"** to unpublish

---

## 🎮 Features

### Admin Panel Features
- ✅ Multiple sport categories (Chess, Carrom, Card, Ludu)
- ✅ 1v1 and 2v2 tournament formats
- ✅ Automatic bracket generation with randomized pairings
- ✅ Instant result updates
- ✅ Draft preview before publishing
- ✅ One-click publish/unpublish
- ✅ Real-time sync to public dashboard
- ✅ Benched player tracking for 2v2 formats

### Public View Features
- 👥 Live tournament brackets
- 🔄 Real-time updates
- 📱 Mobile-friendly responsive design
- 🎯 Category-based tournament tabs
- 🏆 Winner indicators with trophies

---

## 🎯 Workflow Overview

```
┌─────────────────────────────────────────────┐
│ 1. LOGIN                                      │
│ Enter admin credentials                      │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 2. SELECT CATEGORY & ENTER PLAYERS         │
│ Choose sport, paste player names            │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 3. GENERATE BRACKET                         │
│ System creates tournament structure          │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 4. PUBLISH TO DASHBOARD                     │
│ Make it live for spectators                  │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 5. MANAGE RESULTS                           │
│ Click winners → Instantly updates public     │
└─────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

### Bracket Generation
- **Automatic randomization** - Players shuffle randomly for fair pairings
- **Smart bye handling** - Odd number of players automatically gets a bye
- **Format support:**
  - **1v1:** Individual matches (Chess)
  - **2v2:** Team matches (Carrom, Card, Ludu)

### Winner Selection (Admin Mode)
- **Green highlight** = Match winner
- **Strikethrough** = Match loser
- **Gray/disabled** = Waiting for previous match results
- **Click to select** - Simply tap player name to mark winner

### Publishing Tips
- Draft mode shows **"ADMIN EDIT MODE"** badge
- Live mode shows **"🔴 LIVE PUBLIC"** badge with pulse animation
- Changes auto-sync to public when already published
- Spectators see live 🏆 trophy next to winners

---

## 📱 Supported Tournaments

| Sport | Format | Players | Max Rounds |
|-------|--------|---------|-----------|
| Boys Chess | 1v1 | 2-16+ | 4 |
| Boys Carrom | 2v2 | 4-16+ | 4 |
| Boys Card | 2v2 | 4-16+ | 4 |
| Girls Carrom | 2v2 | 4-16+ | 4 |
| Girls Ludu | 2v2 | 4-16+ | 4 |

---

## 🔐 Security

- Admin login required for tournament management
- Public view is read-only (no permissions needed)
- All data synced via Firebase
- Offline mode support (UI-only)

---

## ⚡ Real-Time Updates

### How Live Updates Work
1. Admin selects winner in admin panel
2. Data instantly saves to firestore
3. Public dashboard fetches updates automatically
4. Spectators see changes within 1 second

### Status Indicators
- ✅ Green check = Match completed
- ⏳ Blue pulse = Match pending
- 🔴 Red live badge = Currently published
- 🏆 Trophy = Participant advancing to next round

---

## 🎨 Interface Guide

### Admin Panel (Left Sidebar)
- **Game Category buttons** - Switch between tournaments
- **Player Input** - Paste player names here
- **Generate Bracket** - Create tournament structure
- **Publish Button** - Go live to spectators
- **Delete Button** - Unpublish tournament

### Main Tournament View (Center)
- **Round headers** - Shows current round name and stage
- **Match cards** - Individual match information
- **Bye indicators** - Players advancing without matches
- **Benched players** - Players needing partners (2v2)

### Public Tabs (Top)
- Category tabs auto-generated from tournaments
- Active tab highlighted in blue
- Click to switch between live tournaments

---

## 🚀 Getting Started Checklist

- [ ] Open website in browser
- [ ] Click "Admin Login"
- [ ] Enter credentials (211624 / kabbo)
- [ ] Select a sport category
- [ ] Copy-paste player names
- [ ] Click "Generate Bracket"
- [ ] Click on players to select winners
- [ ] Click "Publish to Dashboard"
- [ ] Open in another window to see live public view
- [ ] Share public link with spectators

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't generate bracket | Need at least 2 players; check player list isn't empty |
| Results not syncing | Bracket must be published first; click "Publish to Dashboard" |
| No tournaments showing | Admin must publish first; spectators see live tournaments only |
| Admin panel not visible | Only in admin mode after login |
| Firebase errors | Check internet connection; data will sync when online |

---

## 📞 Support

For issues with bracket generation, result syncing, or tournament management:
1. Check troubleshooting guide above
2. Verify admin credentials
3. Ensure bracket has been generated (not empty state)
4. Make sure publish button is unlocked
5. Check Firebase connection in browser console

---

## 🎉 Enjoy Your Sports Week!

This system is designed for smooth, real-time tournament management. Perfect for:
- ✅ School sports weeks
- ✅ Competitive tournaments
- ✅ Live event management
- ✅ Multi-round competitions
- ✅ Public spectator viewing

**Happy organizing! 🏆**
