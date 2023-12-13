const fs = require('fs');

function genImageResource() {
  fs.readdir('./src/assets/images/', (err, fileName) => {
    if (err) {
      return;
    }

    fileName = fileName.filter(name => !name.includes('.DS_Store'));

    fs.writeFileSync(
      './src/assets/imagesAsset.ts',
      `const images = {
    ${fileName.map(iconName => {
      const type = iconName.substring(iconName.lastIndexOf('.'));

      const path = `
    ${iconName.replace(type, '')}: require("./images/${iconName}")`;

      return path;
    })}
    }
export default images`,
      { encoding: 'utf8', flag: 'w' },
    );

    console.log(
      `============== Linked ${fileName.length} images ==============`,
    );
  });
}

function genIconResource() {
  fs.readdir('./src/assets/icons/', (err, fileName) => {
    if (err) {
      // console.log(err);
      return;
    }

    fs.writeFileSync(
      './src/assets/iconsAsset.ts',
      `
      ${fileName
        .map(iconName => {
          const path = `
      import ${iconName.replace('.svg', '')} from './icons/${iconName}';`;

          return path;
        })
        .join('')}
      const icons = {
    ${fileName.map(iconName => {
      const path = `
    ${iconName.replace('.svg', '')}`;

      return path;
    })}
    }
export default icons`,
      { encoding: 'utf8', flag: 'w' },
    );

    console.log(
      `============== Linked ${fileName.length} icons ==============`,
    );
  });
}

genImageResource();
genIconResource();
