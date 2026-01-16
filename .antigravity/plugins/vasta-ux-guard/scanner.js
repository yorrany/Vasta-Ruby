const fs = require('fs');
const path = require('path');

const PLUGIN_DIR = __dirname;
const PROJECT_ROOT = path.resolve(PLUGIN_DIR, '../../../');
const TARGET_DIR = path.join(PROJECT_ROOT, 'web');
const RULES_FILE = path.join(PLUGIN_DIR, 'rules.json');
const MANIFESTO_FILE = path.join(PLUGIN_DIR, 'manifesto.md');

// Load Rules & Manifesto
const rules = JSON.parse(fs.readFileSync(RULES_FILE, 'utf8'));
let manifestoVersion = "Unknown";
try {
    const manifestoContent = fs.readFileSync(MANIFESTO_FILE, 'utf8');
    const versionMatch = manifestoContent.match(/> \*\*Version\*\*: (.*)/);
    if (versionMatch) manifestoVersion = versionMatch[1].trim();
} catch (e) {
    console.warn("⚠️  Could not read Manifesto version.");
}

let hasCriticalErrors = false;
let violationCount = 0;
let exceptionCount = 0;

function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.next' || file === '.git') continue;
            scanDirectory(fullPath);
        } else {
            scanFile(fullPath);
        }
    }
}

function scanFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.tsx', '.ts', '.jsx', '.js', '.css'].includes(ext)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const lines = content.split('\n');

    // Run Regex Checks
    rules.regex_checks.forEach(check => {
        if (check.exclude_files && check.exclude_files.some(ex => relativePath.includes(ex))) return;

        const regex = new RegExp(check.pattern, 'g');
        let match;
        
        while ((match = regex.exec(content)) !== null) {
            // Calculate line number
            const lineIndex = content.substring(0, match.index).split('\n').length - 1;
            const currentLine = lines[lineIndex];
            const prevLine = lineIndex > 0 ? lines[lineIndex - 1] : "";

            // Check for exception comment on the same line or previous line
            if ((currentLine && currentLine.includes("@vasta-ux-exception")) || 
                (prevLine && prevLine.includes("@vasta-ux-exception"))) {
                exceptionCount++;
                continue; // Skip this violation
            }

            reportViolation(check, relativePath, match[0], lineIndex + 1);
        }
    });
}

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');

const violations = [];

function reportViolation(check, filePath, matchStr, lineNum) {
    const violation = {
        severity: check.severity,
        message: check.message,
        file: filePath,
        line: lineNum,
        match: matchStr.trim(),
        principle: check.principle || "General Governance",
        suggestion: check.suggestion || "Consult the manifesto."
    };

    if (jsonMode) {
        violations.push(violation);
    } else {
        const color = check.severity === 'CRITICAL' ? '\x1b[31m' : '\x1b[33m'; // Red or Yellow
        const reset = '\x1b[0m';
        
        console.log(`${color}[${check.severity}] ${check.message}${reset}`);
        console.log(`  📍 ${filePath}:${lineNum}`);
        console.log(`  🔍 Match: "${matchStr.trim()}"`);
        console.log(`  ⚖️  Principle: ${check.principle || "General Governance"}`);
        console.log(`  💡 Fix: ${check.suggestion || "Consult the manifesto."}`);
        console.log('');
    }

    if (check.severity === 'CRITICAL') {
        hasCriticalErrors = true;
    }
    violationCount++;
}

if (!jsonMode) {
    console.log(`\n🛡️  VASTA UX GUARD (v${manifestoVersion})`);
    console.log(`   Scanning target: ${TARGET_DIR}\n`);
}

scanDirectory(TARGET_DIR);

if (jsonMode) {
    console.log(JSON.stringify({
        manifestoVersion,
        timestamp: new Date().toISOString(),
        violations,
        summary: {
            total: violationCount,
            critical: violations.filter(v => v.severity === 'CRITICAL').length,
            warning: violations.filter(v => v.severity === 'WARNING').length,
            exceptions: exceptionCount
        }
    }, null, 2));
} else {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Checked against Manifesto v${manifestoVersion}`);
    console.log(`Violations: ${violationCount}`);
    console.log(`Exceptions: ${exceptionCount} (authorized bypasses)`);

    if (hasCriticalErrors) {
        console.log(`\n\x1b[31m❌ BUILD FAILED: Critical UX violations detected.\x1b[0m`);
        console.log(`   Use // @vasta-ux-exception: <reason> to bypass if absolutely necessary.\n`);
        process.exit(1);
    } else {
        console.log(`\n\x1b[32m✅ Vasta UX Guard Passed.\x1b[0m\n`);
        process.exit(0);
    }
}
