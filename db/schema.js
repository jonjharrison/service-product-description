var pg = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'jonny',
    password: 'jonny',
    database: 'product_descriptions'
  }
});

pg.schema.dropTableIfExists('descriptions')
.dropTableIfExists('packaging_types')
.dropTableIfExists('product_images')
.then(function() {
  return pg.schema.createTable('packaging_types', function(table) {
    table.increments('id').primary().unique();
    table.string('packaging_type_label');
  })
  .createTable('product_images', function(table) {
    table.increments('id').primary().unique();
    table.string('file_id');
  })
  .createTable('descriptions', function(table) {
    table.increments('id').primary().unique();
    table.integer('product_id');
    table.string('product_size');
    table.string('details');
    table.integer('packaging_type_id');
    table.foreign('packaging_type_id').references('packaging_types.id');
    table.integer('product_image_id');
    table.foreign('product_image_id').references('product_images.id');
  });
})
.then(function() {
  return pg.insert({
    packaging_type_label: 'frustration-free packaging'
  }).into('packaging_types');
})
.then(function() {
  return pg.insert({
    file_id: 'DUMMY_FILE_ID'
  }).into('product_images')
})
.then(function() {
  return pg.insert({
    product_id: 1,
    product_size: '10 ounces',
    details: 'Puperade is Gatorade, but for your dog. Flavor is beef, but also comes in chicken or turkey.',
    packaging_type_id: 1,
    product_image_id: 1
  }).into('descriptions');
})
.then(function() {
  return pg('descriptions')
    .select();
})
.map(function(row) {
  console.log(row);
})
.catch(function(e) {
  console.error(e);
})
.then(function() {
  pg.destroy();
});