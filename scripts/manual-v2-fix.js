#!/usr/bin/env node
// Manual V2 format fix - direct approach

import fs from 'fs';

function manualV2Fix() {
  console.log('🔧 Manual V2 format fix...');
  
  const fixes = [
    // Double status fixes
    ['005_📚1🟢1🟢_DOCUMENTATION_RESEARCH_PLAN_240809_06.md', '005_📚1🟢_DOCUMENTATION_RESEARCH_PLAN_240809_06.md'],
    ['006.1_⚙️1🟢1🟢_SETUP_INSTRUCTIONS_240809_05.md', '006.1_⚙️1🟢_SETUP_INSTRUCTIONS_240809_05.md'],
    ['008_🔄1🟢1🟢_STRATEGIC_CLEAN_START_PLAN_240808_01.md', '008_🔄1🟢_STRATEGIC_CLEAN_START_PLAN_240808_01.md'],
    ['009_🔍3🔵3🔵_STRATEGIC_REPOSITORY_ANALYSIS_240808_01.md', '009_🔍3🔵_STRATEGIC_REPOSITORY_ANALYSIS_240808_01.md'],
    ['01_🎯2🟡1🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md', '01_🎯1🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md'],
    ['04_🤖1🟢1🟢_AGENTS_240809_01.md', '04_🤖1🟢_AGENTS_240809_01.md'],
    ['053_🎛️1🟢1🟢_SENIOR_COCKPIT_IMPLEMENTATION_PLAN_240812_01,10,11.md', '053_🎛️1🟢_SENIOR_COCKPIT_IMPLEMENTATION_PLAN_240812_01,10,11.md'],
    ['054_📊2🟡3🔵_JULES_KIRO_ANALYSIS_COMPARISON_240812_01,53.md', '054_📊3🔵_JULES_KIRO_ANALYSIS_COMPARISON_240812_01,53.md'],
    ['06_📋1🟢1🟢_SETUP_COMPLETE_SUMMARY_240808_05.md', '06_📋1🟢_SETUP_COMPLETE_SUMMARY_240808_05.md'],
    ['083_🔧3🔵3🔵_FILE_CONSOLIDATION_ANALYSIS_240812_ALL.md', '083_🔧3🔵_FILE_CONSOLIDATION_ANALYSIS_240812_ALL.md'],
    ['086_🎉1🟢1🟢_SYSTEMATIC_APPROACH_SUCCESS_240812_084,085.md', '086_🎉1🟢_SYSTEMATIC_APPROACH_SUCCESS_240812_084,085.md'],
    
    // Missing status number fixes
    ['055_🎛️3🔵_SENIOR_PROCESS_ANALYSIS_UPDATED_240812_01,53,54.md', '055_🎛️3🔵_SENIOR_PROCESS_ANALYSIS_UPDATED_240812_01,53,54.md'],
    ['057_🎛️1🟢_SENIOR_COCKPIT_COMPLETION_SUMMARY_240812_01,53,54,55,56.md', '057_🎛️1🟢_SENIOR_COCKPIT_COMPLETION_SUMMARY_240812_01,53,54,55,56.md'],
    ['058_📝3🔵_JULES_MANUAL_PROMPT_TEMPLATE_240812_04.md', '058_📝3🔵_JULES_MANUAL_PROMPT_TEMPLATE_240812_04.md'],
    ['059_📝1🟢_JULES_ISSUE_INSTRUCTIONS_240812_04.md', '059_📝1🟢_JULES_ISSUE_INSTRUCTIONS_240812_04.md'],
    ['060_📊3🔵_JULES_ANALYSIS_REQUEST_TEMPLATE_240812_04.md', '060_📊3🔵_JULES_ANALYSIS_REQUEST_TEMPLATE_240812_04.md'],
    ['061_📋2🟡_DOCUMENT_UPDATE_PLAN_240812_ALL.md', '061_📋2🟡_DOCUMENT_UPDATE_PLAN_240812_ALL.md'],
    ['063_📝3🔵_COMPLETE_CODE_INVENTORY_240812_01.md', '063_📝3🔵_COMPLETE_CODE_INVENTORY_240812_01.md'],
    ['064_📋1🟢_SELEKTIV_IMPORT_PLAN_240812_01.md', '064_📋1🟢_SELEKTIV_IMPORT_PLAN_240812_01.md'],
    ['067_📝1🟢_JULES_DELIVERABLES_SUMMARY_240812_04.md', '067_📝1🟢_JULES_DELIVERABLES_SUMMARY_240812_04.md'],
    
    // Wrong emoji position fixes
    ['068_🧪🟢1🟢_SENIOR_COCKPIT_TEST_SCRIPT_240812_53.md', '068_🧪1🟢_SENIOR_COCKPIT_TEST_SCRIPT_240812_53.md'],
    ['069_🧪🟢1🟢_SENIOR_COCKPIT_INTEGRATION_TEST_240812_57.md', '069_🧪1🟢_SENIOR_COCKPIT_INTEGRATION_TEST_240812_57.md'],
    ['070_🧪🟢1🟢_SENIOR_VIEW_SERVICE_TEST_240812_57.md', '070_🧪1🟢_SENIOR_VIEW_SERVICE_TEST_240812_57.md'],
    ['071_🧪🔵2🟡_COMPLETE_SYSTEM_TEST_PLAN_240812_01.md', '071_🧪2🟡_COMPLETE_SYSTEM_TEST_PLAN_240812_01.md'],
    
    // Mixed status fixes
    ['080_📝🔵2🟡_KONTEXT_ORIGINAL_240809_81.md', '080_📝2🟡_KONTEXT_ORIGINAL_240809_81.md'],
    ['081_📝🔵2🟡_KONTEXT_UPDATED_240809_80.md', '081_📝2🟡_KONTEXT_UPDATED_240809_80.md'],
    ['082_📊🔵2🟡_SYSTEM_STATUS_COMPLETE_240808_01,06.md', '082_📊2🟡_SYSTEM_STATUS_COMPLETE_240808_01,06.md'],
    ['082_🔧3🔵1🟢_DOCUMENTATION_CONSOLIDATION_240812_ALL.md', '082_🔧1🟢_DOCUMENTATION_CONSOLIDATION_240812_ALL.md'],
    ['084_🔧3🔵1🟢_FILENAME_BATCH_CORRECTION_240812_083.md', '084_🔧1🟢_FILENAME_BATCH_CORRECTION_240812_083.md'],
    ['085_📊3🔵1🟢_FILENAME_CORRECTION_PROGRESS_240812_084.md', '085_📊1🟢_FILENAME_CORRECTION_PROGRESS_240812_084.md'],
    ['088_🎉1🟢_BATCH_CORRECTION_COMPLETION_240812_084,085,086,087.md', '088_🎉1🟢_BATCH_CORRECTION_COMPLETION_240812_084,085,086,087.md'],
    
    // Deep dive fixes
    ['110_🎭🟡2🟡_CONSCIOUS_AGENT_DEEP_DIVE_000000_01,12,31.md', '110_🎭2🟡_CONSCIOUS_AGENT_DEEP_DIVE_000000_01,12,31.md'],
    ['111_⚙️🟡2🟡_CORE_AGENT_DEEP_DIVE_000000_01,23,04.md', '111_⚙️2🟡_CORE_AGENT_DEEP_DIVE_000000_01,23,04.md'],
    ['112_🌉🟡2🟡_COMMUNICATION_BRIDGE_DEEP_DIVE_000000_01,10,11.md', '112_🌉2🟡_COMMUNICATION_BRIDGE_DEEP_DIVE_000000_01,10,11.md'],
    ['113_🔧🟡2🟡_PLATFORM_SELECTOR_DEEP_DIVE_000000_01,23.md', '113_🔧2🟡_PLATFORM_SELECTOR_DEEP_DIVE_000000_01,23.md'],
    ['130_🔧🔵2🟡_KIRO_DEVELOPMENT_STRATEGY_240808_01,31.md', '130_🔧2🟡_KIRO_DEVELOPMENT_STRATEGY_240808_01,31.md'],
    ['150_🌉🔵1🟢_COMPLETE_INTEGRATION_PLAN_240809_01,31,05.md', '150_🌉1🟢_COMPLETE_INTEGRATION_PLAN_240809_01,31,05.md'],
    
    // Analysis fixes
    ['220_🏛️🔵3🔵_CHURCH_TECHNOLOGY_ANALYSIS_240808_21,01.md', '220_🏛️3🔵_CHURCH_TECHNOLOGY_ANALYSIS_240808_21,01.md'],
    ['221_🌍🔵3🔵_REAL_TIME_TRANSLATION_ANALYSIS_240808_20,01.md', '221_🌍3🔵_REAL_TIME_TRANSLATION_ANALYSIS_240808_20,01.md'],
    ['222_👨‍👩‍👧‍👦🔵3🔵_FAMILY_HISTORY_INTEGRATION_ANALYSIS_240808_01,23.md', '222_👨‍👩‍👧‍👦3🔵_FAMILY_HISTORY_INTEGRATION_ANALYSIS_240808_01,23.md'],
    ['223_📊🔵3🔵_COMPREHENSIVE_TOOLS_ANALYSIS_240808_01,11,13.md', '223_📊3🔵_COMPREHENSIVE_TOOLS_ANALYSIS_240808_01,11,13.md'],
    ['224_🎨🟡2🟡_WYSIWYG_INTEGRATION_ANALYSIS_240811_01,40.md', '224_🎨2🟡_WYSIWYG_INTEGRATION_ANALYSIS_240811_01,40.md'],
    ['225.1_🔄🔵3🔵_HYBRID_MERGE_STRATEGY_240811_15.md', '225.1_🔄3🔵_HYBRID_MERGE_STRATEGY_240811_15.md'],
    ['225_🔄🔵3🔵_PREVIEW_MERGE_STRATEGY_REFERENCE_240811_01.md', '225_🔄3🔵_PREVIEW_MERGE_STRATEGY_REFERENCE_240811_01.md'],
    ['240_👥🔵3🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md', '240_👥3🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md'],
    ['241_🎨🟡2🟡_SENIOR_UI_COMPONENTS_ANALYSIS_000000_40,10.md', '241_🎨2🟡_SENIOR_UI_COMPONENTS_ANALYSIS_000000_40,10.md'],
    ['242_💝🟡2🟡_EMPATHY_ENGINE_ANALYSIS_000000_40,10.md', '242_💝2🟡_EMPATHY_ENGINE_ANALYSIS_000000_40,10.md']
  ];
  
  let fixed = 0;
  
  for (const [oldName, newName] of fixes) {
    try {
      if (fs.existsSync(oldName) && oldName !== newName) {
        console.log(`🔄 ${oldName}`);
        console.log(`   → ${newName}`);
        
        // Read content
        const content = fs.readFileSync(oldName, 'utf8');
        
        // Write to new filename
        fs.writeFileSync(newName, content);
        
        // Delete old file
        fs.unlinkSync(oldName);
        
        fixed++;
        console.log(`✅ Fixed: ${newName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to fix ${oldName}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Manual fix completed! Fixed ${fixed} files.`);
  
  // Run verification
  console.log('\n🔍 Verifying V2 compliance...');
  const allFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  const v2Pattern = /^\d+_[^_]*[1-4][🟢🟡🔵⚫]_/;
  let compliant = 0;
  let nonCompliant = 0;
  
  for (const file of allFiles) {
    if (v2Pattern.test(file)) {
      compliant++;
    } else {
      nonCompliant++;
      console.log(`❌ Still non-compliant: ${file}`);
    }
  }
  
  console.log(`\n📊 Final Results:`);
  console.log(`✅ V2 Compliant: ${compliant}`);
  console.log(`❌ Non-compliant: ${nonCompliant}`);
  console.log(`📈 Compliance rate: ${Math.round((compliant/(compliant+nonCompliant))*100)}%`);
  
  if (nonCompliant === 0) {
    console.log(`\n🎉 ALL FILES ARE NOW V2 COMPLIANT! 🎉`);
  }
}

manualV2Fix();