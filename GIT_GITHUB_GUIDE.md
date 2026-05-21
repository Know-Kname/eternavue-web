# Complete Git & GitHub Workflow Guide

**A Step-by-Step Walkthrough for Saving Code to GitHub**

---

## 📚 Table of Contents

1. [Core Concepts](#core-concepts)
2. [Step-by-Step Instructions](#step-by-step-instructions)
3. [Understanding Each Command](#understanding-each-command)
4. [Common Issues & Solutions](#common-issues--solutions)
5. [Best Practices](#best-practices)
6. [Advanced Topics](#advanced-topics)

---

## 📖 Core Concepts

### What is Git?

**Git** is version control software. Think of it like this:

```
Your Code
    ↓
Git (tracks changes)
    ↓
GitHub (stores online)
```

### Key Concepts

#### 1. **Repository (Repo)**
A folder that Git tracks. All your files and history live here.

```
eternavue-web/          ← This is your repository
├── src/
├── package.json
└── .git/               ← Git's hidden folder (stores history)
```

#### 2. **Working Directory**
Your actual files on your computer. Where you write code.

```
You edit files here:
src/app/error.tsx
src/app/not-found.tsx
ADVANCED_ERROR_BOUNDARIES.md
```

#### 3. **Staging Area (Index)**
A temporary holding area before you commit. Think of it as a "shopping cart."

```
Step 1: Create/Edit files (Working Directory)
Step 2: Add to staging area (git add)
Step 3: Commit (git commit)
```

#### 4. **Local Repository**
Git's database on YOUR computer. Stores all history locally.

#### 5. **Remote Repository**
GitHub's copy of your repo. Synced with your local copy.

```
Your Computer              GitHub.com
┌─────────────────┐       ┌──────────────────┐
│ Local Repo      │       │ Remote Repo      │
│ (all history)   │ ←───→ │ (all history)    │
│ (.git folder)   │       │ (your-user/repo) │
└─────────────────┘       └──────────────────┘
     (git push/pull)
```

#### 6. **Commit**
A "snapshot" of your code at a point in time. Like saving a game.

```
Commit #1: "Initial setup"
Commit #2: "Add error boundaries"
Commit #3: "Add documentation"

Each has:
- Unique ID (hash)
- Timestamp
- Author
- Message
- All files at that point
```

### Workflow Visualization

```
┌─────────────────────────────────────────────────────────┐
│                     YOUR WORKFLOW                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Make changes in files                              │
│     ↓                                                   │
│  2. Check what changed (git status)                    │
│     ↓                                                   │
│  3. Stage changes (git add)                            │
│     ↓                                                   │
│  4. Commit with message (git commit)                   │
│     ↓                                                   │
│  5. Push to GitHub (git push)                          │
│     ↓                                                   │
│  6. GitHub stores it permanently                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Step-by-Step Instructions

### STEP 1: Check Current Status

**What's happening?** See what files Git has detected as changed.

**Command:**
```bash
git status
```

**What you'll see:**
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to stage)
  modified:   package.json
  new file:   src/app/error.tsx
  new file:   src/app/not-found.tsx
  new file:   src/app/global-error.tsx
  new file:   ADVANCED_ERROR_BOUNDARIES.md
  new file:   ERROR_BOUNDARIES_SUMMARY.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
  .env.local
```

**Understanding the output:**
- **On branch main** = You're on the "main" branch (default)
- **Changes not staged for commit** = Files changed but not ready to commit
- **modified** = File existed, you changed it
- **new file** = New file Git hasn't seen before
- **Untracked files** = Files Git ignores (like .env.local)

---

### STEP 2: Check `.gitignore` File

**What's happening?** Make sure Git isn't tracking files it shouldn't (like .env, node_modules, etc.).

**Your `.gitignore` should have:**
```
.env
.env.local
.env*.local
node_modules/
dist/
.next/
```

**Check your gitignore:**
```bash
cat .gitignore
```

**Good news:** You already have `.gitignore` in eternavue-web, so it's properly configured.

---

### STEP 3: Stage Changes

**What's happening?** Put files in the "shopping cart" ready to commit.

**Option A: Stage everything**
```bash
git add .
```
The `.` means "add all changed files in current directory and subdirectories."

**Option B: Stage specific file**
```bash
git add src/app/error.tsx
```

**Option C: Stage by pattern**
```bash
git add src/app/*.tsx     # All .tsx files in src/app/
git add *.md               # All .md files in root
```

**Check what's staged:**
```bash
git status
```

**You'll see:**
```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
  new file:   src/app/error.tsx
  new file:   src/app/not-found.tsx
```

(Green = staged, Red = not staged)

---

### STEP 4: Create Commit Message

**What's happening?** Write a descriptive message about what changed.

**Good commit messages describe WHAT and WHY, not HOW.**

#### ✅ Good Examples
```
"Add advanced error boundaries with animations"
"Implement production-grade error handling"
"Add error monitoring integration documentation"
"Create 404 page with holographic animations"
```

#### ❌ Bad Examples
```
"update stuff"
"fix bugs"
"add files"
"wip"
"asdf"
```

**Why?** Future you (and teammates) need to understand what each commit did.

---

### STEP 5: Commit Changes

**What's happening?** Create a snapshot of your staged changes.

**Command:**
```bash
git commit -m "Add advanced error boundaries with animations and monitoring"
```

**Understanding the syntax:**
- `git commit` = Create a snapshot
- `-m` = Flag for message
- `"Your message here"` = The commit message

**You'll see:**
```
[main abc1234] Add advanced error boundaries with animations and monitoring
 5 files changed, 2543 insertions(+)
 create mode 100644 src/app/error.tsx
 create mode 100644 src/app/not-found.tsx
 create mode 100644 src/app/global-error.tsx
 create mode 100644 ADVANCED_ERROR_BOUNDARIES.md
 create mode 100644 ERROR_BOUNDARIES_SUMMARY.md
```

**Understanding the output:**
- `[main abc1234]` = On main branch, commit ID is abc1234
- `5 files changed` = Modified 5 files
- `2543 insertions(+)` = Added 2543 lines
- `create mode 100644` = Created new files

---

### STEP 6: Verify Commit

**What's happening?** Make sure commit was successful.

**Command:**
```bash
git log --oneline -5
```

**You'll see:**
```
abc1234 Add advanced error boundaries with animations and monitoring
def5678 Add environment configuration and security headers
ghi9012 Update audit report
jkl3456 Initial commit
mno7890 First setup
```

**Understanding the output:**
- First part = Short commit ID
- Rest = Commit message
- `-5` = Show last 5 commits
- `--oneline` = Show one line per commit

---

### STEP 7: Push to GitHub

**What's happening?** Upload your commits to GitHub.

**Command:**
```bash
git push origin main
```

**Understanding the syntax:**
- `git push` = Upload commits
- `origin` = Name of remote (GitHub)
- `main` = Branch name (default branch)

**You'll see:**
```
Enumerating objects: 23, done.
Counting objects: 100% (23/23), done.
Delta compression using up to 8 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (17/17), 24.58 KiB | 8.19 MiB/s, done.
Total 17 (delta 6), reused 0 (delta 0), reused pack 0 (delta 0)
remote: Resolving deltas: 100% (6/6), done.
To github.com:kk-gang/eternavue-web.git
   abc1234..def5678  main -> main
```

**Understanding the output:**
- `Enumerating objects` = Counting what to send
- `Compressing objects` = Making files smaller
- `Writing objects` = Sending to GitHub
- `To github.com:...` = Destination
- `abc1234..def5678` = Commits being pushed

---

### STEP 8: Verify on GitHub

**What's happening?** Check that code is on GitHub.

**Steps:**
1. Go to GitHub.com
2. Log in to your account
3. Find your repository (github.com/kk-gang/eternavue-web)
4. Click on your repository name
5. You should see your files
6. Click "Commits" to see commit history
7. You should see your new commits

**On GitHub you'll see:**
```
Main branch
└── Your files appear here
    └── src/
        └── app/
            ├── error.tsx ✅ NEW
            ├── not-found.tsx ✅ NEW
            ├── global-error.tsx ✅ NEW
```

---

## 🔍 Understanding Each Command

### `git status`

**Purpose:** See what's changed, what's staged, what's untracked.

```bash
git status
```

**Output breakdown:**
```
On branch main                              ← What branch you're on
Your branch is up to date with 'origin/main'. ← Your code matches GitHub

Changes not staged for commit:               ← Changed but not staged
  (use "git add <file>..." to stage)
  modified:   package.json                  ← File was modified

Changes to be committed:                     ← Ready to commit
  (use "git commit" to finalize)
  new file:   src/app/error.tsx             ← New file, ready

Untracked files:                             ← Git doesn't track these
  (use "git add <file>..." to include)
  .env.local                                ← Not tracked (good!)

nothing to commit, working tree clean       ← Everything committed
```

### `git add`

**Purpose:** Stage files for commit.

```bash
# Stage everything
git add .

# Stage specific file
git add src/app/error.tsx

# Stage all .tsx files
git add "*.tsx"

# Stage by directory
git add src/
```

**After git add:**
```
Before:
  modified:   src/app/error.tsx        ← RED (not staged)

After:
  modified:   src/app/error.tsx        ← GREEN (staged)
```

### `git commit`

**Purpose:** Create a snapshot with a message.

```bash
# Simple commit
git commit -m "Add error boundaries"

# Longer commit with description
git commit -m "Add error boundaries" -m "Includes error.tsx, not-found.tsx, and global-error.tsx"

# Opens editor for longer message (don't use this usually)
git commit
```

**Result:**
```
[main abc1234] Add error boundaries
 3 files changed, 2500 insertions(+)
```

### `git push`

**Purpose:** Upload commits to GitHub.

```bash
# Push current branch
git push origin main

# Push all branches
git push --all

# Force push (caution! can overwrite)
git push --force-with-lease origin main
```

**Before push:**
```
Local commits:
  abc1234 - Local only
  def5678 - Local only
  ghi9012 - On GitHub
```

**After push:**
```
All commits on GitHub:
  abc1234 ✅
  def5678 ✅
  ghi9012 ✅
```

### `git log`

**Purpose:** See commit history.

```bash
# Last 5 commits (one line each)
git log --oneline -5

# Detailed commit information
git log -5

# See what changed in each commit
git log -p -5

# See commits by date
git log --since="2 weeks ago"

# See commits by author
git log --author="your-name"
```

**Output:**
```
abc1234 Add error boundaries
    Author: Christian Hughes <you@email.com>
    Date: Feb 18 2026
    
    Added advanced error boundaries with animations
    
def5678 Update documentation
    Author: Christian Hughes <you@email.com>
    Date: Feb 17 2026
    
    Updated guides with new information
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "fatal: not a git repository"

**Problem:** You're not in a Git folder.

**Solution:**
```bash
# Navigate to your project
cd C:\Projects\eternavue-web

# Check for .git folder
ls -la | grep .git

# If no .git, initialize Git
git init
```

### Issue 2: Changes not staging

**Problem:** `git add` doesn't seem to work.

**Solution:**
```bash
# Make sure you're in the right folder
pwd                    # Print working directory
cd C:\Projects\eternavue-web

# Try adding again
git add .

# Check status
git status
```

### Issue 3: "Please tell me who you are"

**Problem:** Git doesn't know your name/email.

**Solution:**
```bash
# Set globally (one time)
git config --global user.name "Christian Hughes"
git config --global user.email "you@example.com"

# Verify it worked
git config --global user.name
git config --global user.email
```

### Issue 4: "Permission denied (publickey)"

**Problem:** GitHub can't authenticate with SSH.

**Solution (use HTTPS instead):**
```bash
# Check current remote
git remote -v

# If shows SSH, change to HTTPS
git remote set-url origin https://github.com/kk-gang/eternavue-web.git

# Try pushing again
git push origin main
```

**You'll be prompted for:**
- Username: Your GitHub username
- Password: Your GitHub personal access token (not password!)

### Issue 5: "Updates were rejected because the tip of your current branch is behind"

**Problem:** Someone else pushed changes you don't have locally.

**Solution:**
```bash
# Pull the latest changes first
git pull origin main

# Then push your changes
git push origin main
```

### Issue 6: Accidental commits

**Problem:** Committed something you didn't mean to.

**Solution (undo last commit, keep changes):**
```bash
git reset --soft HEAD~1
```

**Then stage and commit properly.**

---

## ✅ Best Practices

### 1. **Commit Often**

```
✅ Good - Small, focused commits:
  Commit 1: "Add error boundary component"
  Commit 2: "Add 404 page"
  Commit 3: "Add documentation"

❌ Bad - Large, mixed commits:
  Commit 1: "Update everything"
```

### 2. **Write Good Commit Messages**

```
✅ Good:
  "Add error boundary with animations"
  "Update documentation for error handling"
  "Fix form validation bug"

❌ Bad:
  "stuff"
  "update"
  "bug fix"
```

### 3. **Commit Message Format (Professional)**

```
First line: Brief summary (50 chars or less)
Blank line
Detailed explanation (wrap at 72 chars)

Example:
Add advanced error boundaries

This commit adds:
- error.tsx with animations
- 404 page with suggestions
- global-error.tsx for critical errors

Includes monitoring integration ready for Sentry.
```

### 4. **Push Regularly**

```
✅ Good - Push after each feature:
  - Local: Work on error boundaries
  - Commit: "Add error boundaries"
  - Push: Upload to GitHub
  - GitHub shows your work immediately

❌ Bad - Wait too long to push:
  - Local: Work for a week
  - Commit: 50 commits
  - Push: Massive push all at once
  - GitHub is out of date
```

### 5. **Use `.gitignore` Properly**

```
.gitignore should have:

# Environment files
.env
.env.local
.env.*.local

# Node
node_modules/
npm-debug.log

# Build output
dist/
build/
.next/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### 6. **Check Before Pushing**

```bash
# What will I push?
git log origin/main..HEAD

# What changed in files?
git diff --cached

# Is everything I want?
git status
```

---

## 🎓 Advanced Topics

### Branching (Creating Separate Workstreams)

**Scenario:** You want to work on a feature without affecting main.

```bash
# Create new branch
git checkout -b feature/error-boundaries

# Make changes, commit
git add .
git commit -m "Add error boundary feature"

# Push to GitHub
git push origin feature/error-boundaries

# On GitHub, create Pull Request (PR) to merge back to main
# Review → Merge → Delete branch

# Back to main
git checkout main
git pull origin main
```

### Undoing Mistakes

```bash
# Undo unstaged changes in a file
git checkout -- src/app/error.tsx

# Undo staged changes (but keep the file changes)
git reset HEAD src/app/error.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (lose changes)
git reset --hard HEAD~1

# Fix last commit message
git commit --amend -m "Better message"
```

### Seeing What Changed

```bash
# Changes in working directory
git diff

# Changes staged for commit
git diff --cached

# Changes in specific file
git diff src/app/error.tsx

# Changes between commits
git diff abc1234 def5678

# Changes in last commit
git show HEAD
```

### Collaborative Workflow

**You + Teammate working on same project:**

```
1. You work on feature A
   git checkout -b feature/error-boundaries
   git add .
   git commit -m "Add error boundaries"
   git push origin feature/error-boundaries

2. Teammate works on feature B
   git checkout -b feature/logging
   git add .
   git commit -m "Add error logging"
   git push origin feature/logging

3. You finish feature A
   GitHub: Create Pull Request
   Teammate reviews
   Merge to main

4. Teammate finishes feature B
   GitHub: Create Pull Request
   You review
   Merge to main

5. Both pull latest
   git checkout main
   git pull origin main
   
   Now main has both features!
```

---

## 📋 Complete Workflow Summary

**Every time you want to save code:**

```bash
# 1. See what changed
git status

# 2. Stage everything (or specific files)
git add .

# 3. Commit with a message
git commit -m "Describe what changed"

# 4. Push to GitHub
git push origin main

# 5. Verify on GitHub.com (optional)
# Visit github.com/kk-gang/eternavue-web
```

**That's it! You're done.**

---

## 🎯 Quick Reference Card

```bash
# Setup (one time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Before coding
git pull origin main

# After coding
git status                          # See changes
git add .                          # Stage all
git commit -m "Your message"       # Commit
git push origin main               # Push to GitHub

# Check history
git log --oneline -10              # Last 10 commits
git log -p -5                      # Detailed view

# Undo mistakes
git reset --soft HEAD~1            # Undo last commit
git checkout -- filename           # Undo file changes
git pull origin main               # Sync with GitHub
```

---

## ✅ You Now Know:

✅ What Git is and how it works  
✅ What GitHub is and its role  
✅ How to check for changes (`git status`)  
✅ How to stage changes (`git add`)  
✅ How to commit changes (`git commit`)  
✅ How to push to GitHub (`git push`)  
✅ How to verify on GitHub  
✅ How to see history (`git log`)  
✅ Common problems and solutions  
✅ Professional best practices  

**You're ready to use Git like a professional developer!**

---

**Next time:** Just repeat the 5-step workflow every time you finish coding.

Done! 🎉
