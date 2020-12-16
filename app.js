//Code By: Firmansyahken
//Maaf jika logic / algoritma nya terlalu berbelit-belit 
const searchButton = document.getElementById("cari");
searchButton.addEventListener("click", openSearch);
const sidebarButton = document.getElementById("sidebar-btn");
sidebarButton.addEventListener("click", openSidebar);

function openSearch() {
  const searchBar = document.querySelector(".search");
  searchBar.classList.toggle("active");
}

function openSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");

}

function defaultCategory() {
  const xhr = new XMLHttpRequest();
  xhr.onloadend = function() {
    var data = JSON.parse(this.responseText);
    var output = ""
    data.forEach((results) => {
      output += `<div class="col-6 col-lg-4 col-sm-4" id="product" data-id="${results.id}">
        <div class="card">
          <img src="${results.image}" class="card-img-top" />
          <div class="card-body">
            <p class="price">${results.price}</p>
            <p class="product">${results.name}</p>
          </div>
        </div>
      </div>`;
      document.getElementById("data").innerHTML = output;
      modalOrder();
    })
  }

  xhr.open("GET", "https://my-json-server.typicode.com/pamekasancode/jsonplaceholder/data", true);
  xhr.send();
}

defaultCategory()

var categories = document.querySelectorAll(".kategori");
categories.forEach((category) => {
  
  category.addEventListener("click", selectCategory);
})

function selectCategory() {
  var removeCategories = document.querySelectorAll(".kategori");
  removeCategories.forEach((removeCategory) => {
    removeCategory.classList.remove('active')
  })
  this.classList.add("active")
  var category = this.dataset.url;
  const xhrCategories = new XMLHttpRequest();
  xhrCategories.onloadend = function() {
    var dataCategories = JSON.parse(this.responseText);
    var outputCategory = ""
    dataCategories.forEach((dataCategory) => {
      if(dataCategory.kategori == category) {
        outputCategory += `<div class="col-6 col-lg-4 col-sm-4" id="product" data-id="${dataCategory.id}">
              <div class="card">
                <img src="${dataCategory.image}" class="card-img-top" />
                <div class="card-body">
                  <p class="price">${dataCategory.price}</p>
                  <p class="product">${dataCategory.name}</p>
                </div>
              </div>
            </div>`;
        document.getElementById("data").innerHTML = outputCategory;
        modalOrder()
        
      } 
      
    })
  }
  xhrCategories.open("GET", "https://my-json-server.typicode.com/pamekasancode/jsonplaceholder/data", true);
  xhrCategories.send();
}

function modalOrder() {
  var products = document.querySelectorAll("#product");
  products.forEach((product) => {
    product.addEventListener("click", function() {
      var id = this.dataset.id;
      var modalOrder = document.querySelector(".order");
      const xhrOrder = new XMLHttpRequest();
      xhrOrder.onloadend = function() {
        var dataOrder = JSON.parse(this.responseText);
        var modal = "";
        modal = `<div class="container">
                    <header>
                      <i class="fa fa-times" id="btnclose"></i>
                      <h3>Order</h3>
                    </header>
              
                    <img src="${dataOrder.image}">
                    <div class="row">
                      <div class="col-4">
                        <p>Product</p>
                        <p>Price</p>
                      </div>
                      <div class="col-8">
                        <p>${dataOrder.name}</p>
                        <p>${dataOrder.price}</p>
                      </div>
                    </div>
                    <input class="form-control" id="jumlahpesanan" type="number" placeholder="Jumlah Barang">
                    <button class="btn btn-success btn-order">Order Now</button>
                    <button class="btn btn-dark">Checkout</button>
                  </div>`;
        modalOrder.innerHTML = modal;
        modalOrder.style.display = "block";
        modalOrder.style.animation = "overlay 500ms"
        document.querySelector(".btn-order").addEventListener("click", function() {
          var jumlahOrder = document.getElementById("jumlahpesanan").value;
          if (jumlahOrder > 0) {
            window.location.href='https://api.whatsapp.com/send/?phone=6281333745705&text=Permisi wibustore, Saya ingin memesan '+dataOrder.kategori+' '+dataOrder.name+' sebanyak: '+jumlahOrder+'pcs';
          }
          
        })
        closeModal()
        
      }
      xhrOrder.open("GET", "https://my-json-server.typicode.com/pamekasancode/jsonplaceholder/data/"+id, true);
      xhrOrder.send();
      
    })
  })
  
}

function closeModal() {
  var closeBtn = document.getElementById("btnclose");
  closeBtn.addEventListener("click", function() {
    document.querySelector(".order").style.display = "none";
  })
  window.addEventListener("click", function() {
    document.style.display = "none";
  })
}