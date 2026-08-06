import fs from 'fs';
import path from 'path';

const searchDirs = ['src', 'prisma', 'scripts'];
const extensions = ['.ts', '.tsx', '.prisma', '.css'];

let totalLines = 0;
let fileCount = 0;
const folderBreakdown = {};
const extBreakdown = {};
const fileDetails = [];

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    return lines;
  } catch (e) {
    return 0;
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath);
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        const lines = countLines(fullPath);
        totalLines += lines;
        fileCount++;
        
        // Extension breakdown
        extBreakdown[ext] = (extBreakdown[ext] || 0) + lines;
        
        // Folder breakdown
        const relativeFolder = path.dirname(fullPath).replace(/\\/g, '/');
        folderBreakdown[relativeFolder] = (folderBreakdown[relativeFolder] || 0) + lines;
        
        fileDetails.push({
          file: file,
          path: fullPath.replace(/\\/g, '/'),
          lines: lines
        });
      }
    }
  }
}

searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    traverse(dir);
  }
});

console.log('--- LINES OF CODE SUMMARY ---');
console.log(`Total Files: ${fileCount}`);
console.log(`Total LOC: ${totalLines}`);
console.log('\n--- BY EXTENSION ---');
console.dir(extBreakdown);
console.log('\n--- BY FOLDER ---');
console.dir(folderBreakdown);
console.log('\n--- TOP 15 LARGEST FILES ---');
fileDetails.sort((a, b) => b.lines - a.lines);
console.dir(fileDetails.slice(0, 15));
