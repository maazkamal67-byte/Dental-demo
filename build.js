import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'team.html',
  'gallery.html',
  'faq.html',
  'contact.html',
];

for (const file of htmlFiles) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
  }
}

const assetDirs = ['css', 'js'];
for (const dir of assetDirs) {
  if (fs.existsSync(dir)) {
    fs.cpSync(dir, path.join(distDir, dir), { recursive: true });
  }
}

console.log('Build succeeded: All static HTML, CSS, and JS files copied to dist/');
