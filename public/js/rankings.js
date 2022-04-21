var table = $('.mydatatable').DataTable();

$('.mydatatable thead th').each(function(){
  var title = $(this).text();
  $(this).html( '<input type="text" placeholder="Search '+title+'" />')
});
table.columns().every(function(){
  var that = this;
  $('input', this.header() ).on('keyup change', function(){
    if(that.search() !==this.value){
      that.search(this.value).draw();
    }
  })
})


/*
$('.mydatatable').DataTable({
  initComplete: function(){
    this.api().columns().every(function(){
      var column = this;
      var select = $('<select><option value=""></option></select>')
        .appendTo($(column.header()).empty())
        .on( 'change', function(){
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column.search(val ? '^' + val + '$' : '', true, false).draw();
        });
        column.data().unique().sort().each(function(d,j){
          select.append('<option value="'+d+'">'+d+'</option>')
        });
    });
  }
});

*/