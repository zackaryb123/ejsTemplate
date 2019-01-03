var orl = require('oracledb');

//TODO:SELECT
// orl.getConnection({
//   user: 'hr',
//   password: 'hr',
//   connectString: 'localhost/XE'
// }, function (err, conn) {
//   if(err){
//     console.log(err);
//     return;
//   }
//   conn.execute('select id, name from customer',
//     function (err, result) {
//       if(err) {
//         console.log(err);
//         return;
//       }
//       console.log(result.rows);
//     })
// });

//TODO: INSERT
orl.getConnection({
  user: 'hr',
  password: 'hr',
  connectString: 'localhost/XE'
}, function (err, conn) {
  if(err){
    console.log(err);
    return;
  }
  conn.execute('insert into customer values(:id, :name, :address, :age)',
    [1004, 'Blaylock', '250 Pharr', 25],
    {autoCommit:true},
    function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result.rowsAffected);
    })
});

//TODO: DELETE
orl.getConnection({
  user: 'hr',
  password: 'hr',
  connectString: 'localhost/XE'
}, function (err, conn) {
  if(err){
    console.log(err);
    return;
  }
  conn.execute('delete from customer where id = :id)',
    ['id'],
    {autoCommit:true},
    function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result.rowsAffected);
    })
});