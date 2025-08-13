# 📝 File Creation Checklist - Systematic Approach

## 🎯 BEFORE CREATING ANY NEW FILE

### **Step 1: Relation Analysis (MANDATORY)**
- [ ] **Check structure.md** - What similar files exist?
- [ ] **Identify concern type:**
  - [ ] **Same concern** → Merge with existing file
  - [ ] **Separate concern** → Create new file
- [ ] **Map relations** - Which files will reference this?
- [ ] **Consider consolidation** - Can this be added to existing file?

### **Step 2: File Naming (V2 Format)**
- [ ] **Consult structure.md** - Find next available index
- [ ] **Choose correct emoji** - Match content category
- [ ] **Set proper status** - 1🟢/2🟡/3🔵/4⚫
- [ ] **Add relations** - List related document numbers
- [ ] **Format:** `[INDEX]_[EMOJI][STATUS]_[NAMN]_[DATUM]_[RELATIONER].md`

### **Step 3: Content Creation**
- [ ] **Use standard header:**
```markdown
# [EMOJI] [TITLE] - [DESCRIPTION]

**Datum:** 2025-08-12  
**Status:** [STATUS] [DESCRIPTION]  
**Syfte:** [PURPOSE]  
**Relaterat:** [RELATED_DOCS]

## 🎯 [MAIN_CONTENT]
```

### **Step 4: Cross-Reference Updates**
- [ ] **Update related files** - Add references to new file
- [ ] **Update structure.md** - Add to correct category
- [ ] **Update next index** - Increment for next file
- [ ] **Test links** - Ensure all references work

## 🚨 ANTI-AD-HOC SAFEGUARDS

### **Red Flags (STOP and Think):**
- ❌ **Creating without checking structure.md**
- ❌ **Similar title to existing file**
- ❌ **No clear separate concern**
- ❌ **Forgetting to update relations**
- ❌ **Using wrong emoji/status**

### **Green Lights (Proceed):**
- ✅ **Checked structure.md first**
- ✅ **Clear separate concern identified**
- ✅ **Proper V2 format planned**
- ✅ **Relations mapped out**
- ✅ **Cross-references planned**

## 🔄 SYSTEMATIC WORKFLOW

### **Template Questions:**
1. **What problem does this solve?**
2. **Is this already covered elsewhere?**
3. **What files will reference this?**
4. **What files should this reference?**
5. **Is this a separate concern or same concern?**

### **Decision Tree:**
```
New Content Needed?
├── YES → Check structure.md
│   ├── Similar file exists?
│   │   ├── YES → Same concern?
│   │   │   ├── YES → Merge with existing
│   │   │   └── NO → Create new (separate concern)
│   │   └── NO → Create new file
│   └── Follow V2 format
└── NO → Use existing file
```

## 🎯 SUCCESS METRICS

### **File Creation Success:**
- ✅ **Follows V2 format** - Correct emoji, status, relations
- ✅ **Proper categorization** - Right index series
- ✅ **Clear separate concern** - Distinct from existing files
- ✅ **Updated cross-references** - All related files updated
- ✅ **Structure.md updated** - Index and category correct

### **System Health:**
- ✅ **No duplicates** - Same concerns consolidated
- ✅ **Clear relations** - Easy to find related content
- ✅ **Consistent naming** - All files follow V2 format
- ✅ **Maintainable structure** - Easy to navigate and update

## 🚀 AUTOMATION HELPERS

### **Quick Commands:**
```bash
# Check for similar files
grep -r "KEYWORD" *.md

# Find next available index
grep "Nästa lediga index" .kiro/steering/structure.md

# Validate V2 format
grep -E "^[0-9]+_[^_]+[1-4][🟢🟡🔵⚫]_" *.md
```

### **Templates:**
- **Analysis Document:** `[INDEX]_📊[STATUS]_[NAME]_ANALYSIS_[DATE]_[RELATIONS].md`
- **Implementation:** `[INDEX]_🔧[STATUS]_[NAME]_IMPLEMENTATION_[DATE]_[RELATIONS].md`
- **Test Document:** `[INDEX]_🧪[STATUS]_[NAME]_TEST_[DATE]_[RELATIONS].md`
- **Archive Document:** `[INDEX]_🗑️4⚫_[NAME]_ARCHIVE_[DATE]_[RELATIONS].md`

**Use this checklist for EVERY new file to maintain systematic approach!** 🎯