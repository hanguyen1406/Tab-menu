var noi = $(".sub-menu").length;
var index = 0;

const addEventForItem = () => {
  $("#leftside-navigation .sub-menu > a").on("click", function(e) {
    $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown()
    e.stopPropagation();
  })
}

$("#addItem").click(() => {
  var userInput = window.prompt("Điền tên tiêu đề:");
  // Check if the user entered something
  if (userInput !== null) {
      console.log(userInput);
  }
})

for (let i = 0; i < noi; i++) {
  var imageUploadInput = document.getElementById('image'+(i+1));
  imageUploadInput.addEventListener('change', function(event) {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(`Selected file-${i}:`, selectedFile.name);
    } else {
      console.log('No file selected');
    }
  });
  
}
// Add an event listener for when a file is selected

const upItem = (event, i) => {
  event.stopPropagation();
  console.log("up:", i);
  
}

const downItem = (event, i) => {
  event.stopPropagation();
  console.log("down:", i);
}
const deleteItem = (event, i) => {
  event.stopPropagation();
  console.log("delete:", i);
}

const testLog = (i) => {
  console.log(i);
}

function handleContextMenu(event) {
  event.preventDefault();
  var contextMenu = $('#contextMenu');
  index = $('.sub-menu').index($(this));
  contextMenu.css({
      display: 'block',
      left: event.pageX,
      top: event.pageY
  });
}

$(document).ready(() => {
  $(document).on('contextmenu', '.sub-menu', handleContextMenu);
  addEventForItem();
  $(document).on('click', function(event) {
      var contextMenu = $('#contextMenu');
      if (!$(event.target).closest('#contextMenu').length) {
          contextMenu.hide();
      }
  });

  $("#up").click(() => {
    if(index > 0) {
      var html1 = $('.sub-menu').eq(index).html();
      var html2 = $('.sub-menu').eq(index - 1).html();
      var result = window.confirm(`Chắc chắn đổi chỗ tiêu đề ${index} và ${index + 1}`);
      if (result) {
        $('.sub-menu').eq(index - 1).html(html1);
        $('.sub-menu').eq(index).html(html2);
        $("#leftside-navigation .sub-menu > a").off("click");
        addEventForItem();
      }
    }
  })
  $("#down").click(() => {
    console.log('down ', index);
  })
  $("#delete").click(() => {
    console.log('delete', index);
  })
  $("#add").click(() => {
    console.log('add', index);
  })


})