const fs = require('fs');

const path = __dirname + '/shared';
const dest = __dirname + '/' + process.env.SYMLINK_DESTINATION + '/shared';

fs.symlink(path, dest, 'dir', (err) => {
  if (err) {
    if (err.path === path && err.dest == dest && err.code == 'EEXIST') {
      console.log('Symlink exists. All good.');
      return;
    }

    console.log(err);
  } else {
    console.log(
      `Symlink created:

from source: ${path}
to destination: ${dest}`,
    );
  }
});
