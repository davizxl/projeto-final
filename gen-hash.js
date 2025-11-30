const bcrypt = require('bcrypt');
(async ()=>{
  const pass = process.argv[2] || '234567';
  console.log(await bcrypt.hash(pass, 10));
})();
