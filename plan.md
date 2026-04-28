# MacOS Brick Out — Development Plan

## 1. Code Architecture Choices

### Language & Framework
- **Language:** Swift 5.9+
- **Framework:** SpriteKit (built into macOS, purpose-built for 2D games)
  - Provides scene graph, physics engine, texture atlas, audio, and animation out of the box
  - No third-party dependency required; ships with Xcode
  - Alternative considered: Metal + custom renderer — rejected as over-engineered for a 2D arcade game

### Game Loop Design
- SpriteKit drives the game loop via `SKScene.update(_ currentTime: TimeInterval)`
- Fixed-timestep physics with SpriteKit's built-in `SKPhysicsWorld`
- Frame rate target: 60 fps (enforced via `preferredFramesPerSecond = 60` on `SKView`)
- Delta time clamped to 1/30 s to prevent tunneling on slow frames

### Rendering Approach
- Scene graph: `SKScene` → `SKNode` layers (background, bricks, ball, paddle, HUD)
- Bricks: pooled `SKSpriteNode` instances arranged in a grid; destroyed nodes recycled
- Paddle and ball: single `SKSpriteNode` each with `SKPhysicsBody`
- Pixel-art or flat-color assets (generated programmatically or loaded from an asset catalog)
- Resolution-independent layout using scene `scaleMode = .aspectFit`

### Input Handling
- **Mouse:** `mouseMoved(with:)` on `NSViewController` → translate x-position to paddle position
- **Trackpad:** same path (NSEvent mouse-moved events cover trackpad)
- **Keyboard:** `keyDown(with:)` for arrow keys (left/right) as fallback; spacebar to launch ball
- Input processed in `update(_:)` before physics step to minimize latency

### Audio
- `SKAudioNode` for looping background music (optional)
- `SKAction.playSoundFileNamed(_:waitForCompletion:)` for short one-shot SFX (brick hit, ball bounce, life lost, level clear)
- Sound assets: short `.caf` files (Core Audio Format, lowest-latency on macOS)

### State Management
- Enum-driven game state machine:
  ```
  enum GameState { case ready, playing, paused, levelClear, gameOver }
  ```
- State stored on `GameScene`; transitions trigger enter/exit actions (show/hide overlays, pause/resume physics)
- Persistent data (high score) via `UserDefaults`
- No networking or CloudKit in v1

---

## 2. OS Version Support Constraints

| Requirement | Value |
|---|---|
| Minimum macOS | **13.0 Ventura** |
| Xcode | 15.0+ |
| Swift | 5.9+ |
| SpriteKit | Available since macOS 10.9; no API that requires > 13 |

**Rationale for macOS 13 minimum:**
- macOS 13 covers ~85%+ of active Macs (as of 2025)
- Swift 5.9 language features (macros, parameter packs) available without version guards
- `SKPhysicsBody` edge-based bodies and `SKPhysicsContactDelegate` fully stable since macOS 10.10; no special requirements
- Avoids conditional availability annotations for any SpriteKit API used

**APIs and frameworks required:**
- `SpriteKit` — 2D rendering, physics, audio playback
- `AppKit` — `NSWindow`, `NSViewController`, mouse/keyboard events
- `AVFoundation` — fallback for audio if SpriteKit audio is insufficient
- `GameController` — optional: MFi gamepad support (macOS 11+, well within 13 minimum)

**Excluded:**
- iOS/tvOS targets (macOS-only per spec)
- Mac Catalyst (unnecessary complexity)
- Objective-C (pure Swift codebase)

---

## 3. High-Level Implementation Phases

### Phase 1 — Project Skeleton (Day 1)
- [ ] Create macOS App target in Xcode (Swift, SpriteKit template)
- [ ] Configure `SKView` in `ViewController`, present `GameScene`
- [ ] Establish scene size (e.g. 800×600 logical points), aspect-fit scaling
- [ ] Add game state enum and basic state transitions (ready → playing → gameOver)
- [ ] Commit skeleton with passing build

### Phase 2 — Core Gameplay (Days 2–3)
- [ ] Paddle: `SKSpriteNode` + `SKPhysicsBody` (kinematic), mouse tracking
- [ ] Ball: `SKSpriteNode` + `SKPhysicsBody` (dynamic, restitution 1.0, no friction)
- [ ] Arena walls: edge-loop physics body on scene bounds; bottom edge = ball-lost trigger
- [ ] Brick grid: configurable rows × columns, each brick is a node in a layer
- [ ] Collision detection via `SKPhysicsContactDelegate`: ball–brick removes brick, ball–paddle reflects
- [ ] Ball launch on spacebar/click from ready state
- [ ] Lives system (3 lives), life-lost on ball exit bottom
- [ ] Level clear detection (all bricks destroyed)

### Phase 3 — Game Feel & Polish (Day 4)
- [ ] Brick colors by row (standard Breakout palette)
- [ ] Ball speed increase every N bricks destroyed (difficulty ramp)
- [ ] SFX: bounce, brick break, life lost, level clear
- [ ] HUD overlay: score, lives, level number (`SKLabelNode`)
- [ ] Pause/resume (P key or Escape)
- [ ] Game over and level-clear overlays with restart option

### Phase 4 — Persistence & Distribution (Day 5)
- [ ] High score stored in `UserDefaults`, displayed on game over screen
- [ ] Multi-level support: define 3 brick layouts, cycle on level clear
- [ ] App icon and basic asset catalog
- [ ] Archive and notarize for distribution (ad-hoc or App Store)
- [ ] README with build instructions

---

## File Structure (target layout)

```
BrickOut/
├── BrickOut.xcodeproj
└── BrickOut/
    ├── AppDelegate.swift
    ├── ViewController.swift
    ├── Scenes/
    │   ├── GameScene.swift        # main scene, update loop, input
    │   ├── GameScene.sks          # optional visual editor layout
    │   └── MenuScene.swift
    ├── Nodes/
    │   ├── PaddleNode.swift
    │   ├── BallNode.swift
    │   └── BrickNode.swift
    ├── Managers/
    │   ├── LevelManager.swift     # brick layouts per level
    │   └── ScoreManager.swift     # UserDefaults persistence
    ├── Assets.xcassets
    └── Sounds/
        ├── bounce.caf
        ├── break.caf
        └── levelclear.caf
```
